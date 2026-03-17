#!/usr/bin/env node
// ════════════════════════════════════════════
//  generate_env.js
//  Deploy öncesi çalıştırın: node generate_env.js
//  Legacy helper. env.json artık secret taşımamalı.
//  Gerekirse yalnızca public adminEmail bilgisi üretir.
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

// env.json oluştur — sadece public adminEmail
const output = {
  adminEmail: env.ADMIN_EMAIL || ''
};

fs.writeFileSync(
  path.join(__dirname, 'env.json'),
  JSON.stringify(output, null, 2)
);

console.log('✓ env.json oluşturuldu.');
console.log('  adminEmail:', output.adminEmail || '[bos]');
console.log('');
console.log('Şimdi deploy edebilirsiniz:');
console.log('  firebase deploy');
