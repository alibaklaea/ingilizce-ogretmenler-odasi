/* Öğrenci uygulaması: haftalık görevler, düellolar, aralıklı tekrar, rapor */
(function () {
  const O = ORTAK, $ = O.$, $$ = O.$$, esc = O.esc;
  const kok = () => $('#ogr-sayfa');
  let P = O.oku('profil', null), aktifU = null;
  const hafta = () => O.buHafta(P.s), haftaNo = () => O.haftalar(P.s)[hafta()].no;
  const buUnite = () => { const hs = O.haftalar(P.s), hi = hafta(); if (hs[hi].u != null) return hs[hi].u; const once = hs.slice(0, hi).reverse().find(h => h.u != null); return once ? once.u : 0; };
  const benim = () => O.sonuclar().filter(r => r.o === P.ad && r.k === P.kod);
  const GOREV = [['kart', '🃏', 'Kelime kartlarını çalış'], ['cumle', '🧩', 'Cümle kur'], ['sohbet', '💬', 'Yabancı arkadaşınla sohbet et'], ['dakika', '⏱️', '1 Dakika Kelime düellosu'], ['harf', '🔠', 'Harf Avı'], ['av', '🔎', 'Kelime avı'], ['konusma', '🎙️', 'Konuşma sınavı provası']];

  const giris = () => {
    const q = new URLSearchParams(location.search), kod = q.get('k') || '';
    $('#geri').hidden = true; $('#ogr-baslik').textContent = 'English Club';
    kok().innerHTML = `<div class="ogr-giris"><div class="ogr-logo">Aa</div><h1>Welcome! 👋</h1><p class="soluk">Öğretmeninin verdiği sınıf kodunu yaz.</p>
      <form id="gf"><label>Sınıf kodu <input name="kod" value="${esc(kod)}" placeholder="ör. 5A-4821" required autocomplete="off"></label>
      <div id="ad-alan"><label>Adın <input name="ad" required placeholder="Adın ve soyadının baş harfi"></label></div>
      <label>Sınıfın <select name="s">${O.SINIFLAR.map(s => `<option ${O.koddanSinif(kod) === s ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
      <button class="btn ana genis">Başla 🚀</button></form><p class="soluk kucuk-y">🔒 Adın yalnız bu cihazda ve öğretmeninin raporunda görünür.</p></div>`;
    const f = $('#gf');
    const listeGetir = () => { const k = f.kod.value.trim().toUpperCase(); const s = O.koddanSinif(k); if (s) f.s.value = s;
      O.sunucuGetir({ islem: 'sinif', kod: k }).then(j => { if (j.ogrenciler && j.ogrenciler.length) $('#ad-alan').innerHTML = `<label>Adın <select name="ad" required><option value="">Seç…</option>${j.ogrenciler.map(a => `<option>${esc(a)}</option>`).join('')}</select></label>`; }).catch(() => { }); };
    f.kod.onchange = listeGetir; if (kod) listeGetir();
    f.onsubmit = e => { e.preventDefault(); P = { kod: f.kod.value.trim().toUpperCase(), ad: f.ad.value.trim(), s: +f.s.value }; O.yaz('profil', P); ana(); };
  };

  const uoBolum = (u, bh) => { const l = (UOYUN[P.s] || [])[u] || []; if (!l.length) return '';
    return `<h3>🎯 Bu ünitenin oyunları</h3><div class="gorevler">${l.map((c, j) => { const ok = (bh || []).some(r => r.t === c.t);
      return `<button class="gorev ${ok ? 'tamam' : ''}" data-oyun="u${j}"><span>${c.ikon}</span><b>${c.ad}<small style="display:block;font-weight:400;color:#5b6478">${OYUN.UTUR[c.t].ad}</small></b><em>${ok ? '✓' : '›'}</em></button>`; }).join('')}</div>`; };
  const ana = () => {
    document.body.dataset.sinif = P.s; $('#geri').hidden = true; $('#ogr-baslik').textContent = `Hi, ${P.ad.split(' ')[0]}!`;
    const u = buUnite(), un = O.unite(P.s, u), ark = ARKADAS[P.s], bh = benim().filter(r => r.h === haftaNo() && r.u === u);
    const yapildi = t => bh.some(r => r.t === t), tamam = GOREV.filter(g => yapildi(g[0])).length;
    const tekrarlar = Array.from({ length: u + 1 }, (_, i) => O.unite(P.s, i).kelimeler).flat().filter(k => O.leitner()[k.en] && O.tekrarZamani(k.en));
    const rekor = t => Math.max(0, ...benim().filter(r => r.t === t).map(r => r.p));
    $('#ogr-puan').textContent = `⭐ ${benim().reduce((a, r) => a + (r.p || 0), 0)}`;
    kok().innerHTML = `<section class="ogr-hero"><span class="ark">${ark.simge}</span><div><small>${haftaNo()}. hafta · ${P.s}. sınıf</small><h2>${esc(un.ad)}</h2>
        <div class="ilerleme"><i style="width:${tamam / GOREV.length * 100}%"></i></div><small>${tamam}/${GOREV.length} görev tamam</small></div></section>
      <h3>Bu haftanın görevleri</h3><div class="gorevler">${GOREV.map(([t, i, a]) => `<button class="gorev ${yapildi(t) ? 'tamam' : ''}" data-oyun="${t}"><span>${i}</span><b>${a}</b><em>${yapildi(t) ? '✓' : '›'}</em></button>`).join('')}</div>
      ${uoBolum(u, bh)}
      ${tekrarlar.length ? `<button class="gorev tekrar" data-tekrar><span>🔁</span><b>Tekrar zamanı: ${tekrarlar.length} kelime</b><em>›</em></button>` : ''}
      <h3>⚔️ Düellolar</h3><div class="duellolar">
        <button class="duello" data-oyun="dakika" data-kapsam="yil"><span>⏱️</span><b>1 Dakika</b><small>Rekorun: ${rekor('dakika')}</small></button>
        <button class="duello" data-oyun="harf" data-kapsam="yil"><span>🔠</span><b>Harf Avı</b><small>Rekorun: ${rekor('harf')}</small></button>
        <button class="duello" data-oyun="halat"><span>🪢</span><b>Yüz yüze</b><small>Telefonu arkadaşınla ortaya koy</small></button></div>
      <div id="lider"></div>
      <h3>📚 Tüm ünitelerim</h3><div class="ogr-uniteler">${O.sinif(P.s).uniteler.map((m, i) => `<button class="cip ${i === u ? 'aktif' : ''}" data-u="${i}">${i + 1}. ${esc(m.ad)}</button>`).join('')}</div>
      <div class="ogr-alt"><button class="btn" data-rapor>📤 Raporu öğretmene gönder</button><button class="btn" data-cikis>Çıkış</button></div>`;
    aktifU = u;
    $$('[data-oyun]').forEach(b => b.onclick = () => oyna(b.dataset.oyun, aktifU, b.dataset.kapsam));
    $$('[data-u]').forEach(b => b.onclick = () => uniteSayfa(+b.dataset.u));
    const tk = $('[data-tekrar]'); if (tk) tk.onclick = () => oyna('kart', u, null, tekrarlar);
    $('[data-rapor]').onclick = rapor; $('[data-cikis]').onclick = () => { if (window.confirm('Çıkış yapılsın mı? Sonuçların bu cihazda kalır.')) { O.yaz('profil', null); P = null; giris(); } };
    O.sunucuGetir({ islem: 'lider', sinif: P.kod, hafta: haftaNo() }).then(j => { if (!j.lider || !j.lider.length) return;
      $('#lider').innerHTML = `<h3>🏆 Sınıf liderleri (1 Dakika)</h3><ol class="lider">${j.lider.slice(0, 5).map(x => `<li><b>${esc(x.o)}</b> ${x.p}</li>`).join('')}</ol>`; }).catch(() => { });
  };

  const uniteSayfa = (u) => {
    aktifU = u; const un = O.unite(P.s, u); $('#geri').hidden = false; $('#ogr-baslik').textContent = un.ad;
    kok().innerHTML = `<div class="kelimeler">${un.kelimeler.map(k => `<button class="kelime-k" data-soyle="${esc(k.en)}"><span class="emo">${k.e}</span><b>${esc(k.en)}</b><small>${esc(k.tr)}</small></button>`).join('')}</div>
      <p class="kalip">🧩 ${esc(un.cumle.k)}</p>${uoBolum(u)}<div class="gorevler">${GOREV.map(([t, i, a]) => `<button class="gorev" data-oyun="${t}"><span>${i}</span><b>${a}</b><em>›</em></button>`).join('')}</div>`;
    $$('[data-soyle]').forEach(b => b.onclick = () => O.soyle(b.dataset.soyle));
    $$('[data-oyun]').forEach(b => b.onclick = () => oyna(b.dataset.oyun, u));
  };

  const oyna = (id, u, kapsam, ozelKelimeler) => {
    const un = O.unite(P.s, u), havuz = O.sinif(P.s).uniteler.flatMap((_, i) => O.unite(P.s, i).kelimeler);
    const uo = /^u\d$/.test(id) ? ((UOYUN[P.s] || [])[u] || [])[+id.slice(1)] : null, motor = uo ? uo.t : id;
    $('#geri').hidden = false; $('#ogr-baslik').textContent = uo ? uo.ad : (OYUN.LISTE.find(o => o.id === id) || {}).ad || '';
    kok().innerHTML = '<div class="oyun-alan tel" id="oa"></div>';
    OYUN.dur();
    OYUN[motor]($('#oa'), { uo, karakter: null, u: un, kelimeler: ozelKelimeler || un.kelimeler, havuz, mod: 'tel', oyuncular: id === 'halat' ? ['Player 1', 'Player 2'] : null,
      dakikaHavuz: kapsam === 'yil' ? Array.from({ length: buUnite() + 1 }, (_, i) => O.unite(P.s, i).kelimeler).flat() : un.kelimeler,
      kayit: r => { if (id === 'halat') return ''; O.sonucEkle({ o: P.ad, k: P.kod, s: P.s, u, h: haftaNo(), t: ozelKelimeler ? 'tekrar' : uo ? uo.t : id, p: r.p, m: r.m, sn: r.sn });
        return O.sunucu() ? '✅ Öğretmenine gönderildi' : '✅ Kaydedildi'; } });
  };

  const rapor = () => {
    const l = benim(), kod = O.raporKodu(l.slice(-400)); $('#geri').hidden = false; $('#ogr-baslik').textContent = 'Raporum';
    const say = t => l.filter(r => r.t === t).length;
    kok().innerHTML = `<div class="kart-kutu"><h2>${esc(P.ad)} · ${esc(P.kod)}</h2><ul>${Object.keys(O.TURLER).filter(say).map(t => `<li>${O.TURLER[t]}: <b>${say(t)}</b></li>`).join('') || '<li>Henüz etkinlik yok.</li>'}</ul></div>
      <div class="kart-kutu"><h3>📤 Öğretmene gönder</h3><p class="soluk">${O.sunucu() ? 'Sonuçların otomatik gidiyor. İstersen kodu da gönderebilirsin.' : 'Bu kodu kopyala ve öğretmenine WhatsApp ya da e-posta ile gönder. Öğretmen “Raporlar → Rapor kodu içe aktar”a yapıştırır.'}</p>
      <textarea rows="5" readonly id="rk">${kod}</textarea><div class="satir"><button class="btn ana" data-kopya>📋 Kopyala</button>${navigator.share ? '<button class="btn" data-paylas>Paylaş</button>' : ''}</div></div>`;
    $('[data-kopya]').onclick = () => { $('#rk').select(); navigator.clipboard ? navigator.clipboard.writeText(kod) : document.execCommand('copy'); $('[data-kopya]').textContent = '✅ Kopyalandı'; };
    const p = $('[data-paylas]'); if (p) p.onclick = () => navigator.share({ title: 'İngilizce raporum', text: `${P.ad} (${P.kod}) raporu:\n${kod}` }).catch(() => { });
  };

  document.addEventListener('DOMContentLoaded', () => { $('#geri').onclick = () => { OYUN.dur(); ana(); }; P && P.kod ? ana() : giris(); });
})();
