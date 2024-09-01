let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let newElement = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');

        button.addEventListener('click', function (event) {
            showDetails(pokemon);
          });

        listItem.appendChild(button);
        newElement.appendChild(listItem);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(
                pokemon.name,
                'Height: ' + pokemon.height * 10 + 'cm',
                pokemon.imageUrl
            );
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showModal(title, text, img) {
        let modalTitle = document.querySelector('.modal-title');
        let modalText = document.querySelector('#pokemon-height');
        let modalImage = document.querySelector('#pokemon-image');

        modalTitle.innerText = title;
        modalText.innerText = text;
        modalImage.src = img;
    }

    return {
        add:add,
        getAll:getAll,
        addListItem,
        showDetails,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
    });
});

function divide (dividend, divisor){
    if (divisor === 0){
        return "You're trying to divide by zero."
    } else {
        let result = dividend / divisor;
        return result; 
    }   
}

console.log(divide(4, 2));
console.log(divide(7, 0));
console.log(divide(1, 4));
console.log(divide(12, -3));