async function summarizeTOS() {
    const tosText = document.getElementById('tos-input').value;

    // Fetch the API key from environment variables
    const response = await fetch('/get-api-key');
    const apiKeyData = await response.json();
    const apiKey = apiKeyData.apiKey;

    document.getElementById('loading-indicator').style.display = 'block';

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
    document.getElementById('loading-indicator').style.display = 'none';
    document.getElementById('summary-output').innerText = data.summary || "No summary available.";
    document.getElementById('red-flags-output').innerText = data.red_flags || "No red flags identified.";
}
