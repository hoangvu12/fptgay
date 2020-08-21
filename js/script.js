var player = videojs("my_video_1");
let animeId;
let episode;
const fptplay = new FPTPlay();

player.ready(function () {
  this.hotkeys({
    seekStep: 10,
  });
});

player.on("timeupdate", function () {
  let episodesHolder;
  if (!localStorage[animeId]) {
    episodesHolder = {};
  } else {
    episodesHolder = JSON.parse(localStorage[animeId]);
  }

  if (!episode) episode = 1;

  const currentPlayTime = player.currentTime();

  let max = Number(episode);
  for (let key in episodesHolder) {
    if (Number(key) >= max) {
      max = Number(key);
    }
  }

  episodesHolder["latest"] = String(max);

  episodesHolder[episode] = { time: currentPlayTime };
  localStorage[animeId] = JSON.stringify(episodesHolder);
});

function onLoadedMetadata() {
  const storage = JSON.parse(localStorage[animeId]);
  let time;
  if (!episode) {
    const latestEpisode = storage["latest"];
    time = storage[latestEpisode]["time"];
  } else {
    time = storage[episode]["time"];
  }

  var lastTime = time.toString().split(".")[0];
  player.currentTime(lastTime);
}

function loadEpisodes(max) {
  const parent = document.querySelector(".episodes-list");

  removeChild(parent);

  for (let i = 1; i <= max; i++) {
    const holder = document.createElement("div");
    const button = document.createElement("button");

    holder.className = "episode-button";
    holder.dataset.episode = i;
    button.className = "episode";
    button.innerText = `Tập ${i}`;

    addChildren(holder, [button]);
    parent.appendChild(holder);
  }
}

async function loadPlayer({ title }) {
  if (localStorage[animeId] && !episode) {
    episode = JSON.parse(localStorage[animeId])["latest"];
  } else if (!episode) {
    episode = 1;
  }

  updateInfo(title);

  document.querySelector(".wrapper").style.display = "block";

  const videoSource = await fptplay.getVideoSource({ id: animeId, episode });

  player.src({
    src: videoSource,
    type: "application/x-mpegURL",
  });

  player.maxQualitySelector({
    defaultQuality: 2,
  });

  onLoadedMetadata();
}

function updateInfo(title) {
  const currentTitle = document.querySelector(".current .title");
  const currentEpisode = document.querySelector(".current .episode");
  const currentButton = document.querySelector(
    `[data-episode="${episode}"] button`
  );

  document
    .querySelector(".episodes-list")
    .querySelectorAll("*")
    .forEach((e) => (e.style.color = "white"));

  currentButton.style.color = "#f5740a";
  currentEpisode.dataset.episode = episode;
  currentEpisode.innerText = `Tập ${episode}`;
  currentTitle.innerText = title;
}

async function search() {
  const parent = document.querySelector(".search-results");
  const animeName = document.querySelector("#animeName").value;
  removeChild(parent);

  const data = await fptplay.search(animeName);

  data.forEach(({ _id, title, thumb, duration, episode_latest }) => {
    const animeHolder = document.createElement("div");
    const thumbnailElement = document.createElement("img");
    const titleElement = document.createElement("div");
    const viewsElement = document.createElement("div");
    animeHolder.className = "anime-item";
    thumbnailElement.className = "anime-thumbnail";
    titleElement.className = "anime-title info";
    viewsElement.className = "anime-views info";

    animeHolder.dataset.max = episode_latest;
    animeHolder.dataset.id = _id;
    thumbnailElement.src = thumb;
    titleElement.innerText = title;
    viewsElement.innerText = duration;

    addChildren(animeHolder, [thumbnailElement, titleElement, viewsElement]);

    parent.appendChild(animeHolder);
  });
}
