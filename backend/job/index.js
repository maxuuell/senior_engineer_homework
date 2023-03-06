import fetch from "node-fetch";
import createConnection from "./connect.js"

const { API_KEY = "0" } = process.env

const fetchAndUpdateDB = async () => {
    const knex = await createConnection({
        pool: {
            max: 5,
            min: 5,
            createTimeoutMillis: 30000,
            idleTimeoutMillis: 600000,
            createRetryIntervalMillis: 200
        }
    });

    // could paramaterize this with GCF and pub sub
    const baseCurrencyCode = "USD";
    const quoteCurrencyCode = "BRL";

    const response = await fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${baseCurrencyCode}&to=${quoteCurrencyCode}&amount=1`, {
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
        }
    });

    const body = await response.json();

    if (body.status === "success") {
        const row = {
            base_currency_code: body.base_currency_code,
            quote_currency_code: quoteCurrencyCode,
            base_currency_name: body.base_currency_name,
            quote_currency_name: body.rates[quoteCurrencyCode].currency_name,
            rate: parseFloat(body.rates[quoteCurrencyCode].rate),
        }

        await knex('conversion_rates').insert(row)
        knex.destroy();
    }
    console.log("Task Complete")
};

try {
    fetchAndUpdateDB();
} catch (e) {
    console.log(e)
    process.exit(1);
}