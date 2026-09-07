# 圖片處理腳本

兩支腳本負責把雲端資料裡的照片轉成網站可用的檔案。需要 Python 3 與：

```bash
pip install pillow pillow-heif
```

## 使用方式

```bash
python scripts/prepare-images.py   # 轉檔 + 壓縮 → public/images/，同時產生 assets-report.json
python scripts/gen-gallery.py      # 讀 assets-report.json → 寫出 app/data/gallery.ts
```

兩支都要依序執行。第一支處理圖檔，第二支把檔名裡的日期與活動名稱寫成網站資料。

## prepare-images.py 做的事

- 轉換 HEIF / TIF / JFIF / PNG → JPG（瀏覽器不支援前三種）
- 依 EXIF 方向旋轉（不做會出現手機拍攝的照片上下顛倒）
- 花絮縮到寬 1600px、導師照縮到寬 900px，quality 84 漸進式 JPG
- 輸出成 `career-01.jpg` 這種 ASCII 檔名，避免中文檔名的網址編碼問題

## 兩個要手動維護的地方

- `SRC`：雲端資料夾路徑。資料夾搬家時要改。
- `MENTOR_PHOTO`：導師照片檔名 → 導師 id 的對照表。
  新增傑出導師照片時要在這裡加一行，id 要和 `app/data/outstanding.ts` 裡的一致。
