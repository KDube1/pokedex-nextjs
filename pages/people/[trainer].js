
import Link from 'next/link'
import { Card, CardActionArea, CardMedia, Typography, CardContent, Grid } from '@material-ui/core';
import  {useRouter} from 'next/router'
import react, {useEffect, useState} from 'react'
import axios from 'axios'

export default function PokemonTrainer(){
   const router = useRouter();
    
    const [trainerData, setTrainerData] = useState({name:"", hometown:"", pokemon:[]});
    
    
    useEffect(()=>{
        (async function trainData(){
            const { trainer } = await router.query;
           let entriesData = await axios.get(`/api/trainers/${trainer}`);
            setTrainerData(entriesData.data);
            console.log(trainerData)
        })();
    },[])
    
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
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {trainerData.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="h3">
                                Hometown: {trainerData.hometown}
                            </Typography>

                             <Typography variant="body2" color="textSecondary" component="p">
                                Pokemon: {trainerData.pokemon.map((poke)=>{
                                    return(
                                      <Typography variant="body2"><Link value={poke}href={`/${poke}`}><a>{poke}</a></Link></Typography>
                                    )
                                })}
                            </Typography> 
                        </CardContent>
                    </Card>
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


/* export async function getStaticPaths() {
    const paths = await getAllTrainerID()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const trainerData = await getTrainerData(params.trainer)
    return {
        props: {
            trainerData
        }
    }
} */