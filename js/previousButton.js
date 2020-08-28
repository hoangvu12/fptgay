var Button = videojs.getComponent("Button");
var MyButton = videojs.extend(Button, {
  constructor: function () {
    Button.apply(this, arguments);
    this.addClass("vjs-icon-previous-item");
    /* initialize your button */
  },
  handleClick: function () {
    if (player.episode <= 1) return alert("Đây là tập đầu tiên!");

    player.previousEpisode();
  },
});

videojs.registerComponent("previousEpisode", MyButton);
