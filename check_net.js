import https from 'https';

const names = ["SMARTONE", "ORA", "SMARTERS", "CR7", "HOTPLAYER", "IBOPRO", "BOBPRO", "MACPLAYER", "VIRGINIA", "KTNPLAYER", "FAMILYPLAYER", "IBOSSPLAYER"];

const check = (name) => {
    return new Promise((resolve) => {
        const url = `https://ibosol.net/logos/${name}.png`;
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`[FOUND]: ${url}`);
            }
            resolve();
        }).on('error', () => resolve());
    });
};

const run = async () => {
    for (const name of names) {
        await check(name);
    }
};

run();
