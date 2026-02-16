import https from 'https';

const subdomains = ["backend", "store", "www"];
const names = ["SMARTONE", "ORA", "SMARTERS", "CR7", "HOTPLAYER", "IBOPRO", "BOBPRO", "MACPLAYER", "VIRGINIA", "KTNPLAYER", "FAMILYPLAYER", "IBOSSPLAYER"];

const check = (sub, name) => {
    return new Promise((resolve) => {
        const url = `https://${sub}.ibosol.com/storage/logos/${name}.png`;
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`[FOUND]: ${url}`);
            }
            resolve();
        }).on('error', () => resolve());
    });
};

const run = async () => {
    for (const sub of subdomains) {
        for (const name of names) {
            await check(sub, name);
        }
    }
};

run();
