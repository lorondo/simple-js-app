let pokemonRepository=function(){let t=[];function e(e){t.push(e)}function n(){return t}function o(t){pokemonRepository.loadDetails(t).then(function(){var e,n,o;e=t.name,n="Height: "+10*t.height+"cm",o=t.imgUrl,document.getElementById("modal-pokemon-name").innerText=e,document.getElementById("modal-pokemon-height").innerText=n,document.getElementById("modal-pokemon-image").src=o,$("#pokemonModal").modal("show")})}return{add:e,getAll:n,addListItem:function t(e){let n=document.querySelector(".pokemon-list"),i=document.createElement("li");i.classList.add("list-group-item");let r=document.createElement("button");r.innerText=e.name,r.classList.add("pokemon-button","btn","btn-primary"),r.setAttribute("data-toggle","modal"),r.setAttribute("data-target","#pokemonModal"),i.appendChild(r),n.appendChild(i),r.addEventListener("click",function(){o(e)})},showDetails:o,loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:function t(e){return fetch(e.detailsUrl).then(function(t){return t.json()}).then(function(t){e.imgUrl=t.sprites.front_default,e.height=t.height}).catch(function(t){console.error(t)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});