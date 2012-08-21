(function(){
  var app = {};

  // Create app object
  var App = function(){
    this.$body = $('.chat-bd');
    this.$msgs = $('.chat-msgs');
    this.$users = $('.chat-usersList');
    this.$userName = $('#userName');
    this.$form = $('.chat-form');
    this.socket = io.connect();
  };

  // Initialize after everything is ready
  App.prototype.init = function() {
    this.bindSocketEvents();
    this.bindViewEvents();
    this.getUsername();
  }

  App.prototype.userListTmpl = function(user){

    var buf = [
      '<li>'
      , '<a href="#">' + user + '</a>'
      , '</li>'
    ];
    return buf.join('');
  }

  App.prototype.showUsers = function(users) {
    app.$users.empty();

    for(var key in users){
      var user = users[key];
      var html = app.userListTmpl(user);
      //console.log('html = '+html)
      app.$users.append(html);
    }
  }

  // Get username from user with a prompt. If username clicks cancel, ask get again!
  App.prototype.getUsername = function() {
    var name = this.$userName.html();

    if (name != null && name != "" ) {
      // Emit username join event
      this.socket.emit('join', name);

      // Set username on app
      this.username = name;


    } else {
        //this.getUsername();
    }

    return this;

  }


  // Easy templating
  App.prototype.msgTmpl = function(locals){
    var time = moment(locals.time).format("HH:mm");
    var buf = [
      '<p class="chat-msg">'
      , '<time class="chat-msg-time">[' + time + ']</time>'
      , '<span class="chat-msg-user">' + locals.talked_by + '</span>'
      , '<span class="chat-msg-bd">' + locals.msg + '</span>'
      , '</p>'
    ];
    return buf.join('');
  }

  // When app receives new message, show new message
  App.prototype.newMessage = function(data) {
    var html = app.msgTmpl(data);
    app.$msgs.append(html);
    app.scrolltoBtm();

    return this;
  }

  // When app receives system message, output system message
  App.prototype.systemMessage = function(data) {
    var html = $(app.msgTmpl(data));
    html.addClass('chat-system-msg');
    app.$msgs.append(html);
    app.scrolltoBtm();

    app.updateUsersCount(data);

    return this;
  }

  // Bind socket events to functions
  App.prototype.bindSocketEvents = function() {
    this.socket.on('msg', this.newMessage);
    this.socket.on('system', this.systemMessage);
    this.socket.on('users', this.showUsers);
    return this;
  }

  // Bind view events
  App.prototype.bindViewEvents = function() {
    this.$form.on('submit', this.submit);

    var self = this;

    //~ $('.change-username').on('click', function(e){
      //~ e.preventDefault();
      //~
      //~ self.getUsername(true);
      //~
    //~ });

    return this;
  }

  // On form submit
  App.prototype.submit = function(e) {
    e.preventDefault();

    // Get form value
    var val = app.$form.find('.chat-input').val()

    // Sanitize the message
    val = $("<p>"+val+"</p>")
      .remove('script')
      .remove('style')
      .html()

    // Reset value
    app.$form.find('.chat-input').val('');

    if (val.length < 1) return false;

    // Emit message
    app.socket.emit('msg', val);

    // Append message to page directly without waiting
    app.newMessage({
      talked_by: app.username
      , msg: val
      , time: new Date()
    });
    return this;
  }

  // Scroll chat window to bottom
  App.prototype.scrolltoBtm = function() {
    height = app.$msgs.height();
    app.$body.scrollTop(height);
    return this;
  }

  App.prototype.updateUsersCount = function(data) {
    $('.online-users').text('線上人數 : ' + data.onlineUsers + '人');
  }

  // Document ready
    $(document).ready(function(){
        app = window.app = new App();
        app.init();
        console.log("user.id = "+ app.$userName.html() );
    });

})();



