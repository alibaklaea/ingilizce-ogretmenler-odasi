/* Ortak çekirdek: veri erişimi, ses, kayıt, rapor kodu, senkron. Öğretmen, tahta ve öğrenci sayfaları kullanır. */
(function () {
  const O = window.ORTAK = {};
  const $ = O.$ = (s, k) => (k || document).querySelector(s);
  O.$$ = (s, k) => Array.from((k || document).querySelectorAll(s));
  O.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  O.karistir = (a, tohum) => { a = a.slice(); let r = tohum || Math.random() * 1e9; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor((tohum ? rnd() : Math.random()) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  O.sec = (a, n, haric) => O.karistir(a.filter(x => !haric || !haric.includes(x))).slice(0, n);

  /* ---------- veri ---------- */
  O.SINIFLAR = [2, 3, 4, 5, 6, 7, 8];
  O.sinif = s => MEB.sinif[s];
  O.kelime = str => { const [en, tr, e] = str.split('|'); return { en, tr, e }; };
  O.unite = (s, i) => {
    const m = MEB.sinif[s].uniteler[i], c = (ICERIK[s] || [])[i] || { k: [], c: { k: '', o: [] }, s: [] };
    return { s, i, ad: m.ad, meb: m, kelimeler: c.k.map(O.kelime), cumle: c.c, sohbet: c.s };
  };
  O.uniteSayisi = s => MEB.sinif[s].uniteler.length;
  O.haftalar = s => MEB.sinif[s].haftalar;
  O.tarih = d => { const [y, m, g] = d.split('-').map(Number); return new Date(y, m - 1, g); };
  O.trTarih = d => O.tarih(d).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
  /* bugünün haftası: tatildeyse bir sonraki haftayı ver */
  O.buHafta = (s, bugun) => {
    const hs = O.haftalar(s), t = bugun || new Date(); t.setHours(0, 0, 0, 0);
    for (let i = 0; i < hs.length; i++) { const b = O.tarih(hs[i].bas), son = new Date(b); son.setDate(son.getDate() + 6); if (t <= son) return i; }
    return hs.length - 1;
  };
  /* haftanın, içinde bulunduğu temadaki yeri */
  O.temaHaftalari = (s, u) => O.haftalar(s).map((h, i) => h.u === u ? i : -1).filter(i => i >= 0);
  O.ASAMALAR = [
    { ad: 'Keşif', en: 'Discover', ikon: '🔍', amac: 'Temaya ısınma, dijital hikâye / görsellerden tahmin, ilk 5 kelime', kelime: [0, 5] },
    { ad: 'Kelime', en: 'Words', ikon: '🔤', amac: 'Kelimelerin tamamı, telaffuz ve ses (phonics), kelime oyunları', kelime: [0, 10] },
    { ad: 'Kalıp', en: 'Chunks', ikon: '🧩', amac: 'Hedef dil kalıbı: örneklerden kuralı keşfetme, cümle kurma', kelime: [0, 10] },
    { ad: 'Okuma-Dinleme', en: 'Read & Listen', ikon: '👂', amac: 'Kısa metin / diyalog: genel anlam, ayrıntı, tarama', kelime: [0, 10] },
    { ad: 'Konuşma', en: 'Speak', ikon: '🗣️', amac: 'Yabancı arkadaşla sohbet, ikili konuşma, rol yapma', kelime: [0, 10] },
    { ad: 'Yazma & Görev', en: 'Write & Show', ikon: '✍️', amac: 'Modelden yazma, performans görevi, sunum ve öz değerlendirme', kelime: [0, 10] }];
  O.asama = (s, hi) => {
    const h = O.haftalar(s)[hi]; if (h.u == null) return null;
    const hs = O.temaHaftalari(s, h.u), p = hs.indexOf(hi), n = hs.length;
    let a = Math.min(5, Math.floor(p * 6 / n));
    if (p === n - 1) a = 5;
    return { no: a, ...O.ASAMALAR[a], sira: p + 1, toplam: n };
  };

  /* ---------- ses ---------- */
  let sesler = [];
  const yukle = () => { sesler = speechSynthesis.getVoices(); };
  if ('speechSynthesis' in window) { yukle(); speechSynthesis.onvoiceschanged = yukle; }
  O.sesVar = () => 'speechSynthesis' in window;
  O.soyle = (metin, dil, hiz) => {
    if (!O.sesVar()) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(metin.replace(/___/g, 'blank'));
    dil = dil || O.ayar('ses', 'en-GB'); u.lang = dil; u.rate = hiz || Number(O.ayar('hiz', 0.9));
    const ad = dil.toLowerCase();
    const v = sesler.filter(v => v.lang.toLowerCase().replace('_', '-') === ad).sort((a, b) => (/natural|online/i.test(b.name) ? 1 : 0) - (/natural|online/i.test(a.name) ? 1 : 0))[0]
      || sesler.find(v => v.lang.toLowerCase().startsWith('en'));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
    return u;
  };
  O.dinleVar = () => !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  O.dinle = (dil) => new Promise((ok, hata) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return hata('yok');
    const r = new SR(); r.lang = dil || 'en-US'; r.interimResults = false; r.maxAlternatives = 3;
    r.onresult = e => ok(Array.from(e.results[0]).map(a => a.transcript)); r.onerror = e => hata(e.error); r.start();
  });
  O.benzerlik = (a, b) => { const t = s => s.toLowerCase().replace(/[^a-z' ]/g, ' ').split(/\s+/).filter(Boolean);
    const A = t(a), B = new Set(t(b)); if (!A.length) return 0; return A.filter(w => B.has(w)).length / Math.max(A.length, B.size); };

  /* ---------- basit efekt sesi (dosyasız) ---------- */
  let ac; O.bip = (tur) => { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const o = ac.createOscillator(), g = ac.createGain(); o.connect(g); g.connect(ac.destination);
    const f = tur === 'dogru' ? [660, 880] : tur === 'yanlis' ? [220, 160] : [520, 520];
    o.frequency.setValueAtTime(f[0], ac.currentTime); o.frequency.linearRampToValueAtTime(f[1], ac.currentTime + .15);
    g.gain.setValueAtTime(.15, ac.currentTime); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + .3); o.start(); o.stop(ac.currentTime + .3); } catch (e) { } };

  /* ---------- yerel kayıt ---------- */
  O.oku = (k, v) => { try { const x = localStorage.getItem('ing.' + k); return x == null ? v : JSON.parse(x); } catch (e) { return v; } };
  O.yaz = (k, v) => { try { localStorage.setItem('ing.' + k, JSON.stringify(v)); } catch (e) { } };
  O.ayar = (k, v) => O.oku('ayar', {})[k] ?? v;
  O.ayarYaz = (k, v) => { const a = O.oku('ayar', {}); a[k] = v; O.yaz('ayar', a); };

  /* ---------- sonuç kaydı (öğrenci, tahta) ----------
     sonuç: {o: öğrenci adı | 'TAKIM', k: sınıf kodu, s: sınıf düzeyi, u: ünite, h: hafta no, t: tür, p: puan, m: en çok, sn: saniye, z: zaman} */
  O.sonucEkle = (r) => {
    r.z = r.z || Date.now(); const l = O.oku('sonuclar', []); l.push(r); O.yaz('sonuclar', l.slice(-3000));
    O.senkronGonder([r]); return r;
  };
  O.sonuclar = () => O.oku('sonuclar', []);
  O.TURLER = { kart: 'Kelime kartları', hafiza: 'Hafıza', halat: 'Halat çekme düellosu', dakika: '1 Dakika Kelime', harf: 'Harf Avı', cumle: 'Cümle kur',
    eksik: 'Ne eksik?', av: 'Kelime avı', sohbet: 'Sohbet', hiz: 'Hız düellosu', tekrar: 'Tekrar (aralıklı)', bingo: 'Bingo', cark: 'Çarkıfelek', konusma: 'Konuşma sınavı' };

  /* rapor kodu: internet/sunucu yokken öğrenci sonuçlarını WhatsApp vb. ile yollamak için */
  O.raporKodu = (liste) => 'ING1:' + btoa(unescape(encodeURIComponent(JSON.stringify(liste.map(r => [r.o, r.k, r.s, r.u, r.h, r.t, r.p, r.m, r.sn, r.z])))));
  O.raporCoz = (kod) => {
    const m = String(kod).match(/ING1:([A-Za-z0-9+/=]+)/g) || [];
    return m.flatMap(x => JSON.parse(decodeURIComponent(escape(atob(x.slice(5)))))
      .map(a => ({ o: a[0], k: a[1], s: a[2], u: a[3], h: a[4], t: a[5], p: a[6], m: a[7], sn: a[8], z: a[9] })));
  };
  O.raporBirlestir = (yeni) => { const l = O.sonuclar(), anahtar = r => [r.o, r.k, r.t, r.z].join('|'), var_ = new Set(l.map(anahtar));
    const ek = yeni.filter(r => !var_.has(anahtar(r))); O.yaz('sonuclar', l.concat(ek)); return ek.length; };

  /* ---------- senkron (isteğe bağlı Google Apps Script) ---------- */
  O.sunucu = () => O.ayar('sunucu', (window.YAPILANDIRMA || {}).sunucu || '');
  O.senkronGonder = (liste) => {
    const url = O.sunucu(); if (!url || !liste.length) return;
    const bekleyen = O.oku('bekleyen', []).concat(liste); O.yaz('bekleyen', bekleyen);
    fetch(url, { method: 'POST', body: JSON.stringify({ islem: 'kaydet', sonuclar: bekleyen }) })
      .then(r => r.json()).then(j => { if (j.ok) O.yaz('bekleyen', []); }).catch(() => { });
  };
  O.sunucuGetir = (param) => { const url = O.sunucu(); if (!url) return Promise.reject('sunucu yok');
    return fetch(url + '?' + new URLSearchParams(param)).then(r => r.json()); };

  /* ---------- sınıflar (öğretmen tanımlar; kod öğrenciye verilir) ---------- */
  O.siniflar = () => O.oku('siniflar', []);
  O.kodUret = (s, sube) => s + (sube || 'A').toUpperCase() + '-' + String(Math.floor(1000 + Math.random() * 9000));
  O.koddanSinif = kod => { const m = String(kod).match(/^(\d)/); return m ? Number(m[1]) : null; };

  /* aralıklı tekrar (Leitner, 5 kutu): kutu -> gün */
  O.KUTU_GUN = [0, 1, 2, 4, 8, 16];
  O.leitner = () => O.oku('leitner', {});
  O.leitnerYaz = (en, dogru) => { const l = O.leitner(), x = l[en] || { b: 0, z: 0 };
    x.b = dogru ? Math.min(5, x.b + 1) : 1; x.z = Date.now(); l[en] = x; O.yaz('leitner', l); };
  O.tekrarZamani = (en) => { const x = O.leitner()[en]; if (!x) return true; return Date.now() - x.z >= O.KUTU_GUN[x.b] * 864e5; };
})();
