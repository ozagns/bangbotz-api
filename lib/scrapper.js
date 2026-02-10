const axios = require('axios');

async function igDownload(url) {
    return new Promise(async (resolve, reject) => {
        try {
            // Logika scraping kamu di sini 🕑
            // Sementara kita buat contoh hasil sukses
            resolve({
                status: true,
                url: url,
                thumbnail: "https://link-foto.com",
                video_url: "https://link-video.mp4"
            });
        } catch (e) {
            reject({ status: false, message: "Gagal mengambil data 🕑" });
        }
    });
}

module.exports = { igDownload };