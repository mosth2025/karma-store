import https from 'https';

const names = [
    'MACPLAYER', 'MAC_PLAYER', 'VIRGINIA', 'ALLPLAYER', 'ALL_PLAYER', 'HUSHPLAY', 'HUSH_PLAY',
    'KTNPLAYER', 'FAMILYPLAYER', 'IBOSSPLAYER', 'KING4KPLAYER', 'IBOSTB', 'IBOXXPLAYER', 'DUPLEX',
    'BOBPRO', 'BOB_PRO', 'BOBPREMIUM', 'BOB_PREMIUM', 'IBOSOLPLAYER', 'FLIXNET', 'FLIX_NET',
    'SMARTONE', 'SMARTONEIPTV', 'SMART_ONE', 'ORA', 'ORA_PLAYER', 'SMARTERS', 'SMARTERS_PLAYER',
    'IBOPRO', 'IBO_PRO', 'IBO_PRO_APP', 'HOTPLAYER', 'HOT_PLAYER', 'CR7', 'CR7_PLAYER'
];

const check = (name) => {
    return new Promise((resolve) => {
        const url = `https://backend.ibosol.com/storage/logos/${name}.png`;
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                console.log(`[FOUND]: ${name}`);
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
