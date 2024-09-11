let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

    function showModal(title, text, img) {
        // Update modal content with Pokémon details
    document.getElementById('modal-pokemon-name').innerText = title;
    document.getElementById('modal-pokemon-height').innerText = text;
    document.getElementById('modal-pokemon-image').src = img;

    // Use Bootstrap's modal show method to ensure modal opens correctly
    $('#pokemonModal').modal('show');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });
    
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let newElement = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        
        listItem.classList.add('list-group-item');
        
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        
        button.classList.add('pokemon-button', 'btn', 'btn-primary');
        
        // Add Bootstrap's data-toggle and data-target attributes for modal functionality
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');  // Target the Bootstrap modal

        listItem.appendChild(button);
        newElement.appendChild(listItem);

        // Add event listener to populate modal when button is clicked
        button.addEventListener('click', function() {
        showDetails(pokemon); // Populate modal with Pokémon details
    });
}

    function showDetails(pokemon) {
    // Populate the modal with Pokémon data when a list item is clicked
        showModal(
            pokemon.name, 
            'Height: ' + pokemon.height * 10 + 'cm', 
            pokemon.imgUrl
        );
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
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });

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

