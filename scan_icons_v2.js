import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

const variations = [
    // Existing ones that failed or need checking
    "MAC_PLAYER", "MACPLAYER", "MAC-PLAYER",
    "VIRGINIA", "VIRGINIA_PLAYER",
    "ALL_PLAYER", "ALLPLAYER", "ALLPLAYER_IBO",
    "HUSH_PLAY", "HUSHPLAY", "HUSH_PLAYER",
    "KTNPLAYER", "KTN_PLAYER",
    "FAMILYPLAYER", "FAMILY_PLAYER",
    "IBOSSPLAYER", "IBO_SS_PLAYER",
    "KING4KPLAYER", "KING_4K_PLAYER",
    "IBOSTB", "IBO_STB",
    "IBOXXPLAYER", "IBOXX_PLAYER",
    "DUPLEX", "DUPLEX_PLAYER",
    "BOB_PRO", "BOBPRO", "BOB_PLAYER",
    "BOB_PREMIUM", "BOBPREMIUM",
    "IBOSOLPLAYER", "IBO_SOL_PLAYER",
    "FLIXNET", "FLIX_NET",
    "SMARTONE", "SMARTONEIPTV", "SMART_ONE", "SMARTONE_PRO",
    "ORA", "ORA_PLAYER",
    "SMARTERS", "SMARTERS_PLAYER", "IPTV_SMARTERS",
    "IBO_PRO", "IBOPRO", "IBO_PRO_APP", "IBOPROAPP",
    "HOT_PLAYER", "HOTPLAYER",
    "CR7", "CR7_PLAYER",
    "VU_PRO", "VUPRO",
    "ABEPLAYER", "ABEPLAYERTV",
    "BOB_PLAYER", "BOBPLAYER"
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
                    console.log(`[✅] DOWNLOADED: ${name}.png`);
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
};

const run = async () => {
    console.log('--- SCANNING ALL VARIATIONS ---');
    for (const name of variations) {
        await checkAndDownload(name);
    }
    console.log('--- SCAN FINISHED ---');
};

run();
