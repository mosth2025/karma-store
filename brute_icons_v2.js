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
    "ABEPLAYER", "VU_PRO", "VUPRO", "SMARTONE_PRO", "ALLPLAYER", "HUSHPLAY",
    "IBO", "BOB", "FLIX", "FAMILY", "KTN", "VIRGINIA", "IBOXX", "IBOSTB", "IBOSS"
];

const checkAndDownload = (id, name) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/logos/${name}.png`;
        const dest = path.join(dir, `${id.toLowerCase()}.png`);

        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`[🎯] FOUND: ${name}.png (Mapped to ${id})`);
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
            b,
            b + "APP",
            b + "PLAYER",
            b + "_PLAYER",
            b + "PRO",
            b.toUpperCase(),
            b.toLowerCase(),
            b.slice(0, 8), // The "abeplaye" pattern
            b.slice(0, 8).toLowerCase(),
            b + "TVPLAYER" // The "alltvplayer" pattern
        ];
        variations.forEach(v => {
            if (!guesses.some(g => g.name === v && g.id === b)) {
                guesses.push({ id: b, name: v });
            }
        });
    });

    console.log(`🚀 Starting brute force with ${guesses.size || guesses.length} variations...`);
    for (const g of guesses) {
        // Skip if we already have it (unless it's a small placeholder)
        const dest = path.join(dir, `${g.id.toLowerCase()}.png`);
        if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) continue;

        await checkAndDownload(g.id, g.name);
    }
    console.log('🏁 Brute force finished.');
};

run();
