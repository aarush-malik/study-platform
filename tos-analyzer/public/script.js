document.getElementById('summarize-btn').addEventListener('click', summarizeTOS);

async function summarizeTOS() {
    const tosText = document.getElementById('tos-input').value;

    document.getElementById('loading-indicator').style.display = 'block';

    try {
        const apiResponse = await fetch('/api/summarize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tosText })
        });

        const data = await apiResponse.json();
        document.getElementById('loading-indicator').style.display = 'none';
        document.getElementById('summary-output').innerText = data.summary || "No summary available.";
        document.getElementById('red-flags-output').innerText = data.red_flags || "No red flags identified.";
    } catch (error) {
        console.error('Error summarizing TOS:', error);
        document.getElementById('loading-indicator').style.display = 'none';
        document.getElementById('summary-output').innerText = "Error summarizing TOS.";
        document.getElementById('red-flags-output').innerText = "";
    }
}
