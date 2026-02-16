import https from 'https';

const folders = ["logos", "apps", "icons", "storage", "images"];
const apps = ["SMARTONE", "ORA", "SMARTERS", "IBOPRO", "BOBPLAYER", "MACPLAYER", "CR7", "HOTPLAYER", "DUPLEX"];

const check = (folder, name) => {
    return new Promise(async (resolve) => {
        const variations = [name.toLowerCase(), name.toUpperCase(), name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()];
        for (const v of variations) {
            const url = `https://backend.ibosol.com/storage/${folder}/${v}.png`;
            const status = await new Promise(res => {
                https.get(url, r => res(r.statusCode)).on('error', () => res(0));
            });
            if (status === 200) {
                console.log(`[FOUND]: ${url}`);
                resolve(true);
                return;
            }
        }
        resolve(false);
    });
};

const run = async () => {
    for (const folder of folders) {
        for (const app of apps) {
            await check(folder, app);
        }
    }
};

run();
