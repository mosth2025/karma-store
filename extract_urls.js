import https from 'https';

const url = 'https://ibosol.com/login';

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        const regex = /storage\/(logos|app_logos)\/[a-zA-Z0-9._-]+\.png/g;
        const matches = data.match(regex);
        if (matches) {
            console.log('--- FOUND IMAGE URLS ---');
            [...new Set(matches)].forEach(m => console.log(`https://backend.ibosol.com/${m}`));
        } else {
            console.log('No matches found on the page.');
        }
    });
}).on('error', (err) => console.log('Error:', err.message));
