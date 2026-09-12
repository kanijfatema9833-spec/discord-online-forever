const { Client } = require('discord.js-selfbot-v13');
const express = require('express');

// UptimeRobot-এর জন্য Express Web Server
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Multi-Account 24/7 Online Service is Active!');
});

app.listen(PORT, () => {
  console.log(`[SERVER] Web server listening on port ${PORT}`);
});

// Render Environment Variable থেকে টোকেনগুলো নেওয়া
const tokensString = process.env.TOKENS;

if (!tokensString) {
  console.error('[CRITICAL] TOKENS environment variable is missing!');
  process.exit(1);
}

// কমা (,) দিয়ে আলাদা করা টোকেনগুলোকে একটি অ্যারে-তে রূপান্তর করা
const tokens = tokensString.split(',').map(t => t.trim()).filter(t => t.length > 0);

if (tokens.length === 0) {
  console.error('[CRITICAL] No valid tokens found in TOKENS variable!');
  process.exit(1);
}

console.log(`[INFO] Found ${tokens.length} tokens. Starting accounts...`);

// প্রতিটি টোকেনের জন্য আলাদা ক্লায়েন্ট তৈরি করে লগইন করা
tokens.forEach((token, index) => {
  const client = new Client({ checkUpdate: false });

  client.on('ready', () => {
    console.log(`[SUCCESS] Account ${index + 1} logged in as ${client.user.username}`);
    // অ্যাকাউন্ট সবসময় অনলাইন রাখার জন্য স্ট্যাটাস সেট করা
    client.user.setStatus('online'); 
  });

  client.login(token).catch(err => {
    console.error(`[ERROR] Failed to login Account ${index + 1}:`, err.message);
  });
});
