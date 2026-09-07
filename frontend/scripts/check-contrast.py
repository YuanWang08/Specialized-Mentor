# -*- coding: utf-8 -*-
"""
色彩對比檢查：驗證 app/assets/css/main.css 的設計代幣是否符合無障礙規範 AA。

用法：
    python scripts/check-contrast.py

規則（WCAG 2.1 AA）：
    一般文字   >= 4.5:1
    大型文字   >= 3.0:1（18.66px 粗體 或 24px 以上）
    非文字元素 >= 3.0:1（圖示、外框、色條）

新增或調整顏色時請跑一次；有任何一項不合格會以 exit code 1 結束。
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
CSS = os.path.join(HERE, '..', 'app', 'assets', 'css', 'main.css')


def parse_tokens(path):
    src = open(path, encoding='utf-8').read()
    root = src.split(':root')[1].split('}')[0]
    return dict(re.findall(r'(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{6})\s*;', root))


def luminance(hex_color):
    h = hex_color.lstrip('#')
    channels = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    linear = [c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4 for c in channels]
    r, g, b = linear
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def main():
    t = parse_tokens(CSS)
    light_backgrounds = [
        ('white', '#ffffff'),
        ('--cream', t['--cream']),
        ('--cream-2', t['--cream-2']),
    ]

    checks = []

    # 內文色：必須在所有淺色底上達 4.5
    for name in ('--ink', '--ink-2', '--ink-3'):
        for bg_name, bg in light_backgrounds:
            checks.append((f'{name} on {bg_name}', t[name], bg, 4.5))

    # 深藍系：連結與標題文字
    for name in ('--navy-600', '--navy-700', '--navy-800'):
        for bg_name, bg in light_backgrounds[:2]:
            checks.append((f'{name} on {bg_name}', t[name], bg, 4.5))

    # 主題色：-text 版本用於文字，需在白底、cream、cream-2 與自身 -soft 底上皆達 4.5。
    # 白色文字襯在 -text 底色上（篩選鈕選取態）是同一組對比值，因此一併涵蓋。
    for cat in ('dorm', 'career', 'service', 'club', 'sports'):
        text = t[f'--c-{cat}-text']
        soft = t[f'--c-{cat}-soft']
        for bg_name, bg in light_backgrounds + [(f'--c-{cat}-soft', soft)]:
            checks.append((f'--c-{cat}-text on {bg_name}', text, bg, 4.5))
        # 鮮豔版只用於非文字裝飾，門檻 3.0
        checks.append((f'--c-{cat} (裝飾) on white', t[f'--c-{cat}'], '#ffffff', 3.0))
        checks.append((f'白色圖示 on --c-{cat}', '#ffffff', t[f'--c-{cat}'], 3.0))

    # 深色頁尾
    for name in ('--cream', '--line'):
        checks.append((f'{name} on --navy-900', t[name], t['--navy-900'], 4.5))

    failures = []
    print(f"{'檢查項目':46} {'對比':>6} {'門檻':>5}  結果")
    print('-' * 72)
    for label, fg, bg, threshold in checks:
        r = contrast(fg, bg)
        ok = r >= threshold
        if not ok:
            failures.append((label, r, threshold))
        print(f'{label:46} {r:6.2f} {threshold:5.1f}  {"OK" if ok else "**不合格**"}')

    print()
    if failures:
        print(f'{len(failures)} 項不符合無障礙規範 AA：')
        for label, r, threshold in failures:
            print(f'  - {label}：{r:.2f}，需要 {threshold}')
        return 1
    print(f'全部 {len(checks)} 項通過，符合無障礙規範 AA。')
    return 0


if __name__ == '__main__':
    sys.exit(main())
