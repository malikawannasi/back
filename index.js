const express = require('express');

class Cache {
    constructor() {
        this.store = new Map();
    }

    set(key, value, ttl) {
        const expireAt = Date.now() + ttl;
        console.log(`📝 Storing key "${key}" with TTL: ${ttl}ms (expires at: ${new Date(expireAt).toISOString()})`);
        this.store.set(key, { value, expireAt });

        setTimeout(() => {
            console.log(`⏳ Expiring key "${key}"`);
            this.store.delete(key);
        }, ttl);
    }

    get(key) {
        const entry = this.store.get(key);
        if (!entry) {
            console.log(`❌ Key "${key}" not found in cache`);
            return null;
        }
        if (entry.expireAt < Date.now()) {
            console.log(`⚠️ Key "${key}" has expired`);
            this.store.delete(key);
            return null;
        }
        console.log(`✅ Key "${key}" retrieved successfully`);
        return entry.value;
    }
}


const cache = new Cache();
const app = express();
app.use(express.json());

// Ajouter une valeur au cache
app.post('/cache', (req, res) => {
    const { key, value, ttl } = req.body;
    if (!key || !value || !ttl) {
        return res.status(400).json({ error: 'Missing key, value, or ttl' });
    }
    cache.set(key, value, ttl);
    res.json({ message: 'Cached successfully' });
});

// Récupérer une valeur du cache
app.get('/cache/:key', (req, res) => {
    const value = cache.get(req.params.key);
    if (value === null) {
        return res.status(404).json({ error: 'Key not found or expired' });
    }
    res.json({ value });
});

// Lancer le serveur
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = { app, cache };
