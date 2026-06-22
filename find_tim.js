const https = require('https');

https.get('https://logodownload.org/tim-logo/', response => {
    let data = '';
    response.on('data', chunk => { data += chunk; });
    response.on('end', () => {
        const matches = data.match(/https:\/\/logodownload\.org\/wp-content\/uploads\/[0-9/a-zA-Z-]*tim-logo[a-zA-Z0-9-]*\.png/g);
        console.log("Matches:", matches ? [...new Set(matches)] : "None");
    });
});
