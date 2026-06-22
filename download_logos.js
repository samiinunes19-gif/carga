const https = require('https');
const fs = require('fs');

const urls = [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/TIM_logo_2016.svg/512px-TIM_logo_2016.svg.png', dest: 'tim2016.png' },
    { url: 'https://logodownload.org/wp-content/uploads/2014/02/tim-logo.png', dest: 'tim-classic.png' }
];

urls.forEach(item => {
    const file = fs.createWriteStream(item.dest);
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, response => {
        response.pipe(file);
    }).on('error', err => {
        console.error(err);
    });
});
