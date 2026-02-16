const express = require('express');
const cors = require('cors');
const { startActivation } = require('./automation');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const fs = require('fs');
const path = require('path');

// Basic Auth
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'karma2026';

// Settings Management
const SETTINGS_FILE = path.join(__dirname, 'settings.json');
if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ showActivation: false }));
}

const getSettings = () => JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
const saveSettings = (settings) => fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));

// Logger function
const logActivity = (data) => {
    const logPath = path.join(__dirname, 'activity.log');
    const logEntry = `[${new Date().toISOString()}] ${data.event.toUpperCase()}: ${data.details}\n`;
    fs.appendFileSync(logPath, logEntry);
    console.log(`📝 Logged: ${logEntry.trim()}`);
};

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('<h1>🚀 Karma Store Activation Bot is Online & Ready!</h1>');
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        logActivity({ event: 'admin_login', details: `Successfully logged in: ${username}` });
        res.json({ success: true, token: 'karma-secret-token-2026' });
    } else {
        logActivity({ event: 'admin_login_failed', details: `Failed login attempt for: ${username}` });
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.get('/api/settings', (req, res) => {
    res.json(getSettings());
});

app.post('/api/settings', (req, res) => {
    const current = getSettings();
    const updated = { ...current, ...req.body };
    saveSettings(updated);
    logActivity({ event: 'settings_update', details: `Settings changed: ${JSON.stringify(req.body)}` });
    res.json(updated);
});

app.get('/api/logs', (req, res) => {
    const logPath = path.join(__dirname, 'activity.log');
    if (fs.existsSync(logPath)) {
        const logs = fs.readFileSync(logPath, 'utf8').split('\n').filter(Boolean).reverse().slice(0, 100);
        res.json(logs);
    } else {
        res.json([]);
    }
});

app.post('/api/report', (req, res) => {
    logActivity(req.body);
    res.json({ success: true });
});

app.post('/api/activate', async (req, res) => {
    try {
        logActivity({ event: 'activation_start', details: `MAC: ${req.body.macAddress}, Apps: ${req.body.selectedApps?.join(',')}` });
        const result = await startActivation(req.body);
        if (result.success) {
            logActivity({ event: 'activation_success', details: `MAC: ${req.body.macAddress}` });
            res.json(result);
        } else {
            logActivity({ event: 'activation_failed', details: `MAC: ${req.body.macAddress}, Error: ${result.error}` });
            res.status(500).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server internal error' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Karma Store Activation Server running on http://localhost:${PORT}`);
});
