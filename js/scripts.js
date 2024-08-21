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

pokemonList.forEach(function(pokemon){
    document.write(pokemon.name + " (Height: " + pokemon.height + " cm)<br>");
});

//for (let i = 0; i < pokemonList.length; i++) {
    //if (pokemonList[i].height >= 200) { //checks height and adds additional statement if they are tall
        //document.write(pokemonList[i].name + " (Height: " + pokemonList[i].height + " cm) - Wow, that's big!<br>");
    //} else {
    //    document.write(pokemonList[i].name + " (Height: " + pokemonList[i].height + " cm)<br>");
    //}       
//}

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