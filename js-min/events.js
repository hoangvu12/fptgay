document.querySelector(".search-results").addEventListener("click",async a=>{if("anime-title info"===a.target.className){episode=null;const b=a.target.parentElement;animeId=b.dataset.id,localStorage[animeId]="{}",latestEpisode=b.dataset.latestEpisode,title=b.querySelector(".anime-title.info").innerText,await loadEpisodes(),await loadPlayer()}}),document.querySelector(".episodes-content").addEventListener("click",async a=>{"button"!==a.target.tagName.toLowerCase()||(episode=a.target.parentElement.dataset.episode,await loadPlayer())});let typingTimer;const doneTypingInterval=2e3,inputField=document.querySelector("#animeName");inputField.addEventListener("keyup",()=>{clearTimeout(typingTimer),inputField.value&&(typingTimer=setTimeout(search,doneTypingInterval))});