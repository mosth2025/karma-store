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
    "ABEPLAYER", "ALLPLAYER", "HUSHPLAY", "IBO", "BOB", "FLIX", "FAMILY", "KTN", "VIRGINIA"
];

const folders = ["logos", "app_logos"];

const checkAndDownload = (id, name, folder) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/${folder}/${name}.png`;
        const dest = path.join(dir, `${id.toLowerCase()}.png`);

        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`[🎯] FOUND in ${folder}: ${name}.png (Mapped to ${id})`);
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
};

const run = async () => {
    const guesses = [];
    baseNames.forEach(b => {
        const variations = [
            b, b + "APP", b + "PLAYER", b + "_PLAYER", b + "PRO",
            b.toUpperCase(), b.toLowerCase(),
            b.slice(0, 8), b.slice(0, 7)
        ];
        variations.forEach(v => {
            folders.forEach(f => {
                guesses.push({ id: b, name: v, folder: f });
            });
        });
    });

    console.log(`🚀 Scanning ${guesses.length} variations across logos and app_logos...`);
    for (const g of guesses) {
        // Only skip if file exists and is not a tiny placeholder
        const dest = path.join(dir, `${g.id.toLowerCase()}.png`);
        if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) continue;

        await checkAndDownload(g.id, g.name, g.folder);
    }
    console.log('🏁 Scan finished.');
};

run();
