import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

const apps = [
    { id: "macplayer", kw: ["MAC", "MACPLAYER", "MACAPP", "MACPLAYERAPP"] },
    { id: "smartone", kw: ["SMARTONE", "SMARTONEAPP", "SMARTONEIPTV", "SMARTONE_IPTV"] },
    { id: "ora", kw: ["ORA", "ORAAPP", "ORAPLAYER", "ORAPLAYERAPP"] },
    { id: "smarters", kw: ["SMARTERS", "SMARTERSAPP", "SMARTERSPLAYER", "SMARTERS_PLAYER"] },
    { id: "hotplayer", kw: ["HOT", "HOTPLAYER", "HOTAPP", "HOTPLAYERAPP"] },
    { id: "cr7", kw: ["CR7", "CR7APP", "CR7PLAYER", "CR7PLAYERAPP"] },
    { id: "duplex", kw: ["DUPLEX", "DUPLEXAPP", "DUPLEXPLAYER", "DUPLEXPLAY"] },
    { id: "bobpro", kw: ["BOBPRO", "BOBAPP", "BOBPLAYER", "BOBPROAPP"] },
    { id: "hushplay", kw: ["HUSH", "HUSHAPP", "HUSHPLAY", "HUSHPLAYER"] },
    { id: "allplayer", kw: ["ALL", "ALLAPP", "ALLPLAYER", "ALLPLAYERAPP"] },
    { id: "king4kplayer", kw: ["KING4K", "KING4KAPP", "KING4KPLAYER", "KING_4K"] },
    { id: "iboxxplayer", kw: ["IBOXX", "IBOXXAPP", "IBOXXPLAYER"] },
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
                    console.log(`[🎯] FOUND: ${keyword}.png -> ${id}.png`);
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
};

const run = async () => {
    console.log('--- RE-SCANNING WITH "APP" SUFFIX ---');
    for (const app of apps) {
        let found = false;
        for (const kw of app.kw) {
            if (await checkAndDownload(app.id, kw)) {
                found = true;
                break;
            }
        }
    }
    console.log('--- SCAN COMPLETE ---');
};

run();
