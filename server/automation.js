const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);
require('dotenv').config();
const path = require('path');

async function humanWait(min = 2000, max = 5000) {
    const delay = Math.floor(Math.random() * (max - min + 1) + min);
    await new Promise(r => setTimeout(r, delay));
}

// Function to move mouse in a more human-like curve
async function bezierMove(page, targetX, targetY) {
    const start = { x: Math.random() * 500, y: Math.random() * 500 };
    await page.mouse.move(start.x, start.y);
    await page.mouse.move(targetX, targetY, { steps: 25 });
}

async function startActivation(data) {
    const { macAddress, selectedApps, isLifetime, customerName, customerPhone } = data;
    const userDataDir = path.join(__dirname, 'browser_session');

    console.log(`[🤖] Starting Persistent Stealth activation for ${macAddress}...`);

    const context = await chromium.launchPersistentContext(userDataDir, {
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'],
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, Gecko) Chrome/122.0.0.0 Safari/537.36',
        viewport: { width: 1280, height: 720 },
    });

    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

    try {
        // 1. Go to login page with more robust settings
        console.log('[🌐] Navigating to IBOSol Dashboard...');
        await page.goto('https://ibosol.com/dashboard', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        await humanWait(3000, 5000);

        // CHECK IF ALREADY LOGGED IN
        if (page.url().includes('dashboard') && !page.url().includes('login')) {
            console.log('[🚀] Already logged in! Skipping login steps...');
        } else {
            console.log('[🌐] Not logged in. Starting Login Process...');

            // Wait specifically for the email input
            const emailInput = await page.waitForSelector('input[type="email"]', { timeout: 30000 });

            // Move mouse to email input before typing
            const emailBox = await emailInput.boundingBox();
            if (emailBox) await bezierMove(page, emailBox.x + emailBox.width / 2, emailBox.y + emailBox.height / 2);

            // 2. Fill login details with typing effect
            await page.type('input[type="email"]', process.env.PANEL_EMAIL, { delay: 150 });
            await humanWait(2000, 3500);

            const passInput = await page.waitForSelector('input[type="password"]');
            const passBox = await passInput.boundingBox();
            if (passBox) await bezierMove(page, passBox.x + passBox.width / 2, passBox.y + passBox.height / 2);

            await page.type('input[type="password"]', process.env.PANEL_PASSWORD, { delay: 180 });

            console.log('[🔑] Credentials typed. Pressing ENTER to login...');
            await humanWait(2000, 4000);
            await page.keyboard.press('Enter');

            console.log('[⏳] Waiting for Dashboard... (Note: If captcha blocks you, please solve it manually ONCE)');

            try {
                await page.waitForURL('**/dashboard', { timeout: 120000 });
                console.log('[✅] Dashboard access secured.');
            } catch (e) {
                console.log('[⚠] Redirect timed out. Please check the browser window.');
                throw e;
            }
        }
        await humanWait(4000, 7000);

        // 4. Navigate to Multi Apps Activation
        await page.click('text=Multi Apps Activation');
        await page.waitForSelector('#mac-address');
        console.log('[📂] In Activation Area.');
        await humanWait(2000, 4000);

        // 5. Select Apps with pause between each
        for (const appId of selectedApps) {
            try {
                await page.click(`text=${appId.toUpperCase()}`, { timeout: 3000 });
                console.log(`[✔] Selected: ${appId}`);
                await humanWait(1000, 2500); // Pause as if checking the selection
            } catch (e) {
                console.log(`[⚠] Skip: ${appId}`);
            }
        }

        // 6. Select Duration
        if (isLifetime) {
            await page.click('text=Lifetime');
        } else {
            await page.click('text=1-Year');
        }
        await humanWait(1500, 3000);

        // 7. Fill Remarks & MAC with REAL typing delay
        const remarks = `KS_Auto: ${customerName} ${customerPhone ? '- ' + customerPhone : ''}`;

        await page.focus('#remarks');
        await page.type('#remarks', remarks, { delay: 120 });
        await humanWait(1000, 2000);

        await page.focus('#mac-address');
        await page.type('#mac-address', macAddress, { delay: 200 }); // Typing MAC carefully
        console.log(`[📝] Data entered for ${macAddress}`);

        await humanWait(4000, 7000); // Final check pause before clicking activate

        // 8. FINAL ACTIVATE! (Live Mode)
        await page.click('.activate-button');
        console.log('[🚀] Activation clicked. Waiting for result...');

        // 9. READ RESULT
        await humanWait(5000, 10000);

        // Extract detailed result info from the page
        const resultInfo = await page.evaluate(() => {
            // Looking for alerts, tables, or any text that indicates the result
            const bodyText = document.body.innerText;
            const successAlert = document.querySelector('.alert-success')?.innerText || '';
            const allAlerts = Array.from(document.querySelectorAll('.alert')).map(el => el.innerText).join('\n');

            // Regex for dates (YYYY-MM-DD or DD/MM/YYYY)
            const dateMatch = bodyText.match(/\d{4}-\d{2}-\d{2}/) || bodyText.match(/\d{2}\/\d{2}\/\d{4}/);

            // Check for specific keywords the user mentioned
            const isPartiallyAvailable = bodyText.includes('unavailable') || bodyText.includes('not found') || bodyText.includes('partially');

            return {
                message: successAlert || allAlerts || 'Activation request sent.',
                expiryDate: dateMatch ? dateMatch[0] : null,
                isPartiallyAvailable,
                fullText: bodyText.substring(0, 1000) // First 1000 chars for logging
            };
        });

        console.log(`[📊] Analysis: ${resultInfo.message}`);
        if (resultInfo.expiryDate) console.log(`[📅] Detected Expiry: ${resultInfo.expiryDate}`);

        return {
            success: true,
            message: resultInfo.message,
            expiryDate: resultInfo.expiryDate,
            isPartial: resultInfo.isPartiallyAvailable,
            details: resultInfo
        };

    } catch (error) {
        console.error('[❌] Process Error:', error);
        return { success: false, error: error.message };
    } finally {
        await humanWait(5000, 8000); // Stay a bit after finishing
        await context.close();
    }
}

module.exports = { startActivation };
