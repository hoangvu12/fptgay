var Button = videojs.getComponent("Button");
var MyButton = videojs.extend(Button, {
  constructor: function () {
    Button.apply(this, arguments);
    this.addClass("vjs-icon-previous-item");
    // this.addClass("vjs-disabled");
    /* initialize your button */
  },
  handleClick: function () {
    player.previousEpisode();
  },
});

videojs.registerComponent("previousEpisode", MyButton);
