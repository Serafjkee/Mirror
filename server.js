const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const WORKER_URL = 'https://subs.hifi91.workers.dev';

app.get('/', async (req, res) => {
    try {
        const response = await fetch(WORKER_URL);
        if (!response.ok) {
            return res.status(response.status).send(`Worker error: ${response.statusText}`);
        }
        const data = await response.text();

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
        res.setHeader('Subscription-Userinfo', 'upload=0; download=0; total=1073741824000; expire=0');

        return res.send(data.trim());
    } catch (err) {
        return res.status(500).send(`Failed to fetch from worker: ${err.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Proxy running on port ${PORT}`);
});
