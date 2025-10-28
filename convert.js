const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'assets');

fs.readdirSync(folder).forEach(async file => {
  if (file.match(/\.(png|jpg|jpeg)$/i)) {
    const input = path.join(folder, file);
    const output = path.join(folder, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    try {
      await sharp(input)
        .webp({ quality: 80 })
        .toFile(output);
      console.log(`✅ ${file} → ${path.basename(output)}`);
    } catch (err) {
      console.error(`❌ ${file} dönüştürülürken hata:`, err.message);
    }
  }
});
