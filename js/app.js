/* Öğretmenler Odası · English — öğretmen ve akıllı tahta uygulaması */
(function () {
  const O = ORTAK, $ = O.$, $$ = O.$$, esc = O.esc;
  const sayfa = () => $('#sayfa');
  let S = Number(O.ayar('sinif', 5));
  let H = null; // seçili hafta (null = bu hafta)
  const HS = () => H == null ? O.buHafta(S) : H;
  const sinifSec = s => { S = s; O.ayarYaz('sinif', s); document.body.dataset.sinif = s; ciz(); };
  const rozet = { claude: '<span class="rozet claude" title="Claude tarafından hazırlanan özgün içerik">✦ Claude</span>', meb: '<span class="rozet meb" title="MEB resmî kaynak">MEB</span>', dis: '<span class="rozet dis">Dış kaynak</span>' };
  const gunAdi = hi => { const h = O.haftalar(S)[hi]; return `${h.no}. hafta · ${h.tarih}`; };
  const temaAdi = (s, u) => u == null ? '' : O.sinif(s).uniteler[u].ad;
  const haftaUnite = hi => O.haftalar(S)[hi].u;

  /* ---------- dış kaynaklar (bağlantı; içerik kopyalanmaz) ---------- */
  const g = q => 'https://www.google.com/search?q=' + encodeURIComponent(q);
  const KAYNAKLAR = [
    { ad: 'Eğitimhane', ikon: '📂', not: 'Öğretmenlerin paylaştığı çalışma kâğıtları, yazılılar', url: (s, u) => g(`site:egitimhane.com ${s}. sınıf ingilizce ${u}`) },
    { ad: 'Wordwall', ikon: '🎮', not: 'Topluluk etkinlikleri (tahtada oynatılır)', url: (s, u) => 'https://wordwall.net/tr-tr/community/' + encodeURIComponent(`${s} sınıf ${u}`.toLowerCase().replace(/\s+/g, '-')) },
    { ad: 'İngilizceciyiz', ikon: '📘', not: 'Ünite testleri, kelime listeleri', url: (s, u) => g(`site:ingilizceciyiz.com ${s}. sınıf ${u}`) },
    { ad: 'Ortaokul İngilizce', ikon: '📗', not: 'Planlar, etkinlikler, sunumlar', url: (s, u) => g(`site:ortaokulingilizce.com ${s}. sınıf ${u}`) },
    { ad: 'Liveworksheets', ikon: '🖱️', not: 'Etkileşimli çalışma kâğıtları', url: (s, u) => g(`site:liveworksheets.com ${u} grade ${s}`) },
    { ad: 'ISL Collective', ikon: '🗂️', not: 'Dünyadan öğretmen kâğıtları (ücretsiz üyelik)', url: (s, u) => g(`site:islcollective.com ${u} worksheet`) },
    { ad: 'British Council Kids', ikon: '🇬🇧', not: 'Şarkı, hikâye, oyun', url: (s, u) => g(`site:learnenglishkids.britishcouncil.org ${u}`) },
    { ad: 'EBA', ikon: '🏫', not: 'MEB ders kitabı ve içerikler', url: () => 'https://www.eba.gov.tr/' },
    { ad: 'MEBİ', ikon: '🎯', not: 'MEB yazılı/LGS hazırlık platformu', url: () => 'https://mebi.eba.gov.tr/' }];
  const kaynakListe = (s, u) => { const ad = temaAdi(s, u), ozel = O.oku('kaynak.' + s + '.' + u, []);
    return `<div class="kaynaklar">${KAYNAKLAR.map(k => `<a class="kaynak" target="_blank" rel="noopener" href="${k.url(s, ad)}"><span>${k.ikon}</span><b>${k.ad}</b><small>${k.not}</small></a>`).join('')}
      ${ozel.map((k, j) => `<a class="kaynak ozel" target="_blank" rel="noopener" href="${esc(k.url)}"><span>⭐</span><b>${esc(k.ad)}</b><small>Kendi kaynağım</small><i data-ksil="${j}" title="Sil">✕</i></a>`).join('')}</div>
      <form class="satir" data-kekle="${s}.${u}"><input name="ad" placeholder="Kaynak adı (ör. Eğitimhane — Sports kâğıdı)" required><input name="url" type="url" placeholder="https://…" required><button class="btn">+ Ekle</button></form>`; };
  const kaynakBagla = () => {
    $$('[data-kekle]').forEach(f => f.onsubmit = e => { e.preventDefault(); const k = 'kaynak.' + f.dataset.kekle, l = O.oku(k, []); l.push({ ad: f.ad.value, url: f.url.value }); O.yaz(k, l); ciz(); });
    $$('[data-ksil]').forEach(x => x.onclick = e => { e.preventDefault(); const f = x.closest('.kaynaklar').nextElementSibling, k = 'kaynak.' + f.dataset.kekle, l = O.oku(k, []); l.splice(+x.dataset.ksil, 1); O.yaz(k, l); ciz(); });
  };

  /* ---------- plan üreticiler ---------- */
  const DERS_DK = 40;
  const ADIM = {
    isinma: ['Temadan bağımsız ısınma: şarkı / tekerleme / kısa hareket oyunu (iyi oluş)', 'Önceki dersin kelimeleri: “Ne eksik?” (tahta)', 'Selamlaşma ve sınıf dili rutini: “How are you today?” + TPR', 'Çarkıfelek: çıkan kelimeyle tek cümle'],
    isinmaOyun: [null, 'eksik', null, 'cark'],
    sunum: [['Dijital hikâye / görsel: önce bütün izlenir, sonra durdurularak tahmin ve hedef kelimeler (L1-L2)', 'Kelime kartları 1-5: dinle, koro ve gölge tekrar'],
      ['Kelime kartları 1-10: dinle-tekrar et, hedef ses (phonics) çalışması', 'Resim kutuları: kelimeleri anlam gruplarına ayır'],
      ['Kalıbı örneklerden keşfet: tahtadaki 5 örnek cümleden kuralı öğrenciler bulur (tümevarım)', 'Kalıbı sesli okuma: soru-cevap zinciri'],
      ['Kısa metin/diyalog: önce genel anlam (skimming), sonra ayrıntı (scanning)', 'Yabancı arkadaşın mesajlarını dinleme: kim, ne, nerede?'],
      ['Yabancı arkadaşla sohbet: tahtada sınıfça, öğrenciler sırayla cevaplar', 'Model diyalog + rol kartlarıyla ikili konuşma'],
      ['Performans görevinin tanıtımı ve dereceli puanlama anahtarı', 'Model metinden yazma: kopyala → tamamla → kendi cümlen']],
    sunumOyun: [['kart', 'kart'], ['kart', 'hafiza'], ['cumle', 'cumle'], ['sohbet', 'sohbet'], ['sohbet', 'cark'], [null, 'cumle']],
    uygulama: [['kart', 'eksik', 'hafiza'], ['hafiza', 'halat', 'bingo', 'av'], ['cumle', 'cark', 'halat'], ['dakika', 'cumle', 'av'], ['sohbet', 'halat', 'cark'], ['cumle', 'dakika', 'harf']],
    uretim: ['Resim sözlüğü: 5 kelimeyi çiz ve yaz', 'İkili: biri resmi gösterir, diğeri kelimeyi söyler ve cümle kurar', 'Kalıpla kendi 3 cümlen (defter)', 'Metinle ilgili 3 soru: doğru / yanlış', 'İkili sohbet: kalıbı kullanarak 4 replik, sonra sınıfa canlandırma', 'Performans görevi çalışması / show and tell sunumu'],
    kapanis: ['Çıkış kartı: öğrendiğim 3 kelime + 😀 😐 😟 öz değerlendirme', 'Öğrenci uygulaması ödevi: kelime kartları + 1 Dakika Kelime', '1 Dakika Kelime ile sınıf rekoru denemesi']
  };
  const OYUN_AD = id => (OYUN.LISTE.find(o => o.id === id) || {}).ad;
  const oyunLink = (id, u) => id ? ` <a class="mini-btn" href="#oyna/${id}/${u}">▶ ${OYUN_AD(id)}</a>` : '';
  const ciktiKodlari = (s, u, a) => {
    const m = O.sinif(s).uniteler[u];
    if (m.cikti) { // 2018
      const kod = (m.cikti.match(/E\d\.\d+\.[A-Z]{1,2}\d\.[^\n]*/g) || []);
      const tur = [['L', 'R'], ['L', 'P', 'SI'], ['SI', 'SP', 'W'], ['R', 'L'], ['SI', 'SP'], ['W', 'SP', 'R']][a];
      const sec = kod.filter(k => tur.some(t => new RegExp('\\.' + t + '\\d').test(k)));
      return (sec.length ? sec : kod).slice(0, 4);
    }
    const aile = [['L1', 'L2', 'R1'], ['V1', 'P1'], ['G1'], ['L3', 'R2', 'R3'], ['S1', 'S2', 'S3', 'S4', 'S5'], ['W1', 'W2', 'W3', 'W4', 'W5', 'S6', 'L4', 'R4']][a];
    const ad = { L: 'Listening/Watching', R: 'Reading', V: 'Vocabulary', G: 'Grammar (chunks)', P: 'Pronunciation', W: 'Writing', S: 'Speaking' };
    return aile.map(k => `ENG.${s}.${u + 1}.${k} — ${ad[k[0]]}`);
  };
  const gunlukPlan = (hi, d) => {
    const h = O.haftalar(S)[hi], u = h.u, a = O.asama(S, hi), H = O.sinif(S).saat;
    if (u == null) return null;
    const n = (hi + d) % 4, ap = a.no;
    const adimlar = [
      { ad: 'Isınma', dk: 5, ne: ADIM.isinma[n], oyun: ADIM.isinmaOyun[n] },
      { ad: 'Sunum / Keşif', dk: 10, ne: ADIM.sunum[ap][d % 2], oyun: ADIM.sunumOyun[ap][d % 2] },
      { ad: 'Uygulama', dk: 15, oyun: ADIM.uygulama[ap][d % ADIM.uygulama[ap].length] },
      { ad: 'Üretim', dk: 7, ne: ADIM.uretim[ap] },
      { ad: 'Kapanış', dk: 3, ne: ADIM.kapanis[(d + hi) % 3], oyun: (d + hi) % 3 === 2 ? 'dakika' : null }];
    adimlar[2].ne = OYUN_AD(adimlar[2].oyun) + ' (tahta): ' + (OYUN.LISTE.find(o => o.id === adimlar[2].oyun) || {}).aciklama;
    return { h, u, a, d, H, adimlar };
  };

  /* ---------- A4 etkinlik kâğıdı (Claude) ---------- */
  const kagitHTML = (s, u, tohum) => {
    const un = O.unite(s, u), ks = un.kelimeler, ark = ARKADAS[s];
    const es = O.karistir(ks.slice(0, 8), tohum + 1);
    const { g: iz } = OYUN.izgaraUret(ks.map(k => k.en), 10, tohum + 3);
    const cs = un.cumle.o.slice(1, 4).map(c => ({ c, p: O.karistir(c.split(' '), tohum + c.length) }));
    const sh = un.sohbet.slice(0, 3);
    return `<section class="a4"><header class="a4-ust"><div><b>English · ${s}. Sınıf</b> — ${esc(un.ad)}</div><div>Name: ____________ Class: ____ Date: ______</div></header>
      <h3>1. Match the pictures and the words.</h3>
      <div class="eslestir"><ol>${ks.slice(0, 8).map(k => `<li><span class="emo">${k.e}</span></li>`).join('')}</ol>
        <ol type="a">${es.map(k => `<li>${esc(k.en)}</li>`).join('')}</ol></div>
      <h3>2. Find the words.</h3>
      <div class="a4-av"><table class="av-tablo">${iz.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>
        <ul>${ks.filter(k => /^[a-z]{3,10}$/i.test(k.en.replace(/[^a-z]/gi, '')) && k.en.replace(/[^a-z]/gi, '').length <= 10).map(k => `<li>${k.e} ${esc(k.en)}</li>`).join('')}</ul></div>
      <h3>3. Put the words in order.</h3>
      <ol class="sirala">${cs.map(x => `<li><span class="karisik">${x.p.map(esc).join(' / ')}</span><span class="cizgi-alan"></span></li>`).join('')}</ol>
      <h3>4. Chat with ${esc(ark.ad)} ${ark.simge}. Circle the best answer.</h3>
      <ol class="sohbet-k">${sh.map(t => `<li><b>${esc(ark.ad)}:</b> ${esc(t[0])}<br>${O.karistir([t[1], t[2], t[3]], tohum + t[0].length).map((x, j) => `<span class="sec-k">${'abc'[j]}) ${esc(x)}</span>`).join(' ')}</li>`).join('')}</ol>
      <h3>5. Write about you. Use the pattern: <i>${esc(un.cumle.k)}</i></h3>
      <div class="yazi-alan"></div><div class="yazi-alan"></div><div class="yazi-alan"></div>
      <footer class="a4-alt">✦ Claude tarafından hazırlanmış özgün etkinlik · Öğretmenler Odası · English</footer></section>
      <section class="a4 cevap"><header class="a4-ust"><b>Cevap anahtarı</b> — ${s}. Sınıf · ${esc(un.ad)}</header>
      <p><b>1.</b> ${ks.slice(0, 8).map((k, j) => `${j + 1}-${'abcdefgh'[es.indexOf(k)]}`).join(', ')}</p>
      <p><b>3.</b> ${cs.map((x, j) => `${j + 1}) ${esc(x.c)}`).join('<br>')}</p>
      <p><b>4.</b> ${sh.map((t, j) => `${j + 1}) ${esc(t[1])}`).join('<br>')}</p></section>`;
  };
  /* Yazılı / LGS hazırlık kâğıdı: kelime (V), dil kalıbı (G), okuma-diyalog (R), yazma (W) */
  const sinavHTML = (s, us, tohum) => {
    const uns = us.map(u => O.unite(s, u)); let no = 0; const soru = (x) => `<li class="sinav-s"><span class="no">${++no}</span>${x}</li>`;
    const tumK = uns.flatMap(u => u.kelimeler), sorular = [], cevap = [];
    O.karistir(tumK, tohum).slice(0, 4).forEach(k => { const sec = O.karistir([k].concat(O.sec(tumK.filter(x => x.en !== k.en), 3)), tohum + k.en.length);
      sorular.push(`<b>(V)</b> “${esc(k.tr)}” ${k.e} — Which word is it? ${sec.map((x, j) => `<span class="sec-k">${'ABCD'[j]}) ${esc(x.en)}</span>`).join(' ')}`); cevap.push('ABCD'[sec.indexOf(k)]); });
    uns.forEach(u => u.sohbet.slice(0, 2).forEach(t => { const yabanci = O.sec(uns.flatMap(x => x.sohbet).filter(z => z !== t), 1)[0][1];
      const sec = O.karistir([t[1], t[2], t[3], yabanci], tohum + t[0].length);
      sorular.push(`<b>(R)</b> Complete the dialogue.<br><i>${esc(ARKADAS[s].ad)}:</i> ${esc(t[0])}<br><i>You:</i> ________<br>${sec.map((x, j) => `<span class="sec-k">${'ABCD'[j]}) ${esc(x)}</span>`).join(' ')}`); cevap.push('ABCD'[sec.indexOf(t[1])]); }));
    uns.forEach(u => { const c = u.cumle.o[1] || u.cumle.o[0], p = O.karistir(c.split(' '), tohum);
      sorular.push(`<b>(G)</b> Put the words in order: <span class="karisik">${p.map(esc).join(' / ')}</span><span class="cizgi-alan"></span>`); cevap.push(esc(c)); });
    sorular.push(`<b>(W)</b> Write 4-5 sentences to ${esc(ARKADAS[s].ad)} about ${uns.map(u => esc(u.ad.toLowerCase())).join(' and ')}. Use: <i>${uns.map(u => esc(u.cumle.k)).join(' · ')}</i><div class="yazi-alan"></div><div class="yazi-alan"></div><div class="yazi-alan"></div><div class="yazi-alan"></div>`);
    cevap.push('Dereceli puanlama: içerik 4 · kalıp kullanımı 3 · kelime 2 · yazım 1');
    return `<section class="a4"><header class="a4-ust"><div><b>English · ${s}. Sınıf — Yazılıya hazırlık</b> (${uns.map(u => esc(u.ad)).join(', ')})</div><div>Name: ____________ No: ____</div></header>
      <ol class="sinav">${sorular.map(soru).join('')}</ol><footer class="a4-alt">✦ Claude tarafından hazırlanmış özgün hazırlık kâğıdı · (V) kelime (R) okuma (G) dil bilgisi (W) yazma — ortak yazılı çıktı aileleri</footer></section>
      <section class="a4 cevap"><header class="a4-ust"><b>Cevap anahtarı</b></header><ol>${cevap.map(c => `<li>${c}</li>`).join('')}</ol></section>`;
  };
  /* Konuşma sınavı: soru kartları + puanlama formu */
  const konusmaHTML = (s, us) => {
    const uns = us.map(u => O.unite(s, u)), sorular = uns.flatMap(u => u.sohbet.map(t => [t[0], t[1], u.ad]));
    const c = O.siniflar().find(x => x.kod === O.ayar('aktifSinif')), ogr = c && c.sinif === s ? c.ogrenciler : Array(12).fill('');
    const OL = [['İçerik / görevi yerine getirme', 'Soruya ilgisiz ya da cevap yok', 'Kısmen ilgili, tek kelime', 'İlgili, kısa cümle', 'Tam ve uygun cevap, ek bilgi'],
      ['Kelime kullanımı', 'Ünite kelimesi yok', '1 kelime', '2 kelime, doğru', '3+ kelime, yerinde'], ['Dil kalıbı', 'Kalıp yok', 'Kalıp hatalı', 'Kalıp küçük hatayla', 'Kalıp doğru ve akıcı'],
      ['Akıcılık ve telaffuz', 'Uzun duraklamalar', 'Sık duraklama, anlaşılır', 'Az duraklama', 'Akıcı, anlaşılır telaffuz']];
    return `<section class="a4"><header class="a4-ust"><div><b>Speaking Exam · ${s}. Sınıf</b> — ${uns.map(u => esc(u.ad)).join(', ')}</div><div>Soru kartları (kesip kutudan çektirin)</div></header>
      <div class="soru-kart">${sorular.map((q, j) => `<div><b>${j + 1}.</b> ${esc(q[0])}<br><small>Örnek cevap: ${esc(q[1])}</small></div>`).join('')}</div>
      <h3>Puanlama anahtarı (her ölçüt 0-4, toplam 16)</h3><table class="rubrik"><tr><th>Ölçüt</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>${OL.map(o => `<tr><th>${o[0]}</th>${o.slice(1).map(x => `<td>${x}</td>`).join('')}</tr>`).join('')}</table>
      <footer class="a4-alt">✦ Claude tarafından hazırlanmış özgün konuşma sınavı seti · Dinleme-konuşma OYSS yazılısında ölçülmez; bu form derste performans değerlendirmesi içindir.</footer></section>
      <section class="a4"><header class="a4-ust"><b>Konuşma sınavı değerlendirme formu</b> — ${c && c.sinif === s ? esc(c.ad) : s + '. sınıf'} · Tarih: ________</header>
      <table class="rubrik"><tr><th>Öğrenci</th><th>Soru no</th><th>İçerik</th><th>Kelime</th><th>Kalıp</th><th>Akıcılık</th><th>Toplam /16</th><th>Not</th></tr>
      ${ogr.map(a => `<tr><td style="height:26px">${esc(a)}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`).join('')}</table></section>`;
  };
  const bas = (html, baslik) => { $('#baski').innerHTML = html; document.title = baslik || 'Öğretmenler Odası · English'; setTimeout(() => { window.print(); document.title = 'Öğretmenler Odası · English'; }, 60); };
  const wordIndir = (html, ad) => { const b = new Blob(['<html><head><meta charset="utf-8"><style>body{font-family:Calibri,Arial;font-size:11pt}table{border-collapse:collapse;width:100%}td,th{border:1px solid #999;padding:4px;vertical-align:top}</style></head><body>' + html + '</body></html>'], { type: 'application/msword' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = ad + '.doc'; a.click(); };

  /* ---------- sayfalar ---------- */
  const SAYFA = {};
  const baslik = (h, alt, sag) => `<div class="sayfa-bas"><div><h1>${h}</h1>${alt ? `<p class="soluk">${alt}</p>` : ''}</div><div class="sag">${sag || ''}</div></div>`;
  const kelimeIzgara = (ks) => `<div class="kelimeler">${ks.map(k => `<button class="kelime-k" data-soyle="${esc(k.en)}"><span class="emo">${k.e}</span><b>${esc(k.en)}</b><small>${esc(k.tr)}</small></button>`).join('')}</div>`;
  const uoyunlar = (s, u) => (UOYUN[s] && UOYUN[s][u] || []).map((c, j) => `<a class="uoyun-k" href="#oyna/u${j}/${u}"><span>${c.ikon}</span><div><b>${esc(c.ad)}</b><small>${OYUN.UTUR[c.t].ikon} ${OYUN.UTUR[c.t].ad} · ${OYUN.UTUR[c.t].aciklama}</small></div></a>`).join('');
  const uoyunKutu = (s, u) => `<div class="kart-kutu"><h2>🎯 Bu ünitenin oyunları ${rozet.claude}</h2><p class="soluk">Üniteye ve yaşa özel; öğrenci kendi karakterini (kız/erkek) seçer.</p><div class="uoyun-izgara">${uoyunlar(s, u)}</div></div>`;
  const sohbetOnizle = (un) => `<div class="sohbet-on">${un.sohbet.map(t => `<p><span>${ARKADAS[un.s].simge}</span> ${esc(t[0])}<br><span>🙂</span> <b>${esc(t[1])}</b></p>`).join('')}</div>`;

  SAYFA.bugun = () => {
    const hi = HS(), h = O.haftalar(S)[hi], u = h.u, a = O.asama(S, hi), sn = O.sinif(S), buMu = hi === O.buHafta(S);
    const ust = `<div class="bugun-hero"><div><span class="etiket">${buMu ? '📍 BU HAFTA · ' : '🗓️ SEÇİLİ HAFTA · '}${S}. sınıf · ${sn.program} · haftada ${sn.saat} saat</span>
      <h1>${u == null ? esc(h.tema) : esc(temaAdi(S, u))}</h1><p>${gunAdi(hi)}${a ? ` · <b>${a.ikon} ${a.ad}</b> aşaması (${a.sira}/${a.toplam}. hafta)` : ''}</p>
      ${h.gun ? `<p class="gun">📅 ${esc(h.gun).replace(/\n+/g, ' · ')}</p>` : ''}</div>
      <div class="hero-dugme"><a class="btn ana" href="#hafta/${hi}">Haftalık plan</a><a class="btn" href="#gunluk/${hi}/0">Günlük plan</a><a class="btn" href="#yillik">Yıllık plan</a></div></div>`;
    if (u == null) return ust + `<div class="kart-kutu"><h2>Bu hafta tema dersi yok</h2><p>${esc(h.tema)} — MEB planında bu hafta ${h.tema.includes('PLANNING') ? 'okul temelli planlama (tekrar, sosyal etkinlik, proje)' : 'oryantasyon / tekrar / sosyal etkinlik'} haftası.</p>
      <p>Öneri ${rozet.claude}: önceki temaların kelimeleriyle <a href="#oyna/dakika/${Math.max(0, (O.haftalar(S).slice(0, hi).reverse().find(x => x.u != null) || { u: 0 }).u)}">1 Dakika Kelime turnuvası</a> ve Halat Çekme ligi.</p></div>`;
    const un = O.unite(S, u);
    const sinav = S >= 5 ? `<div class="kart-kutu ince"><h3>📝 Sınav takvimi</h3><p>${S === 8 ? 'LGS: Haziran 2027 · İngilizce 10 soru (sözel oturum). 8. sınıf İngilizce programı değişmedi.' : 'Ortak yazılı (İngilizce 5-6-7): 1. dönem 2. yazılı <b>5-6 Ocak 2027</b> haftası; 2. dönem 6-7 Nisan ve 8-9 Haziran.'}
      Sınavlar okuma (R), kelime (V), dil bilgisi (G) ve yazma (W) çıktılarını ölçer.</p><a href="#sinav" class="mini-btn">Sınav hazırlık →</a></div>` : '';
    return ust + `<div class="iki-kolon"><div>
      <div class="kart-kutu"><h2>🔤 Bu temanın kelimeleri ${rozet.claude}</h2><p class="soluk">Konuşmada kullanılacak 10 kelime — dokun, dinle.</p>${kelimeIzgara(un.kelimeler)}</div>
      <div class="kart-kutu"><h2>🧩 Cümle kalıbı ${rozet.claude}</h2><p class="kalip buyuk-k">${esc(un.cumle.k)}</p><ul>${un.cumle.o.map(c => `<li><button class="ses-k" data-soyle="${esc(c)}">🔊</button> ${esc(c)}</li>`).join('')}</ul></div>
      </div><div>
      ${uoyunKutu(S, u)}
      <div class="kart-kutu"><h2>🎮 Tahtada aç</h2><div class="oyun-izgara">${OYUN.LISTE.map(o => `<a class="oyun-k" href="#oyna/${o.id}/${u}"><span>${o.ikon}</span><b>${o.ad}</b><small>${o.aciklama}</small></a>`).join('')}</div></div>
      <div class="kart-kutu"><h2>💬 ${ARKADAS[S].simge} ${ARKADAS[S].ad} ile sohbet ${rozet.claude}</h2><p class="soluk">${ARKADAS[S].yer} · ${ARKADAS[S].yas} yaşında</p>${sohbetOnizle(un)}<a class="btn" href="#oyna/sohbet/${u}">▶ Sohbeti tahtada başlat</a></div>
      ${sinav}</div></div>`;
  };

  const AYTR = ['', 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  const OZEL = t => t.replace('SCHOOL-BASED PLANNING', 'Okul temelli planlama').replace('ORIENTATION', 'Oryantasyon').replace('REVISION', 'Tekrar').replace(/SOCIAL ACTIVIT\w*/, 'Sosyal etkinlik');
  SAYFA.haftalar = () => {
    const hs = O.haftalar(S), bu = O.buHafta(S);
    let html = baslik(`${S}. Sınıf · Haftalar`, `2026-2027 · ${hs.length} hafta · ${O.sinif(S).program} · haftaya dokunun: plan, kelimeler, oyunlar ve günlük plan açılır`, `<a class="btn ana" href="#bugun" data-buhafta>📍 Bu haftaya git</a><a class="btn" href="#yillik">Tablo görünümü</a>`), ay = '';
    hs.forEach((w, i) => { const ayAd = AYTR[+w.bas.slice(5, 7)];
      if (ayAd !== ay) { if (ay) html += '</div></section>'; ay = ayAd; html += `<section class="ay-blok"><h2>${ayAd} ${w.bas.slice(0, 4)}</h2><div class="haftalar-izgara">`; }
      const a = O.asama(S, i), un = w.u != null ? O.unite(S, w.u) : null;
      html += `<a class="hafta-kart ${i === bu ? 'simdi' : i < bu ? 'gecti' : ''} ${i === H && i !== bu ? 'secili' : ''} ${w.u == null ? 'ozel' : ''}" href="#bugun" data-hsec="${i}">${i === bu ? '<span class="simdi-etiket">BU HAFTA</span>' : ''}
        <div class="hk-ust"><span class="hk-no">${w.no}. HAFTA</span><span>${esc(w.tarih)} · ${w.saat || '–'} saat</span></div>
        <div class="hk-ad">${w.u == null ? esc(OZEL(w.tema)) : `${w.u + 1}. ${esc(un.ad)}`}</div>
        ${a ? `<div class="soluk">${a.ikon} ${a.ad} · ${a.sira}/${a.toplam}. hafta</div>` : ''}${un ? `<div class="hk-emo">${un.kelimeler.slice(0, 6).map(k => k.e).join(' ')}</div>` : ''}
        ${w.gun ? `<div class="hk-gun">📅 ${esc(w.gun.split('\n')[0].slice(0, 46))}</div>` : ''}</a>`; });
    return html + '</div></section>';
  };

  SAYFA.yillik = () => {
    const hs = O.haftalar(S), sn = O.sinif(S);
    const tablo = `<table class="plan"><thead><tr><th>Ay</th><th>Hafta</th><th>Saat</th><th>Tema / Ünite</th><th>Aşama ${rozet.claude}</th><th>Belirli gün ve haftalar</th></tr></thead><tbody>
      ${hs.map((h, i) => { const a = O.asama(S, i); return `<tr class="${h.u == null ? 'ozel' : ''} ${i === HS() ? 'simdi' : ''}"><td>${esc(h.ay)}</td><td><a href="#hafta/${i}">${h.no}. ${esc(h.tarih)}</a></td><td>${h.saat || ''}</td>
        <td>${h.u == null ? esc(h.tema) : `<a href="#unite/${h.u}">${esc(temaAdi(S, h.u))}</a>`}</td><td>${a ? `${a.ikon} ${a.ad}` : ''}</td><td class="kucuk-y">${esc(h.gun).replace(/\n+/g, '<br>')}</td></tr>`; }).join('')}</tbody></table>`;
    return baslik(`${S}. Sınıf Yıllık Plan`, `2026-2027 · ${sn.program} · haftada ${sn.saat} ders saati · ${rozet.meb} taslak yıllık çerçeve plan`,
      `<button class="btn" data-bas="yillik">🖨 Yazdır</button><button class="btn" data-word="yillik">⬇ Word</button>`) +
      (sn.gelecek_maarif ? `<p class="bilgi">ℹ️ ${S}. sınıf 2026-27'de <b>2018 programıyla</b> devam ediyor; Maarif programı 2027-28'de gelecek (${sn.gelecek_maarif.map(t => esc(t.ad)).join(', ')}). <a href="#analiz">Ayrıntı</a></p>` : '') +
      `<div id="yillik-tablo">${tablo}</div>`;
  };

  SAYFA.hafta = (hi) => {
    hi = hi == null ? HS() : +hi; H = hi; const hs = O.haftalar(S), h = hs[hi], u = h.u, a = O.asama(S, hi);
    const gez = `<div class="gezgin"><a class="btn" href="#hafta/${Math.max(0, hi - 1)}">◀ Önceki</a><select data-hafta>${hs.map((x, i) => `<option value="${i}" ${i === hi ? 'selected' : ''}>${x.no}. hafta · ${esc(x.tarih)}</option>`).join('')}</select><a class="btn" href="#hafta/${Math.min(hs.length - 1, hi + 1)}">Sonraki ▶</a></div>`;
    if (u == null) return baslik(`${h.no}. Hafta`, esc(h.tarih)) + gez + `<div class="kart-kutu"><h2>${esc(h.tema)}</h2><p>Tema dersi yok. ${rozet.claude} öneri: tekrar oyunları (1 Dakika Kelime, Halat Çekme), sosyal etkinlik, kulüp/proje çalışması.</p>${h.gun ? `<p>📅 ${esc(h.gun)}</p>` : ''}</div>`;
    const un = O.unite(S, u), m = un.meb, DS = O.sinif(S).saat, son = a.sira === a.toplam;
    const etk = [
      { ad: 'Kelime kartları + telaffuz', oyun: 'kart', ne: a.no === 0 ? 'İlk 5 kelime; koro, gölge, fısıltı zinciri' : 'Tüm kelimeler; hedef ses çalışması' },
      { ad: ADIM.uygulama[a.no].map(OYUN_AD).join(' / '), oyun: ADIM.uygulama[a.no][0], ne: 'Tahtada takım oyunu; sonuçlar sınıf raporuna kaydedilir' },
      { ad: 'Cümle kalıbı çalışması', oyun: 'cumle', ne: un.cumle.k },
      { ad: `${ARKADAS[S].ad} ile sohbet`, oyun: 'sohbet', ne: 'Sınıfça sesli sohbet, sonra ikili canlandırma' },
      { ad: 'A4 etkinlik kâğıdı', ne: 'Eşleştir, kelime avı, cümle sırala, sohbet, yaz (cevap anahtarlı)', kagit: 1 }];
    return baslik(`${h.no}. Hafta · ${esc(un.ad)}`, `${esc(h.tarih)} · ${a.ikon} ${a.ad}: ${a.amac} · ${a.sira}/${a.toplam}. hafta · ${DS} ders saati`,
      `<button class="btn" data-bas="hafta">🖨 Yazdır</button><a class="btn" href="#gunluk/${hi}/0">Günlük planlar →</a>`) + gez + `
      <div id="hafta-govde"><div class="iki-kolon"><div>
        <div class="kart-kutu"><h2>📋 Haftalık etkinlikler ${rozet.claude}</h2><ol class="etkinlik-l">${etk.map(e => `<li><b>${esc(e.ad)}</b><small>${esc(e.ne)}</small>${e.oyun ? `<a class="mini-btn" href="#oyna/${e.oyun}/${u}">▶ Tahtada aç</a>` : ''}${e.kagit ? `<button class="mini-btn" data-kagit="${u}">🖨 Kâğıdı yazdır</button>` : ''}</li>`).join('')}</ol>
          <p class="ogr-odev">📱 <b>Öğrenci uygulaması ödevi:</b> bu haftanın kelime kartları, cümle kurma, ${ARKADAS[S].ad} ile sohbet ve en az bir 1 Dakika düellosu.</p></div>
        ${uoyunKutu(S, u)}
        <div class="kart-kutu"><h2>🔤 Kelimeler ${rozet.claude}</h2>${kelimeIzgara(un.kelimeler.slice(...a.kelime))}</div>
        <div class="kart-kutu"><h2>🧩 Kalıp</h2><p class="kalip buyuk-k">${esc(un.cumle.k)}</p><ul>${un.cumle.o.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>
      </div><div>
        <div class="kart-kutu"><h2>🎯 Öğrenme çıktıları ${rozet.meb}</h2><ul>${ciktiKodlari(S, u, a.no).map(c => `<li>${esc(c)}</li>`).join('')}</ul>
          ${m.alt ? `<p class="soluk">Alt temalar: ${esc(m.alt)}</p>` : ''}${m.fonksiyon ? `<details><summary>İşlevler ve kalıplar (MEB)</summary><pre>${esc(m.fonksiyon)}</pre></details>` : ''}
          ${m.kalip ? `<details><summary>Hedef dil kalıpları (MEB)</summary><pre>${esc(m.kalip)}</pre></details>` : ''}</div>
        ${son || a.no >= 4 ? `<div class="kart-kutu vurgu-k"><h2>🏁 Performans görevi ${rozet.meb}</h2><pre>${esc(m.olcme || 'Ölçme ve değerlendirme, ünite sonunda performans görevi ve öz değerlendirme ile yapılır.')}</pre></div>` : ''}
        ${m.fark ? `<div class="kart-kutu"><details><summary><b>Farklılaştırma (zenginleştirme / destekleme)</b> ${rozet.meb}</summary><pre>${esc(m.fark)}</pre></details></div>` : ''}
        <div class="kart-kutu"><h2>🌐 Dış kaynaklar ${rozet.dis}</h2><p class="soluk">Ücretsiz platformlarda bu ünitenin etkinlikleri. Beğendiğinizi “Kendi kaynağım” olarak ekleyin; içerik sahiplerine aittir, uygulamaya kopyalanmaz.</p>${kaynakListe(S, u)}</div>
      </div></div></div>`;
  };

  SAYFA.gunluk = (hi, d) => {
    hi = hi == null ? HS() : +hi; H = hi; d = +(d || 0); const p = gunlukPlan(hi, d), hs = O.haftalar(S);
    if (!p) return baslik('Günlük plan', '') + `<div class="kart-kutu">Bu hafta tema dersi yok (${esc(hs[hi].tema)}). <a href="#hafta/${hi}">Haftaya dön</a></div>`;
    const un = O.unite(S, p.u), m = un.meb;
    const sekme = Array.from({ length: p.H }, (_, j) => `<a class="sekme ${j === d ? 'aktif' : ''}" href="#gunluk/${hi}/${j}">${j + 1}. ders</a>`).join('');
    const govde = `<table class="gunluk"><tbody>
      <tr><th>Ders</th><td>İngilizce</td><th>Sınıf</th><td>${S}</td></tr>
      <tr><th>Tema / Ünite</th><td>${esc(un.ad)}</td><th>Hafta / Ders</th><td>${p.h.no}. hafta (${esc(p.h.tarih)}) · ${d + 1}. ders</td></tr>
      <tr><th>Süre</th><td>${DERS_DK} dk</td><th>Aşama</th><td>${p.a.ikon} ${p.a.ad} (${p.a.en})</td></tr>
      <tr><th>Öğrenme çıktıları</th><td colspan="3">${ciktiKodlari(S, p.u, p.a.no).map(esc).join('<br>')}</td></tr>
      <tr><th>Hedef kelimeler</th><td colspan="3">${un.kelimeler.slice(...p.a.kelime).map(k => `${k.e} ${esc(k.en)}`).join(' · ')}</td></tr>
      <tr><th>Dil kalıbı</th><td colspan="3">${esc(un.cumle.k)} — <i>${esc(un.cumle.o[0])}</i></td></tr>
      <tr><th>Araç-gereç</th><td colspan="3">Akıllı tahta (Öğretmenler Odası · English), ders kitabı, A4 etkinlik kâğıdı, öğrenci uygulaması</td></tr>
      <tr><th colspan="4" class="ara">Öğrenme-öğretme uygulamaları</th></tr>
      ${p.adimlar.map(x => `<tr><th>${x.ad}<br><small>${x.dk} dk</small></th><td colspan="3">${esc(x.ne)}${oyunLink(x.oyun, p.u)}</td></tr>`).join('')}
      <tr><th>Ölçme-değerlendirme</th><td colspan="3">${p.a.no === 5 ? 'Performans görevi (dereceli puanlama anahtarı), öz ve akran değerlendirme' : 'Gözlem, çıkış kartı, tahta oyunu sonuç raporu (Raporlar sekmesi)'}</td></tr>
      <tr><th>Farklılaştırma</th><td colspan="3">Destekleme: resimli kartlar, cümle başlatıcılar, eşli çalışma · Zenginleştirme: kendi diyalogunu yazıp canlandırma, ${ARKADAS[S].ad}'ya mesaj</td></tr>
      <tr><th>Yansıtma</th><td colspan="3"><div class="yazi-alan"></div></td></tr></tbody></table>
      <p class="soluk">✦ Plan Claude tarafından MEB ${esc(O.sinif(S).program)} ${S}. sınıf çerçevesine göre önerildi; öğretmen düzenleyebilir.</p>`;
    return baslik(`Günlük Plan · ${S}. Sınıf`, `${esc(un.ad)} · ${p.h.no}. hafta`, `<button class="btn" data-bas="gunluk">🖨 Yazdır</button><button class="btn" data-word="gunluk">⬇ Word</button>`) +
      `<div class="sekmeler">${sekme}<a class="sekme" href="#hafta/${hi}">← Hafta</a></div><div id="gunluk-govde" contenteditable="true" spellcheck="false">${govde}</div><p class="soluk">✏️ Tablonun içine tıklayıp düzenleyebilirsiniz; yazdırma ve Word düzenlemeyi içerir.</p>`;
  };

  SAYFA.uniteler = () => baslik(`${S}. Sınıf Üniteler`, `${O.sinif(S).program} · ${O.uniteSayisi(S)} ünite/tema`) +
    `<div class="unite-izgara">${O.sinif(S).uniteler.map((m, i) => { const un = O.unite(S, i), hs = O.temaHaftalari(S, i);
      return `<a class="unite-k" href="#unite/${i}"><span class="no">${i + 1}</span><b>${esc(m.ad)}</b><span class="emo-s">${un.kelimeler.slice(0, 5).map(k => k.e).join(' ')}</span><small>${hs.length} hafta · ${hs.length ? esc(O.haftalar(S)[hs[0]].tarih.split('-')[0]) + ' →' : ''}</small></a>`; }).join('')}</div>`;

  SAYFA.unite = (u) => {
    u = +u; const un = O.unite(S, u), m = un.meb;
    const resmi = m.kelime ? [['Hedef kelimeler', m.kelime], ['Dil kalıpları', m.kalip], ['Sosyal dil', m.sosyal], ['Ses (fonoloji)', m.ses], ['Anahtar kavramlar', m.kavram], ['Ölçme (performans görevi)', m.olcme]]
      : [['İşlevler ve kullanışlı dil', m.fonksiyon], ['Öğrenme çıktıları', m.cikti], ['Bağlamlar ve görevler', m.baglam], ['Ölçme', m.olcme]];
    return baslik(`${u + 1}. ${esc(un.ad)}`, `${S}. sınıf · ${O.temaHaftalari(S, u).length} hafta`, `<a class="btn" href="#hafta/${O.temaHaftalari(S, u)[0]}">Haftalık plan</a><button class="btn" data-kagit="${u}">🖨 A4 kâğıt</button>`) +
      `<div class="iki-kolon"><div><div class="kart-kutu"><h2>Bizim içerik ${rozet.claude}</h2>${kelimeIzgara(un.kelimeler)}<p class="kalip buyuk-k">${esc(un.cumle.k)}</p><ul>${un.cumle.o.map(c => `<li>${esc(c)}</li>`).join('')}</ul>${sohbetOnizle(un)}</div></div>
      <div>${uoyunKutu(S, u)}<div class="kart-kutu"><h2>Resmî program ${rozet.meb}</h2>${m.meb ? `<p><a target="_blank" rel="noopener" href="https://tymm.meb.gov.tr/ingilizce-dersi-temel-egitim/unite/${m.meb}">tymm.meb.gov.tr'de aç ↗</a></p>` : ''}
        ${resmi.filter(x => x[1]).map(x => `<details ${x[0].startsWith('Hedef') || x[0].startsWith('İşlev') ? 'open' : ''}><summary>${x[0]}</summary><pre>${esc(x[1])}</pre></details>`).join('')}
        ${m.fark ? `<details><summary>Farklılaştırma</summary><pre>${esc(m.fark)}</pre></details>` : ''}</div>
      <div class="kart-kutu"><h2>🌐 Dış kaynaklar</h2>${kaynakListe(S, u)}</div></div></div>`;
  };

  SAYFA.tahta = () => { const u = haftaUnite(HS()) ?? 0;
    return baslik('Akıllı Tahta Oyunları', `${S}. sınıf · oyun seçin, sonra ünite`) + `<div class="unite-sec">${O.sinif(S).uniteler.map((m, i) => `<button class="cip ${i === u ? 'aktif' : ''}" data-tu="${i}">${i + 1}. ${esc(m.ad)}</button>`).join('')}</div>
      <div data-tahta-uo>${uoyunKutu(S, u)}</div>
      <div class="oyun-izgara buyuk" data-tahta-u="${u}">${OYUN.LISTE.filter(o => o.tahta).map(o => `<a class="oyun-k" href="#oyna/${o.id}/${u}"><span>${o.ikon}</span><b>${o.ad}</b><small>${o.aciklama}</small>${o.duello ? '<em>Düello</em>' : ''}</a>`).join('')}</div>`; };

  /* oyun oynatma (tahta) */
  SAYFA.oyna = (id, u) => {
    u = Math.min(+u || 0, O.uniteSayisi(S) - 1); const sinifKod = O.ayar('aktifSinif', ''), sinif = O.siniflar().find(c => c.kod === sinifKod), ogr = sinif ? sinif.ogrenciler : [];
    const uo = /^u\d$/.test(id) ? ((UOYUN[S] || [])[u] || [])[+id.slice(1)] : null, motor = uo ? uo.t : id;
    const ikili = ['halat', 'hafiza'].includes(id), tekli = ['dakika', 'harf', 'cumle', 'sohbet', 'av', 'konusma'].includes(id) || !!uo;
    setTimeout(() => {
      const kok = $('#oyun-alan'), un = O.unite(S, u);
      const havuz = O.sinif(S).uniteler.flatMap((_, i) => O.unite(S, i).kelimeler);
      const yilHavuz = Array.from({ length: u + 1 }, (_, i) => O.unite(S, i).kelimeler).flat();
      const baslat = () => {
        const a = $('#o1')?.value, b = $('#o2')?.value, tek = $('#o0')?.value, kapsam = $('#kapsam')?.value;
        OYUN.dur(); OYUN[motor](kok, { uo, u: un, kelimeler: un.kelimeler, havuz, dakikaHavuz: kapsam === 'yil' ? yilHavuz : un.kelimeler, mod: 'tahta', oyuncular: ikili ? [a || 'Team A', b || 'Team B'] : null,
          carkAdlari: id === 'cark' && $('#carkmod')?.value === 'ogr' ? O.karistir(ogr).slice(0, 16) : null,
          kayit: r => { const ortak = { k: sinifKod, s: S, u, h: O.haftalar(S)[HS()].no, t: uo ? uo.t : id, z: Date.now() };
            if (r.takim) r.takim.forEach(([ad, p]) => O.sonucEkle({ ...ortak, o: ad, p, m: r.m, tahta: 1 }));
            else O.sonucEkle({ ...ortak, o: tek || 'Sınıf', p: r.p, m: r.m, sn: r.sn, tahta: 1 });
            return sinif ? `Kaydedildi: ${sinif.ad} raporu` : 'Kaydedildi (Sınıflarım\'dan sınıf seçerseniz öğrenci raporuna işlenir)'; } });
      };
      $('[data-baslat]').onclick = baslat;
      if (!ikili && !tekli && id !== 'cark') baslat();
    }, 0);
    const sec = (idx, ph) => ogr.length ? `<select id="o${idx}"><option value="">${ph}</option>${ogr.map(a => `<option>${esc(a)}</option>`).join('')}</select>` : `<input id="o${idx}" placeholder="${ph}">`;
    const o = uo ? { ikon: uo.ikon, ad: uo.ad + ' · ' + OYUN.UTUR[uo.t].ad } : OYUN.LISTE.find(x => x.id === id);
    return `<div class="oyun-sayfa"><div class="oyun-bar"><a class="btn" href="#tahta">✕</a><b>${o.ikon} ${o.ad}</b><span class="soluk">${S}. sınıf · ${esc(temaAdi(S, u))}</span>
      <span class="ayar-alan">${ikili ? sec(1, 'Oyuncu / Takım A') + ' vs ' + sec(2, 'Oyuncu / Takım B') : tekli ? sec(0, 'Öğrenci (isteğe bağlı)') : ''}
      ${['dakika', 'harf'].includes(id) ? '<select id="kapsam"><option value="unite">Bu ünite</option><option value="yil">Yıl başından beri</option></select>' : ''}
      ${id === 'cark' ? `<select id="carkmod"><option value="kelime">Kelime çarkı</option>${ogr.length ? '<option value="ogr">Öğrenci çarkı</option>' : ''}</select>` : ''}
      <button class="btn ana" data-baslat>▶ Başlat</button></span>
      <button class="btn" data-tam title="Tam ekran">⛶</button></div><div id="oyun-alan" class="oyun-alan"><p class="soluk orta">Oyuncuları seçip ▶ Başlat'a dokunun.</p></div></div>`;
  };

  SAYFA.sinav = () => {
    const ts = MEB.oyss[S], sn = O.sinif(S);
    const kapsam = O.sinif(S).uniteler.map((m, i) => `<label class="cip"><input type="checkbox" value="${i}" ${i < 3 ? 'checked' : ''}> ${i + 1}. ${esc(m.ad)}</label>`).join('');
    const tablo = ts ? `<table class="plan"><thead><tr><th>Tema/Ünite</th><th>Çıktı</th><th colspan="5">1. yazılı senaryo 1-5</th><th colspan="5">2. yazılı senaryo 1-5</th></tr></thead><tbody>
      ${ts.map(r => `<tr><td>${esc(r.tema)}</td><td title="${esc(r.metin)}"><b>${esc(r.kod)}</b> <small>${esc(r.metin.slice(0, 70))}…</small></td>${r.y1.concat(r.y2).map(n => `<td class="sayi">${n || ''}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '<p>Bu sınıf düzeyinde İngilizce ortak yazılı yok (OYSS ortaokulda 5-6-7; 8. sınıf LGS).</p>';
    return baslik('Sınav Hazırlık', `${S}. sınıf · ${S === 8 ? 'LGS + okul yazılıları' : S >= 5 ? 'Ortak Yazılı Sınav Sistemi (OYSS)' : 'ilkokul: yazılı yok, performans ve gözlem'}`) + `
      <div class="iki-kolon"><div class="kart-kutu"><h2>🖨 Hazırlık kâğıdı üret ${rozet.claude}</h2><p>Seçilen ünitelerden kelime (V), okuma-diyalog (R), dil bilgisi/kalıp (G) ve yazma (W) soruları; cevap anahtarlı.${S === 8 ? ' Diyalog tamamlama soruları LGS İngilizce tarzındadır.' : ''}</p>
        <div class="cipler" data-kapsam>${kapsam}</div><button class="btn ana" data-sinavbas>🖨 Kâğıdı yazdır</button></div>
      <div class="kart-kutu vurgu-k"><h2>🎙️ Konuşma sınavı ${rozet.claude}</h2><p>Yabancı arkadaş sınav yapan kişi olur: soruyu sesli sorar, öğrenci 30 saniyede mikrofonla cevaplar, uygulama cevabı yazıya döküp <b>içerik · kelime · kalıp · akıcılık</b> ölçütleriyle puanlar. Sonuç öğrencinin raporuna düşer.</p>
        <div class="satir"><a class="btn ana" href="#oyna/konusma/${haftaUnite(HS()) ?? 0}">▶ Tahtada provayı başlat</a><button class="btn" data-konusmabas>🖨 Soru kartları + puanlama formu</button></div>
        <p class="soluk">Formdaki öğrenci listesi “Sınıflarım”daki aktif sınıftan gelir. Öğrenciler evde aynı provayı öğrenci uygulamasından yapar.</p></div>
      <div class="kart-kutu"><h2>ℹ️ Bilinmesi gerekenler</h2><ul>
        <li>2026-27'de İngilizce ortak yazılı: <b>5, 6, 7. sınıf</b> (okul geneli). Zümre, MEB tablosundaki 5 senaryodan birini seçer.</li>
        <li>Tablolar yalnız <b>okuma, kelime, dil bilgisi, yazma</b> çıktılarını içerir; dinleme-konuşma derste performansla değerlendirilir.</li>
        <li>8. sınıf: LGS sözel oturumunda <b>10 İngilizce sorusu</b>; kısa diyalog, okuma, kelime-anlam ağırlıklı.</li>
        <li>4, 7, 8. sınıflar bu yıl 2018 programıyla; Maarif programı 2027-28'de.</li></ul>
        <p class="soluk">Kaynak: ODSGM konu-soru dağılım tablosu (1. dönem), MEB OYSS SSS (26.10.2026).</p></div></div>
      <div class="kart-kutu"><h2>📊 1. dönem konu-soru dağılımı ${rozet.meb}</h2>${tablo}</div>`;
  };

  SAYFA.raporlar = () => {
    const cs = O.siniflar(), kod = O.ayar('aktifSinif', cs[0]?.kod || ''), c = cs.find(x => x.kod === kod);
    const l = O.sonuclar().filter(r => !kod || r.k === kod);
    const ogr = c ? c.ogrenciler : Array.from(new Set(l.map(r => r.o)));
    const hft = O.haftalar(c ? c.sinif : S)[O.buHafta(c ? c.sinif : S)].no;
    const sat = ogr.map(ad => { const r = l.filter(x => x.o === ad), bh = r.filter(x => x.h === hft), en = t => Math.max(0, ...r.filter(x => x.t === t).map(x => x.p));
      return { ad, top: r.length, hafta: bh.length, kart: bh.filter(x => x.t === 'kart').length, sohbet: bh.some(x => x.t === 'sohbet'), cumle: bh.some(x => x.t === 'cumle'), dakika: en('dakika'), harf: en('harf'), duello: r.filter(x => ['halat'].includes(x.t)).length, konusma: (() => { const k = r.filter(x => x.t === 'konusma'); return k.length ? Math.round(k[k.length - 1].p / Math.max(1, k[k.length - 1].m) * 16) : 0; })(), son: Math.max(0, ...r.map(x => x.z)) }; });
    const tahta = l.filter(r => r.tahta).slice(-30).reverse();
    return baslik('Raporlar', 'Öğrenci uygulaması + akıllı tahta sonuçları', `<button class="btn" data-bas="rapor">🖨 Yazdır</button><button class="btn" data-csv>⬇ Excel (CSV)</button>${O.sunucu() ? '<button class="btn" data-cek>⟳ Sunucudan çek</button>' : ''}`) + `
      <div class="satir"><label>Sınıf: <select data-aktif>${cs.length ? cs.map(x => `<option value="${x.kod}" ${x.kod === kod ? 'selected' : ''}>${esc(x.ad)} (${x.kod})</option>`).join('') : '<option value="">— önce Sınıflarım\'dan sınıf ekleyin —</option>'}</select></label></div>
      <div id="rapor-govde"><div class="kart-kutu"><h2>${c ? esc(c.ad) : 'Tüm sonuçlar'} · ${hft}. hafta</h2>
      <table class="plan rapor"><thead><tr><th>Öğrenci</th><th>Bu hafta etkinlik</th><th>Kelime kartı</th><th>Cümle</th><th>Sohbet</th><th>Konuşma</th><th>1 Dakika rekor</th><th>Harf Avı rekor</th><th>Düello</th><th>Toplam</th><th>Son giriş</th></tr></thead><tbody>
      ${sat.map(x => `<tr class="${x.hafta ? '' : 'pasif'}"><td>${esc(x.ad)}</td><td class="sayi">${x.hafta}</td><td class="sayi">${x.kart || ''}</td><td>${x.cumle ? '✅' : '—'}</td><td>${x.sohbet ? '✅' : '—'}</td><td class="sayi">${x.konusma ? x.konusma + '/16' : ''}</td><td class="sayi">${x.dakika || ''}</td><td class="sayi">${x.harf || ''}</td><td class="sayi">${x.duello || ''}</td><td class="sayi">${x.top}</td><td>${x.son ? new Date(x.son).toLocaleDateString('tr-TR') : '—'}</td></tr>`).join('') || '<tr><td colspan="11">Henüz sonuç yok.</td></tr>'}</tbody></table>
      <p class="soluk">Soluk satır: bu hafta hiç çalışmamış öğrenci.</p></div>
      <div class="kart-kutu"><h2>🖥️ Tahta oturumları (son 30)</h2><table class="plan"><thead><tr><th>Tarih</th><th>Oyun</th><th>Ünite</th><th>Oyuncu</th><th>Puan</th></tr></thead><tbody>
      ${tahta.map(r => `<tr><td>${new Date(r.z).toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' })}</td><td>${O.TURLER[r.t] || r.t}</td><td>${esc(temaAdi(r.s, r.u))}</td><td>${esc(r.o)}</td><td class="sayi">${r.p}${r.m ? '/' + r.m : ''}</td></tr>`).join('') || '<tr><td colspan="5">Henüz tahta oturumu yok.</td></tr>'}</tbody></table></div></div>
      <div class="kart-kutu"><h2>📥 Rapor kodu içe aktar</h2><p class="soluk">İnternet/sunucu yoksa öğrenci uygulamasındaki “Raporu öğretmene gönder” kodunu (ING1:…) buraya yapıştırın. Birden çok kod aynı anda yapıştırılabilir.</p>
        <textarea id="kodlar" rows="3" placeholder="ING1:…"></textarea><button class="btn ana" data-iceal>İçe aktar</button><span data-sonuc></span></div>`;
  };

  SAYFA.siniflar = () => {
    const cs = O.siniflar();
    return baslik('Sınıflarım', 'Sınıf kodu öğrenci uygulamasında girilir; sonuçlar bu sınıfın raporuna düşer') + `
      <div class="iki-kolon"><form class="kart-kutu" data-sinifekle><h2>+ Yeni sınıf</h2>
        <label>Sınıf düzeyi <select name="s">${O.SINIFLAR.map(s => `<option ${s === S ? 'selected' : ''}>${s}</option>`).join('')}</select></label>
        <label>Şube <input name="sube" value="A" maxlength="3" required></label>
        <label>Öğrenciler (her satıra bir ad)<textarea name="ogr" rows="8" placeholder="Ali Y.&#10;Ayşe K.&#10;…"></textarea></label>
        <p class="soluk">🔒 Adlar yalnız bu cihazda (ve sunucu kurduysanız sizin Google Drive'ınızda) tutulur.</p><button class="btn ana">Sınıfı oluştur</button></form>
      <div>${cs.map((c, j) => `<div class="kart-kutu sinif-k"><div><h2>${esc(c.ad)}</h2><p class="kod">${c.kod}</p><p class="soluk">${c.ogrenciler.length} öğrenci · öğrenci linki: <code>ogrenci.html?k=${c.kod}</code></p></div>
        <div class="dugmeler"><button class="btn" data-aktifyap="${c.kod}">${O.ayar('aktifSinif') === c.kod ? '✅ Aktif (tahta)' : 'Tahtada aktif yap'}</button><button class="btn" data-duzenle="${j}">✏️ Öğrenciler</button><button class="btn kirmizi" data-sinifsil="${j}">Sil</button></div></div>`).join('') || '<div class="kart-kutu">Henüz sınıf yok.</div>'}</div></div>`;
  };

  SAYFA.kaynaklar = () => { const u = haftaUnite(HS()) ?? 0;
    return baslik('Kaynaklar', `${S}. sınıf · ünite seçin`) + `<div class="unite-sec">${O.sinif(S).uniteler.map((m, i) => `<a class="cip ${i === u ? 'aktif' : ''}" href="#unite/${i}">${i + 1}. ${esc(m.ad)}</a>`).join('')}</div>
      <div class="kart-kutu"><h2>${esc(temaAdi(S, u))} · ücretsiz platformlar ${rozet.dis}</h2>${kaynakListe(S, u)}</div>
      <div class="kart-kutu"><h2>Etiketler</h2><p>${rozet.claude} Claude'un hazırladığı özgün içerik (kelime listeleri, kalıp, sohbet, oyunlar, A4 kâğıtlar, planlar) · ${rozet.meb} MEB resmî program ve plan · ${rozet.dis} başka sitelerdeki içerik (bağlantı)</p></div>`; };

  SAYFA.analiz = () => document.getElementById('analiz-sablon').innerHTML;

  SAYFA.ayarlar = () => baslik('Ayarlar', '') + `<form class="kart-kutu" data-ayarform>
      <label>Seslendirme aksanı <select name="ses">${[['en-GB', 'İngiliz (en-GB)'], ['en-US', 'Amerikan (en-US)']].map(([v, a]) => `<option value="${v}" ${O.ayar('ses', 'en-GB') === v ? 'selected' : ''}>${a}</option>`).join('')}</select></label>
      <label>Konuşma hızı <input name="hiz" type="range" min="0.6" max="1.2" step="0.05" value="${O.ayar('hiz', 0.9)}"></label>
      <label>Senkron sunucusu (Google Apps Script web uygulaması adresi — isteğe bağlı)<input name="sunucu" type="url" value="${esc(O.sunucu())}" placeholder="https://script.google.com/macros/s/…/exec"></label>
      <label>Öğretmen anahtarı (sunucudaki ANAHTAR)<input name="anahtar" type="password" value="${esc(O.ayar('anahtar', ''))}"></label>
      <p class="soluk">Sunucu yoksa her şey çalışır; öğrenci raporları “rapor kodu” ile gelir. Kurulum: apps-script/KURULUM.md</p>
      <button class="btn ana">Kaydet</button> <button type="button" class="btn" data-dene>🔊 Sesi dene</button></form>
      <div class="kart-kutu"><h2>Yedek</h2><button class="btn" data-yedek>⬇ Tüm verileri indir</button> <label class="btn">⬆ Yedeği yükle<input type="file" accept=".json" data-yukle hidden></label></div>`;

  /* ---------- yönlendirme ---------- */
  const MENU = [['haftalar', 'Haftalar'], ['bugun', 'Bu Hafta'], ['hafta', 'Haftalık Plan'], ['gunluk', 'Günlük Plan'], ['yillik', 'Yıllık Tablo'], ['uniteler', 'Üniteler'], ['tahta', 'Tahta Oyunları'], ['sinav', 'Sınav Hazırlık'], ['raporlar', 'Raporlar'], ['siniflar', 'Sınıflarım'], ['kaynaklar', 'Kaynaklar'], ['analiz', 'Analiz'], ['ayarlar', '⚙']];
  function ciz() {
    OYUN.dur();
    const [ad, ...arg] = (location.hash.slice(1) || 'haftalar').split('/');
    const f = SAYFA[ad] || SAYFA.haftalar;
    $('#sinif-sec').innerHTML = O.SINIFLAR.map(s => `<button data-s="${s}" aria-selected="${s === S}">${s}</button>`).join('');
    $('#menu').innerHTML = MENU.map(([k, a]) => `<a href="#${k}" class="${k === ad ? 'aktif' : ''}">${a}</a>`).join('');
    document.body.classList.toggle('oyun-modu', ad === 'oyna');
    sayfa().innerHTML = f(...arg); haftaBar(ad); bagla(ad); window.scrollTo(0, 0);
  }
  function haftaBar(ad) {
    const el = $('#hafta-bar'); if (!el) return; el.style.top = $('.ust').offsetHeight + 'px'; const gizli = ['oyna', 'analiz', 'ayarlar', 'siniflar', 'raporlar'].includes(ad); el.hidden = gizli; if (gizli) return;
    const hs = O.haftalar(S), hi = HS(), bu = O.buHafta(S), w = hs[hi];
    el.innerHTML = `<button class="btn" data-hb="-1" ${hi === 0 ? 'disabled' : ''}>◀</button>
      <select data-hbsec>${hs.map((x, i) => `<option value="${i}" ${i === hi ? 'selected' : ''}>${x.no}. hafta · ${esc(x.tarih)} · ${x.u == null ? esc(OZEL(x.tema)) : esc(temaAdi(S, x.u))}${i === bu ? '  (bu hafta)' : ''}</option>`).join('')}</select>
      <button class="btn" data-hb="1" ${hi === hs.length - 1 ? 'disabled' : ''}>▶</button>
      <button class="btn ${hi === bu ? 'bu' : ''}" data-hbbu>📍 Bu hafta</button>
      <span class="hb-bilgi">${hi === bu ? 'Bu haftadasınız' : `Seçili: ${w.no}. hafta`} · ${S}. sınıf</span>`;
    const git = i => { H = Math.max(0, Math.min(hs.length - 1, i)); const yer = ad === 'hafta' ? `hafta/${H}` : ad === 'gunluk' ? `gunluk/${H}/0` : ['haftalar', 'yillik'].includes(ad) ? 'bugun' : ad;
      if (location.hash.slice(1) === yer) ciz(); else location.hash = yer; };
    el.querySelectorAll('[data-hb]').forEach(b => b.onclick = () => git(hi + Number(b.dataset.hb)));
    el.querySelector('[data-hbsec]').onchange = e => git(+e.target.value);
    el.querySelector('[data-hbbu]').onclick = () => git(bu);
  }
  function bagla(ad) {
    $$('[data-hsec]').forEach(a => a.onclick = () => { H = +a.dataset.hsec; });
    $$('[data-buhafta]').forEach(a => a.onclick = () => { H = null; });
    $$('[data-s]').forEach(b => b.onclick = () => sinifSec(+b.dataset.s));
    $$('[data-soyle]').forEach(b => b.onclick = () => O.soyle(b.dataset.soyle));
    $$('[data-hafta]').forEach(s => s.onchange = () => location.hash = 'hafta/' + s.value);
    $$('[data-kagit]').forEach(b => b.onclick = () => bas(kagitHTML(S, +b.dataset.kagit, Date.now() % 1000), 'Etkinlik kağıdı'));
    $$('[data-tu]').forEach(b => b.onclick = () => { const u = b.dataset.tu; $$('[data-tu]').forEach(x => x.classList.toggle('aktif', x === b)); $$('.oyun-izgara.buyuk a').forEach(a => a.href = a.href.replace(/\/\d+$/, '/' + u)); const d = $('[data-tahta-uo]'); if (d) d.innerHTML = uoyunKutu(S, +u); });
    $$('[data-bas]').forEach(b => b.onclick = () => { const id = { yillik: 'yillik-tablo', hafta: 'hafta-govde', gunluk: 'gunluk-govde', rapor: 'rapor-govde' }[b.dataset.bas]; bas(`<section class="a4 genis"><h2>${esc($('h1').textContent)}</h2>${$('#' + id).innerHTML}</section>`); });
    $$('[data-word]').forEach(b => b.onclick = () => { const id = { yillik: 'yillik-tablo', gunluk: 'gunluk-govde' }[b.dataset.word]; wordIndir(`<h2>${esc($('h1').textContent)}</h2>` + $('#' + id).innerHTML, $('h1').textContent.replace(/[^\wğüşıöçĞÜŞİÖÇ ]/g, '')); });
    $$('[data-tam]').forEach(b => b.onclick = () => document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.());
    const kb = $('[data-konusmabas]'); if (kb) kb.onclick = () => { const us = $$('[data-kapsam] input:checked').map(x => +x.value); bas(konusmaHTML(S, us.length ? us : [0]), 'Konuşma sınavı'); };
    const sb = $('[data-sinavbas]'); if (sb) sb.onclick = () => { const us = $$('[data-kapsam] input:checked').map(x => +x.value); if (!us.length) return; bas(sinavHTML(S, us, Date.now() % 1000), 'Yazılıya hazırlık'); };
    kaynakBagla();
    /* raporlar */
    const ak = $('[data-aktif]'); if (ak) ak.onchange = () => { O.ayarYaz('aktifSinif', ak.value); ciz(); };
    const ic = $('[data-iceal]'); if (ic) ic.onclick = () => { try { const n = O.raporBirlestir(O.raporCoz($('#kodlar').value)); $('[data-sonuc]').textContent = ` ✅ ${n} yeni sonuç eklendi`; setTimeout(ciz, 900); } catch (e) { $('[data-sonuc]').textContent = ' ⚠️ Kod okunamadı'; } };
    const cv = $('[data-csv]'); if (cv) cv.onclick = () => { const l = O.sonuclar(), sat = [['tarih', 'sinif_kodu', 'ogrenci', 'duzey', 'unite', 'hafta', 'tur', 'puan', 'en_cok', 'saniye', 'tahta']].concat(l.map(r => [new Date(r.z).toISOString(), r.k, r.o, r.s, temaAdi(r.s, r.u), r.h, O.TURLER[r.t] || r.t, r.p, r.m || '', r.sn || '', r.tahta ? 1 : 0]));
      const b = new Blob(['﻿' + sat.map(s => s.map(x => `"${String(x).replace(/"/g, '""')}"`).join(';')).join('\n')], { type: 'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'ingilizce-rapor.csv'; a.click(); };
    const ck = $('[data-cek]'); if (ck) ck.onclick = () => { ck.textContent = '⟳ …'; O.sunucuGetir({ islem: 'rapor', anahtar: O.ayar('anahtar', ''), sinif: O.ayar('aktifSinif', '') }).then(j => { const n = O.raporBirlestir(j.sonuclar || []); ck.textContent = `✅ ${n} yeni`; setTimeout(ciz, 800); }).catch(() => ck.textContent = '⚠️ Bağlanamadı'); };
    /* sınıflar */
    const sf = $('[data-sinifekle]'); if (sf) sf.onsubmit = e => { e.preventDefault(); const s = +sf.s.value, sube = sf.sube.value.trim().toUpperCase(), cs = O.siniflar();
      const c = { kod: O.kodUret(s, sube), ad: `${s}-${sube}`, sinif: s, ogrenciler: sf.ogr.value.split('\n').map(x => x.trim()).filter(Boolean) }; cs.push(c); O.yaz('siniflar', cs);
      if (!O.ayar('aktifSinif')) O.ayarYaz('aktifSinif', c.kod);
      O.sunucuGetir({ islem: 'sinif-kaydet', anahtar: O.ayar('anahtar', ''), veri: JSON.stringify(c) }).catch(() => { }); ciz(); };
    $$('[data-aktifyap]').forEach(b => b.onclick = () => { O.ayarYaz('aktifSinif', b.dataset.aktifyap); const c = O.siniflar().find(x => x.kod === b.dataset.aktifyap); if (c) sinifSec(c.sinif); else ciz(); });
    $$('[data-sinifsil]').forEach(b => b.onclick = () => { const cs = O.siniflar(); if (!window.confirm(`${cs[+b.dataset.sinifsil].ad} silinsin mi? (Sonuçlar kalır)`)) return; cs.splice(+b.dataset.sinifsil, 1); O.yaz('siniflar', cs); ciz(); });
    $$('[data-duzenle]').forEach(b => b.onclick = () => { const cs = O.siniflar(), c = cs[+b.dataset.duzenle], k = b.closest('.sinif-k');
      k.insertAdjacentHTML('beforeend', `<textarea rows="8" class="ogr-duz">${esc(c.ogrenciler.join('\n'))}</textarea><button class="btn ana">Kaydet</button>`);
      k.lastElementChild.onclick = () => { c.ogrenciler = k.querySelector('.ogr-duz').value.split('\n').map(x => x.trim()).filter(Boolean); O.yaz('siniflar', cs); O.sunucuGetir({ islem: 'sinif-kaydet', anahtar: O.ayar('anahtar', ''), veri: JSON.stringify(c) }).catch(() => { }); ciz(); }; b.disabled = true; });
    /* ayarlar */
    const af = $('[data-ayarform]'); if (af) { af.onsubmit = e => { e.preventDefault(); O.ayarYaz('ses', af.ses.value); O.ayarYaz('hiz', +af.hiz.value); O.ayarYaz('sunucu', af.sunucu.value.trim()); O.ayarYaz('anahtar', af.anahtar.value); af.querySelector('.ana').textContent = '✅ Kaydedildi'; };
      $('[data-dene]').onclick = () => { O.ayarYaz('ses', af.ses.value); O.ayarYaz('hiz', +af.hiz.value); O.soyle('Hello! Welcome to our English class. How are you today?'); }; }
    const yd = $('[data-yedek]'); if (yd) yd.onclick = () => { const v = {}; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith('ing.')) v[k] = localStorage.getItem(k); }
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(v)], { type: 'application/json' })); a.download = 'ingilizce-ogretmenler-odasi-yedek.json'; a.click(); };
    const yk = $('[data-yukle]'); if (yk) yk.onchange = () => { const f = yk.files[0]; if (!f) return; f.text().then(t => { const v = JSON.parse(t); Object.keys(v).filter(k => k.startsWith('ing.')).forEach(k => localStorage.setItem(k, v[k])); location.reload(); }); };
  }
  window.addEventListener('hashchange', ciz);
  document.addEventListener('DOMContentLoaded', () => { document.body.dataset.sinif = S;
    $('#tahta-modu').onclick = () => { document.body.classList.toggle('tahta'); O.ayarYaz('tahta', document.body.classList.contains('tahta')); };
    if (O.ayar('tahta')) document.body.classList.add('tahta'); ciz(); });
  window.UYGULAMA = { kagitHTML, sinavHTML, gunlukPlan, konusmaHTML };
})();
