import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

const apps = [
    { id: "macplayer", kw: ["MAC", "MACPLAYER", "MAC_PLAYER", "MACAPP", "MAC_APP"] },
    { id: "smartone", kw: ["SMARTONE", "SMARTONE_IPTV", "SMARTONEPLUS", "SMARTONE_PRO", "SMARTONE_APP"] },
    { id: "ora", kw: ["ORA", "ORA_PLAYER", "ORA_PRO", "ORA_APP", "ORAPLAYER"] },
    { id: "smarters", kw: ["SMARTERS", "SMARTERS_PLAYER", "IPTV_SMARTERS", "SMARTERS_APP"] },
    { id: "hotplayer", kw: ["HOT", "HOTPLAYER", "HOT_PLAYER", "HOT_APP", "HOTPLAYER_APP"] },
    { id: "cr7", kw: ["CR7", "CR7PLAYER", "CR7_PLAYER", "CR7_APP"] },
    { id: "duplex", kw: ["DUPLEX", "DUPLEXPLAY", "DUPLEX_PLAYER", "DUPLEX_APP"] },
    { id: "bobpro", kw: ["BOB", "BOBPRO", "BOB_PRO", "BOB_PLAYER", "BOB_APP", "BOBPLAYER"] },
    { id: "hushplay", kw: ["HUSH", "HUSHPLAY", "HUSH_PLAY", "HUSH_APP"] },
    { id: "allplayer", kw: ["ALL", "ALLPLAYER", "ALL_PLAYER", "ALL_APP"] },
    { id: "king4kplayer", kw: ["KING", "KING4K", "KING_4K", "KING_PLAYER", "KING4K_PLAYER"] },
    { id: "iboxxplayer", kw: ["IBOXX", "IBOXXPLAYER", "IBOXX_APP", "IBOXX_PRO"] },
];

const extensions = ["png", "jpg", "jpeg", "svg"];

const checkAndDownload = (id, keyword, ext) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/logos/${keyword.toUpperCase()}.${ext}`;
        const dest = path.join(dir, `${id}.${ext}`);

        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`[🚀] FOUND: ${keyword}.${ext} for ${id}`);
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
};

const run = async () => {
    console.log('--- STARTING SUPER SCAN (Multi-Extension & Multi-Suffix) ---');
    for (const app of apps) {
        let found = false;
        for (const ext of extensions) {
            for (const kw of app.kw) {
                if (await checkAndDownload(app.id, kw, ext)) {
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
    }
    console.log('--- SUPER SCAN FINISHED ---');
};

run();
