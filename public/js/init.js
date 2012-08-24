(function(){
  var chris = {};
  // Create app object
  var Chris = function(){
    this.$html = $('html');
    this.$main_box = $('.main-box');
    this.$chat_bd = $('.chat-bd');
    this.$chat_userContainer = $('.chat-userContainer');
    this.$tools = $('.btn-top-tools');
    this.$msg_input = $('.chat-input');
  };

  // Initialize after everything is ready
  Chris.prototype.init = function() {
    this.adjustScreen();
  }

  Chris.prototype.adjustScreen = function() {
    var htmlHeight = this.$html.height();
    var mainBoxHeight = htmlHeight - 100;
    var chatBdHeight = mainBoxHeight - 50;
    this.$main_box.height(mainBoxHeight)
    this.$chat_bd.height(chatBdHeight)
    this.$chat_userContainer.height(mainBoxHeight)
  }

  Chris.prototype.bindUsersEvents = function(ele, fun) {
    ele.on("click", this.privateMsg);
  }

  Chris.prototype.privateMsg = function(e) {
    e.preventDefault();
    var user = this.innerHTML;
    chris.$msg_input.val('@' + user + ' ');
    chris.$msg_input.focus();
  }

  // Document ready
  $(function(){
    chris = window.chris = new Chris();
    chris.init();
  });

})();
