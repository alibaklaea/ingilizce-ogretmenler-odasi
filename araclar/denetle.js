// İçerik denetçisi: node araclar/denetle.js
const fs = require('fs'), vm = require('vm'), path = require('path');
const kok = path.join(__dirname, '..'), ctx = { window: {} }; ctx.window = ctx; vm.createContext(ctx);
['js/veri-meb.js', 'js/icerik-ilkokul.js', 'js/icerik-56.js', 'js/icerik-78.js'].forEach(f => vm.runInContext(fs.readFileSync(path.join(kok, f), 'utf8'), ctx));
const { MEB, ICERIK, ARKADAS } = ctx; let hata = 0, uyari = 0, top = 0;
const H = m => { hata++; console.log('HATA  ' + m); }, U = m => { uyari++; console.log('uyarı ' + m); };
for (let s = 2; s <= 8; s++) {
  const us = MEB.sinif[s].uniteler, ic = ICERIK[s] || [];
  if (!ARKADAS[s]) H(`${s}: yabancı arkadaş yok`);
  if (ic.length !== us.length) H(`${s}. sınıf: MEB ${us.length} ünite, içerik ${ic.length}`);
  ic.forEach((u, i) => {
    const ad = `${s}.${i + 1} ${us[i] ? us[i].ad : '?'}`; top++;
    const ks = u.k.map(x => x.split('|'));
    if (ks.length > 10) H(`${ad}: ${ks.length} kelime (>10)`); if (ks.length < 8) U(`${ad}: yalnız ${ks.length} kelime`);
    ks.forEach(k => { if (k.length !== 3 || !k[0] || !k[1] || !k[2]) H(`${ad}: bozuk kelime "${k.join('|')}"`); });
    const tekrar = (a, n) => a.filter((x, j) => a.indexOf(x) !== j).forEach(x => H(`${ad}: tekrar eden ${n} "${x}"`));
    tekrar(ks.map(k => k[0].toLowerCase()), 'kelime'); tekrar(ks.map(k => k[2]), 'simge');
    if (!u.c || !u.c.k || (u.c.o || []).length !== 5) H(`${ad}: cümle kalıbı/5 örnek eksik`);
    (u.c.o || []).forEach(c => { if (/\s{2,}|^\s|\s$/.test(c)) H(`${ad}: boşluk hatası "${c}"`); if (c.split(' ').length < 2) U(`${ad}: tek kelimelik cümle "${c}"`); });
    if ((u.s || []).length !== 4) H(`${ad}: sohbet ${u.s ? u.s.length : 0} adım (4 olmalı)`);
    (u.s || []).forEach((t, j) => { if (t.length !== 4 || t.some(x => !x)) H(`${ad}: sohbet ${j + 1} bozuk`);
      if (new Set(t.slice(1)).size !== 3) H(`${ad}: sohbet ${j + 1} seçenekler aynı`); });
    if (/^[a-z]{3,9}$/i.test('x') && !ks.some(k => /^[a-z]{3,9}$/i.test(k[0]))) U(`${ad}: Harf Avı'na uygun kelime yok`);
  });
  const hs = MEB.sinif[s].haftalar; if (hs.length !== 37) H(`${s}: ${hs.length} hafta`);
  hs.forEach(h => { if (h.u != null && !us[h.u]) H(`${s}: hafta ${h.no} ünite ${h.u} yok`); });
  us.forEach((_, i) => { if (!hs.some(h => h.u === i)) H(`${s}: ${i + 1}. üniteye hafta ayrılmamış`); });
}
// ünite oyunları
['js/unite-oyun-ilkokul.js', 'js/unite-oyun-orta.js'].forEach(f => vm.runInContext(fs.readFileSync(path.join(kok, f), 'utf8'), ctx));
let uo = 0;
for (let s = 2; s <= 8; s++) {
  const L = ctx.UOYUN[s] || []; if (L.length !== MEB.sinif[s].uniteler.length) H(`${s}. sınıf: ünite oyunu ${L.length}, ünite ${MEB.sinif[s].uniteler.length}`);
  L.forEach((oy, i) => { const ad = `${s}.${i + 1} oyun`; if (oy.length < 2) H(`${ad}: ${oy.length} oyun (2 olmalı)`);
    oy.forEach(c => { uo++; const n = `${ad} "${c.ad}"`; if (!c.ad || !c.ikon) H(`${n}: ad/ikon yok`);
      const tek = (a, t) => a.filter((x, j) => a.indexOf(x) !== j).forEach(x => H(`${n}: tekrar eden ${t} "${x}"`));
      if (c.t === 'yer') { if (c.b.length < 2 || c.b.length > 4) H(`${n}: ${c.b.length} bölge`); if (c.o.length < 4) H(`${n}: az kart`);
        c.o.forEach(o => { if (!(o[2] >= 0 && o[2] < c.b.length)) H(`${n}: "${o[0]}" bölgesi yok`); });
        c.b.forEach((_, j) => { if (!c.o.some(o => o[2] === j)) H(`${n}: ${c.b[j][0]} bölgesi boş`); });
        tek(c.o.map(o => o[1]), 'kart simgesi'); tek(c.o.map(o => o[0]), 'kart'); if (!/\{k\}|\{b\}/.test(c.k)) H(`${n}: kalıp yok`); }
      else if (c.t === 'sira') { c.d.forEach(d => { if (d.length < 3) H(`${n}: dizi çok kısa`); tek(d.map(x => x[1]), 'adım'); }); }
      else if (c.t === 'bil') { if (c.q.length < 4) H(`${n}: ${c.q.length} soru`); tek(c.q.map(q => q[1]), 'cevap'); tek(c.q.map(q => q[2]), 'simge'); c.q.forEach(q => { if (q.length !== 3 || q.some(x => !x)) H(`${n}: bozuk soru`); }); }
      else H(`${n}: bilinmeyen tür ${c.t}`); }); });
}
console.log(`${uo} ünite oyunu denetlendi`);
console.log(`\n${top} ünite denetlendi · ${hata} hata · ${uyari} uyarı`); process.exit(hata ? 1 : 0);
