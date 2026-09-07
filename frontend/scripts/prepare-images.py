# -*- coding: utf-8 -*-
import os, re, json, shutil
from PIL import Image, ImageOps
import pillow_heif
pillow_heif.register_heif_opener()

SRC = r"c:/Users/sckwi/Desktop/徐姊網站/Specialized-Mentor/專項導師成果網頁-雲端資料"
DST = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'images')

def save(src, out, maxw):
    os.makedirs(os.path.dirname(out), exist_ok=True)
    im = Image.open(src)
    try: im.seek(0)
    except Exception: pass
    im = ImageOps.exif_transpose(im)   # 依 EXIF 方向旋轉，避免手機拍攝的照片顯示顛倒
    if im.mode in ('RGBA','LA','P'):
        bg = Image.new('RGB', im.size, (255,255,255))
        im = im.convert('RGBA'); bg.paste(im, mask=im.split()[-1]); im = bg
    else:
        im = im.convert('RGB')
    if im.width > maxw:
        im = im.resize((maxw, round(im.height*maxw/im.width)), Image.LANCZOS)
    im.save(out, 'JPEG', quality=84, optimize=True, progressive=True)
    return im.size

# ---------- 傑出導師照片 ----------
MENTOR_PHOTO = {
 '114學年傑出專項服學導師_資工系韓伯維老師.jpg':'han-bowei',
 '115系學會傑出指導-楊舒芝教授.jpg':'yang-shuzhi',
 '115系學會傑出指導李淑萍教授.jpg':'li-shuping',
 '宿舍導師_化材系謝介銘老師.jpg':'xie-jieming',
 '服學導師_生科系范世榮老師.tif':'fan-shirong',
 '服學導師_通識中心鄭揚宜.jpg':'zheng-yangyi',
 '職涯導師_中文系宋玉雯.jpeg':'song-yuwen',
 '職涯導師_電機系龔存雄.jpg':'gong-cunxiong',
 '體育導師_體育室余宏群講師.jpg':'yu-hongqun',
 '體育導師_體育室張桂菱助理教授.jpg':'zhang-guiling',
}
report = {'mentors':{}, 'gallery':{}}
mdir = os.path.join(SRC,'114學年度傑出專項導師照片')
for fn, mid in MENTOR_PHOTO.items():
    p = os.path.join(mdir, fn)
    if os.path.exists(p):
        sz = save(p, os.path.join(DST,'mentors',mid+'.jpg'), 900)
        report['mentors'][mid] = {'file':f'/images/mentors/{mid}.jpg','size':sz}
    else:
        print('MISSING mentor photo:', fn)

# ---------- 活動花絮 ----------
CAT = {'宿舍':'dorm','職涯':'career','服務學習':'service','系學會':'club','體育':'sports'}

def parse_name(stem):
    """回傳 (日期字串, 標題)"""
    s = stem.strip()
    # 2025-09-11 標題  /  2026-04-28   標題
    m = re.match(r'^(\d{4})-(\d{2})-(\d{2})\s*(.*)$', s)
    if m:
        y,mo,d,t = m.groups(); return f'{y}.{mo}.{d}', t.strip()
    # 20260331 標題 / 20251206標題
    m = re.match(r'^(20\d{2})(\d{2})(\d{2})\s*(.*)$', s)
    if m:
        y,mo,d,t = m.groups(); return f'{y}.{mo}.{d}', t.strip()
    # 1131120 (民國 yyymmdd)
    m = re.match(r'^(1\d{2})(\d{2})(\d{2})\s*(.*)$', s)
    if m:
        y,mo,d,t = m.groups(); return f'{int(y)+1911}.{mo}.{d}', t.strip()
    # 114.11.25 標題 / 115.5.15標題 / 114.11.5-11.6 標題
    m = re.match(r'^(1\d{2})\.(\d{1,2})\.(\d{1,2}(?:-\d{1,2}\.\d{1,2})?)\s*(.*)$', s)
    if m:
        y,mo,d,t = m.groups(); return f'{int(y)+1911}.{int(mo):02d}.{d}', t.strip()
    return '', s

for zh, en in CAT.items():
    base = os.path.join(SRC,'活動花絮照片(各類導師各10張)', zh)
    items = []
    for root, dirs, files in os.walk(base):
        dirs.sort()
        teacher = os.path.basename(root) if root != base else ''
        for f in sorted(files):
            stem, ext = os.path.splitext(f)
            if ext.lower() not in ('.jpg','.jpeg','.png','.heif','.heic','.tif','.tiff','.jfif'): continue
            date, title = parse_name(stem)
            items.append({'src':os.path.join(root,f),'date':date,'title':title,'teacher':teacher,'orig':f})
    items.sort(key=lambda x:(x['date'] or '9999', x['title']))
    out = []
    for i, it in enumerate(items, 1):
        name = f'{en}-{i:02d}.jpg'
        sz = save(it['src'], os.path.join(DST,'gallery',en,name), 1600)
        out.append({'id':f'{en}-{i:02d}','src':f'/images/gallery/{en}/{name}',
                    'date':it['date'],'title':it['title'],'teacher':it['teacher'],
                    'w':sz[0],'h':sz[1]})
    report['gallery'][en] = out
    print(f'{zh} ({en}): {len(out)} 張')

with open(os.path.join(os.path.dirname(__file__),'assets-report.json'),'w',encoding='utf-8') as fh:
    json.dump(report, fh, ensure_ascii=False, indent=1)
print('mentor photos:', len(report['mentors']))
