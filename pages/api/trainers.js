import { connectToDatabase } from "../../lib/mongodb";

export default async function handleTrainers(req, res) {
    const { db } = await connectToDatabase();
    if (req.method === 'GET') {
        const trainers = await db
            .collection("trainers")
            .find({})
            .toArray();
        res.json(trainers);
    }

    if (req.method === 'POST') {

            const trainerAdd = await db.collection("trainers").insertOne({
                name: req.body.name,
                hometown: req.body.hometown,
                pokemon: req.body.pokemon
            }).then(() => res.json('Trainer added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        }
};