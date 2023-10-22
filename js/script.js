let pokemonFront = document.querySelector('.pokemonFront');
let pokemonBack = document.querySelector('.pokemonBack');
let infos = document.querySelector('.infos');
let abilities = document.querySelector('.abilities');
let nbPokemons = 21;
let pokemonList = document.querySelector('.pokemonList');

// fetch : envoie une requête GET à l'URL spécifiée, qui est l'API PokeAPI pour obtenir les informations du Pokémon avec un certain id (par exemple id=13)
// .then((response) => response.json()): Cette partie du code traite la réponse de la requête. Une fois que la réponse est reçue, elle est transformée en objet JSON en utilisant la méthode .json().
// 
fetch("https://pokeapi.co/api/v2/pokemon/13")
.then( (response) => response.json())
.then((data) => {
    console.log(data)
    // mise à jour de pokemonFront (image du pokemon de face)
    pokemonFront.src = data.sprites.front_default;
    // mise à jour de pokemonBack (image du pokemon de dos)
    pokemonBack.src = data.sprites.back_default;

    // met à jour le contenu HTML de l'élément ayant l'ID infos avec les informations du Pokémon, y compris le nom, la taille (height) et l'expérience de base (base_experience).
    infos.innerHTML = "Name : " + data.name + "<br>"
        + "Height : " + data.height + "<br>"
        + "Base experience : " + data.base_experience + "<br>";

    // parcourt les capacités (abilities) du Pokémon et les ajoute à l'élément HTML ayant l'ID abilities.
    data.abilities.forEach((element) => {
        abilities.innerHTML += element.ability.name + "<br>"
    })
})
// capture et gère les erreurs éventuelles lors de la requête. Si une erreur se produit, elle est affichée dans la console.
.catch( (error) => console.log(error));


// liste des 20 premiers pokemons
for (let index = 1; index < nbPokemons; index++) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + index)
    .then( (response) => response.json())
    .then((data) => {
        console.log(data)
        
        // Créer un élément de liste pour chaque Pokémon
        let listItem = document.createElement('li');
        listItem.textContent = data.name;

        // Ajouter l'élément de liste à la liste des Pokémon
        pokemonList.appendChild(listItem);
        
    })
    .catch( (error) => console.log(error))
}


// afficher la liste des pokemons avec pour chaque, leur image de face, leur nom et leur base_experience

let pokemonListImg = document.querySelector('.pokemonListImg');

for (let index = 1; index < nbPokemons; index++) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + index)
    .then( (response) => response.json())
    .then((data) => {
        console.log(data)
        
        // Créer un élément de liste pour chaque Pokémon
        let listItem = document.createElement('div');
        listItem.className = 'pokemon-item';

        // Créer une image pour le Pokémon
        let image = document.createElement('img');
        image.className = 'pokemon-image';
        image.src = data.sprites.front_default;
        image.alt = data.name;

        // Créer un paragraphe pour le nom et la base_experience
        let nameParagraph = document.createElement('p');
        nameParagraph.textContent = data.name;
        nameParagraph.classList.add('pokemon-name'); // Ajoutez la classe CSS au paragraphe du nom

        let baseExpParagraph = document.createElement('p');
        baseExpParagraph.textContent = "Base XP : " + data.base_experience;

        // Ajouter l'image et les paragraphes à l'élément de liste
        // méthode 'appendChild' pour spécifier l'élément enfant que l'on souhaite ajouter et l'ajouter à l'élément parent (div ou ul)
        listItem.appendChild(image);
        listItem.appendChild(nameParagraph);
        listItem.appendChild(baseExpParagraph);

        // Ajoutez la classe CSS du type du Pokémon (par exemple, "eau")
        // Vous pouvez ajuster cette logique en fonction des données de l'API
        let type = data.types[0].type.name; // Supposons que le premier type est le type principal
        listItem.classList.add("pokemon-" + type);

        // Ajouter l'élément de liste à la liste des Pokémon
        pokemonListImg.appendChild(listItem);
        
    })
    .catch( (error) => console.log(error))
}