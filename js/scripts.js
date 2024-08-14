 
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
        document.write(" " pokemonList[i].name + " (Height: " + pokemonList[i].height + " cm)");
    }
 