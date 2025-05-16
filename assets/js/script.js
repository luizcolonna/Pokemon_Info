const POKEMON = {
    id: null,
    name: '',
    photo: '',
    height: null,
    weight: null,
    types: [],
    abilities: []
};

const QUERY = document.querySelector(".input");

const MINPOKEMONS = 1;
const MAXPOKEMONS = 1025;

async function getPokemon() {


    if (QUERY.value.trim() === "") {
        window.alert("O campo não pode ser vazio.");
        return;
    }

    if (QUERY.value > MAXPOKEMONS || QUERY.value < '1'){
        window.alert(`O ID deve ser entre ${MINPOKEMONS} e ${MAXPOKEMONS}.`);
        return;
    }

    const URL = `https://pokeapi.co/api/v2/pokemon/${QUERY.value.toLowerCase()}`;
    const DATA = await fetch(URL);

    if(!DATA.ok){
        window.alert("Pokemon não encontrado. Tente novamente.");
        return;
    }else{
        const POKEMON_DATA = await DATA.json();
        
        POKEMON.id = POKEMON_DATA.id;
        POKEMON.name = POKEMON_DATA.name;
        POKEMON.photo = POKEMON_DATA.sprites.other.dream_world.front_default;
        POKEMON.height = POKEMON_DATA.height;
        POKEMON.weight = POKEMON_DATA.weight;
        POKEMON.types = POKEMON_DATA.types.map((t)=>t.type.name);
        POKEMON.abilities = POKEMON_DATA.abilities.map((a)=>a.ability.name);     
    }
    
    const pokemonInfoHtml = document.querySelector(".informations");
    

    pokemonInfoHtml.innerHTML = `
    <div class="pokemonInfo">
        <div class="pokemon_title">
            <p>${POKEMON.name}</p>
            <p>#${POKEMON.id}</p>
        </div>

        <img class="pokemon_photo" src="${POKEMON.photo}" alt="${POKEMON.name}">

        <div class="pokemon_detail">
            <p><span class="pokemon_details"> Altura:</span> ${POKEMON.height}</p>
            <p><span class="pokemon_details"> Peso:</span> ${POKEMON.weight}</p>
            <p><span class="pokemon_details"> Tipos:</span> ${POKEMON.types.join(", ")}</p>
            <p><span class="pokemon_details"> Habilidades:</span> ${POKEMON.abilities.join(", ")}</p>
        </div>
    </div>
`;
}
