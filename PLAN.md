# Öğretmenler Odası · English — Proje Planı

İngilizce öğretmenleri (2-8. sınıf) için plan + akıllı tahta + öğrenci uygulaması. Sürüm 0.1 — 20 Kasım 2026.
Açmak: `index.html` (öğretmen/tahta) ve `ogrenci.html` (öğrenci) — çift tık, internetsiz çalışır.

## 1. Araştırma bulguları (ayrıntı: uygulamada **Analiz** sekmesi)

| Sınıf | 2026-27 programı | Saat/hafta | Yapı |
|---|---|---|---|
| 2 | Maarif (TYMM) | 2 | 6 tema |
| 3 | Maarif (bu yıl başladı) | 2 | 6 tema |
| 4 | 2018 programı | 2 | 10 ünite |
| 5 | Maarif | 3 | 8 tema |
| 6 | Maarif | 3 | 8 tema |
| 7 | 2018 programı | 4 | 10 ünite |
| 8 | 2018 programı (LGS) | 4 | 10 ünite |

- Kaynak: MEB "İNGİLİZCE (2-8. SINIF) TASLAK YILLIK ÇERÇEVE PLAN" 2026-27 (tymm.meb.gov.tr, `kaynak/plan.xlsx`) + 50 tema sayfası (`kaynak/meb_tema/`).
- 4, 7, 8. sınıfın Maarif temaları yayımlandı, 2027-28'de gelecek → `gelecek_maarif` alanında saklı; gelince `uret_meb.py` içindeki `maarif` kümesine eklemek yeter.
- **Sınav:** OYSS İngilizce 5-6-7 (okul geneli, 5 senaryodan zümre seçer); yalnız R/V/G/W ölçülür. LGS değişmedi: 10 İngilizce sorusu.

## 2. Öğretmen programı — modüller

| Modül | Durum | Not |
|---|---|---|
| Bugün paneli (haftayı tarihten bulur) | ✅ | tema, aşama, belirli günler, kelimeler, kalıp, sohbet, oyunlar |
| Yıllık plan (MEB, 37 hafta) | ✅ | yazdır + Word |
| Haftalık plan | ✅ | 5 etkinlik, çıktılar, performans görevi, farklılaştırma, dış kaynaklar |
| Günlük plan (ders saati kadar, 40 dk) | ✅ | MEB tablo biçimi, düzenlenebilir, Word |
| Ünite ayrıntısı (MEB resmî + Claude) | ✅ | |
| 12 tahta oyunu + düellolar | ✅ | kayıt Raporlar'a düşer |
| Konuşma sınavı provası (sesli soru, 30 sn, yazıya dökme, 4 ölçütlü puan) | ✅ | Chrome/Edge mikrofon; yoksa öğretmen puanı. Soru kartları + puanlama formu baskısı |
| A4 etkinlik kâğıdı (cevaplı) | ✅ | her ünite, her basışta farklı |
| Sınav hazırlık kâğıdı (V/R/G/W, LGS diyalog) | ✅ | OYSS dağılım tablosu |
| Sınıflarım (kod) + Raporlar + CSV | ✅ | rapor kodu içe aktarma |
| Dış kaynak bağlantıları + "kendi kaynağım" | ✅ | Eğitimhane, Wordwall, İngilizceciyiz, Liveworksheets… |
| Senkron sunucusu (Apps Script) | ✅ kod hazır | öğretmen kurulumu: `apps-script/KURULUM.md` |

**Kural:** Başka sitelerin dosyaları uygulamaya kopyalanmaz (içerik sahiplerine ait); bağlantı verilir. Kendi içeriğimiz `✦ Claude` rozetli.

## 3. Öğrenci uygulaması

- Giriş: sınıf kodu (`5A-4821`) + ad (sunucu varsa listeden).
- Haftanın 7 görevi (kart, cümle, sohbet, 1 dakika, harf avı, kelime avı, konuşma sınavı provası), ilerleme çubuğu.
- Aralıklı tekrar (Leitner 5 kutu: 1-2-4-8-16 gün).
- Düellolar: 1 Dakika (yıl boyu kelimeler), Harf Avı, **Yüz yüze** (tek telefonda iki kişi, üst yarı ters).
- Rapor: sunucu varsa otomatik; yoksa `ING1:` kodu → öğretmen yapıştırır.

## 4. Yol haritası

**0.2 (Aralık):** GitHub Pages yayını + PWA (sw.js) · telefon APK (mevcut TWA hattı) · tahta paketi (Pardus/Android, Akıl Oyunları Tahtası yöntemi) · QR kodlu sınıf daveti.
**0.3:** Ünite başına okuma metni + dinleme (TTS) etkinliği · resimli kelime görselleri (emoji yerine özgün çizim) · phonics oyunu (temanın hedef sesleri) · 1 dakikada **harf ızgarasından kelime bulma** (Boggle türü).
**0.4:** Çevrimiçi canlı düello (iki telefon; Apps Script/Firebase) · haftalık sınıf ligi · öğretmenin ödev ataması (sunucudan hafta/ünite seçimi).
**0.5:** 2027-28 geçişi: 4, 7, 8. sınıf Maarif içerikleri · OYSS 2. dönem tabloları · LGS deneme modu (10 soru, süre).

## 5. Geliştirici notları

- Resmî veri: `python araclar/uret_meb.py` → `js/veri-meb.js` (elle düzenleme yok).
- İçerik: `js/icerik-ilkokul.js`, `js/icerik-56.js`, `js/icerik-78.js` (her ünite: k ≤10 kelime `en|tr|simge`, c kalıp + 5 örnek, s 4 sohbet adımı `[arkadaş, doğru, yanlış, yanlış]`).
- Her değişiklikten sonra: `node araclar/denetle.js` (içerik) ve `node araclar/test.js` (149 tarayıcı kontrolü).
- Oyun eklemek: `js/oyunlar.js` → `G.yeni = (kok, ctx) => …` + `G.LISTE`'ye satır.

## Yayın ve tanıtım
- Site: https://alibaklaea.github.io/ingilizce-ogretmenler-odasi/ (repo alibaklaea/ingilizce-ogretmenler-odasi; güncelleme = commit + push).
- Tanıtım videosu: 04_Videolar/kure-ajan-animasyon → `node out/ingilizce-kayit.js` (gerçek kullanım kaydı) + `python out/ingilizce-ses.py` + Remotion `IngilizceTanitim`.
