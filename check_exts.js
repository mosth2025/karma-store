import https from 'https';

const names = [
    "SMARTONEIPTV", "ORA", "SMARTERSPLAYER", "SMARTERS_PLAYER", "IBOPROAPP", "IBO_PRO_APP",
    "HOTPLAYER", "HOT_PLAYER", "CR7", "CR7PLAYER", "CR7_PLAYER", "BOBPLAYER", "BOB_PLAYER",
    "MACPLAYER", "MAC_PLAYER", "VIRGINIA", "VIRGINIA_PLAYER", "ALLPLAYER", "ALL_PLAYER",
    "HUSHPLAY", "HUSH_PLAY", "KTNPLAYER", "FAMILYPLAYER", "IBOSSPLAYER", "KING4KPLAYER",
    "IBOSTB", "IBOXXPLAYER", "DUPLEX", "BOBPRO", "BOBPREMIUM", "IBOSOLPLAYER", "FLIXNET"
];

const check = (name, ext) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/logos/${name}.${ext}`;
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
        await check(name, "png");
        await check(name, "jpg");
        await check(name, "jpeg");
    }
};

run();
