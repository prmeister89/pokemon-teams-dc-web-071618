const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
  fetchTrainers();
})


function fetchTrainers() {
  fetch('http://localhost:3000/trainers')
  .then((response) => (response.json()))
  .then((json) =>
    json.forEach(trainer => {
      createTrainerCard(trainer)
    }))
}

function addPokemon(trainer_id) {
  fetch('http://localhost:3000/pokemons', {
    method: "POST",
    body: JSON.stringify({
      trainer_id: trainer_id
    }),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then((response) => (response.json()))
  .then((data) => {
    addPokemonToTrainerCard(data)
  }
)}

function deletePokemon(id) {
  fetch(`http://localhost:3000/pokemons/${id}`, {method: "DELETE"})
  .then((response) => (response.json()))
  .then((json) => {
    let li = document.getElementById(`pokemon-${id}`)
    li.remove()
  }
)}

function addPokemonToTrainerCard(data) {
  let liPokemon = document.createElement('li');
  let ulTrainerPokemon = document.querySelector(`#trainerList-${data.trainer_id}`);
  liPokemon.innerText = `${data.nickname} (${data.species})`
  liPokemon.id = `pokemon-${data.id}`
  let releaseButton = document.createElement('button');
  releaseButton.innerText = "Release"
  releaseButton.className = "release"
  releaseButton.id = `button-${data.id}`
  releaseButton.addEventListener('click', function(event){
    deletePokemon(data.id)
  })
  ulTrainerPokemon.appendChild(liPokemon);
  liPokemon.appendChild(releaseButton);
}

function createTrainerCard(trainer) {
  let divCard = document.createElement('div');
  divCard.className = 'card'

  let trainerName = document.createElement('p');
  trainerName.innerText = trainer.name;

  let addPokemonButton = document.createElement('button');
  addPokemonButton.innerText = "Add Pokemon"
  addPokemonButton.id = `trainer-${trainer.id}`

  addPokemonButton.addEventListener('click', function(event) {
    addPokemon(trainer.id)
  })

  let ulTrainerPokemon = document.createElement('ul');
  ulTrainerPokemon.id = `trainerList-${trainer.id}`

  trainer.pokemons.forEach(pokemon => {
    let liPokemon = document.createElement('li');
    liPokemon.innerText = `${pokemon.nickname} (${pokemon.species})`
    liPokemon.id = `pokemon-${pokemon.id}`
    ulTrainerPokemon.appendChild(liPokemon);
    let releaseButton = document.createElement('button');
    releaseButton.innerText = "Release"
    releaseButton.className = "release"
    releaseButton.id = `button-${pokemon.id}`
    releaseButton.addEventListener('click', function(event){
      deletePokemon(pokemon.id)
    })

    liPokemon.appendChild(releaseButton);
  })


  divCard.appendChild(addPokemonButton);
  divCard.appendChild(trainerName);
  divCard.appendChild(ulTrainerPokemon);
  document.querySelector('main').appendChild(divCard)
}
