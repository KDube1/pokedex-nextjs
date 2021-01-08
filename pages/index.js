import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from "axios";
import { Button, TextField, Collapse, IconButton, Typography, Grid, List, ListItem, ListItemText, Grid } from '@material-ui/core';

export default function Home() {

  const [pokemonText, setPokemonText] = useState("");
  const [trainerInfoArray, setTrainerInfoArray] = useState([]);
  let trainerNameArray = [];

  useEffect(() => {
    (async function getTrainers() {
      let trainerInfo = await axios.get("/api/trainers");
      for (let i = 0; i < trainerInfo.data.length; i++) {
        trainerNameArray.push({ name: trainerInfo.data[i].name, id: trainerInfo.data[i]._id })
      }
      setTrainerInfoArray(trainerNameArray)
    })();
  }, [])


  return (
    <div>
      <Typography variant="h2">Enter a pokemon and hit go to view information</Typography>
      <br />
      
      <TextField
        required
        id="outlined-required"
        label="Pokemon"
        variant="outlined"
        onChange={(event) => setPokemonText(event.target.value.toLowerCase())}
      />
      
      <Link href={`/${pokemonText}`}>
        <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
          Go
            </Button>
      </Link>
      <Typography variant="h3" align="center">Trainers</Typography>
      <List>
        {trainerInfoArray.map((trainer) => {
          return (<ListItem><Typography variant="body2"><Link value={trainer.name} href={`/people/${trainer.id}`}><a>{trainer.name}</a></Link></Typography></ListItem>)
        })}
      </List>
      <Typography variant="h3">
        <Link href="/add-trainer">
          <a>Add a trainer </a>
        </Link>
      </Typography>
    </div>
  )
}

/* function DisplayPokemon({ pokemonData }) {

  let pokeNames = pokemonData.results.map(pokemon => pokemon.name);



  return <pre>{JSON.stringify(pokemonData, null, 2)}</pre>
} */