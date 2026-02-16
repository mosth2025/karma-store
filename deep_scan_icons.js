import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

const apps = [
    { id: "macplayer", keywords: ["MAC", "MACPLAYER", "MAC_PLAYER", "MAC_APP"] },
    { id: "smartone", keywords: ["SMARTONE", "SMARTONE_APP", "SMARTONEIPTV", "SMARTONE_PRO"] },
    { id: "ora", keywords: ["ORA", "ORA_PLAYER", "ORA_APP", "ORAPLAYER"] },
    { id: "smarters", keywords: ["SMARTERS", "SMARTERS_PLAYER", "SMARTERS_APP", "IPTV_SMARTERS"] },
    { id: "ibopro", keywords: ["IBOPRO", "IBO_PRO", "IBO_PRO_APP", "IBOAPP", "IBOPRO_PLAYER"] },
    { id: "hotplayer", keywords: ["HOTPLAYER", "HOT_PLAYER", "HOT_APP", "HOTPLAYER_IBO"] },
    { id: "cr7", keywords: ["CR7", "CR7_PLAYER", "CR7_APP", "CR7PLAYER"] },
    { id: "duplex", keywords: ["DUPLEX", "DUPLEX_PLAYER", "DUPLEXAPP", "DUPLEX_IBO"] },
    { id: "bobpro", keywords: ["BOBPRO", "BOB_PRO", "BOB_APP", "BOBPLAYER"] },
    { id: "hushplay", keywords: ["HUSH", "HUSHPLAY", "HUSH_PLAY", "HUSHPLAYER", "HUSH_APP"] },
    { id: "allplayer", keywords: ["ALL", "ALLPLAYER", "ALL_PLAYER", "ALL_APP"] },
    { id: "flixnet", keywords: ["FLIXNET", "FLIX_NET", "FLIXPLAYER", "FLIXAPP"] },
    { id: "king4kplayer", keywords: ["KING4K", "KING4KPLAYER", "KING_4K", "KING_APP"] },
    { id: "iboxxplayer", keywords: ["IBOXX", "IBOXXPLAYER", "IBOXX_APP"] },
    { id: "ibostb", keywords: ["IBOSTB", "IBO_STB", "IBOSTB_APP"] },
];

const checkAndDownload = (id, keyword) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/logos/${keyword.toUpperCase()}.png`;
        const dest = path.join(dir, `${id}.png`);

        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`[✅] SUCCESS for ${id}: ${keyword}.png`);
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
};

const run = async () => {
    console.log('--- STARTING DEEP SCAN (Including APP Suffix) ---');
    for (const app of apps) {
        let found = false;
        console.log(`Searching for ${app.id}...`);
        for (const kw of app.keywords) {
            if (await checkAndDownload(app.id, kw)) {
                found = true;
                break;
            }
        }
        if (!found) console.log(`  [❌] No luck for ${app.id}`);
    }
    console.log('--- DEEP SCAN FINISHED ---');
};

run();
