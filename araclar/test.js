// Uçtan uca test: node araclar/test.js  (playwright-core + sistem Edge/Chrome)
const path = require('path'), fs = require('fs');
const PW = ['C:/Users/Asus/animasyon-kutuphanesi/open-peeps/node_modules/playwright-core', 'playwright-core'].find(p => { try { require.resolve(p); return true; } catch (e) { return false; } });
const { chromium } = require(PW);
const TARAYICI = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(fs.existsSync);
const kok = 'file:///' + path.join(__dirname, '..').replace(/\\/g, '/');
const CIKTI = process.argv[2] || path.join(__dirname, '..', 'test-cikti'); fs.mkdirSync(CIKTI, { recursive: true });
let gecti = 0, kaldi = 0; const ok = (k, m) => { if (k) gecti++; else { kaldi++; console.log('✗ ' + m); } };

(async () => {
  const b = await chromium.launch({ executablePath: TARAYICI });
  const sayfa = async (w, h) => { const c = await b.newContext({ viewport: { width: w, height: h } });
    await c.addInitScript(() => { window.SpeechRecognition = window.webkitSpeechRecognition = function () { const r = this; r.start = () => setTimeout(() => r.onresult({ results: [[{ transcript: window.__soz || 'What time is it? It is half past nine and we have Maths.' }]] }), 300); }; });
    const p = await c.newPage(); p.hatalar = []; p.on('pageerror', e => p.hatalar.push(e.message)); p.on('console', m => m.type() === 'error' && p.hatalar.push(m.text())); return p; };
  const p = await sayfa(1600, 900);
  await p.goto(kok + '/index.html'); await p.waitForTimeout(300);
  const yollar = ['bugun', 'yillik', 'hafta', 'hafta/0', 'hafta/20', 'gunluk', 'gunluk/12/1', 'uniteler', 'unite/0', 'unite/3', 'tahta', 'sinav', 'raporlar', 'siniflar', 'kaynaklar', 'analiz', 'ayarlar'];
  for (const s of [2, 3, 4, 5, 6, 7, 8]) {
    await p.evaluate(s => { localStorage.setItem('ing.ayar', JSON.stringify(Object.assign(JSON.parse(localStorage.getItem('ing.ayar') || '{}'), { sinif: s }))); }, s);
    await p.reload(); await p.waitForTimeout(150);
    for (const y of yollar) { await p.evaluate(y => location.hash = y, y); await p.waitForTimeout(60);
      const n = await p.evaluate(() => document.querySelector('#sayfa').innerText.length); ok(n > 80 && !p.hatalar.length, `${s}. sınıf #${y}: ${p.hatalar.join(' | ') || 'boş sayfa'}`); p.hatalar = []; }
  }
  // günlük plan her hafta × her ders üretiliyor mu
  // sınıf oluştur
  await p.evaluate(() => location.hash = 'siniflar'); await p.waitForTimeout(100);
  await p.selectOption('[data-sinifekle] [name=s]', '5'); await p.fill('[data-sinifekle] [name=ogr]', 'Ali Y.\nAyşe K.\nMert T.'); await p.click('[data-sinifekle] .ana'); await p.waitForTimeout(150);
  const kod = await p.evaluate(() => JSON.parse(localStorage.getItem('ing.siniflar'))[0].kod); ok(/^5A-\d{4}$/.test(kod), 'sınıf kodu: ' + kod);
  // hafta kartları + hafta çubuğu
  await p.evaluate(() => location.hash = 'haftalar'); await p.waitForTimeout(150);
  ok(await p.evaluate(() => document.querySelectorAll('.hafta-kart').length === 37 && !!document.querySelector('.hafta-kart.simdi')), 'hafta kartları eksik');
  await p.click('.hafta-kart[data-hsec="20"]'); await p.waitForTimeout(200);
  ok(await p.evaluate(() => location.hash === '#bugun' && document.querySelector('.etiket').textContent.includes('SEÇİLİ') && document.querySelector('[data-hbsec]').value === '20'), 'hafta kartından seçim olmadı');
  await p.click('[data-hb="1"]'); await p.waitForTimeout(200); ok(await p.evaluate(() => document.querySelector('[data-hbsec]').value === '21'), 'ileri düğmesi');
  await p.evaluate(() => location.hash = 'gunluk'); await p.waitForTimeout(150); ok(await p.evaluate(() => document.querySelector('[data-hbsec]').value === '21'), 'günlük plan seçili haftayı almadı');
  await p.click('[data-hbbu]'); await p.waitForTimeout(200); ok(await p.evaluate(() => +document.querySelector('[data-hbsec]').value === ORTAK.buHafta(+JSON.parse(localStorage.getItem('ing.ayar')).sinif)), 'bu hafta düğmesi');
  // 116 ünite oyunu: her birinde karakter seç + bir doğru hamle
  const uoHata = [];
  for (const s of [2, 3, 4, 5, 6, 7, 8]) {
    await p.click(`[data-s="${s}"]`); await p.waitForTimeout(80);
    const n = await p.evaluate(s => UOYUN[s].length, s);
    for (let u = 0; u < n; u++) for (let j = 0; j < 2; j++) {
      await p.evaluate(x => location.hash = x, `oyna/u${j}/${u}`); await p.waitForTimeout(60);
      await p.click('[data-baslat]'); await p.waitForTimeout(60); await p.click('.kar[data-k="0"]'); await p.waitForTimeout(60);
      const t = await p.evaluate(([s, u, j]) => UOYUN[s][u][j].t, [s, u, j]); let basari = false;
      if (t === 'yer') { const i = await p.evaluate(() => +document.querySelector('.yer-kart').dataset.i); const bj = await p.evaluate(([s, u, j, i]) => UOYUN[s][u][j].o[i][2], [s, u, j, i]);
        await p.click(`.yer-kart[data-i="${i}"]`); await p.click(`.yer-bolge[data-b="${bj}"]`); await p.waitForTimeout(60); basari = await p.evaluate(() => document.querySelectorAll('.yer-kart.yerlesti').length === 1); }
      if (t === 'sira') { await p.click('.sira-adim[data-i="0"]'); await p.waitForTimeout(60); basari = await p.evaluate(() => document.querySelectorAll('.sira-hedef li.dolu').length === 1); }
      if (t === 'bil') { const c = await p.evaluate(() => OYUN._soru.cevap); await p.evaluate(c => [...document.querySelectorAll('.bil-s')].find(b => b.dataset.c === c).click(), c); await p.waitForTimeout(60); basari = await p.evaluate(() => !!document.querySelector('.bil-s.dogru-s')); }
      if (!basari || p.hatalar.length) uoHata.push(`${s}.${u + 1}.${j}:${t} ${p.hatalar.join('|')}`); p.hatalar = [];
    }
  }
  ok(!uoHata.length, 'ünite oyunları: ' + uoHata.join(', '));
  await p.evaluate(() => location.hash = 'oyna/u0/4'); await p.waitForTimeout(100);
  await p.click('[data-s="5"]'); await p.waitForTimeout(100);
  // oyunlar (tahta)
  for (const id of ['konusma', 'kart', 'hafiza', 'halat', 'dakika', 'harf', 'cumle', 'sohbet', 'eksik', 'av', 'cark', 'bingo']) {
    await p.evaluate(id => location.hash = 'oyna/' + id + '/1', id); await p.waitForTimeout(120);
    if (await p.$('#o1')) { await p.selectOption('#o1', 'Ali Y.'); await p.selectOption('#o2', 'Ayşe K.'); }
    if (await p.$('#o0')) await p.selectOption('#o0', 'Mert T.');
    await p.click('[data-baslat]'); await p.waitForTimeout(250);
    const n = await p.evaluate(() => document.querySelector('#oyun-alan').innerText.length); ok(n > 3 && !p.hatalar.length, `oyun ${id}: ${p.hatalar.join(' | ')}`); p.hatalar = [];
    if (id === 'halat') { // doğru cevaplarla A tarafını kazandır
      for (let i = 0; i < 12 && !(await p.$('.oyun-son')); i++) { const d = await p.evaluate(() => OYUN._soru.k.en);
        await p.evaluate(d => [...document.querySelectorAll('.t0 .sec')].find(b => b.dataset.en === d).click(), d); await p.waitForTimeout(150); }
      await p.waitForTimeout(800); const bitti = await p.evaluate(() => !!document.querySelector('.oyun-son')); ok(bitti, 'halat bitmedi');
      if (bitti) await p.screenshot({ path: path.join(CIKTI, 'halat-son.png') });
    }
    if (id === 'cumle') { const cs = await p.evaluate(() => ORTAK.unite(5, 1).cumle.o[0].split(' '));
      for (const w of cs) await p.evaluate(w => [...document.querySelectorAll('.parca')].find(b => !b.disabled && b.dataset.w === w).click(), w);
      await p.click('[data-kontrol]'); await p.waitForTimeout(200); ok(await p.evaluate(() => document.querySelector('.cumle-hedef').classList.contains('dogru')), 'cümle kur doğru kabul edilmedi'); }
    if (id === 'sohbet') { await p.waitForTimeout(1200); const dogru = await p.evaluate(() => ICERIK[5][1].s[0][1]);
      await p.evaluate(d => [...document.querySelectorAll('.cevap')].find(b => b.textContent === d).click(), dogru); await p.waitForTimeout(300);
      ok(await p.evaluate(() => document.querySelectorAll('.balon.ben').length === 1), 'sohbet cevabı eklenmedi'); await p.screenshot({ path: path.join(CIKTI, 'sohbet.png') }); }
    if (id === 'konusma') { await p.click('[data-mik]'); await p.waitForTimeout(500); await p.click('[data-bitti]'); await p.waitForTimeout(200);
      ok(await p.evaluate(() => document.querySelectorAll('.ks-cubuk').length === 4), 'konuşma puan çubukları yok'); await p.screenshot({ path: path.join(CIKTI, 'konusma.png') }); }
    if (id === 'hafiza') await p.screenshot({ path: path.join(CIKTI, 'hafiza.png') });
  }
  const tahtaSonuc = await p.evaluate(() => JSON.parse(localStorage.getItem('ing.sonuclar') || '[]').filter(r => r.tahta).length); ok(tahtaSonuc >= 2, 'tahta sonuçları kaydedilmedi: ' + tahtaSonuc);
  // A4 kâğıt + sınav kâğıdı HTML üretimi
  for (const s of [2, 3, 4, 5, 6, 7, 8]) { const r = await p.evaluate(s => { let e = []; for (let u = 0; u < ORTAK.uniteSayisi(s); u++) { try { const h = UYGULAMA.kagitHTML(s, u, 5); if (!h.includes('Cevap anahtarı')) e.push(u); const t = UYGULAMA.sinavHTML(s, [u], 5); if (!t.includes('(W)')) e.push('s' + u); if (!UYGULAMA.konusmaHTML(s, [u]).includes('Puanlama')) e.push('k' + u); } catch (x) { e.push(u + ':' + x.message); } } return e; }, s); ok(!r.length, `${s}. sınıf kâğıt üretimi: ${r}`); }
  await p.evaluate(() => { document.querySelector('#baski').innerHTML = UYGULAMA.kagitHTML(7, 1, 5); });
  await p.emulateMedia({ media: 'print' }); await p.pdf({ path: path.join(CIKTI, 'ornek-kagit-7-sports.pdf'), format: 'A4' }).catch(() => { }); await p.emulateMedia({ media: 'screen' });
  await p.evaluate(() => location.hash = 'bugun'); await p.waitForTimeout(150); await p.screenshot({ path: path.join(CIKTI, 'bugun.png') });
  await p.evaluate(() => location.hash = 'gunluk/10/0'); await p.waitForTimeout(150); await p.screenshot({ path: path.join(CIKTI, 'gunluk.png'), fullPage: false });

  // öğrenci uygulaması (telefon)
  const t = await sayfa(390, 844); await t.goto(kok + '/ogrenci.html?k=' + kod); await t.waitForTimeout(200);
  await t.fill('#gf [name=ad]', 'Ayşe K.'); await t.click('#gf .ana'); await t.waitForTimeout(200);
  ok(await t.evaluate(() => document.querySelectorAll('.gorev').length >= 6), 'öğrenci görevleri yok');
  await t.screenshot({ path: path.join(CIKTI, 'ogrenci-ana.png') });
  await t.click('[data-oyun="cumle"]'); await t.waitForTimeout(200);
  const u5 = await t.evaluate(() => { const hs = ORTAK.haftalar(5), hi = ORTAK.buHafta(5); return hs[hi].u ?? 0; });
  const cs = await t.evaluate(u => ORTAK.unite(5, u).cumle.o, u5);
  for (const c of cs) { for (const w of c.split(' ')) await t.evaluate(w => [...document.querySelectorAll('.parca')].find(b => !b.disabled && b.dataset.w === w).click(), w); await t.click('[data-kontrol]'); await t.waitForTimeout(1500); }
  ok(await t.evaluate(() => !!document.querySelector('.oyun-son')), 'öğrenci cümle oyunu bitmedi');
  await t.click('#geri'); await t.waitForTimeout(150);
  ok(await t.evaluate(() => document.querySelector('.gorev.tamam') !== null), 'görev tamam işareti yok');
  await t.click('[data-oyun="halat"]'); await t.waitForTimeout(200); await t.screenshot({ path: path.join(CIKTI, 'ogrenci-yuzyuze.png') }); await t.click('#geri');
  await t.click('[data-rapor]'); await t.waitForTimeout(150);
  const rk = await t.inputValue('#rk'); ok(rk.startsWith('ING1:'), 'rapor kodu yok');
  ok(!t.hatalar.length, 'öğrenci sayfa hataları: ' + t.hatalar.join(' | '));
  // öğretmen içe aktarır
  await p.evaluate(() => location.hash = 'raporlar'); await p.waitForTimeout(150);
  await p.fill('#kodlar', 'Ayşe gönderdi: ' + rk); await p.click('[data-iceal]'); await p.waitForTimeout(1200);
  const satir = await p.evaluate(() => [...document.querySelectorAll('.rapor tbody tr')].find(tr => tr.innerText.includes('Ayşe K.'))?.innerText || '');
  ok(/✅/.test(satir), 'rapor içe aktarılmadı: ' + satir);
  await p.screenshot({ path: path.join(CIKTI, 'rapor.png') });
  ok(!p.hatalar.length, 'öğretmen sayfa hataları: ' + p.hatalar.join(' | '));
  await b.close(); console.log(`\n${gecti} geçti · ${kaldi} kaldı · ekran görüntüleri: ${CIKTI}`); process.exit(kaldi ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
