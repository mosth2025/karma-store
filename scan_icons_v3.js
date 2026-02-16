import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

const scribdList = [
    "ABEPLAYERTV", "MACPLAYER", "VIRGINIA", "ALLPLAYER", "HUSHPLAY",
    "KTNPLAYER", "FAMILYPLAYER", "IBOSSPLAYER", "KING4KPLAYER", "IBOSTB",
    "IBOXXPLAYER", "DUPLEX", "BOBPRO", "BOBPREMIUM", "IBOSOLPlayer",
    "FLIXNET", "SMARTONEPRO", "SMARTONE", "ORA", "ORA_PLAYER", "SMARTERS",
    "SMARTERS_PLAYER", "IBO_PRO", "IBOPRO", "IBOPROAPP", "HOTPLAYER",
    "HOT_PLAYER", "CR7", "CR7_PLAYER", "BOB_PLAYER", "BOBPLAYER",
    "IBO_PRO_APP", "MAC_PLAYER", "ALL_PLAYER", "HUSH_PLAY", "KING_4K_PLAYER"
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
                    console.log(`[✅] SUCCESS: ${name}.png`);
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
};

const run = async () => {
    console.log('--- STARTING SCRIBD-BASED SCAN ---');
    for (const name of scribdList) {
        await checkAndDownload(name);
    }
    console.log('--- FINISHED ---');
};

run();
