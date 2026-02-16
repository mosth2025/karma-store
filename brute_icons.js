import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

const baseNames = [
    "SMARTONE", "ORA", "SMARTERS", "HOTPLAYER", "CR7", "BOBPRO", "BOBPLAYER",
    "DUPLEX", "FLIXNET", "HUSH", "KING4K", "IBOXX", "MACPLAYER", "VU_PRO",
    "ABEPLAYER", "VU_PRO", "VUPRO", "SMARTONE_PRO"
];

const checkAndDownload = (name) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/logos/${name}.png`;
        const dest = path.join(dir, `${name.toLowerCase()}.png`);

        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`[🎯] FOUND: ${name}.png`);
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
};

const run = async () => {
    const guesses = new Set();
    baseNames.forEach(b => {
        guesses.add(b);
        guesses.add(b + "APP");
        guesses.add(b + "PLAYER");
        guesses.add(b.slice(0, 8)); // Like abeplaye
        guesses.add(b.slice(0, 7));
    });

    console.log(`Attempting ${guesses.size} variations...`);
    for (const g of guesses) {
        await checkAndDownload(g);
    }
    console.log('--- Brute force finished ---');
};

run();
