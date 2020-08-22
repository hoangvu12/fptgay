// Check if one of anime result is clicked
document
  .querySelector(".search-results")
  .addEventListener("click", async (event) => {
    if (event.target.className !== "anime-title info") return;
    episode = null;

    const target = event.target.parentElement;
    animeId = target.dataset.id;
    const max = target.dataset.max;
    const title = target.querySelector(".anime-title.info").innerText;
    await loadEpisodes(max);
    await loadPlayer({ title });
  });

// Check if episode button is clicked
document
  .querySelector(".episodes-content")
  .addEventListener("click", async (event) => {
    if (event.target.tagName.toLowerCase() !== "button") return;

    episode = event.target.parentElement.dataset.episode;
    const title = document.querySelector(".current .title").innerText;
    await loadPlayer({ title });
  });

let typingTimer;
const doneTypingInterval = 2000;
const inputField = document.querySelector("#animeName");

inputField.addEventListener("keyup", () => {
  clearTimeout(typingTimer);
  if (inputField.value) {
    typingTimer = setTimeout(search, doneTypingInterval);
  }
});
