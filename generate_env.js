#!/usr/bin/env node
// ════════════════════════════════════════════
//  generate_env.js
//  Deploy öncesi çalıştırın: node generate_env.js
//  .env → env.json (sadece adminPassword — Firebase config __/firebase/init.json'dan geliyor)
//  env.json Firebase Hosting'e yüklenir ama .gitignore'da olmalı
// ════════════════════════════════════════════

const fs   = require('fs');
const path = require('path');

// .env dosyasını oku
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env dosyası bulunamadı!');
  process.exit(1);
}

const lines = fs.readFileSync(envPath, 'utf8').split('\n');
const env   = {};
lines.forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('#')) return;
  const [key, ...rest] = line.split('=');
  env[key.trim()] = rest.join('=').trim();
});

if (!env.ADMIN_PASSWORD || env.ADMIN_PASSWORD === 'buraya-guclu-sifre-yazin') {
  console.error('❌ ADMIN_PASSWORD .env dosyasında ayarlanmamış!');
  process.exit(1);
}

// env.json oluştur — sadece adminPassword
const output = {
  adminPassword: env.ADMIN_PASSWORD
};

fs.writeFileSync(
  path.join(__dirname, 'env.json'),
  JSON.stringify(output, null, 2)
);

console.log('✓ env.json oluşturuldu.');
console.log('  adminPassword: [gizli]');
console.log('');
console.log('Şimdi deploy edebilirsiniz:');
console.log('  firebase deploy');
