import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'public', 'apps-icons');

const baseNames = [
    "MACPLAYER", "HUSHPLAY", "IBOXXPLAYER", "DUPLEX", "BOBPRO", "BOBPREMIUM",
    "IBOSOLPLAYER", "SMARTONE", "SMARTONEPRO", "ORA", "SMARTERS", "HOTPLAYER", "CR7"
];

const checkAndDownload = (name) => {
    return new Promise((resolve) => {
        // Try logos and app_logos folders
        const folders = ["logos", "app_logos"];
        let tried = 0;

        folders.forEach(folder => {
            const url = `https://backend.ibosol.com/storage/${folder}/${name}.png`;
            https.get(url, (res) => {
                if (res.statusCode === 200) {
                    const file = fs.createWriteStream(path.join(dir, `${name.toLowerCase()}.png`));
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`[🎯] FOUND: ${url}`);
                        resolve(true);
                    });
                } else {
                    tried++;
                    if (tried === folders.length * 2) resolve(false); // *2 because of case variations below
                }
            }).on('error', () => {
                tried++;
                if (tried === folders.length * 2) resolve(false);
            });

            // Also try lowercase
            const urlLower = `https://backend.ibosol.com/storage/${folder}/${name.toLowerCase()}.png`;
            https.get(urlLower, (res) => {
                if (res.statusCode === 200) {
                    const file = fs.createWriteStream(path.join(dir, `${name.toLowerCase()}.png`));
                    res.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log(`[🎯] FOUND: ${urlLower}`);
                        resolve(true);
                    });
                } else {
                    tried++;
                    if (tried === folders.length * 2) resolve(false);
                }
            }).on('error', () => {
                tried++;
                if (tried === folders.length * 2) resolve(false);
            });
        });
    });
};

const run = async () => {
    console.log('--- FINAL BRUTE FORCE SCAN ---');
    for (const name of baseNames) {
        await checkAndDownload(name);
    }
    console.log('--- COMPLETED ---');
};

run();
