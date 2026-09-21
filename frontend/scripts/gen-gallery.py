# -*- coding: utf-8 -*-
"""
讀 assets-report.json（由 prepare-images.py 產生）與 gallery-en.json（英文標題對照），
寫出 app/data/gallery.ts。

英文標題查不到時 en 會是 null，網站上會自動退回顯示中文，不會壞掉。
新增照片後把新標題補進 gallery-en.json，重跑本腳本即可，既有翻譯不會遺失。
"""
import json
import re
import io
import os

HERE = os.path.dirname(os.path.abspath(__file__))
r = json.load(open(os.path.join(HERE, 'assets-report.json'), encoding='utf-8'))
EN = json.load(open(os.path.join(HERE, 'gallery-en.json'), encoding='utf-8'))
EN.pop('_comment', None)

BS = chr(92)
QT = chr(39)


def norm_date(d):
    if not d:
        return ''
    m = re.match(r'^(\d{4})\.(\d{1,2})\.(\d{1,2})$', d)
    if m:
        y, mo, dd = m.groups()
        return '%s.%02d.%02d' % (y, int(mo), int(dd))
    m = re.match(r'^(\d{4})\.(\d{1,2})\.(\d{1,2})-(\d{1,2})\.(\d{1,2})$', d)
    if m:
        y, mo, dd, mo2, dd2 = m.groups()
        return '%s.%02d.%02d–%02d.%02d' % (y, int(mo), int(dd), int(mo2), int(dd2))
    return d


def esc(s):
    return s.replace(BS, BS + BS).replace(QT, BS + QT)


def en_of(title):
    """回傳英文標題的 TS 字面值；查不到就是 null。"""
    v = EN.get(title)
    return "'%s'" % esc(v) if v else 'null'


HEADER = """import type { L } from './i18n'
import type { MentorTypeId } from './mentorTypes'

export interface Photo {
  id: string
  type: MentorTypeId
  src: string
  /** 活動日期（西元），無法從檔名判讀者為空字串 */
  date: string
  title: L
  /** 指導老師姓氏，僅服務學習組的照片有分資料夾 */
  teacher: L | null
  w: number
  h: number
}

/**
 * 活動花絮。此檔由 scripts/gen-gallery.py 產生，請勿手動編輯。
 * 中文標題來自檔名（格式：年.月.日活動名稱），英文標題來自 scripts/gallery-en.json。
 */
export const photos: Photo[] = [
"""

FOOTER = """]

export const photosByType = (type: MentorTypeId) => photos.filter((p) => p.type === type)

/** 各類別應提供的花絮張數，供缺料提示使用 */
export const galleryTarget = 10
"""

# 服務學習照片資料夾名稱 → 老師姓名（中／英）
TEACHERS = {
    '范世榮': ('范世榮', 'Fan Shih-Jung'),
    '韓伯維': ('韓伯維', 'Harn Po-Wei'),
    '蔡錫錚、吳忻怡、鄭揚宜': ('蔡錫錚、吳忻怡、鄭揚宜', 'Tsai Shyi-Jeng, Wu Hsin-Yi and Zheng Yang-Yi'),
    '陳秀琪': ('陳秀琪', 'Chen Siu-Ki'),
    '莎瓏．伊斯哈罕布德': ('莎瓏．伊斯哈罕布德', 'Salone Ishahavut'),
}

out = io.StringIO()
out.write(HEADER)
total = 0
missing_en = []
for cat in ['dorm', 'career', 'service', 'club', 'sports']:
    items = r['gallery'].get(cat, [])
    items = sorted(items, key=lambda x: (norm_date(x['date']) or '0000', x['title']), reverse=True)
    for it in items:
        total += 1
        raw = it['teacher'].replace('老師', '') if it['teacher'] else ''
        if raw:
            zh, en = TEACHERS.get(raw, (raw, None))
            teacher = "{ zh: '%s', en: %s }" % (
                esc(zh), "'%s'" % esc(en) if en else 'null')
        else:
            teacher = 'null'
        if not EN.get(it['title']):
            missing_en.append(it['title'])
        out.write(
            "  { id: '%s', type: '%s', src: '%s', date: '%s',\n"
            "    title: { zh: '%s', en: %s },\n"
            "    teacher: %s, w: %d, h: %d },\n"
            % (it['id'], cat, it['src'], norm_date(it['date']),
               esc(it['title']), en_of(it['title']), teacher, it['w'], it['h'])
        )
out.write(FOOTER)

dst = os.path.join(HERE, '..', 'app', 'data', 'gallery.ts')
open(dst, 'w', encoding='utf-8').write(out.getvalue())
print('photos written:', total)
if missing_en:
    print('尚無英文標題（畫面會退回中文）：%d 筆' % len(missing_en))
    for t in dict.fromkeys(missing_en):
        print('  -', t)
else:
    print('所有標題皆有英文對照。')
