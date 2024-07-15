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

// Proxy endpoint to make requests to the Anthropic API
app.use(express.json());

app.post('/api/summarize', async (req, res) => {
    const { tosText } = req.body;
    const apiKey = process.env.ANTHROPIC_API_KEY;

    try {
        const fetch = await import('node-fetch').then(module => module.default);
        const apiResponse = await fetch('https://api.anthropic.com/v1/claude', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: `Please summarize the following Terms of Service and highlight any important points or red flags:\n\n${tosText}`,
                max_tokens: 300 // Adjust as needed
            })
        });

        const data = await apiResponse.json();
        console.log('Full API Response:', JSON.stringify(data, null, 2));  // Log the full response

        if (data.choices && data.choices.length > 0 && data.choices[0].text) {
            res.json({ summary: data.choices[0].text, red_flags: data.red_flags || "No red flags identified." });
        } else {
            res.json({ summary: "No summary available.", red_flags: "No red flags identified." });
        }
    } catch (error) {
        console.error('Error fetching from Anthropic API:', error);
        res.status(500).send('Error fetching from Anthropic API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
