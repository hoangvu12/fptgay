const player = new Player();
const episodesContent_div = document.querySelector(".episodes-content");
const darkSwitch_input = document.querySelector("#dark-switch");
const darkSwitch_label = document.querySelector(".custom-control-label");
const proxySwitch_input = document.querySelector("#proxy-switch");
const doneTypingInterval = 2000;
let retry = 0;
let typingTimer;

// Check if one of anime result is clicked
searchResults_div.addEventListener("click", async (event) => {
  if (event.target.className !== "anime-title info") return;
  player.episode = null;

  const target = event.target.parentElement;
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
  player.loadPlayer();
});

darkSwitch_input.addEventListener("change", async () => {
  const labels = [...document.querySelectorAll(".custom-control-label")];

  if (darkSwitch_input.checked) {
    labels.forEach((label) => (label.style.color = "white"));
    document.body.style.backgroundColor = "#181818";
    return;
  }

  labels.forEach((label) => (label.style.color = "black"));
  document.body.style.backgroundColor = "#fff";
});

proxySwitch_input.addEventListener("change", function () {
  retry = 0;
  player.proxy = proxySwitch_input.checked;
  player.loadPlayer();
});

animeName_input.addEventListener("keyup", () => {
  clearTimeout(typingTimer);
  if (animeName_input.value) {
    typingTimer = setTimeout(player.search, doneTypingInterval);
  }
});

video.ready(function () {
  this.hotkeys({
    seekStep: 10,
  });
});

video.on("error", function () {
  // console.log("Player error:", video.error());
  if (retry < 3) {
    player.loadPlayer();
    return retry++;
  }
  proxySwitch_input.checked = "checked";
  player.proxy = true;
  player.loadPlayer();
});

video.on("loadedmetadata", function () {
  player.duration = video.duration();
});

video.on("timeupdate", function () {
  episodesHolder = JSON.parse(localStorage[player.animeId]) || {};

  if (!player.episode) player.episode = 1;

  const currentPlayTime = video.currentTime();

  episodesHolder["latest"] = getLatestEpisode();

  episodesHolder[player.episode] = { time: currentPlayTime };
  localStorage[player.animeId] = JSON.stringify(episodesHolder);

  if (
    currentPlayTime >= player.duration &&
    Number(player.episode) < Number(player.latestEpisode)
  )
    player.nextEpisode();
});

function getLatestEpisode() {
  // Get latest episode's user watching
  let max = Number(player.episode);
  for (let key in episodesHolder) {
    if (Number(key) >= max && max <= player.latestEpisode) {
      max = Number(key);
    }
  }

  return String(max);
}
