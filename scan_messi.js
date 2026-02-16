import https from 'https';

const names = ["MESSI", "MESSIPLAYER", "MESSITV", "MESSITVPLAYER", "MESSI_IPTV", "MESSI_APP"];

const check = (name) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/logos/${name}.png`;
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
