import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

// Mapping specified current targets
const targets = [
    { id: "abeplayer", url: "https://backend.ibosol.com/storage/logos/abeplaye.png" },
    { id: "ibopro", url: "https://backend.ibosol.com/storage/logos/IBOAPP.png" },
    { id: "allplayer", url: "https://backend.ibosol.com/storage/logos/alltvplayer.png" }
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }).on('error', reject);
    });
};

const run = async () => {
    console.log('--- Downloading User-Specified App Icons ---');
    for (const t of targets) {
        try {
            const success = await download(t.url, path.join(dir, `${t.id}.png`));
            if (success) {
                console.log(`[✅] SUCCESS: ${t.id} downloaded from ${t.url}`);
            } else {
                console.log(`[❌] FAILED: ${t.id} (URL: ${t.url})`);
            }
        } catch (e) {
            console.log(`[❌] ERROR for ${t.id}: ${e.message}`);
        }
    }
    console.log('--------------------------------------------');
};

run();
