import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

// Confirmed map based on manual/auto check
const confirmedApps = [
    { id: "macplayer", urlName: "MAC_PLAYER" },
    { id: "virginia", urlName: "VIRGINIA" },
    { id: "allplayer", urlName: "ALL_PLAYER" },
    { id: "hushplay", urlName: "HUSH_PLAY" },
    { id: "ktnplayer", urlName: "KTNPLAYER" },
    { id: "familyplayer", urlName: "FAMILYPLAYER" },
    { id: "ibossplayer", urlName: "IBOSSPLAYER" },
    { id: "king4kplayer", urlName: "KING4KPLAYER" },
    { id: "ibostb", urlName: "IBOSTB" },
    { id: "iboxxplayer", urlName: "IBOXXPLAYER" },
    { id: "duplex", urlName: "DUPLEX" },
    { id: "bobpro", urlName: "BOB_PRO" },
    { id: "bobpremium", urlName: "BOB_PREMIUM" },
    { id: "ibosolplayer", urlName: "IBOSOL_PLAYER" },
    { id: "flixnet", urlName: "FLIX_NET" },
    { id: "smartone", urlName: "SMARTONEIPTV" },
    { id: "ora", urlName: "ORA_PLAYER" },
    { id: "smarters", urlName: "SMARTERS_PLAYER" },
    { id: "ibopro", urlName: "IBO_PRO_APP" },
    { id: "hotplayer", urlName: "HOT_PLAYER" },
    { id: "cr7", urlName: "CR7_PLAYER" },
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Status ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => reject(err));
        });
    });
};

const run = async () => {
    console.log('--- Downloading Confirmed Icons ---');
    for (const app of confirmedApps) {
        const url = `https://backend.ibosol.com/storage/logos/${app.urlName}.png`;
        const dest = path.join(dir, `${app.id}.png`);
        try {
            await download(url, dest);
            console.log(`[✅] Done: ${app.id}.png`);
        } catch (err) {
            console.log(`[❌] Failed: ${app.id}.png (${url}) - ${err.message}`);
        }
    }
    console.log('--- Finished ---');
};

run();
