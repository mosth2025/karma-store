import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

const names = [
    "IBO", "IBOAPP", "IBOPRO", "BOB", "BOBAPP", "BOBPLAYER", "BOBPRO", "MAC", "MACAPP", "MACPLAYER", "MAC_PLAYER",
    "SMARTONE", "SMARTONEAPP", "ORA", "ORAAPP", "ORAPLAYER", "SMARTERS", "SMARTERSAPP", "SMARTERSPLAYER",
    "CR7", "CR7APP", "CR7PLAYER", "HOT", "HOTAPP", "HOTPLAYER", "DUPLEX", "DUPLEXAPP", "DUPLEXPLAYER",
    "FLIX", "FLIXNET", "FLIXAPP", "HUSH", "HUSHPLAY", "HUSHAPP", "VIRGINIA", "KTN", "KTNPLAYER", "FAMILY", "FAMILYPLAYER"
];

const check = (name) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/logos/${name.toUpperCase()}.png`;
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`[FOUND]: ${url}`);
                // Download it as its likely name
                const dest = path.join(dir, `${name.toLowerCase()}.png`);
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => file.close(resolve));
            } else {
                resolve();
            }
        }).on('error', () => resolve());
    });
};

const run = async () => {
    console.log('--- SIMPLE NAME SCAN ---');
    for (const name of names) {
        await check(name);
    }
    console.log('--- COMPLETE ---');
};

run();
