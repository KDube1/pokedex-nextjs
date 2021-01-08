import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    if (req.method === 'GET') {
        const movies = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .limit(20)
            .toArray();

        res.json(movies);
    }

    if (req.method === 'POST') {
        const userAdd = await db.collection("users").insert({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
};