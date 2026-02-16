import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

const apps = [
    "macplayer", "smartone", "ora", "smarters", "ibopro", "hotplayer", "cr7",
    "duplex", "bobpro", "flixnet", "hushplay", "allplayer", "iboxxplayer",
    "king4kplayer", "ibostb", "ibosolplayer", "ktnplayer", "familyplayer",
    "ibossplayer", "virginia"
];

const checkAndDownload = (name) => {
    return new Promise(async (resolve) => {
        const variations = [name.toLowerCase(), name.toUpperCase()];
        let found = false;

        for (const v of variations) {
            const url = `https://backend.ibosol.com/storage/logos/${v}.png`;
            const dest = path.join(dir, `${name}.png`);

            const status = await new Promise(res => {
                https.get(url, r => res(r.statusCode)).on('error', () => res(0));
            });

            if (status === 200) {
                const file = fs.createWriteStream(dest);
                https.get(url, res => {
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`[✅] DONE: ${name}.png (from ${v}.png)`);
                        found = true;
                        resolve(true);
                    });
                });
                break;
            }
        }
        if (!found) resolve(false);
    });
};

const run = async () => {
    console.log('--- SCANNING UPPER/LOWER ---');
    for (const app of apps) {
        await checkAndDownload(app);
    }
    console.log('--- FINISHED ---');
};

run();
