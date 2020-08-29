var Button = videojs.getComponent("Button");
var MyButton = videojs.extend(Button, {
  constructor: function () {
    Button.apply(this, arguments);
    this.addClass("vjs-icon-next-item");
    /* initialize your button */
  },
  handleClick: function () {
    if (Number(player.episode) >= Number(player.latestEpisode))
      return alert("Đây đã là tập mới nhất!");

    player.nextEpisode();
  },
});

videojs.registerComponent("nextEpisode", MyButton);
