(function(){
  var chris = {};
  // Create app object
  var Chris = function(){
    this.$body = $('.chat-bd');
    this.$msgs = $('.chat-msgs');
    this.$chat-users = $('.chat-users');
    this.$users = $('.chat-usersList');
    this.$userName = $('#userName');
    this.$form = $('.chat-form');
    this.$top-tools = $('.btn-top-tools');
  };

  // Initialize after everything is ready
  Chris.prototype.init = function() {
    this.bindSocketEvents();
    this.bindViewEvents();
    this.getUsername();
  }

  Chris.prototype.event = function() {
    this.$top-tools.on("click", this.tools)
  }

  Chris.prototype.tools = function(e) {
    //this.$chat-users

  }

  // Document ready
  $(function(){
    chris = window.chris = new App();
    app.init();
    console.log("user.id = "+ app.$userName.html() )
  });

})();
