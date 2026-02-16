import https from 'https';

const dirs = ["logos", "apps", "icons", "images", "storage"];
const names = ["BOBPRO", "SMARTONE", "MACPLAYER", "ORA", "SMARTERS", "CR7", "HOTPLAYER"];

const check = (dir, name) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/${dir}/${name}.png`;
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`[FOUND]: ${url}`);
            }
            resolve();
        }).on('error', () => resolve());
    });
};

const run = async () => {
    for (const dir of dirs) {
        for (const name of names) {
            await check(dir, name);
        }
    }
};

run();
