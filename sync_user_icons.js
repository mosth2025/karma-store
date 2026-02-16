import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

// User provided specific URLs
const specificTargets = [
    { id: "abeplayer", url: "https://backend.ibosol.com/storage/logos/abeplaye.png" },
    { id: "ibopro", url: "https://backend.ibosol.com/storage/logos/IBOAPP.png" },
    { id: "allplayer", url: "https://backend.ibosol.com/storage/logos/alltvplayer.png" },
    { id: "ibo_special", url: "https://backend.ibosol.com/storage/app_logos/4GRFiULCCENYopwsv1EblGejclsGwjrWO1bxGsFF.png" }
];

const download = (url, dest) => {
    return new Promise((resolve) => {
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
        }).on('error', () => resolve(false));
    });
};

const run = async () => {
    console.log('--- FINAL SPECIFIC ICON SYNC ---');
    for (const t of specificTargets) {
        const dest = path.join(dir, `${t.id}.png`);
        const success = await download(t.url, dest);
        if (success) {
            console.log(`[🎯] SYNCED: ${t.id} from ${t.url}`);
        } else {
            console.log(`[❌] FAILED: ${t.id}`);
        }
    }
    console.log('--- SYNC FINISHED ---');
};

run();
