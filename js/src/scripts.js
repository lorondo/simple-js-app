let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function showModal(title, text, img) {
    document.getElementById('modal-pokemon-name').innerText = title;
    document.getElementById('modal-pokemon-height').innerText = text;
    document.getElementById('modal-pokemon-image').src = img;
    $('#pokemonModal').modal('show');
    }
    
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    
    function getAll() {
        return pokemonList;
    }

    function findByName(name) {
        return pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().startsWith(name.toLowerCase())    
        );
    }

    function addListItem(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() {    
            let newElement = document.querySelector('#pokemon-list');
            let listItem = document.createElement('div');
            listItem.classList.add( 
                'col-lg-3',
                'col-md-4',
                'col-sm-6',
                'mb-4'
            );
            
            let card = document.createElement('div');        
            card.classList.add('card', 'text-center');

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.innerText = pokemon.name;

            let cardImage = document.createElement('img')
            cardImage.classList.add('card-img-top');
            cardImage.src = pokemon.imgUrl;
            cardImage.alt = 'Image of ' + pokemon.name;

            let button = document.createElement('button');
            button.classList.add('btn', 'btn-primary');
            button.innerText = 'More Details';
            
            // Added data-toggle and data-target attributes for modal functionality
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#pokemonModal');  // Targets the Bootstrap modal

            // Event listener to populate modal when button is clicked
            button.addEventListener('click', function() {
                showDetails(pokemon); // Populate modal with Pokémon details
            });
            
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(button);
            card.appendChild(cardImage);
            card.appendChild(cardBody);
            listItem.appendChild(card);
            newElement.appendChild(listItem);
        });
}

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function() { //Loads Pokemon details before showing the modal
        showModal('Name: ' + pokemon.name, 'Height: ' + pokemon.height * 10 + 'cm', pokemon.imgUrl);
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
            item.imgUrl = details.sprites.front_default;
            item.height = details.height;
        }).catch(function (e) {
            console.error(e);
        });

    }

    function pokeSearch() {
        document.querySelector('#myInput').addEventListener('input', function() {
            let searchQuery = this.value.toLowerCase();
            let filteredPokemon = findByName(searchQuery);
            let newElement = document.querySelector('.row');
            newElement.innerHTML = "";
            filteredPokemon.forEach(function (pokemon) {
                addListItem(pokemon);
            });
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        pokeSearch: pokeSearch,
        findByName: findByName
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
    pokemonRepository.pokeSearch();
});

