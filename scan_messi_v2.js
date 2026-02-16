import https from 'https';

const folders = ["logos", "app_logos"];
const names = ["MESSI", "MESSIPLAYER", "MESSITV", "MESSITVPLAYER", "MESSITVPRO"];

const check = (folder, name) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/${folder}/${name}.png`;
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`[FOUND]: ${url}`);
            }
            resolve();
        }).on('error', () => resolve());
    });
};

const run = async () => {
    for (const f of folders) {
        for (const n of names) {
            await check(f, n);
            await check(f, n.toLowerCase());
        }
    }
};

run();
