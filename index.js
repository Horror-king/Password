const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const apiKey = 'Ot28mMZlv6k4ttzYvKAA0Q==gsjSjZUAsL2qGe3O'; // Replace with your API key from API Ninjas

app.get('/generate-password', async (req, res) => {
    const length = req.query.length || 10; // Default length is 10 if not specified

    try {
        const response = await axios.get(`https://api.api-ninjas.com/v1/passwordgenerator?length=${length}`, {
            headers: { 'X-Api-Key': apiKey }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate password' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
