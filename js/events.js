const player = new Player();
const episodesContent_div = document.querySelector(".episodes-content");
const darkSwitch_input = document.querySelector("#dark-switch");
const darkSwitch_label = document.querySelector(".custom-control-label");
const doneTypingInterval = 2000;
let typingTimer;

// Check if one of anime result is clicked
searchResults_div.addEventListener("click", async (event) => {
  if (event.target.className !== "anime-title info") return;
  player.episode = null;

  const target = event.target.parentElement;
  localStorage[player.animeId] = "{}";
  player.animeId = target.dataset.id;
  player.latestEpisode = target.dataset.latestEpisode;
  player.title = target.querySelector(".anime-title.info").innerText;

  await player.loadEpisodes();
  await player.loadPlayer();
});

// Check if episode button is clicked
episodesContent_div.addEventListener("click", async (event) => {
  if (event.target.tagName.toLowerCase() !== "button") return;

  player.episode = event.target.parentElement.dataset.episode;
  await player.loadPlayer();
});

darkSwitch_input.addEventListener("change", async (event) => {
  if (darkSwitch_input.checked) {
    darkSwitch_label.style.color = "white";
    document.body.style.backgroundColor = "#181818";
    return;
  }
  darkSwitch_label.style.color = "black";
  document.body.style.backgroundColor = "#fff";
});

animeName_input.addEventListener("keyup", () => {
  clearTimeout(typingTimer);
  if (animeName_input.value) {
    typingTimer = setTimeout(player.search, doneTypingInterval);
  }
});

var video = videojs("player", {
  autoplay: true,
  controlBar: {
    children: {
      playToggle: {},
      volumePanel: {
        inline: true,
      },
      previousEpisode: {},
      nextEpisode: {},
      ProgressControl: {},
      RemainingTimeDisplay: {},
      fullscreenToggle: {},
    },
  },
});

video.ready(function () {
  this.hotkeys({
    seekStep: 10,
  });
});

video.on("error", function () {
  console.log("Player error:", video.error());
  player.loadPlayer();
});

video.on("loadedmetadata", function () {
  player.duration = video.duration();
});

video.on("timeupdate", function () {
  let episodesHolder;
  if (!localStorage[player.animeId]) {
    episodesHolder = {};
  } else {
    episodesHolder = JSON.parse(localStorage[player.animeId]);
  }

  if (!player.episode) player.episode = 1;

  const currentPlayTime = video.currentTime();

  // Get latest episode's user watching
  let max = Number(player.episode);
  for (let key in episodesHolder) {
    if (Number(key) >= max) {
      max = Number(key);
    }
  }

  episodesHolder["latest"] = String(max);

  episodesHolder[player.episode] = { time: currentPlayTime };
  localStorage[player.animeId] = JSON.stringify(episodesHolder);

  if (currentPlayTime >= player.duration) player.nextEpisode();
});

function onLoadedMetadata() {
  const storage = JSON.parse(localStorage[player.animeId]);
  let time;
  if (!player.episode) {
    const latest = storage["latest"];
    time = storage[latest]["time"];
  } else if (!(player.episode in storage)) {
    time = 0;
  } else {
    time = storage[player.episode]["time"];
  }

  var lastTime = time.toString().split(".")[0];
  video.currentTime(lastTime);
}
