/**
 * Öğretmenler Odası · English — senkron sunucusu (Google Apps Script web uygulaması)
 * Veriler öğretmenin kendi Google E-Tablosunda tutulur: "sonuclar" ve "siniflar" sayfaları.
 * Proje Ayarları > Komut dosyası özellikleri: ANAHTAR = (öğretmenin belirlediği gizli kelime)
 */
function tablo_(ad, baslik) {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('TABLO_ID'));
  var sh = ss.getSheetByName(ad);
  if (!sh) { sh = ss.insertSheet(ad); sh.appendRow(baslik); }
  return sh;
}
var SONUC_B = ['zaman', 'sinif_kodu', 'ogrenci', 'duzey', 'unite', 'hafta', 'tur', 'puan', 'en_cok', 'saniye', 'tahta'];
var SINIF_B = ['kod', 'ad', 'duzey', 'ogrenciler'];
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function anahtarDogru_(a) { var k = PropertiesService.getScriptProperties().getProperty('ANAHTAR'); return k && a === k; }

function doPost(e) {
  var v = JSON.parse(e.postData.contents);
  if (v.islem === 'kaydet') {
    var sh = tablo_('sonuclar', SONUC_B), lock = LockService.getScriptLock(); lock.waitLock(10000);
    try {
      var satirlar = (v.sonuclar || []).slice(0, 500).map(function (r) {
        return [r.z, String(r.k || '').slice(0, 12), String(r.o || '').slice(0, 40), r.s, r.u, r.h, String(r.t).slice(0, 10), Number(r.p) || 0, r.m || '', r.sn || '', r.tahta ? 1 : 0];
      });
      if (satirlar.length) sh.getRange(sh.getLastRow() + 1, 1, satirlar.length, SONUC_B.length).setValues(satirlar);
    } finally { lock.releaseLock(); }
    return json_({ ok: true, n: satirlar.length });
  }
  return json_({ ok: false });
}

function doGet(e) {
  var p = e.parameter, islem = p.islem;
  if (islem === 'sinif') { // öğrenci girişinde ad listesi
    var s = tablo_('siniflar', SINIF_B).getDataRange().getValues().slice(1).filter(function (r) { return r[0] === p.kod; })[0];
    return json_({ ok: !!s, ogrenciler: s ? String(s[3]).split('\n').filter(String) : [] });
  }
  if (islem === 'lider') { // sınıf içi 1 Dakika liderleri (yalnız ad ve puan)
    var en = {};
    tablo_('sonuclar', SONUC_B).getDataRange().getValues().slice(1).forEach(function (r) {
      if (r[1] === p.sinif && r[6] === 'dakika' && (!p.hafta || String(r[5]) === String(p.hafta))) en[r[2]] = Math.max(en[r[2]] || 0, r[7]);
    });
    return json_({ ok: true, lider: Object.keys(en).map(function (o) { return { o: o, p: en[o] }; }).sort(function (a, b) { return b.p - a.p; }).slice(0, 10) });
  }
  if (!anahtarDogru_(p.anahtar)) return json_({ ok: false, hata: 'anahtar' });
  if (islem === 'rapor') {
    var l = tablo_('sonuclar', SONUC_B).getDataRange().getValues().slice(1).filter(function (r) { return !p.sinif || r[1] === p.sinif; })
      .map(function (r) { return { z: r[0], k: r[1], o: r[2], s: r[3], u: r[4], h: r[5], t: r[6], p: r[7], m: r[8], sn: r[9], tahta: r[10] }; });
    return json_({ ok: true, sonuclar: l });
  }
  if (islem === 'sinif-kaydet') {
    var c = JSON.parse(p.veri), sh = tablo_('siniflar', SINIF_B), d = sh.getDataRange().getValues();
    var satir = [c.kod, c.ad, c.sinif, (c.ogrenciler || []).join('\n')];
    for (var i = 1; i < d.length; i++) if (d[i][0] === c.kod) { sh.getRange(i + 1, 1, 1, 4).setValues([satir]); return json_({ ok: true }); }
    sh.appendRow(satir); return json_({ ok: true });
  }
  return json_({ ok: false });
}
