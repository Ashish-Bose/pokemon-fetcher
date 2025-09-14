const pokemonNameInput = document.getElementById('pokemon-name');
const fetchBtn = document.getElementById('fetch-btn');
const randomBtn = document.getElementById('random-btn');
const pokemonInfoDiv = document.getElementById('pokemon-info');

async function fetchPokemon(nameOrId) {
    try {
        pokemonInfoDiv.innerHTML = '<p>Loading...</p>';
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokémon not found! Try another name.');
        }
        const data = await response.json();
        
        pokemonInfoDiv.innerHTML = `
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Height:</strong> ${data.height / 10} m</p>
            <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
            <p><strong>Abilities:</strong> ${data.abilities.map(a => a.ability.name).join(', ')}</p>
        `;
    } catch (error) {
        pokemonInfoDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

fetchBtn.addEventListener('click', () => {
    const name = pokemonNameInput.value.trim();
    if (!name) {
        pokemonInfoDiv.innerHTML = '<p class="error">Please enter a Pokémon name!</p>';
        return;
    }
    fetchPokemon(name);
});

randomBtn.addEventListener('click', () => {
    const randomId = Math.floor(Math.random() * 1000) + 1; // ~1000 Pokémon exist
    fetchPokemon(randomId);
});
