# Ege Yaşar Hanlı - Anma Sitesi

## Dosya Yapısı

```text
index.html          <- Ana site
admin.html          <- Yönetim paneli
firebase.json       <- Firebase Hosting yapılandırması
database.rules.json <- Firebase güvenlik kuralları
generate_env.js     <- .env -> env.json dönüştürücü
.env                <- Gizli, git'e eklenmez
env.json            <- Üretilir, git'e eklenmez
```

## Kurulum

1. Firebase projesi oluşturun.
2. `.env` dosyasını doldurun.
3. `node generate_env.js` çalıştırın.
4. `firebase deploy` ile yayınlayın.

## Notlar

- `.env` ve `env.json` repoya dahil edilmez.
- Admin paneli `/admin` altındadır.
- İçerikler Realtime Database üzerinden yönetilir.
