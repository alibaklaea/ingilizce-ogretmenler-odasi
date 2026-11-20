# Senkron sunucusu kurulumu (isteğe bağlı, 10 dakika)

Sunucu olmadan da uygulama tam çalışır: öğrenci "Raporu öğretmene gönder" kodunu yollar, öğretmen Raporlar'a yapıştırır.
Sunucu kurulursa öğrenci sonuçları otomatik gelir, öğrenci girişte adını listeden seçer, sınıf liderleri görünür.

1. Google Drive → Yeni → Google E-Tablolar → adı: `English Club Raporlar`.
2. Uzantılar → Apps Komut Dosyası. `Kod.gs` içeriğini yapıştırın, kaydedin.
3. Proje Ayarları (⚙) → Komut dosyası özellikleri → Ekle: `ANAHTAR` = kendi belirlediğiniz gizli kelime.
4. Dağıt → Yeni dağıtım → Tür: Web uygulaması → Yürüten: **Ben** · Erişim: **Herkes** → Dağıt → izin verin.
5. Verilen `https://script.google.com/macros/s/…/exec` adresini kopyalayın.
6. Öğretmenler Odası → ⚙ Ayarlar → "Senkron sunucusu" alanına adresi, "Öğretmen anahtarı"na aynı gizli kelimeyi yazın.
7. Öğrenci uygulaması sunucu adresini `js/yapilandirma.js` içindeki `sunucu` alanından alır (bir kez doldurup siteyi güncelleyin).

Güvenlik: Raporları okumak ve sınıf listesi kaydetmek anahtar ister. Sınıf kodunu bilen öğrenci yalnız sınıfın ad listesini (giriş için) ve 1 Dakika liderlerini görür.
