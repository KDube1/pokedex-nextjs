import {createMocks} from 'node-mocks-http'
import handleTrainers from '../pages/api/trainers'
import handleTID from '../pages/api/trainers/[tid]'

export async function getAllPokemonNames() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=800");
  response = await response.json();

  return response.results.map(pokemon => {
    return {
      params: {
        name: pokemon.name
      }
    }
  })
}

export async function getAllTrainerID() {

  const {req, res} = createMocks({
    method: 'GET',
    query: {
    }
  });

await(handleTrainers(req,res))

let data = JSON.parse(res._getData());
  return data.map(trainer => {
    return {
      params: {
        trainer: trainer._id.toString()
      }
    }
  })
}

export async function getEntryData(name) {
  const endPoint = 'pokemon/' + name;

  let pokedexEntry = await fetch(`https://pokeapi.co/api/v2/${endPoint}`)
  pokedexEntry = await pokedexEntry.json();

  let ability = pokedexEntry.abilities[0].ability.name;

  let sprite = pokedexEntry.sprites.front_default;

  let type = Object.values(pokedexEntry.types);
  console.log(type)

  type = type.length == 2 ? type[0].type.name + " and " + type[1].type.name : type[0].type.name


  return {
    name,
    ability,
    sprite,
    type
  }
}

export async function getTrainerData(id) {

  const {req, res} = createMocks({
    method: 'GET',
    query: {
      tid:id
    }
  });

await(handleTID(req,res))

let trainerData = JSON.parse(res._getData());


let name = trainerData.name
let hometown =trainerData.hometown;
let pokemonArray = trainerData.pokemon;

  return {
    name,
    hometown,
    pokemonArray
  }
}