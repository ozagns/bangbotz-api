// Memanggil library dotenv untuk membaca file .env
require('dotenv').config();

module.exports = {
    // API Keys
    weatherKey: process.env.WEATHER_API_KEY,
    
    // Global Settings
    creator: 'BangBotz', // Watermark kamu
    baseUrl: 'https://bangbotz.vercel.app'
};