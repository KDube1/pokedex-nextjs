import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from "axios";
import { Button, TextField, Collapse, IconButton, Typography, Grid, List, ListItem, ListItemText } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';

export default function AddTrainer() {

    const [trainer, setTrainer] = useState('');
    const [hometown, setHometown] = useState('');
    const [errorOpen, setErrorOpen] = useState(false);
    const [open, setOpen] = useState(false);
    
    function postTrainer() {
        if (trainer.length < 3 || hometown === '') {
            setErrorOpen(true);
        } else {
            let postObj = {
                name: trainer,
                hometown: hometown,
                pokemon: []
            }
            axios.post('/api/trainers', postObj)
                .then(res => console.log(res.data));
                setOpen(true);
        }
    }

    return (
        <div>
            
            <TextField
                style={{ marginTop: "25px" }}
                required
                id="outlined-required"
                label="Name"
                variant="outlined"
                onChange={(event) => setTrainer(event.target.value)}
            />
            <br />
            <TextField
                style={{ marginTop: "25px" }}
                required
                id="outlined-required"
                label="Hometown"
                variant="outlined"
                onChange={(event) => setHometown(event.target.value)}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" style={{ marginTop: "30px" }} onClick={() => { postTrainer() }}>
                Submit
            </Button>
            <Button variant="contained" color="default" style={{ marginTop: "30px" }} onClick={() => { window.location = '/' }}>
                Back
             </Button>

            <Collapse in={errorOpen}>
                <Alert severity="error"
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
                    Error! Invalid Input.
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
                    Trainer Added!
        </Alert>
            </Collapse>

        </div>
    )
}