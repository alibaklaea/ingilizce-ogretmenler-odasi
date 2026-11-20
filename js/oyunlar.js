/* Oyun motoru: OYUN[ad](kök, ctx)
   ctx = { u: ünite (ORTAK.unite), kelimeler, havuz: çeldirici kelimeler, mod: 'tahta'|'tel', oyuncular: [ad,ad], kayit(sonuç) } */
(function () {
  const O = ORTAK, esc = O.esc, G = window.OYUN = {};
  let zamanlar = [];
  G.dur = () => { zamanlar.forEach(z => { clearInterval(z); clearTimeout(z); }); zamanlar = []; if (O.sesVar()) speechSynthesis.cancel(); };
  const sayac = (fn, ms) => { const z = setInterval(fn, ms); zamanlar.push(z); return z; };
  const sonra = (fn, ms) => { const z = setTimeout(fn, ms); zamanlar.push(z); return z; };
  const h = (kok, html) => { kok.innerHTML = html; return kok; };
  const secenekler = (dogru, ctx, n) => O.karistir([dogru].concat(O.sec(ctx.havuz.filter(k => k.en !== dogru.en && k.e !== dogru.e), (n || 4) - 1)));
  const bitir = (kok, ctx, r, mesaj) => {
    const kayit = ctx.kayit && ctx.kayit(r);
    h(kok, `<div class="oyun-son"><div class="kupa">${r.p >= (r.m || 1) * .7 ? '🏆' : '⭐'}</div><h2>${mesaj || 'Well done!'}</h2>
      <p class="buyuk">${r.p}${r.m ? ' / ' + r.m : ''}</p>${kayit ? `<p class="soluk">${esc(kayit)}</p>` : ''}
      <button class="btn ana" data-tekrar>🔁 Tekrar oyna</button></div>`);
    kok.querySelector('[data-tekrar]').onclick = () => G[r.t](kok, ctx);
  };
  const ust = (baslik, sag) => `<div class="oyun-ust"><b>${baslik}</b><span>${sag || ''}</span></div>`;

  /* 1. Kelime kartları */
  G.kart = (kok, ctx) => {
    const ks = ctx.kelimeler; let i = 0, ters = false, bilinen = 0;
    const ciz = () => {
      const k = ks[i];
      h(kok, ust('Word Cards', `${i + 1} / ${ks.length}`) + `
        <div class="kart-sahne"><button class="flash ${ters ? 'ters' : ''}" data-cevir>
          <span class="emo">${k.e}</span><span class="en">${esc(k.en)}</span><span class="tr">${esc(k.tr)}</span></button></div>
        <div class="oyun-alt">
          <button class="btn" data-g="-1">◀</button><button class="btn" data-ses>🔊 Listen</button>
          ${ctx.mod === 'tel' ? '<button class="btn kirmizi" data-b="0">Tekrar et</button><button class="btn yesil" data-b="1">Biliyorum ✓</button>' : '<button class="btn" data-oto>▶ Hepsini oku</button>'}
          <button class="btn" data-g="1">▶</button></div>`);
      kok.querySelector('[data-cevir]').onclick = () => { ters = !ters; kok.querySelector('.flash').classList.toggle('ters'); };
      kok.querySelector('[data-ses]').onclick = () => O.soyle(k.en);
      kok.querySelectorAll('[data-g]').forEach(b => b.onclick = () => { i = (i + Number(b.dataset.g) + ks.length) % ks.length; ters = false; ciz(); O.soyle(ks[i].en); });
      kok.querySelectorAll('[data-b]').forEach(b => b.onclick = () => { const d = b.dataset.b === '1'; O.leitnerYaz(k.en, d); if (d) bilinen++;
        if (i === ks.length - 1) return bitir(kok, ctx, { t: 'kart', p: bilinen, m: ks.length }, 'Kartlar bitti!'); i++; ters = false; ciz(); O.soyle(ks[i].en); });
      const oto = kok.querySelector('[data-oto]');
      if (oto) oto.onclick = () => { let j = 0; G.dur(); const adim = () => { i = j; ters = false; ciz(); O.soyle(ks[j].en); sonra(() => { ters = true; kok.querySelector('.flash')?.classList.add('ters'); }, 1600); j++; if (j < ks.length) sonra(adim, 3200); }; adim(); };
    };
    ciz(); O.soyle(ks[0].en);
  };

  /* 2. Hafıza (resim-kelime eşleştirme; tahtada iki takım sırayla) */
  G.hafiza = (kok, ctx) => {
    const n = ctx.mod === 'tel' ? 6 : Math.min(10, ctx.kelimeler.length), ks = O.sec(ctx.kelimeler, n);
    const kartlar = O.karistir(ks.flatMap((k, j) => [{ j, y: `<span class="emo">${k.e}</span>` }, { j, y: `<span class="kelime">${esc(k.en)}</span>` }]));
    const tk = ctx.mod === 'tel' ? null : [0, 0]; let sira = 0, acik = [], bulunan = 0, hamle = 0, kilit = false;
    const takimlar = ctx.oyuncular && ctx.oyuncular.length === 2 ? ctx.oyuncular : ['Team A', 'Team B'];
    h(kok, ust('Memory', '<span data-durum></span>') + `<div class="hafiza n${kartlar.length}">${kartlar.map((c, x) => `<button class="hk" data-x="${x}"><span class="arka">?</span><span class="on">${c.y}</span></button>`).join('')}</div>`);
    const durum = () => kok.querySelector('[data-durum]').innerHTML = tk ? takimlar.map((t, x) => `<span class="takim t${x} ${x === sira ? 'sira' : ''}">${esc(t)}: ${tk[x]}</span>`).join(' ') : `Hamle: ${hamle}`;
    durum();
    kok.querySelectorAll('.hk').forEach(b => b.onclick = () => {
      if (kilit || b.classList.contains('acik')) return; b.classList.add('acik'); acik.push(b);
      const k = ks[kartlar[b.dataset.x].j]; if (kartlar[b.dataset.x].y.includes('kelime')) O.soyle(k.en);
      if (acik.length < 2) return; hamle++; kilit = true;
      const [a, c] = acik;
      if (kartlar[a.dataset.x].j === kartlar[c.dataset.x].j) { O.bip('dogru'); a.classList.add('bulundu', tk ? 't' + sira : 'x'); c.classList.add('bulundu', tk ? 't' + sira : 'x'); if (tk) tk[sira]++; bulunan++; acik = []; kilit = false; durum();
        if (bulunan === n) sonra(() => bitir(kok, ctx, tk ? { t: 'hafiza', o: tk[0] === tk[1] ? 'Berabere' : takimlar[tk[0] > tk[1] ? 0 : 1], p: Math.max(...tk), m: n, takim: takimlar.map((t, x) => [t, tk[x]]) } : { t: 'hafiza', p: Math.max(0, n * 2 - (hamle - n)), m: n * 2 },
          tk ? (tk[0] === tk[1] ? 'Berabere!' : takimlar[tk[0] > tk[1] ? 0 : 1] + ' kazandı!') : 'Hepsini buldun!'), 700);
      } else { O.bip('yanlis'); sonra(() => { a.classList.remove('acik'); c.classList.remove('acik'); acik = []; kilit = false; if (tk) { sira = 1 - sira; durum(); } }, 1100); }
    });
  };

  /* 3. Halat çekme düellosu — iki oyuncu aynı anda; telefonda yüz yüze (üst yarı ters) */
  G.halat = (kok, ctx) => {
    const ad = ctx.oyuncular && ctx.oyuncular.length === 2 ? ctx.oyuncular : ['Player 1', 'Player 2'];
    const HEDEF = 5; let ip = 0, kilit = [0, 0], soru, puan = [0, 0], tur = 0;
    h(kok, `<div class="halat ${ctx.mod === 'tel' ? 'yuzyuze' : ''}">
      <div class="taraf t0" data-t="0"><div class="ad">${esc(ad[0])} <b data-p0>0</b></div><div class="soru-alan"></div></div>
      <div class="ip-alan"><div class="ip"><span class="dugum">🪢</span></div><div class="cizgi c0"></div><div class="cizgi c1"></div><button class="btn kucuk" data-ses>🔊</button></div>
      <div class="taraf t1" data-t="1"><div class="ad">${esc(ad[1])} <b data-p1>0</b></div><div class="soru-alan"></div></div></div>`);
    const yeni = () => {
      tur++; const k = O.sec(ctx.kelimeler, 1)[0]; const tip = tur % 3; // 0: resim->kelime 1: ses->resim 2: Türkçe->kelime
      soru = { k, sec: [secenekler(k, ctx, 3), secenekler(k, ctx, 3)] }; G._soru = soru;
      [0, 1].forEach(t => {
        const al = kok.querySelector(`.t${t} .soru-alan`);
        al.innerHTML = `<div class="ipucu">${tip === 0 ? `<span class="emo">${k.e}</span>` : tip === 1 ? '🔊 <small>Listen!</small>' : esc(k.tr)}</div>
          <div class="secim">${soru.sec[t].map(s => `<button class="btn sec" data-en="${esc(s.en)}">${tip === 1 ? `<span class="emo">${s.e}</span>` : esc(s.en)}</button>`).join('')}</div>`;
        al.querySelectorAll('.sec').forEach(b => b.onclick = () => cevap(t, b));
      });
      if (tip === 1) O.soyle(k.en);
    };
    const cevap = (t, b) => {
      if (kilit[t] > Date.now()) return;
      if (b.dataset.en === soru.k.en) {
        O.bip('dogru'); puan[t]++; ip += t === 0 ? -1 : 1; kok.querySelector('[data-p' + t + ']').textContent = puan[t];
        kok.querySelector('.ip').style.transform = `translateX(${ip * (50 / HEDEF)}%)`; O.soyle(soru.k.en);
        if (Math.abs(ip) >= HEDEF) { const k = ip < 0 ? 0 : 1; return sonra(() => bitir(kok, ctx, { t: 'halat', o: ad[k], p: puan[k], m: puan[0] + puan[1], takim: [[ad[0], puan[0]], [ad[1], puan[1]]] }, ad[k] + ' kazandı! 🎉'), 600); }
        yeni();
      } else { O.bip('yanlis'); b.classList.add('yanlis'); kilit[t] = Date.now() + 1500; kok.querySelector('.t' + t).classList.add('kilitli'); sonra(() => kok.querySelector('.t' + t)?.classList.remove('kilitli'), 1500); }
    };
    kok.querySelector('[data-ses]').onclick = () => O.soyle(soru.k.en);
    yeni();
  };

  /* 4. 1 Dakika Kelime — 60 saniyede en çok doğru */
  G.dakika = (kok, ctx) => {
    let kalan = 60, dogru = 0, yanlis = 0, k; const havuz = ctx.dakikaHavuz || ctx.kelimeler;
    const ciz = () => {
      k = O.sec(havuz, 1)[0]; const tip = Math.random() < .5; G._soru = { k };
      kok.querySelector('.dk-soru').innerHTML = `<div class="ipucu">${tip ? `<span class="emo">${k.e}</span>` : `<span class="tr">${esc(k.tr)}</span>`}</div>
        <div class="secim d4">${secenekler(k, { havuz: ctx.havuz.concat(havuz) }, 4).map(s => `<button class="btn sec" data-en="${esc(s.en)}">${esc(s.en)}</button>`).join('')}</div>`;
      kok.querySelectorAll('.sec').forEach(b => b.onclick = () => { if (b.dataset.en === k.en) { dogru++; O.bip('dogru'); O.leitnerYaz(k.en, true); } else { yanlis++; O.bip('yanlis'); O.leitnerYaz(k.en, false); }
        kok.querySelector('[data-skor]').textContent = dogru; ciz(); });
    };
    h(kok, `<div class="dakika">${ust('1 Minute Challenge', '⏱ <b data-kalan>60</b> · ✓ <b data-skor>0</b>')}<div class="sure"><i></i></div><div class="dk-soru"></div></div>`);
    ciz();
    sayac(() => { kalan--; kok.querySelector('[data-kalan]').textContent = kalan; kok.querySelector('.sure i').style.width = (kalan / 60 * 100) + '%';
      if (kalan <= 0) { G.dur(); bitir(kok, ctx, { t: 'dakika', p: dogru, m: dogru + yanlis, sn: 60 }, `1 dakikada ${dogru} kelime!`); } }, 1000);
  };

  /* 5. Harf Avı — karışık harflerden kelimeyi kur, 60 saniye */
  G.harf = (kok, ctx) => {
    const uygun = (ctx.dakikaHavuz || ctx.kelimeler).filter(k => /^[a-z]{3,9}$/i.test(k.en));
    let kalan = 60, cozulen = 0, k, yazilan = '';
    const ciz = () => {
      k = O.sec(uygun, 1)[0]; yazilan = '';
      let harfler = O.karistir(k.en.toUpperCase().split('')); if (harfler.join('') === k.en.toUpperCase() && k.en.length > 1) harfler = harfler.reverse();
      kok.querySelector('.ha-soru').innerHTML = `<div class="ipucu"><span class="emo">${k.e}</span><small>${esc(k.tr)}</small></div>
        <div class="yazilan">${k.en.split('').map(() => '<i></i>').join('')}</div>
        <div class="harfler">${harfler.map((x, j) => `<button class="btn harf" data-j="${j}">${x}</button>`).join('')}</div>
        <div class="oyun-alt"><button class="btn" data-sil>⌫</button><button class="btn" data-gec>Geç ⏭</button></div>`;
      const kutular = kok.querySelectorAll('.yazilan i');
      kok.querySelectorAll('.harf').forEach(b => b.onclick = () => { if (b.disabled) return; b.disabled = true; kutular[yazilan.length].textContent = b.textContent; kutular[yazilan.length].dataset.j = b.dataset.j; yazilan += b.textContent;
        if (yazilan.length === k.en.length) { if (yazilan === k.en.toUpperCase()) { cozulen++; O.bip('dogru'); O.soyle(k.en); kok.querySelector('[data-skor]').textContent = cozulen; sonra(ciz, 500); }
          else { O.bip('yanlis'); kok.querySelector('.yazilan').classList.add('salla'); sonra(() => { yazilan = ''; kutular.forEach(x => x.textContent = ''); kok.querySelectorAll('.harf').forEach(x => x.disabled = false); kok.querySelector('.yazilan').classList.remove('salla'); }, 500); } } });
      kok.querySelector('[data-sil]').onclick = () => { if (!yazilan) return; const kt = kutular[yazilan.length - 1]; kok.querySelector(`.harf[data-j="${kt.dataset.j}"]`).disabled = false; kt.textContent = ''; yazilan = yazilan.slice(0, -1); };
      kok.querySelector('[data-gec]').onclick = ciz;
    };
    h(kok, `<div class="harfavi">${ust('Letter Hunt', '⏱ <b data-kalan>60</b> · ✓ <b data-skor>0</b>')}<div class="sure"><i></i></div><div class="ha-soru"></div></div>`);
    if (!uygun.length) return h(kok, '<p>Bu ünitede harf avına uygun tek kelime yok.</p>');
    ciz();
    sayac(() => { kalan--; kok.querySelector('[data-kalan]').textContent = kalan; kok.querySelector('.sure i').style.width = (kalan / 60 * 100) + '%';
      if (kalan <= 0) { G.dur(); bitir(kok, ctx, { t: 'harf', p: cozulen, sn: 60 }, `1 dakikada ${cozulen} kelime kurdun!`); } }, 1000);
  };

  /* 6. Cümle kur */
  G.cumle = (kok, ctx) => {
    const cs = ctx.u.cumle.o; let i = 0, dogru = 0, secilen = [];
    const ciz = () => {
      const c = cs[i], parca = c.split(' '); secilen = [];
      let kar = O.karistir(parca.map((w, j) => ({ w, j }))); if (kar.every((x, j) => x.j === j) && parca.length > 1) kar = kar.reverse();
      h(kok, ust('Build the Sentence', `${i + 1} / ${cs.length} · ✓ ${dogru}`) + `
        <p class="kalip">🧩 ${esc(ctx.u.cumle.k)}</p>
        <div class="cumle-hedef"></div>
        <div class="cumle-parca">${kar.map(x => `<button class="btn parca" data-w="${esc(x.w)}">${esc(x.w)}</button>`).join('')}</div>
        <div class="oyun-alt"><button class="btn" data-sil>⌫ Geri al</button><button class="btn" data-ses>🔊</button><button class="btn ana" data-kontrol>Kontrol et ✓</button></div>`);
      const hedef = kok.querySelector('.cumle-hedef');
      kok.querySelectorAll('.parca').forEach(b => b.onclick = () => { if (b.disabled) return; b.disabled = true; secilen.push(b); hedef.insertAdjacentHTML('beforeend', `<span class="parca-yer">${b.innerHTML}</span>`); });
      kok.querySelector('[data-sil]').onclick = () => { const b = secilen.pop(); if (b) { b.disabled = false; hedef.lastElementChild.remove(); } };
      kok.querySelector('[data-ses]').onclick = () => O.soyle(c);
      kok.querySelector('[data-kontrol]').onclick = () => {
        const cevap = secilen.map(b => b.dataset.w).join(' ');
        if (cevap === c) { dogru++; O.bip('dogru'); hedef.classList.add('dogru'); O.soyle(c); sonra(sonraki, 1300); }
        else { O.bip('yanlis'); hedef.classList.add('salla'); sonra(() => hedef.classList.remove('salla'), 500); }
      };
    };
    const sonraki = () => { i++; if (i >= cs.length) return bitir(kok, ctx, { t: 'cumle', p: dogru, m: cs.length }, 'Cümleler tamam!'); ciz(); };
    ciz();
  };

  /* 7. Ne eksik? (tahta sınıf oyunu) */
  G.eksik = (kok, ctx) => {
    let tur = 0, dogru = 0; const TUR = 5;
    const oyna = () => {
      tur++; const ks = O.sec(ctx.kelimeler, Math.min(6, ctx.kelimeler.length)), gizli = O.sec(ks, 1)[0];
      h(kok, ust("What's missing?", `Tur ${tur}/${TUR} · ✓ ${dogru}`) + `<p class="yonerge">Look and remember! 👀</p>
        <div class="eksik-izgara">${ks.map(k => `<div class="ek" data-en="${esc(k.en)}"><span class="emo">${k.e}</span><b>${esc(k.en)}</b></div>`).join('')}</div>`);
      sonra(() => { kok.querySelector('.yonerge').textContent = 'Close your eyes! 🙈'; kok.querySelector('.eksik-izgara').classList.add('kapali'); }, 6000);
      sonra(() => {
        const g = kok.querySelector(`.ek[data-en="${CSS.escape(gizli.en)}"]`); g.classList.add('bos'); g.innerHTML = '<span class="emo">❓</span>';
        kok.querySelector('.eksik-izgara').classList.remove('kapali'); kok.querySelector('.yonerge').textContent = "Open your eyes! What's missing?";
        kok.insertAdjacentHTML('beforeend', `<div class="secim d4">${secenekler(gizli, { havuz: ks }, 4).map(s => `<button class="btn sec" data-en="${esc(s.en)}">${esc(s.en)}</button>`).join('')}</div>`);
        kok.querySelectorAll('.sec').forEach(b => b.onclick = () => { const ok = b.dataset.en === gizli.en; O.bip(ok ? 'dogru' : 'yanlis'); if (ok) dogru++;
          g.innerHTML = `<span class="emo">${gizli.e}</span><b>${esc(gizli.en)}</b>`; g.classList.add(ok ? 'dogru' : 'yanlis'); O.soyle(gizli.en);
          kok.querySelectorAll('.sec').forEach(x => x.disabled = true); sonra(() => tur < TUR ? oyna() : bitir(kok, ctx, { t: 'eksik', p: dogru, m: TUR }), 1800); });
      }, 8000);
    };
    oyna();
  };

  /* 8. Kelime avı (dokunarak sürükle) — ızgara üretici A4 kâğıt için de kullanılır */
  G.izgaraUret = (kelimeler, N, tohum) => {
    N = N || 10; let r = tohum || 7; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    const g = Array.from({ length: N }, () => Array(N).fill('')), yer = [];
    const yonler = [[0, 1], [1, 0], [1, 1]];
    kelimeler.map(k => k.toUpperCase().replace(/[^A-Z]/g, '')).filter(w => w.length >= 3 && w.length <= N).sort((a, b) => b.length - a.length).forEach(w => {
      for (let d = 0; d < 200; d++) {
        const [dy, dx] = yonler[Math.floor(rnd() * yonler.length)], y = Math.floor(rnd() * (N - dy * (w.length - 1))), x = Math.floor(rnd() * (N - dx * (w.length - 1)));
        if (w.split('').every((c, j) => !g[y + dy * j][x + dx * j] || g[y + dy * j][x + dx * j] === c)) { w.split('').forEach((c, j) => g[y + dy * j][x + dx * j] = c); yer.push({ w, y, x, dy, dx }); return; }
      }
    });
    const A = 'ABCDEFGHIJKLMNOPRSTUVWY'; g.forEach(s => s.forEach((c, j) => { if (!c) s[j] = A[Math.floor(rnd() * A.length)]; }));
    return { g, yer };
  };
  G.av = (kok, ctx) => {
    const { g, yer } = G.izgaraUret(ctx.kelimeler.map(k => k.en), ctx.mod === 'tel' ? 8 : 10, Math.floor(Math.random() * 1e5));
    const N = g.length; let bas = null, bulunan = new Set(); const t0 = Date.now();
    h(kok, ust('Word Search', `<span data-say>0</span> / ${yer.length}`) + `<div class="av-duzen"><div class="av-izgara" style="--n:${N}">${g.map((s, y) => s.map((c, x) => `<span data-y="${y}" data-x="${x}">${c}</span>`).join('')).join('')}</div>
      <ul class="av-liste">${yer.map(p => { const k = ctx.kelimeler.find(k => k.en.toUpperCase().replace(/[^A-Z]/g, '') === p.w); return `<li data-w="${p.w}">${k ? k.e : ''} ${p.w}</li>`; }).join('')}</ul></div>`);
    const iz = kok.querySelector('.av-izgara'), hucre = (y, x) => iz.querySelector(`[data-y="${y}"][data-x="${x}"]`);
    const yol = (a, b) => { const dy = Math.sign(b.y - a.y), dx = Math.sign(b.x - a.x), n = Math.max(Math.abs(b.y - a.y), Math.abs(b.x - a.x));
      if (!(a.y === b.y || a.x === b.x || Math.abs(b.y - a.y) === Math.abs(b.x - a.x))) return []; return Array.from({ length: n + 1 }, (_, j) => ({ y: a.y + dy * j, x: a.x + dx * j })); };
    const nokta = e => { const el = document.elementFromPoint(e.clientX, e.clientY); return el && el.dataset && el.dataset.y != null ? { y: +el.dataset.y, x: +el.dataset.x } : null; };
    const temizle = () => iz.querySelectorAll('.sec').forEach(x => x.classList.remove('sec'));
    iz.onpointerdown = e => { bas = nokta(e); iz.setPointerCapture(e.pointerId); };
    iz.onpointermove = e => { if (!bas) return; const n = nokta(e); if (!n) return; temizle(); yol(bas, n).forEach(p => hucre(p.y, p.x).classList.add('sec')); };
    iz.onpointerup = e => { if (!bas) return; const n = nokta(e) || bas, p = yol(bas, n), w = p.map(q => g[q.y][q.x]).join(''), wr = w.split('').reverse().join(''); bas = null; temizle();
      const bul = yer.find(q => (q.w === w || q.w === wr) && !bulunan.has(q.w));
      if (bul) { bulunan.add(bul.w); O.bip('dogru'); p.forEach(q => hucre(q.y, q.x).classList.add('bulundu')); kok.querySelector(`[data-w="${bul.w}"]`).classList.add('bulundu'); kok.querySelector('[data-say]').textContent = bulunan.size;
        const k = ctx.kelimeler.find(k => k.en.toUpperCase().replace(/[^A-Z]/g, '') === bul.w); if (k) O.soyle(k.en);
        if (bulunan.size === yer.length) sonra(() => bitir(kok, ctx, { t: 'av', p: yer.length, m: yer.length, sn: Math.round((Date.now() - t0) / 1000) }, `${Math.round((Date.now() - t0) / 1000)} saniyede buldun!`), 800); } };
  };

  /* 9. Çarkıfelek — kelime ya da öğrenci adı çevirir */
  G.cark = (kok, ctx) => {
    const dilimler = (ctx.carkAdlari && ctx.carkAdlari.length ? ctx.carkAdlari.map(a => ({ en: a, e: '🙋' })) : ctx.kelimeler).slice(0, 16);
    const n = dilimler.length, renk = ['#e4572e', '#29335c', '#f3a712', '#669bbc', '#a8c686', '#8e5572', '#3c91e6', '#ff8c42'];
    const dilim = (j) => { const a0 = (j / n) * 2 * Math.PI - Math.PI / 2, a1 = ((j + 1) / n) * 2 * Math.PI - Math.PI / 2, r = 48;
      const p = (a) => `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`, am = (a0 + a1) / 2;
      return `<path d="M50,50 L${p(a0)} A${r},${r} 0 0 1 ${p(a1)} Z" fill="${renk[j % renk.length]}"/><text x="${50 + 31 * Math.cos(am)}" y="${50 + 31 * Math.sin(am)}" transform="rotate(${am * 180 / Math.PI} ${50 + 31 * Math.cos(am)} ${50 + 31 * Math.sin(am)})" font-size="${n > 10 ? 4 : 5}" fill="#fff" text-anchor="middle" dominant-baseline="middle">${esc(dilimler[j].en.slice(0, 14))}</text>`; };
    h(kok, ust('Spin the Wheel', ctx.carkAdlari ? 'Öğrenci seç' : 'Kelime seç') + `<div class="cark-duzen"><div class="cark-kap"><div class="ok">▼</div>
      <svg viewBox="0 0 100 100" class="cark">${dilimler.map((_, j) => dilim(j)).join('')}<circle cx="50" cy="50" r="6" fill="#fff"/></svg></div>
      <div class="cark-sonuc"><p class="soluk">Çarkı çevir!</p></div></div><div class="oyun-alt"><button class="btn ana" data-cevir>🎡 Spin!</button></div>`);
    let aci = 0;
    kok.querySelector('[data-cevir]').onclick = () => {
      const j = Math.floor(Math.random() * n); aci += 360 * 5 + (360 - (j + .5) * 360 / n) - (aci % 360);
      const svg = kok.querySelector('.cark'); svg.style.transform = `rotate(${aci}deg)`;
      sonra(() => { const d = dilimler[j]; O.bip('dogru');
        kok.querySelector('.cark-sonuc').innerHTML = ctx.carkAdlari ? `<p class="buyuk">🙋 ${esc(d.en)}</p><p>Your turn!</p>`
          : `<p class="emo dev">${d.e}</p><p class="buyuk">${esc(d.en)}</p><p>Make a sentence with <b>${esc(d.en)}</b>! ⏱ 20</p>`; if (!ctx.carkAdlari) O.soyle(d.en); }, 4100);
    };
  };

  /* 10. Bingo — çağırıcı (kartlar A4'ten basılır) */
  G.bingo = (kok, ctx) => {
    const sira = O.karistir(ctx.kelimeler.slice()); let i = -1;
    h(kok, ust('Bingo Caller', '<span data-n>0</span> / ' + sira.length) + `<div class="bingo"><div class="bingo-simdi"><p class="soluk">▶ ile başlat. Öğrenciler kartında kelimeyi bulup işaretler.</p></div>
      <div class="bingo-gecmis"></div></div><div class="oyun-alt"><button class="btn" data-tekrar>🔊 Tekrar</button><button class="btn" data-goster>👁 Göster</button><button class="btn ana" data-sonraki>▶ Sonraki</button></div>`);
    const simdi = kok.querySelector('.bingo-simdi');
    kok.querySelector('[data-sonraki]').onclick = () => { if (i >= sira.length - 1) return; i++; const k = sira[i]; kok.querySelector('[data-n]').textContent = i + 1;
      simdi.innerHTML = '<p class="buyuk">🔊 Listen…</p>'; O.soyle(k.en);
      kok.querySelector('.bingo-gecmis').insertAdjacentHTML('afterbegin', `<span>${k.e} ${esc(k.en)}</span>`); };
    kok.querySelector('[data-tekrar]').onclick = () => i >= 0 && O.soyle(sira[i].en);
    kok.querySelector('[data-goster]').onclick = () => { if (i < 0) return; const k = sira[i]; simdi.innerHTML = `<span class="emo dev">${k.e}</span><p class="buyuk">${esc(k.en)}</p>`; };
  };

  /* 11. Sohbet simülasyonu — yabancı arkadaşla */
  G.sohbet = (kok, ctx) => {
    const ark = ARKADAS[ctx.u.s], sh = ctx.u.sohbet; let i = 0, puan = 0, deneme = 0;
    h(kok, `<div class="sohbet"><div class="sohbet-ust"><span class="avatar">${ark.simge}</span><div><b>${esc(ark.ad)}</b><small>${esc(ark.yer)} · ${ark.yas} yaşında</small></div><span class="cevrimici">● online</span></div>
      <div class="mesajlar"></div><div class="sohbet-secim"></div></div>`);
    const mesajlar = kok.querySelector('.mesajlar'), secim = kok.querySelector('.sohbet-secim');
    const balon = (kim, metin) => { mesajlar.insertAdjacentHTML('beforeend', `<div class="balon ${kim}">${kim === 'o' ? `<span class="av">${ark.simge}</span>` : ''}<p>${esc(metin)}</p>${kim === 'o' ? '<button class="ses-b" title="Dinle">🔊</button>' : ''}</div>`);
      const b = mesajlar.lastElementChild.querySelector('.ses-b'); if (b) b.onclick = () => O.soyle(metin, ark.ses); mesajlar.scrollTop = 1e6; };
    const yaziyor = (cb) => { mesajlar.insertAdjacentHTML('beforeend', `<div class="balon o yaz"><span class="av">${ark.simge}</span><p>…</p></div>`); mesajlar.scrollTop = 1e6; sonra(() => { mesajlar.querySelector('.yaz')?.remove(); cb(); }, 900); };
    const adim = () => {
      if (i >= sh.length) { yaziyor(() => { balon('o', `It was fun talking to you! Bye! 👋`); O.soyle(`It was fun talking to you! Bye!`, ark.ses); });
        secim.innerHTML = ''; return sonra(() => bitir(secim, ctx, { t: 'sohbet', p: puan, m: sh.length * 2 }, `${ark.ad} ile sohbet tamam!`), 2200); }
      const [soz, dogru, y1, y2] = sh[i]; deneme = 0;
      yaziyor(() => { balon('o', soz); O.soyle(soz, ark.ses);
        const s = O.karistir([dogru, y1, y2]);
        secim.innerHTML = `<p class="soluk">Cevabını seç${O.dinleVar() ? ' ya da 🎤 ile söyle' : ''}:</p>${s.map(x => `<button class="btn cevap">${esc(x)}</button>`).join('')}${O.dinleVar() ? '<button class="btn mikrofon">🎤 Söyle</button>' : ''}`;
        const kabul = (metin) => { puan += deneme === 0 ? 2 : 1; O.bip('dogru'); balon('ben', metin); i++; secim.innerHTML = ''; sonra(adim, 600); };
        const red = (b) => { deneme++; O.bip('yanlis'); if (b) b.classList.add('yanlis'); yaziyor(() => balon('o', deneme > 1 ? `Hmm… Try: "${dogru}" 🙂` : 'Sorry? I don\'t understand. 🤔')); };
        secim.querySelectorAll('.cevap').forEach(b => b.onclick = () => b.textContent === dogru ? kabul(dogru) : red(b));
        const m = secim.querySelector('.mikrofon');
        if (m) m.onclick = () => { m.textContent = '🎙 Dinliyorum…'; O.dinle(ark.ses).then(alt => { const en = Math.max(...alt.map(a => O.benzerlik(a, dogru)));
          if (en >= .6) kabul(alt[0]); else { red(); m.textContent = '🎤 Tekrar söyle'; secim.insertAdjacentHTML('afterbegin', `<p class="soluk">Duyduğum: “${esc(alt[0])}”</p>`); } }).catch(() => { m.textContent = '🎤 (mikrofon kapalı)'; }); };
      });
    };
    adim();
  };

  /* 12. Konuşma Sınavı Provası — yabancı arkadaş sınav yapar; sesli cevap yazıya dökülür ve puanlama anahtarıyla puanlanır */
  G.konusmaPuan = (metin, model, kelimeler, kalip, soru) => {
    const t = s => s.toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/).filter(Boolean), W = t(metin);
    const qk = t(soru || '').filter(w => w.length > 3 && !['what', 'your', 'this', 'that', 'have', 'does', 'with', 'about', 'there'].includes(w));
    const qOrt = qk.length ? qk.filter(w => W.includes(w)).length / qk.length : 0;
    const icerik = W.length ? Math.max(1, Math.round(Math.min(1, Math.max(O.benzerlik(metin, model) * 1.6, qOrt * 1.2 + (W.length >= 4 ? .25 : 0))) * 4)) : 0;
    const duz = ' ' + W.join(' ') + ' ';
    const kul = Array.from(new Set(kelimeler.filter(k => { const w = t(k.en).join(' '); return w && duz.includes(' ' + w + ' '); }).map(k => k.en)));
    const kalipK = t(kalip.replace(/___/g, '')).filter(w => w.length > 2), kalipVar = kalipK.length ? kalipK.filter(w => W.includes(w)).length / kalipK.length : 0;
    const akici = W.length >= 8 ? 4 : W.length >= 5 ? 3 : W.length >= 3 ? 2 : W.length ? 1 : 0;
    return { icerik, kelime: Math.min(4, kul.length * 2 + (W.length >= 4 ? 1 : 0)), kalip: Math.round(kalipVar * 4), akici, kul, n: W.length };
  };
  G.konusma = (kok, ctx) => {
    const ark = ARKADAS[ctx.u.s], havuz = (ctx.konusmaSorular || ctx.u.sohbet.map(t => [t[0], t[1]])).slice(0, 5);
    let i = 0, toplam = 0; const satirlar = [];
    const SURE = 30;
    h(kok, `<div class="konusma"><div class="ks-ust"><span class="avatar">${ark.simge}</span><div><b>Speaking Exam · ${esc(ark.ad)}</b><small>Konuşma sınavı provası · ${havuz.length} soru · her soru 30 sn</small></div><span class="ks-no"></span></div>
      <div class="ks-govde"></div></div>`);
    const govde = kok.querySelector('.ks-govde');
    const soru = () => {
      if (i >= havuz.length) return son();
      const [q, model] = havuz[i]; let kalan = SURE, dinliyor = false, metin = '';
      kok.querySelector('.ks-no').textContent = `${i + 1} / ${havuz.length}`;
      govde.innerHTML = `<div class="ks-soru"><span class="ark">${ark.simge}</span><p>${esc(q)}</p><button class="btn kucuk" data-tekrar>🔊</button></div>
        <div class="ks-sure"><i></i><b>${SURE}</b></div>
        <div class="ks-cevap"><p class="soluk">Cevabını yüksek sesle söyle. Tam cümle kur!</p><p class="ks-metin"></p></div>
        <div class="oyun-alt">${O.dinleVar() ? '<button class="btn ana buyuk-btn" data-mik>🎤 Konuşmaya başla</button>' : ''}<button class="btn" data-ipucu>💡 İpucu</button><button class="btn" data-bitti>✓ Bitirdim</button></div>
        ${O.dinleVar() ? '' : '<p class="soluk orta-k">Bu tarayıcı sesi yazıya dökemiyor: cevabı söyle, öğretmenin puanlasın (Bitirdim\'e dokun).</p>'}`;
      O.soyle(q, ark.ses);
      govde.querySelector('[data-tekrar]').onclick = () => O.soyle(q, ark.ses);
      govde.querySelector('[data-ipucu]').onclick = e => { e.target.outerHTML = `<span class="ks-ipucu">💡 ${esc(ctx.u.cumle.k)}</span>`; };
      const zaman = sayac(() => { kalan--; const b = govde.querySelector('.ks-sure b'); if (!b) return; b.textContent = kalan; govde.querySelector('.ks-sure i').style.width = (kalan / SURE * 100) + '%'; if (kalan <= 0) bitir_(); }, 1000);
      const bitir_ = () => { clearInterval(zaman); degerlendir(q, model, metin); };
      govde.querySelector('[data-bitti]').onclick = bitir_;
      const mik = govde.querySelector('[data-mik]');
      if (mik) mik.onclick = () => { if (dinliyor) return; dinliyor = true; mik.textContent = '🎙 Dinliyorum…'; mik.classList.add('dinliyor');
        O.dinle(ark.ses).then(alt => { metin = alt[0]; govde.querySelector('.ks-metin').textContent = '“' + metin + '”'; mik.textContent = '🎤 Yeniden söyle'; mik.classList.remove('dinliyor'); dinliyor = false; })
          .catch(() => { mik.textContent = '🎤 Mikrofon izni yok'; dinliyor = false; }); };
    };
    const degerlendir = (q, model, metin) => {
      const p = G.konusmaPuan(metin, model, ctx.havuz.concat(ctx.kelimeler), ctx.u.cumle.k, q), top = metin ? p.icerik + p.kelime + p.kalip + p.akici : null;
      const satir = (ad, v) => `<div class="ks-cubuk"><span>${ad}</span><i><b style="width:${v * 25}%"></b></i><em>${v}/4</em></div>`;
      govde.innerHTML = `<div class="ks-sonuc"><h3>${top == null ? 'Öğretmen puanı' : top >= 12 ? 'Excellent! 🌟' : top >= 8 ? 'Good job! 👍' : 'Keep practising! 💪'}</h3>
        ${metin ? `<p class="ks-metin">Senin cevabın: “${esc(metin)}”</p>${satir('İçerik', p.icerik)}${satir('Kelime', p.kelime)}${satir('Kalıp', p.kalip)}${satir('Akıcılık', p.akici)}
          ${p.kul.length ? `<p>✅ Kullandığın ünite kelimeleri: <b>${p.kul.map(esc).join(', ')}</b></p>` : ''}`
        : `<div class="ogr-puan">${[0, 1, 2, 3, 4].map(n => `<button class="btn" data-op="${n * 4}">${n * 4}</button>`).join('')}</div>`}
        <p class="model">🗣️ Örnek cevap: <b>${esc(model)}</b> <button class="btn kucuk" data-model>🔊</button></p>
        <div class="oyun-alt"><button class="btn ana" data-sonraki>Sonraki soru ▶</button></div></div>`;
      const ileri = (puan) => { toplam += puan; satirlar.push({ q, metin, puan }); i++; soru(); };
      govde.querySelector('[data-model]').onclick = () => O.soyle(model, ark.ses);
      govde.querySelectorAll('[data-op]').forEach(b => b.onclick = () => { govde.querySelectorAll('[data-op]').forEach(x => x.classList.remove('ana')); b.classList.add('ana'); govde.dataset.op = b.dataset.op; });
      govde.querySelector('[data-sonraki]').onclick = () => ileri(top == null ? Number(govde.dataset.op || 0) : top);
    };
    const son = () => bitir(kok, ctx, { t: 'konusma', p: toplam, m: havuz.length * 16 }, `Konuşma sınavı provası bitti!`);
    soru();
  };

  /* ---------- Ünite oyunları: karakter seçimi + Yerleştir / Sırala / Bilmece ---------- */
  const KARAKTERLER = [{ e: '👧🏻', ad: 'Girl' }, { e: '👧🏽', ad: 'Girl' }, { e: '👦🏻', ad: 'Boy' }, { e: '👦🏽', ad: 'Boy' }];
  const OVGU = ['Great job!', 'Well done!', 'Super!', 'Excellent!', 'Fantastic!', 'You got it!'];
  G.karakterSec = (kok, ctx, devam) => {
    if (ctx.karakter) return devam(ctx.karakter);
    h(kok, `<div class="karakter-sec"><h2>${esc(ctx.uo.ikon)} ${esc(ctx.uo.ad)}</h2><p class="soluk">Karakterini seç! · Choose your player!</p>
      <div class="kar-liste">${KARAKTERLER.map((k, i) => `<button class="kar" data-k="${i}"><span class="emo">${k.e}</span><b>${k.ad === 'Girl' ? 'Kız' : 'Erkek'}</b></button>`).join('')}</div></div>`);
    kok.querySelectorAll('[data-k]').forEach(b => b.onclick = () => { const k = KARAKTERLER[+b.dataset.k]; O.ayarYaz('karakter', +b.dataset.k); ctx.karakter = k; devam(k); });
  };
  const yanPanel = (k) => `<div class="kar-panel"><div class="kar-balon">Let's play! 😊</div><span class="emo kar-buyuk">${k.e}</span></div>`;
  const tepki = (kok, dogru) => { const p = kok.querySelector('.kar-panel'); if (!p) return; const b = p.querySelector('.kar-balon'), e = p.querySelector('.kar-buyuk');
    b.textContent = dogru ? O.sec(OVGU, 1)[0] + ' 🎉' : 'Try again! 💪'; e.classList.remove('zipla', 'salla'); void e.offsetWidth; e.classList.add(dogru ? 'zipla' : 'salla'); };
  const uOyun = (ad, ciz) => (kok, ctx) => G.karakterSec(kok, ctx, k => ciz(kok, ctx, k));

  /* Yerleştir: kartı doğru bölgeye sürükle ya da önce karta sonra bölgeye dokun */
  G.yer = uOyun('yer', (kok, ctx, kar) => {
    const c = ctx.uo, kartlar = O.karistir(c.o.map((o, i) => ({ en: o[0], e: o[1], b: o[2], i }))); let hata = 0, yerlesen = 0, secili = null;
    h(kok, `<div class="uo-duzen">${yanPanel(kar)}<div class="uo-ana">
      <div class="oyun-ust"><b>${esc(c.ikon)} ${esc(c.ad)}</b><span><button class="btn kucuk" data-y>🔊</button> ✓ <b data-say>0</b>/${kartlar.length}</span></div>
      <p class="yonerge kucuk-yon">${esc(c.y)}</p>
      <div class="yer-kartlar">${kartlar.map(k => `<button class="yer-kart" data-i="${k.i}"><span class="emo">${k.e}</span><b>${esc(k.en)}</b></button>`).join('')}</div>
      <div class="yer-bolgeler n${c.b.length}">${c.b.map((b, j) => `<div class="yer-bolge" data-b="${j}"><div class="yb-bas"><span class="emo">${b[1]}</span> ${esc(b[0])}</div><div class="yb-ic"></div></div>`).join('')}</div></div></div>`);
    const soyleY = () => O.soyle(c.y); kok.querySelector('[data-y]').onclick = soyleY; sonra(soyleY, 300);
    const birak = (kartEl, bolgeEl) => {
      const o = c.o[+kartEl.dataset.i], bj = +bolgeEl.dataset.b;
      if (o[2] === bj) { O.bip('dogru'); tepki(kok, true); kartEl.classList.add('yerlesti'); kartEl.disabled = true; bolgeEl.querySelector('.yb-ic').appendChild(kartEl); yerlesen++;
        kok.querySelector('[data-say]').textContent = yerlesen; O.soyle(c.k.replace('{k}', o[0]).replace('{b}', c.b[bj][0]));
        if (yerlesen === kartlar.length) sonra(() => bitir(kok, ctx, { t: 'yer', p: Math.max(0, kartlar.length - hata), m: kartlar.length }, `${kar.e} All done!`), 2200); }
      else { hata++; O.bip('yanlis'); tepki(kok, false); kartEl.classList.add('salla'); bolgeEl.classList.add('yanlis-b'); sonra(() => { kartEl.classList.remove('salla'); bolgeEl.classList.remove('yanlis-b'); }, 500); }
      secili = null; kok.querySelectorAll('.yer-kart.secili').forEach(x => x.classList.remove('secili'));
    };
    kok.querySelectorAll('.yer-kart').forEach(kEl => {
      kEl.onpointerdown = e => { if (kEl.disabled) return; const r = kEl.getBoundingClientRect(), dx = e.clientX - r.left, dy = e.clientY - r.top; let surukle = false; const x0 = e.clientX, y0 = e.clientY;
        kEl.setPointerCapture(e.pointerId);
        kEl.onpointermove = m => { if (!surukle && Math.hypot(m.clientX - x0, m.clientY - y0) < 8) return; surukle = true; kEl.classList.add('suruk');
          kEl.style.transform = `translate(${m.clientX - x0}px, ${m.clientY - y0}px)`; };
        kEl.onpointerup = u => { kEl.onpointermove = kEl.onpointerup = null; kEl.style.transform = ''; kEl.classList.remove('suruk');
          if (surukle) { kEl.style.visibility = 'hidden'; const alt = document.elementFromPoint(u.clientX, u.clientY); kEl.style.visibility = ''; const b = alt && alt.closest('.yer-bolge'); if (b) birak(kEl, b); }
          else { O.soyle(c.o[+kEl.dataset.i][0]); kok.querySelectorAll('.yer-kart.secili').forEach(x => x.classList.remove('secili')); secili = kEl; kEl.classList.add('secili'); } };
        void dx; void dy; };
    });
    kok.querySelectorAll('.yer-bolge').forEach(b => b.onclick = () => { if (secili) birak(secili, b); });
  });

  /* Sırala: adımlara doğru sırayla dokun */
  G.sira = uOyun('sira', (kok, ctx, kar) => {
    const c = ctx.uo; let di = 0, hata = 0, toplam = 0;
    const dizi = () => {
      const d = c.d[di]; let sira = 0; const kar_ = O.karistir(d.map((a, i) => ({ a, i })));
      h(kok, `<div class="uo-duzen">${yanPanel(kar)}<div class="uo-ana">
        <div class="oyun-ust"><b>${esc(c.ikon)} ${esc(c.ad)}</b><span>${c.d.length > 1 ? `${di + 1}/${c.d.length} · ` : ''}<button class="btn kucuk" data-y>🔊</button></span></div>
        <p class="yonerge kucuk-yon">${esc(c.y)}</p>
        <ol class="sira-hedef">${d.map(() => '<li class="bos"></li>').join('')}</ol>
        <div class="sira-secenek">${kar_.map(x => `<button class="btn sira-adim" data-i="${x.i}"><span class="emo">${x.a[0]}</span> ${esc(x.a[1])}</button>`).join('')}</div></div></div>`);
      kok.querySelector('[data-y]').onclick = () => O.soyle(c.y);
      kok.querySelectorAll('.sira-adim').forEach(b => b.onclick = () => {
        if (+b.dataset.i === sira) { O.bip('dogru'); tepki(kok, true); const li = kok.querySelectorAll('.sira-hedef li')[sira]; li.className = 'dolu'; li.innerHTML = b.innerHTML; b.remove(); O.soyle(d[sira][1]); sira++; toplam++;
          if (sira === d.length) sonra(() => { di++; if (di < c.d.length) dizi(); else bitir(kok, ctx, { t: 'sira', p: Math.max(0, toplam - hata), m: toplam }, `${kar.e} Perfect order!`); }, 2400); }
        else { hata++; O.bip('yanlis'); tepki(kok, false); b.classList.add('salla'); sonra(() => b.classList.remove('salla'), 450); }
      });
    };
    dizi();
  });

  /* Bilmece / Dinle-dokun */
  G.bil = uOyun('bil', (kok, ctx, kar) => {
    const c = ctx.uo, sorular = O.karistir(c.q.slice()); let i = 0, puan = 0, deneme = 0;
    const soru = () => {
      if (i >= sorular.length) return bitir(kok, ctx, { t: 'bil', p: puan, m: sorular.length }, `${kar.e} Riddle master!`);
      const [ipucu, cevap, e] = sorular[i]; deneme = 0; G._soru = { cevap };
      const sec = O.karistir([sorular[i]].concat(O.sec(c.q.filter(x => x[1] !== cevap), 3)));
      h(kok, `<div class="uo-duzen">${yanPanel(kar)}<div class="uo-ana">
        <div class="oyun-ust"><b>${esc(c.ikon)} ${esc(c.ad)}</b><span>${i + 1}/${sorular.length} · ✓ ${puan}</span></div>
        <div class="bil-ipucu">${c.ses ? '<span class="dinle-ikon">👂</span><span class="soluk">Dinle ve doğru resme dokun!</span>' : `<p>${esc(ipucu)}</p>`}<button class="btn" data-tekrar>🔊 Tekrar dinle</button></div>
        <div class="bil-secenek">${sec.map(s => `<button class="bil-s" data-c="${esc(s[1])}"><span class="emo">${s[2]}</span><b>${esc(s[1])}</b></button>`).join('')}</div></div></div>`);
      O.soyle(ipucu); kok.querySelector('[data-tekrar]').onclick = () => O.soyle(ipucu);
      kok.querySelectorAll('.bil-s').forEach(b => b.onclick = () => {
        if (b.dataset.c === cevap) { if (!deneme) puan++; O.bip('dogru'); tepki(kok, true); b.classList.add('dogru-s'); O.soyle(cevap); kok.querySelectorAll('.bil-s').forEach(x => x.disabled = true); sonra(() => { i++; soru(); }, 1500); }
        else { deneme++; O.bip('yanlis'); tepki(kok, false); b.classList.add('yanlis'); b.disabled = true; }
      });
    };
    soru();
  });
  G.UTUR = { yer: { ad: 'Yerleştir', ikon: '🧲', aciklama: 'Sürükle ya da dokun: doğru yere yerleştir' }, sira: { ad: 'Sırala', ikon: '🔢', aciklama: 'Adımları doğru sıraya koy' }, bil: { ad: 'Bilmece', ikon: '🕵️', aciklama: 'İpucunu oku/dinle, doğru resmi bul' } };

  G.LISTE = [
    { id: 'konusma', ad: 'Konuşma Sınavı Provası', ikon: '🎙️', aciklama: 'Sesli sorular, 30 sn cevap, otomatik puanlama anahtarı', tahta: 1, tel: 1 },
    { id: 'kart', ad: 'Kelime Kartları', ikon: '🃏', aciklama: 'Resim, kelime, Türkçe; sesli okuma', tahta: 1, tel: 1, ogretim: 1 },
    { id: 'hafiza', ad: 'Hafıza (Pelmanism)', ikon: '🧠', aciklama: 'Resim ↔ kelime eşle; iki takım', tahta: 1, tel: 1 },
    { id: 'halat', ad: 'Halat Çekme Düellosu', ikon: '🪢', aciklama: 'İki öğrenci aynı anda yarışır', tahta: 1, tel: 1, duello: 1 },
    { id: 'dakika', ad: '1 Dakika Kelime', ikon: '⏱️', aciklama: '60 saniyede en çok doğru', tahta: 1, tel: 1, duello: 1 },
    { id: 'harf', ad: 'Harf Avı', ikon: '🔠', aciklama: 'Karışık harflerden kelime kur, 60 sn', tahta: 1, tel: 1, duello: 1 },
    { id: 'cumle', ad: 'Cümle Kur', ikon: '🧩', aciklama: 'Kelimeleri sıraya diz, kalıbı öğren', tahta: 1, tel: 1 },
    { id: 'sohbet', ad: 'Yabancı Arkadaşla Sohbet', ikon: '💬', aciklama: 'Sesli diyalog simülasyonu, 🎤 ile konuşma', tahta: 1, tel: 1 },
    { id: 'eksik', ad: 'Ne Eksik?', ikon: '🙈', aciklama: 'Bak, gözlerini kapa, eksik olanı bul', tahta: 1 },
    { id: 'av', ad: 'Kelime Avı', ikon: '🔎', aciklama: 'Harf tablosunda parmakla sürükle', tahta: 1, tel: 1 },
    { id: 'cark', ad: 'Çarkıfelek', ikon: '🎡', aciklama: 'Kelime ya da öğrenci seç; cümle kur', tahta: 1 },
    { id: 'bingo', ad: 'Bingo', ikon: '🎱', aciklama: 'Sesli çağırıcı + basılı kartlar', tahta: 1 }];
})();
