# -*- coding: utf-8 -*-
"""MEB resmî kaynaklarından js/veri-meb.js üretir.

Kaynaklar (kaynak/ klasörü):
  meb_ingilizce.json  - tymm.meb.gov.tr tema sayfalarından ayrıştırılmış içerik (2-8. sınıf, Maarif)
  plan.xlsx           - MEB "İNGİLİZCE (2-8. SINIF) TASLAK YILLIK ÇERÇEVE PLAN" 2026-2027
  oyss_ingilizce.xlsx - ODSGM 1. dönem ortak yazılı konu-soru dağılım tablosu (5-8)
Çalıştır: python araclar/uret_meb.py
"""
import json, re, os, openpyxl

KOK = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
K = os.path.join(KOK, 'kaynak')

def temiz(s):
    s = (s or '').replace(' ', ' ')
    s = re.sub(r'[ \t]+', ' ', s)
    s = re.sub(r'\n\s*\n+', '\n', s)
    return s.strip()

def bolum(x, bas, sonlar):
    i = x.find(bas)
    if i < 0:
        return ''
    i += len(bas)
    j = min([k for k in (x.find(s, i) for s in sonlar) if k > 0] or [len(x)])
    return x[i:j]

def gurultu_sil(v):
    # her temada tekrarlanan milli günler ve yerel kültür paragraflarını at
    v = re.sub(r'\*\s*National and [Rr]eligious [Dd]ays.*?(?=\n[A-Z-][^\n]{0,60}:|\Z)', '', v, flags=re.S)
    v = re.sub(r'\*\s*\(Relevant language content.*?\)\s*', '', v, flags=re.S)
    v = re.sub(r'\*\s*Local Cultural.*?(?=\n(?:Target|Background|Vocabulary)|\Z)', '', v, flags=re.S)
    v = re.sub(r'In this theme, specific examples.*?(?=\n(?:Target|Background|Vocabulary)|\Z)', '', v, flags=re.S)
    return temiz(v)

# ---------------- Maarif tema içerikleri ----------------
meb = json.load(open(os.path.join(K, 'meb_ingilizce.json'), encoding='utf-8'))
SIRA = ['school', 'classroom', 'personal', 'family', 'home', 'neighbourhood', 'city', 'world', 'nature', 'universe']

def tema_adi(t):
    t = t.split('Sınıf')[-1].replace('Teması', '').strip()
    t = re.sub(r'^Theme \d+:\s*', '', t)
    t = t.replace('İ', 'I').replace('ı', 'i').replace('i̇', 'i')
    return re.sub(r'\s+', ' ', t.title()).replace(' And ', ' & ').strip()

def temalar(sinif):
    ts = [o for o in meb if o['sinif'] == sinif and o['icerik']]
    def anahtar(o):
        m = re.search(r'Theme (\d+)', o['tema'])
        if m:
            return int(m.group(1))
        ad = tema_adi(o['tema']).lower()
        sira5 = ['school', 'classroom', 'personal', 'family', 'neighbourhood', 'world', 'nature', 'universe']
        return next((i for i, k in enumerate(sira5) if k in ad), 99)
    ts.sort(key=anahtar)
    out = []
    for o in ts:
        x = o['icerik']
        kel = bolum(x, 'Target Vocabulary in Use', ['Target Language Chunks', 'Target Grammatical', 'Background Grammatical', 'Language Chunks'])
        kal = bolum(x, 'Target Language Chunks in Use:', ['Target Social Language', 'Target Phonological']) or \
              bolum(x, 'Target Grammatical Structures in Use:', ['Target Social Language', 'Target Phonological'])
        arka = bolum(x, 'Background Grammatical Structures in Use:', ['Target Grammatical', 'Target Social Language', 'Target Phonological'])
        sos = bolum(x, 'Target Social Language in Use:', ['Target Phonological'])
        ses = bolum(x, 'Target Phonological', ['\u0000'])
        out.append(dict(
            ad=tema_adi(o['tema']), alt=temiz(o['alt'] or (re.search(r'Sub-?[Tt]hemes?:\s*([^\n]+)', x) or [None, ''])[1]), saat=o['saat'], meb=o['id'],
            kelime=gurultu_sil(kel.lstrip(' (with revisional vocabulary):').lstrip(':')),
            kalip=temiz((arka + '\n' + kal).strip()), sosyal=temiz(sos), ses=temiz(ses.split('*No pronunciation')[0]).lstrip(':').lstrip('Sounds in Use:').strip(),
            olcme=temiz(o['olcme']), fark=temiz(o['fark'])[:2500], kavram=temiz(o['kavram'])))
    return out

# ---------------- Yıllık plan ----------------
wb = openpyxl.load_workbook(os.path.join(K, 'plan.xlsx'), data_only=True)
def sayfa(sinif):
    for ws in wb:
        t = ws.title.replace(' ', '')
        if t in ('TYMM%d' % sinif, '%d.Sınıf' % sinif):
            return ws
