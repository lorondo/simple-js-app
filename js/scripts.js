let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer = document.querySelector('#modal-container');

    function showModal(title, text, img) {
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal', 'fade', 'show');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('role', 'dialog');

        let modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        modalDialog.setAttribute('role', 'document');

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('close');
        closeButtonElement.innerHTML = '&times;';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h5');
        titleElement.classList.add('modal-title');
        titleElement.innerText = title;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);

        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        let imageElement = document.createElement("img");
        imageElement.setAttribute("src", img);
        imageElement.setAttribute("width", "304");
        imageElement.setAttribute("height", "228");
        imageElement.setAttribute("alt", "The pokemon image");

        modalBody.appendChild(contentElement);
        modalBody.appendChild(imageElement);
        
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);

        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
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
        listItem.appendChild(button);
        newElement.appendChild(listItem);

        button.addEventListener('click', function() {
            showDetails(pokemon);
          });
    }

    function showDetails(pokemon) {
        showModal(pokemon.name, 'Height: ' + pokemon.height * 10 + 'cm', pokemon.imgUrl)
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

