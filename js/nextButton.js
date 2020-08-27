var Button = videojs.getComponent("Button");
var MyButton = videojs.extend(Button, {
  constructor: function () {
    Button.apply(this, arguments);
    this.addClass("vjs-icon-next-item");
    /* initialize your button */
  },
  handleClick: function () {
    if (player.episode >= player.latestEpisode)
      return alert("Đây đã là tập mới nhất!");

    player.loadEpisode(parseInt(player.episode) + 1);
  },
});

videojs.registerComponent("nextEpisode", MyButton);
