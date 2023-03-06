import express from 'express';
import createConnection from './connect.js';
import cors from 'cors'

const app = express();
app.use(cors())
const knex = await createConnection();

app.get('/conversion-rates', async (req, res) => {
    const { limit } = req.query;
    const rows = await knex.select().from("conversion_rates").orderBy("id", "desc").limit(parseInt(limit) || 24)
    res.json(rows);
});

app.listen(process.env.PORT || 8080)