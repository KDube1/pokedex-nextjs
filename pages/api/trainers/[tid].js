import { connectToDatabase } from "../../../lib/mongodb";
var ObjectId = require('mongodb').ObjectID;
export default async function handleTID(req, res) {
    const { db } = await connectToDatabase();
    const {
        query: { tid },
    } = req
    if (req.method === 'GET') {
        const trainers = await db
            .collection("trainers")
            .find({ "_id": ObjectId(tid.toString()) })
            .toArray();
        res.json(trainers[0]);
    }

    if (req.method === 'PUT') {
        const trainers = await db
            .collection("trainers")
            .updateOne({ "_id": ObjectId(tid.toString()) }, {$set: {pokemon: req.body.pokemon}})
            .then(() => res.json('Trainer updated!'))
         .catch(err => res.status(400).json('Error: ' + err));
  
    }

};