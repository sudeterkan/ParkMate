# ParkMate

ParkMate, QR kod tabanlı otopark yönetim sistemi uygulamasıdır. Kullanıcılar otoparka giriş ve çıkışlarını QR kod okutarak gerçekleştirebilir ve park ücretlerini ödeyebilirler.

## Özellikler

- Kullanıcı girişi ve kimlik doğrulama
- QR kod ile otopark giriş/çıkış işlemleri
- Otomatik park süresi hesaplama
- Ücret hesaplama ve ödeme işlemleri
- Kullanıcı dostu arayüz

## Teknolojiler

- React Native
- Expo
- Firebase Authentication
- Firebase Firestore
- React Navigation
- React Native Paper

## Kurulum

1. Projeyi klonlayın:

```bash
git clone [repo-url]
cd parkmate
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Firebase yapılandırması:

- Firebase Console'dan yeni bir proje oluşturun
- `src/config/firebase.js` dosyasındaki yapılandırma bilgilerini güncelleyin

4. Uygulamayı başlatın:

```bash
npm start
```

## Kullanım

1. Uygulamaya giriş yapın
2. Ana ekranda "Giriş Yap" veya "Çıkış Yap" seçeneklerinden birini seçin
3. QR kodu okutun
4. Çıkış yaparken, sistem otomatik olarak park süresini hesaplayacak ve ücreti gösterecektir
5. Ödeme işlemini tamamlayın

## Lisans

MIT
