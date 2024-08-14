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
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height => 200) { //checks height and adds additional statement if they are tall
        document.write(pokemonList[i].name + " (Height: " + pokemonList[i].height + " cm) - Wow, that's big!")
    } else {
        document.write(pokemonList[i].name + " (Height: " + pokemonList[i].height + " cm) ");
    }
        
}
 