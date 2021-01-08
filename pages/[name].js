import { getEntryData, getAllPokemonNames } from '../lib/entries'
import { Card, CardActionArea, CardMedia, Typography, CardContent, Select, FormControl, MenuItem, InputLabel, TextField, Button, Collapse, IconButton, Grid } from '@material-ui/core';
import Link from 'next/link'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';


export default function Post({ pokemonData }) {
    const [trainerList, setTrainerList] = useState([]);
    const [trainer, setTrainer] = useState('');
    const [pokeName] = useState(pokemonData.name)
    const [idArr, setIdArr] = useState([]);
    const [errorOpen, setErrorOpen] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {

        (async function getTrainers() {
            let response = await axios.get('/api/trainers')

            let arr = [];
            let arr2 = [];
            for (let i = 0; i < response.data.length; i++) {
                arr.push(response.data[i].name);
                arr2.push({ name: response.data[i].name, id: response.data[i]._id, pokemon: response.data[i].pokemon })

            }
            setIdArr(arr2);
            setTrainerList(arr);
            setTrainer(arr[0]);
        })();

    }, [])

    function addPokemonToTrainer(trainer, pokeName) {
        let alreadyOwned = false;
        let index = -1;
        for (let i = 0; i < idArr.length; i++) {
            if (idArr[i].name === trainer.trainer) {
                index = i;
            }
        }

        for (let i = 0; i < idArr[index].pokemon.length; i++) {
            if (pokeName.pokeName === idArr[index].pokemon[i]) {
                alreadyOwned = true;
            }
        }


        if (idArr[index].name == trainer.trainer && !alreadyOwned) {
            let id = idArr[index].id;
            let putArray = idArr[index].pokemon;
            putArray.push(pokeName.pokeName);
            let temporaryObject = idArr;
            temporaryObject.pokemon = putArray;
            setIdArr(temporaryObject);
            console.log(putArray)
            axios.put(`/api/trainers/${id}`, { pokemon: putArray })
                .then(res => console.log(res.data));
                setOpen(true)
        } else {
            setErrorOpen(true);
        }
    }


    return (
        <div>
            <Grid container
                spacing={3}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Card>
                        <CardMedia
                            style={{ height: 300, width:300}}
                            image={pokemonData.sprite}
                            title="Pokemon Sprite"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {pokemonData.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {pokemonData.type}
                            </Typography>

                            <Typography variant="body2" color="textSecondary" component="p">
                                ability: {pokemonData.ability}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <FormControl>
                        <InputLabel >Trainer</InputLabel>
                        <Select

                            value={trainer}
                            onChange={(event) => setTrainer(event.target.value)}
                        >
                            {trainerList.map((trainerName, index) => {
                                return (<MenuItem key={index} value={trainerName}>{trainerName}</MenuItem>);
                            })}
                        </Select>
                    </FormControl>

                    <Button variant="contained" color="primary" style={{ marginTop: "15px", marginLeft: "25px" }} onClick={() => { addPokemonToTrainer({ trainer }, { pokeName }) }}>
                        Add to collection
            </Button>
                </Grid>
                <Grid item xs={12}>
                    
            <Collapse in={errorOpen}>
                <Alert severity="warning"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setErrorOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    That pokemon is already in your collection.
        </Alert>
            </Collapse>

            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    Pokemon Added!
        </Alert>
            </Collapse>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                    <Link href="/">
                        <a>← Back to home </a>
                    </Link>
                    </Typography>
                </Grid>

            </Grid>


        </div>
    )
}


export async function getStaticPaths() {
    const paths = await getAllPokemonNames()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const pokemonData = await getEntryData(params.name)
    return {
        props: {
            pokemonData
        }
    }
}