require('dotenv').config();

const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || '';
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN || '';

module.exports = { PORT, REDIS_URL, TELEGRAM_TOKEN };