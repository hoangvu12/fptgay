const searchResults_div = document.querySelector(".search-results");
const animeName_input = document.querySelector("#animeName");
const episodesList_div = document.querySelector(".episodes-list");
const wrapper_div = document.querySelector(".wrapper");

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

const previousButton = video.controlBar.previousEpisode;
const nextEpisode = video.controlBar.nextEpisode;
const fptplay = new FPTPlay();

class Player {
  constructor() {
    this.animeId;
    this.episode;
    this.title;
    this.latestEpisode;
    this.duration;
    this.proxy = false;
  }

  nextEpisode() {
    this.episode = parseInt(player.episode) + 1;
    this.loadPlayer();
  }

  previousEpisode() {
    this.episode = parseInt(player.episode) - 1;
    this.loadPlayer();
  }

  loadEpisodes() {
    removeChild(episodesList_div);

    for (let i = 1; i <= this.latestEpisode; i++) {
      const holder = document.createElement("div");
      const button = document.createElement("button");

      holder.className = "episode-button";
      holder.dataset.episode = i;
      button.className = "episode";
      button.innerText = `Tập ${i}`;

      addChildren(holder, [button]);
      episodesList_div.appendChild(holder);
    }
  }

  async search() {
    removeChild(searchResults_div);
    const results = await fptplay.search(animeName_input.value);

    results.forEach(({ _id, title, thumb, duration, episode_latest }) => {
      const animeHolder = document.createElement("div");
      const thumbnailElement = document.createElement("img");
      const titleElement = document.createElement("div");
      const viewsElement = document.createElement("div");
      animeHolder.className = "anime-item";
      thumbnailElement.className = "anime-thumbnail";
      titleElement.className = "anime-title info";
      viewsElement.className = "anime-episodes info";

      animeHolder.dataset.latestEpisode = episode_latest;
      animeHolder.dataset.id = _id;
      thumbnailElement.src = thumb;
      titleElement.innerText = title;
      viewsElement.innerText = duration;

      addChildren(animeHolder, [thumbnailElement, titleElement, viewsElement]);

      searchResults_div.appendChild(animeHolder);
    });
  }

  async loadPlayer() {
    this.ready();

    const videoSource = await fptplay.getVideoSource({
      id: this.animeId,
      episode: this.episode,
    });

    video.src({
      src: videoSource,
      type: "application/x-mpegURL",
    });

    video.maxQualitySelector({
      defaultQuality: 2,
    });

    this.updateVideoTime();
  }

  ready() {
    this.getCurrentEpisode();
    this.proxyMode();
    this.updateInfo();
    this.buttons();
  }

  buttons() {
    if (this.episode <= 1) previousButton.disable();
    else previousButton.enable();

    if (Number(this.episode) >= Number(this.latestEpisode))
      nextEpisode.disable();
    else nextEpisode.enable();
  }

  proxyMode() {
    if (this.proxy) {
      videojs.Hls.xhr.beforeRequest = function (options) {
        options.uri = `https://general-proxy.herokuapp.com/${options.uri}`;
        return options;
      };
    } else {
      videojs.Hls.xhr.beforeRequest = function (options) {
        return options;
      };
    }
  }

  getCurrentEpisode() {
    if (!localStorage[this.animeId])
      localStorage[this.animeId] = JSON.stringify({});

    if (localStorage[this.animeId].includes("latest") && !this.episode) {
      this.episode = JSON.parse(localStorage[this.animeId])["latest"];
    } else if (!this.episode) {
      this.episode = 1;
    }
  }

  showVideoWrapper() {
    wrapper_div.style.display = "block";
  }

  updateInfo() {
    const currentTitle = document.querySelector(".current .title");
    const currentEpisode = document.querySelector(".current .episode");
    const currentButton = document.querySelector(
      `div[data-episode="${this.episode}"] button`
    );

    document
      .querySelector(".episodes-list")
      .querySelectorAll("*")
      .forEach((e) => (e.style.color = "white"));

    currentButton.style.color = "#f5740a";
    currentEpisode.dataset.episode = this.episode;
    currentEpisode.innerText = `Tập ${this.episode}`;
    currentTitle.innerText = this.title;

    this.showVideoWrapper();
  }

  updateVideoTime() {
    const storage = JSON.parse(localStorage[player.animeId]);
    let time;
    if (!player.episode) {
      const latest = storage["latest"];
      time = storage[latest]["time"];
      // console.log(`Latest episode time ${player.episode}: ${time}`);
    } else if (!(player.episode in storage)) {
      time = 0;
      // console.log(`No episode time ${player.episode}: ${time}`);
    } else {
      time = storage[player.episode]["time"];
      // console.log(`Current time ${player.episode}: ${time}`);
    }

    let lastTime = Math.floor(time).toString();
    video.currentTime(lastTime);
  }
}
