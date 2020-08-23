var Button = videojs.getComponent("Button");
var MyButton = videojs.extend(Button, {
  constructor: function () {
    Button.apply(this, arguments);
    this.addClass("vjs-icon-previous-item");
    /* initialize your button */
  },
  handleClick: function () {
    if (episode <= 1) return alert("Đây là tập đầu tiên!");

    episode = parseInt(episode) - 1;
    loadPlayer();
  },
});

videojs.registerComponent("previousEpisode", MyButton);
