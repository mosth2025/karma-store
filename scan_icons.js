import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

const apps = [
    { id: "macplayer", names: ["MACPLAYER", "MAC_PLAYER", "MAC-PLAYER", "IBO_PLAYER"] },
    { id: "virginia", names: ["VIRGINIA", "VIRGINIA_PLAYER"] },
    { id: "allplayer", names: ["ALLPLAYER", "ALL_PLAYER", "ALLPLAYER_IBO"] },
    { id: "hushplay", names: ["HUSHPLAY", "HUSH_PLAY", "HUSHPLAYER"] },
    { id: "ktnplayer", names: ["KTNPLAYER", "KTN_PLAYER"] },
    { id: "familyplayer", names: ["FAMILYPLAYER", "FAMILY_PLAYER", "FAMILY_4K"] },
    { id: "ibossplayer", names: ["IBOSSPLAYER", "IBO_SS_PLAYER", "IBOSS_PLAYER"] },
    { id: "king4kplayer", names: ["KING4KPLAYER", "KING_4K_PLAYER", "KING4K"] },
    { id: "ibostb", names: ["IBOSTB", "IBO_STB", "IBO-STB"] },
    { id: "iboxxplayer", names: ["IBOXXPLAYER", "IBOXX_PLAYER", "IBOXX"] },
    { id: "duplex", names: ["DUPLEX", "DUPLEX_PLAYER", "DUPLEX_IBO"] },
    { id: "bobpro", names: ["BOBPRO", "BOB_PRO", "BOB_PLAYER"] },
    { id: "bobpremium", names: ["BOBPREMIUM", "BOB_PREMIUM", "BOBPREMIUM_PLAYER"] },
    { id: "ibosolplayer", names: ["IBOSOLPLAYER", "IBOSOL_PLAYER", "IBO_SOL_PLAYER", "IBOSOL"] },
    { id: "flixnet", names: ["FLIXNET", "FLIX_NET", "FLIXPLAYER"] },
    { id: "smartone", names: ["SMARTONE", "SMART_ONE", "SMARTONEIPTV"] },
    { id: "ora", names: ["ORA", "ORA_PLAYER", "ORA_IPTV"] },
    { id: "smarters", names: ["SMARTERS", "SMARTERS_PLAYER", "IPTV_SMARTERS"] },
    { id: "ibopro", names: ["IBOPRO", "IBO_PRO", "IBO_PRO_APP", "IBOPRO_PLAYER"] },
    { id: "hotplayer", names: ["HOTPLAYER", "HOT_PLAYER", "HOTPLAYER_IBO"] },
    { id: "cr7", names: ["CR7", "CR7_PLAYER", "CR7_IPTV"] },
];

const checkUrl = (url) => {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
};

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
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
    console.log('--- STARTING ALL-OUT SCAN ---');
    for (const app of apps) {
        let found = false;
        console.log(`Scanning for ${app.id}...`);
        for (const name of app.names) {
            const url = `https://backend.ibosol.com/storage/logos/${name}.png`;
            if (await checkUrl(url)) {
                await download(url, path.join(dir, `${app.id}.png`));
                console.log(`  [✅] FOUND: ${name}.png`);
                found = true;
                break;
            }
        }
        if (!found) {
            // Try common prefix like logos/appname
            const url = `https://backend.ibosol.com/storage/logos/${app.id.toUpperCase()}.png`;
            if (await checkUrl(url)) {
                await download(url, path.join(dir, `${app.id}.png`));
                console.log(`  [✅] FOUND: ${app.id.toUpperCase()}.png`);
                found = true;
            }
        }
        if (!found) console.log(`  [❌] NO LUCK for ${app.id}`);
    }
    console.log('--- SCAN FINISHED ---');
};

run();
