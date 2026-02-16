import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, 'public', 'apps-icons');

const targets = [
    { id: "messi", names: ["MESSI", "MESSIPLAYER", "MESSI_PLAYER"] },
    { id: "ibovpn", names: ["IBOVPN", "IBO_VPN", "IBO_VPN_PLAYER", "VPNPLAYER"] }
];

const checkAndDownload = (id, name) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/logos/${name.toUpperCase()}.png`;
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const dest = path.join(dir, `${id}.png`);
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`[🎯] FOUND: ${url} for ${id}`);
                    resolve(true);
                });
            } else {
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
};

const run = async () => {
    for (const t of targets) {
        let found = false;
        for (const name of t.names) {
            if (await checkAndDownload(t.id, name)) {
                found = true;
                break;
            }
        }
        if (!found) console.log(`[❌] Not found: ${t.id}`);
    }
};

run();
