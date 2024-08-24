let pokemonRepository = (function() {
    let pokemonList = [
        {
            name: 'Bulbasaur', 
            height: 71.12, //in cm
            types: ['grass', 'poison']
        },
        {
            name: 'Ivysaur', 
            height: 99.06, //in cm
            types: ['grass', 'poison']
        },
        {
            name: 'Venusaur', 
            height: 200.66, //in cm
            types: ['grass', 'poison']
        }
    ];
    
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
        console.log(pokemon.name);
    }

    return {
        add:add,
        getAll:getAll,
        addListItem,
        showDetails,
    };
})();

pokemonRepository.getAll().forEach(function(pokemon){
   pokemonRepository.addListItem(pokemon);
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