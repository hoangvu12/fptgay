var Button = videojs.getComponent("Button");
var MyButton = videojs.extend(Button, {
  constructor: function () {
    Button.apply(this, arguments);
    this.addClass("vjs-icon-next-item");
    /* initialize your button */
  },
  handleClick: function () {
    if (episode >= latestEpisode) return alert("Đây đã là tập mới nhất!");
    episode = parseInt(episode) + 1;
    loadPlayer();
  },
});

videojs.registerComponent("nextEpisode", MyButton);
