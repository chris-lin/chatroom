(function(){
  var chris = {};
  // Create app object
  var Chris = function(){
    this.$html = $('html');
    this.$main_box = $('.main-box');
    this.$chat_bd = $('.chat-bd');
    this.$chat_users = $('.chat-users ');
    this.$tools = $('.btn-top-tools');
  };

  // Initialize after everything is ready
  Chris.prototype.init = function() {
    this.adjustScreen();
  }

  Chris.prototype.adjustScreen = function() {
    var htmlHeight = this.$html.height();
    var mainBoxHeight = htmlHeight - 80;
    var chatBdHeight = mainBoxHeight - 50;
    this.$main_box.height(mainBoxHeight)
    this.$chat_bd.height(chatBdHeight)
    this.$chat_users.height(mainBoxHeight)
  }

  Chris.prototype.event = function() {
    this.$tools.on("click", this.tools)
  }

  Chris.prototype.tools = function(e) {
    //this.$chat-users

  }

  // Document ready
  $(function(){
    chris = window.chris = new Chris();
    chris.init();
    console.log("user.id = "+ app.$userName.html() )
  });

})();