SAAT = {}
def plan(sinif):
    ws = sayfa(sinif)
    rows = list(ws.iter_rows(values_only=True))
    hi = next(i for i, r in enumerate(rows) if r[0] and str(r[0]).strip().upper() == 'MONTH')
    hdr = [str(c or '').strip().upper() for c in rows[hi]]
    def kol(*adlar):
        for a in adlar:
            for i, h in enumerate(hdr):
                if a in h:
                    return i
    c_gun = kol('NATIONAL CELEBRATIONS'); c_fn = kol('FUNCTIONS'); c_out = kol('LEARNING SKILLS', 'LEARNING OUTCOMES')
    c_ctx = kol('SUGGESTED CONTEXTS'); c_as = kol('ASSESSMENT'); c_dif = kol('DIFFERENTIATION')
    haftalar, uniteler, ay = [], {}, ''
    for r in rows[hi + 1:]:
        if not r[1] or 'Week' not in str(r[1]):
            continue
        ay = str(r[0]).strip().upper() if r[0] else ay
        ham = re.sub(r'\s+', ' ', str(r[1])).strip()
        m = re.match(r'Week\s*(\d+):?\s*(.*)', ham)
        tema = re.sub(r'\s+', ' ', str(r[3] or '')).strip()
        if not r[2] and not tema:
            tema = ham.split(':', 1)[-1]
        if 'SCHOOL' in str(r[2] or '').upper() or ('SCHOOL' in tema.upper() and 'PLANNING' in tema.upper()):
            tema = 'SCHOOL-BASED PLANNING'
        AYLAR = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
        gun = int(re.search(r'\d+', m.group(2)).group())
        ayno = next(i + 1 for i, a in sorted(enumerate(AYLAR), key=lambda t: m.group(2).lower().find(t[1]) if t[1] in m.group(2).lower() else 999))
        h = dict(no=int(m.group(1)), tarih=m.group(2).strip(), bas='%d-%02d-%02d' % (2026 if ayno >= 9 else 2027, ayno, gun), ay=ay, saat=r[2] if isinstance(r[2], (int, float)) else None, tema=tema,
                 gun=temiz(str(r[c_gun] or '')) if c_gun is not None else '')
        haftalar.append(h)
        um = re.match(r'(\d+)\s+(.*)', tema)
        if um and c_fn is not None and r[c_fn]:
            uniteler.setdefault(int(um.group(1)), dict(no=int(um.group(1)), ad=um.group(2).strip().title().replace("'S", "'s"),
                fonksiyon=temiz(str(r[c_fn])), cikti=temiz(str(r[c_out] or '')), baglam=temiz(str(r[c_ctx] or '')) if c_ctx else '',
                olcme=temiz(str(r[c_as] or ''))))
    saat = next(h['saat'] for h in haftalar if h['saat'])
    return haftalar, [uniteler[k] for k in sorted(uniteler)], int(saat)

# ---------------- Ortak yazılı ----------------
def oyss():
    w = openpyxl.load_workbook(os.path.join(K, 'oyss_ingilizce.xlsx'), data_only=True)
    out = {}
    for ws in w:
        s = int(re.match(r'\d+', ws.title).group())
        rows = list(ws.iter_rows(values_only=True))
        satir, tema = [], ''
        for r in rows:
            vals = list(r)
            kod = next((str(c) for c in vals[:3] if c and re.match(r'\s*(ENG\.|E\d)', str(c))), None)
            if not kod:
                continue
            if vals[0] and not re.match(r'\s*(ENG\.|E\d)', str(vals[0])):
                tema = str(vals[0]).strip()
            nums = [int(c) if isinstance(c, (int, float)) else 0 for c in vals[2:12]]
            k = re.match(r'\s*(\S+?)\.?\s', kod)
            satir.append(dict(tema=tema.title(), kod=k.group(1).rstrip('.'), metin=temiz(kod)[len(k.group(0)):].strip()[:160],
                              y1=nums[:5], y2=nums[5:10]))
        out[s] = satir
    return out

VERI = {'yil': '2026-2027', 'kaynak': {
    'tema': 'https://tymm.meb.gov.tr/ogretim-programlari/ingilizce-dersi-temel-egitim',
    'plan': 'https://tymm.meb.gov.tr/taslak-cerceve-planlari/temel-egitim',
    'oyss': 'https://odsgm.meb.gov.tr/www/1donem-konu-soru-dagilim-tablolari-2026-2027/icerik/1724'},
    'sinif': {}, 'oyss': oyss()}
for s in range(2, 9):
    hft, u2018, saat = plan(s)
    maarif = s in (2, 3, 5, 6)
    d = dict(saat=saat, program='Maarif (TYMM)' if maarif else '2018 programı', haftalar=hft)
    if maarif:
        d['uniteler'] = temalar(s)
    else:
        d['uniteler'] = u2018
        d['gelecek_maarif'] = [dict(ad=t['ad'], alt=t['alt'], saat=t['saat'], meb=t['meb']) for t in temalar(s)]  # 2027-28'de gelecek
    # hafta -> ünite sırası
    for h in hft:
        t = h['tema'].upper()
        m = re.match(r'THEME\s*(\d+)', t) or re.match(r'(\d+)\s', t)
        h['u'] = int(m.group(1)) - 1 if m else None
    VERI['sinif'][s] = d
    print(s, d['program'], saat, 'saat', len(hft), 'hafta', len(d['uniteler']), 'ünite')

js = '/* OTOMATİK ÜRETİLDİ: python araclar/uret_meb.py — elle düzenleme */\nwindow.MEB = ' + json.dumps(VERI, ensure_ascii=False, separators=(',', ':')) + ';\n'
open(os.path.join(KOK, 'js', 'veri-meb.js'), 'w', encoding='utf-8').write(js)
print('js/veri-meb.js', len(js) // 1024, 'KB')
