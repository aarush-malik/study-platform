const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Use dotenv to manage environment variables
require('dotenv').config();

console.log('Environment variables loaded:', process.env.ANTHROPIC_API_KEY);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Endpoint to provide the API key
app.get('/get-api-key', (req, res) => {
    console.log('Received request for API key');
    res.json({ apiKey: process.env.ANTHROPIC_API_KEY });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
