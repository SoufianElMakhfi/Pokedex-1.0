let currentIndex = 0; // Startpunkt im Array
const limit = 10; // Anzahl der Pokemon, die gleichzeitig angezeigt werden
let currentPokemonId = 0; // Globale variable zur Speicherung der aktuellen pokemon-IDs
let loadedPokemonIds = new Set();

function init() {
    loadAndDisplayPokemons();
}

const typeToBackgroundColor = {
    'grass': '#87f2a0',
    'fire': '#ff6060',
    'water': '#14bcff',
    'electric': 'yellow',
    'poison': 'purple',
    'ground': 'brown',
    'psychic': 'pink',
    'rock': 'gray',
    'fighting': 'orange',
    'flying': 'skyblue',
    'bug': '#a9ff4f',
    'ghost': '#343541',
    'steel': 'silver',
    'dragon': 'royalblue',
    'dark': 'black',
    'ice': 'lightblue',
    'fairy': 'magenta',
    'normal': 'beige'
};

async function loadAndDisplayPokemons() {
    const url = await fetch("https://pokeapi.co/api/v2/pokemon?limit=99");
    const allCharacters = await url.json();
    let charactersHTML = document.getElementById('pokemon-list');
    let counter = 0;

    for (let i = currentIndex; i < allCharacters.results.length; i++) {
        if (counter >= limit) {
            break;
        }
        let character = allCharacters.results[i];
        let detailsUrl = await fetch(character.url);
        let characterDetails = await detailsUrl.json();

        if (!loadedPokemonIds.has(characterDetails.id)) {
            let typesHTML = getTypesHTML(characterDetails.types);
            displayInnerHtml(charactersHTML, characterDetails, typesHTML, counter);
            loadedPokemonIds.add(characterDetails.id); // fügt die id dem set hinzu damit keine weiteren pokemon geladen werden
            counter++;
        }
    }

    currentIndex += counter;
}

function displayInnerHtml(charactersHTML, characterDetails, typesHTML, counter) {
    charactersHTML.innerHTML += `<div class="container-characters" onclick="showPokemonDetails(${characterDetails.id})" id="pokemon-${characterDetails.id}">
        <div class="container-name">
            ${typesHTML}
            <h3>${characterDetails.name}</h3>
        </div>
        <img class="img" src="${characterDetails.sprites.other['official-artwork'].front_default}">
    </div>`;
    setBackgroundColor(characterDetails);
}


function loadMorePokemons() {
    loadAndDisplayPokemons();
}

function setBackgroundColor(characterDetails) {
    const container = document.getElementById(`pokemon-${characterDetails.id}`);
    const type = characterDetails.types[0].type.name;
    container.classList.add(`bg-${type}`);
}

function getTypesHTML(types) {
    let typesHTML = '';
    types.forEach(type => {
        typesHTML += `<p class="types type-${type.type.name}">${type.type.name}</p>`;
    });
    return typesHTML;
}

function searchPokemons() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const allPokemons = document.getElementsByClassName('container-characters');
    for (let i = 0; i < allPokemons.length; i++) {
        const pokemonName = allPokemons[i].getElementsByClassName('container-name')[0].textContent.toLowerCase();
        if (pokemonName.includes(searchInput)) {
            allPokemons[i].style.display = "";
        } else {
            allPokemons[i].style.display = "none";
        }
    }
}

async function showPokemonDetails(pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    const response = await fetch(url);
    const pokemonDetails = await response.json();
    document.getElementById("popup-image").src = pokemonDetails.sprites.other['official-artwork'].front_default;
    document.getElementById("popup-type").textContent = pokemonDetails.name;
    let typesText = '';
    for (let i = 0; i < pokemonDetails.types.length; i++) {
        typesText += pokemonDetails.types[i].type.name;
        if (i < pokemonDetails.types.length - 1) {
        }}
        currentPokemonId = pokemonId;
    document.getElementById("popup-name").textContent = typesText;
    updateChartWithPokemonData(pokemonDetails);
    document.getElementById("myDIV").style.display = "block";
    document.getElementById("overlay")//.classList.remove("hidden");
}
function updateChartWithPokemonData(pokemonDetails) {
    const desiredStats = ['hp', 'defense', 'special-defense'];     
    let filteredStats = [];
    let filteredStatNames = [];
    let backgroundColors = []; // Für die Hintergrundfarben der chart Balken
    for (let i = 0; i < pokemonDetails.stats.length; i++) {
        if (desiredStats.includes(pokemonDetails.stats[i].stat.name)) {
            filteredStats.push(pokemonDetails.stats[i].base_stat);
            filteredStatNames.push(pokemonDetails.stats[i].stat.name);
            const pokemonType = pokemonDetails.types[0].type.name; //  Farbe des Typs des Pokémon für die chart Balken
            backgroundColors.push(typeToBackgroundColor[pokemonType]);
        }
    }
    myChart.data.labels = filteredStatNames;     // Aktualisiert die Chart-Daten
    myChart.data.datasets[0].data = filteredStats;
    myChart.data.datasets[0].label = pokemonDetails.name;
    myChart.data.datasets[0].backgroundColor = backgroundColors;
    myChart.update();    // Aktualisiert den Chart
}
function closePopup() {
    document.getElementById("myDIV").style.display = "none";
    document.getElementById("overlay")//.classList.add("hidden");
}
function stopPropagation(event) {
    event.stopPropagation();
}
function showNextPokemon(){

}
function showNextPokemon(){
    let nextPokemonId = currentPokemonId + 1;
    showPokemonDetails(nextPokemonId);
}