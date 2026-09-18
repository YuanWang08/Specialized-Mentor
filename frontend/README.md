# 多元專項輔導導師成果網

國立中央大學專項輔導導師成果網站。Nuxt 4 + Vue 3，內容全部寫在 `app/data/` 的 TypeScript 資料檔，補資料時只要改這幾個檔案，不用動版面。

## 開發

```bash
npm install        # 首次
npm run dev        # http://localhost:3000
npm run build      # 產出 .output/（Node 伺服器版）
npm run generate   # 產出 .output/public/（純靜態檔，可直接丟主機）
```

> `.npmrc` 已設定 `legacy-peer-deps=true`。npm 10.9.3 解析 Nuxt 4.5 的 peer dependency 時會出現
> `Cannot read properties of null (reading 'edgesOut')`，這個設定是繞過該 bug 用的，請勿刪除。

## 目錄結構

```
app/
  data/            ← 所有網站內容都在這裡
    site.ts          站名、副標、導覽列、頁尾聯絡資訊
    mentorTypes.ts   五大專項導師（標語、簡介、計畫介紹全文、代表色、成果數字）
    outstanding.ts   114 學年度傑出導師 14 位（心語、心得、照片路徑）
    testimonials.ts  學生心得回饋
    results.ts       年度成果數據、競賽榮譽、深耕指標
    books.ts         優良導師繪本 7 本（沒有線上書頁的書填 details，按鈕改開資訊彈窗）
    system.ts        （已停用）原中大導師制度頁的內容。導覽列的「中大導師制度」自 2026-09-18 起
                     改連到諮商中心導師專區，頁面檔改名為 pages/-system.vue 保留（Nuxt 不產生路由）
    gallery.ts       活動花絮（由 public/images/gallery 產生）
  components/      共用元件
  pages/           路由頁面
  assets/css/main.css  設計代幣（顏色、字級、圓角、陰影）
public/images/
  mentors/         傑出導師照片
  gallery/{dorm,career,service,club,sports}/  活動花絮
```

## 資料來源對照

| 網站區塊 | 來源檔案 |
| --- | --- |
| 計畫介紹全文 | `專項導師成果網頁-雲端資料/首頁_計畫介紹.docx` |
| 站名、導覽列 | `專項導師網頁內容(各組填寫).xlsx`／首頁(徐姐) |
| 五大專項導師 | 同上／五大專項導師 |
| 傑出導師 14 位 | 同上／114學年度傑出導師分享 |
| 學生心得回饋 | 同上／學生心得回饋 |
| 年度成果、深耕指標 | 同上／年度成果 |
| 優良導師繪本 | 同上／優良導師繪本(徐姐) |
| 傑出導師照片 | `114學年度傑出專項導師照片/` |
| 活動花絮 | `活動花絮照片(各類導師各10張)/` |

## 無障礙（重要）

委託機關是學校機關，本網站須符合**無障礙網頁規範 AA 等級**。改任何東西前請先讀這一節。

目前狀態：中英文各 12 個路由以 axe-core 掃描（wcag2a / wcag2aa / wcag21a / wcag21aa / best-practice）
**全數零違規**；26 個頁面 × 320～1440px 共 9 種寬度**皆無橫向捲動**。

### 已內建的設計

- **三個定位點（accesskey）**：`U` 上方導覽、`C` 中央內容、`Z` 頁尾資訊，定義於 `app/app.vue`、
  `SiteHeader.vue`、`SiteFooter.vue`。**不要刪掉**，這是無障礙標章的檢測項目。
- **色彩代幣分兩組**（`app/assets/css/main.css`）：
  - `--c-{類別}` 鮮豔版 → 只給**非文字**裝飾用（圓形圖示底、色條、外框），門檻 3:1
  - `--c-{類別}-text` 加深版 → **凡是文字、連結、或承載白色文字的底色都必須用這組**，門檻 4.5:1

  元件同時傳入這兩個變數：`:style="{ '--accent': t.color, '--accent-text': t.colorText }"`。
- **篩選鈕不是 ARIA tabs**：`FilterTabs.vue` 用 `aria-pressed` 的切換按鈕加上 `aria-live` 播報筆數。
  不要改回 `role="tablist"`——那組角色要求必須有對應的 tabpanel，否則螢幕閱讀器會唸錯。
- **照片燈箱是真正的對話框**：`role="dialog"` + `aria-modal`、Tab 焦點鎖定在框內、Esc 關閉、
  關閉後焦點回到原本的縮圖按鈕。
- **重複的連結都有完整敘述**：「閱讀心得」這種按鈕都補了 `aria-label`，單獨聆聽時能分辨是哪一位導師。
- **裝飾性圖片 `alt=""`**：外層連結或按鈕已具名、且旁邊有可見文字時，圖片一律 `alt=""`，
  避免螢幕閱讀器把同一句話唸三次。
- `/accessibility` 無障礙聲明頁、`/sitemap` 網站導覽頁。

### 改動後怎麼驗

```bash
python scripts/check-contrast.py    # 驗證色彩代幣，不合格會 exit 1
```

跑完整的 axe 掃描（需先 `npm run dev`）：

```bash
npm install --no-save axe-core
cp node_modules/axe-core/axe.min.js public/_axe.js
```

在瀏覽器開啟任一頁面，於主控台載入 `/_axe.js` 後執行
`axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice'] } })`。
驗完記得 `rm public/_axe.js`。

### 加新頁面的檢查清單

- [ ] 每頁只有一個 `<h1>`，其下標題層級不跳號（h1 → h2 → h3）
- [ ] 同一頁有多個 `<nav>` 時，每個都要有各自的 `aria-label`
- [ ] 文字顏色走 `--ink*` 或 `--c-*-text`，不要直接寫死色碼
- [ ] 圖片有 `alt`；純裝飾用 `alt=""`
- [ ] 只用滑鼠 hover 才出現的東西，鍵盤也要能到達（用 `:focus-within`）
- [ ] 不要用 `opacity` 讓文字變淡——那會讓對比不合格，改用對比達標的實色

## 雙語化

網站提供**中文與英文**兩個版本，由 `@nuxtjs/i18n` 驅動。

| | 中文（預設） | 英文 |
| --- | --- | --- |
| 網址 | `/about` | `/en/about` |
| `<html lang>` | `zh-Hant-TW` | `en` |

切換鈕在頁首右上角（窄螢幕收在漢堡選單內）：平常只顯示一個地球圖示，
點開才出現語言清單，目前語言會打勾。**切換後會停在同一個頁面**而不是跳回首頁。
`hreflang` 與 `x-default` 由模組自動輸出。

語言選單（`app/components/LangSwitch.vue`）用 `aria-haspopup="menu"` ＋ `role="menu"` 的選單模式，
鍵盤可完整操作：方向鍵開啟並移動、`Esc` 關閉並把焦點還給按鈕、點選單外或焦點移出時自動關閉。

> **頁首高度**：`.hdr__inner` 用固定的 `height`（不是 `min-height`），且中英文**共用同一組斷點**
> （1280px 以下收成漢堡選單）。這兩點是為了確保切換語言時頁首高度不會跳動——
> 曾經因為給英文開了專屬斷點，導致 1181–1300px 之間英文版頁首整個塌成 0 高。
> 請不要再為單一語言加專屬的版面斷點。

### 文案放在哪裡（兩個地方，分工不同）

1. **介面字串** → `i18n/locales/zh-TW.json` 與 `en.json`
   按鈕、標籤、提示語這類跟內容無關的字。用 `t('nav.about')` 取用。

2. **內容** → `app/data/*.ts`，中英並排寫在同一個物件裡

   ```ts
   name: { zh: '韓伯維', en: 'Han Po-wei' }
   ```

   在元件裡用 `useLocalized()` 的 `t()`／`tAll()` 取用：

   ```ts
   const { t: tc } = useLocalized()
   tc(mentor.name)          // 單段
   tAll(mentor.reflection)  // 多段（字串陣列）
   ```

   **為什麼不全部塞進 locale JSON**：內容是給校方人員校對的，中英擺在同一行才看得出
   哪句對哪句、哪裡還沒翻。拆成兩個 JSON 檔會變成在兩個檔案間對行號。

   `en` 填 `null` 代表尚未翻譯，畫面會自動退回顯示中文，不會壞掉也不會出現空白。

### 活動花絮的標題

照片標題從檔名解析，英文對照放在 `scripts/gallery-en.json`（中文標題當鍵）。
補完照片後把新標題加進去再跑 `python scripts/gen-gallery.py`，既有翻譯不會被覆蓋；
查不到對照的標題其 `en` 會是 `null`，腳本結束時會列出來提醒。

### 上線前要請人確認的暫譯

英文內容是先翻好待審的版本。以下項目**需要正式名稱**，確認後直接改資料檔：

- [ ] **14 位導師的英文姓名拼法** — `app/data/outstanding.ts` 的 `name.en`。
      目前用威妥瑪式拼法（如 `Hsieh Chieh-ming`），但老師各自的護照／論文拼法可能不同，
      應向本人確認。`Salone Ishahavut` 為布農族名的既有羅馬拼寫。
- [ ] **6 本繪本的英文書名** — `app/data/books.ts` 中標有 `titleEnUnofficial: true` 的都是暫譯，
      需向中大出版中心確認。2025 年《片片絮語》的 `A Murmur of Light` 是書上既有的正式英文名。
- [ ] **系所英文名稱** — 依中大官方英文系所名填寫，仍建議比對一次。
- [ ] **站名英譯** — 目前為 `Specialized Mentoring Programs`（`i18n/locales/en.json` 的 `site.name`）。

`/accessibility` 的「已知限制」已載明姓名與書名為暫譯，正式名稱確認後請一併移除該條。

### 英文版的版面注意事項

英文比中文長，且**長單字不能像中文一樣逐字斷行**，很容易撐爆版面。已處理的地方：

- 頁首容器加寬到 1340px；中英文共用 1280px 斷點（見上方「頁首高度」的說明）
- 格線子項統一 `min-width: 0`，`minmax()` 的下限一律寫成 `minmax(min(280px, 100%), 1fr)`
- 類別標籤 `.chip` 不使用 `white-space: nowrap`
- 內文元素允許 `overflow-wrap: break-word`
- 職稱不直接接在英文姓名後（`Hsieh Chieh-ming Professor` 是錯的），改放在系所那一行，
  用 `t('common.sep')` 當分隔符號（中文全形空格／英文中點）

**加新版面時請在 320px 寬度下確認不會橫向捲動**，中文看不出問題不代表英文沒問題。

### 卡片高度

格線項目（`li`）會被 stretch 撐到整列高度，但項目**裡面**的卡片預設只有內容高度，
於是同一列中文字較多的卡片會比較高、底部參差不齊。`main.css` 有一條共用規則處理：

```css
.grid-2 > * > .card, .grid-3 > * > .card,
.grid-4 > * > .card, .grid-5 > * > .card { height: 100%; }
```

新的卡片元件只要根元素帶 `.card`、並放在 `.grid-N` 的項目裡，就會自動等高，
卡片內用 `margin-top: auto` 的底部按鈕也會跟著對齊。

短標語（如卡片的一句話標語）加了 `text-wrap: balance`，讓換行時兩行長度平均，
避免最後一行只剩一個字。不支援的瀏覽器會忽略並退回一般斷行。

**卡片內部元素的對齊**：光是卡片等高還不夠。學生心得卡片原本用 `margin-top: auto` 把
系所資訊那一區貼齊卡片底部，但那一區的高度會隨姓名長短變成 1～3 行，導致分隔線在每張
卡片的位置都不一樣。現在改成：內文固定 5 行高（`height: calc(1.95em * 5)`），
資訊區緊接在內文之後，長度差異吃在卡片底部的留白。**要對齊的是使用者看得到的線
（分隔線、標籤），不是看不到的卡片底緣。**

> 後來改用 CSS subgrid（`main.css` 的 `.quote-grid`）：同一列的卡片共用「引號／內文／系所」
> 三段列高，內文高度取該列最長的一則（仍最多 5 行）。好處是整列都是一句話短評時卡片會跟著變矮，
> 不會像固定 5 行高那樣留一大塊空白。用 `clamp` 的心得清單請在 `<ul>` 加上 `quote-grid`。

### 繪本封面

`public/images/books/{年份}.jpg`，檔名對應 `books.ts` 的 `year`。
各年度封面來源不一致（有平面書封掃描、也有立體書的產品照），長寬比從 0.77 到 1.49 都有，
所以卡片用 **4:3 的框搭配 `object-fit: contain`**、白底加內距完整呈現，不裁切書名。
換封面時放進同一個資料夾覆蓋即可，不必改程式。

新增封面請轉成 JPG、白底、寬度上限 900px（原始檔約 2.5 MB，處理後約 0.5 MB）。
若拿到的是含封底、尺寸標註的印刷完稿（例如 2019《導路》），只裁出封面那一面。

## 網站圖示（favicon）

`public/favicon.svg` 是主要圖示，內容與頁首的品牌標記一致（深藍圓角底＋白色笑臉愛心）。
另有 `favicon.ico`（16/32/48/64 四種尺寸）、`favicon-96x96.png`、`apple-touch-icon.png`（180×180，
iOS 加到主畫面用，已填底色因為 iOS 不支援透明），全部在 `nuxt.config.ts` 的 `app.head.link` 註冊。

要換圖示時改 `favicon.svg`，再用瀏覽器把它渲染成 512×512 的 PNG，用 Pillow 產生其餘尺寸即可。

## 部署到 Cloudflare Pages

網站是**全靜態**產出：所有內容都在 `app/data` 的資料檔裡，沒有 API、沒有即時資料，
所以不需要 SSR runtime，直接把靜態檔丟上去最單純也最不會壞。

```bash
npm run generate     # 產出 .output/public（含 124 個預先產生的頁面）
```

### 設定值

| 項目 | 值 |
| --- | --- |
| Framework preset | **None**（不要選 Nuxt，那會走 SSR/Workers） |
| Build command | `npm run generate` |
| Build output directory | `.output/public` |
| Root directory | `frontend` |
| Node 版本 | 環境變數設 `NODE_VERSION` = `22` |

> **`nitro.preset` 必須釘成 `'static'`（已設定在 `nuxt.config.ts`，不要拿掉）。**
>
> 不釘的話，Nitro 會偵測到 `CF_PAGES` 環境變數自動切成 `cloudflare-pages-static`，
> **產出目錄從 `.output/public` 變成 `dist`**——本機建置成功，雲端卻找不到檔案，
> 建置後處理腳本也會因為找不到 `404/index.html` 而失敗。
>
> 要在本機重現雲端環境驗證，跑：
>
> ```bash
> CF_PAGES=1 npm run generate
> ```
>
> 產出應該仍在 `.output/public`，且日誌會顯示 `Nitro preset: static`。

> `.npmrc` 已設 `legacy-peer-deps=true`，Cloudflare 上的 `npm install` 會沿用，不必另外設定。

### 方式一：直接上傳（最快，不需要 Git）

適合「先丟上去給人看」。

```bash
npm run generate
npx wrangler pages deploy .output/public --project-name=ncu-mentors
```

第一次會要求登入 Cloudflare（瀏覽器授權）。完成後會給一個
`https://<專案名>.pages.dev` 的網址。之後每次重跑同一行指令就會更新。

也可以不用指令：Cloudflare 後台 → Workers & Pages → Create → Pages →
Upload assets，把 `.output/public` 整個資料夾拖進去。

### 方式二：接 Git（正式上線建議用這個）

把專案推上 GitHub/GitLab 後，在 Cloudflare 後台選 Connect to Git，
再依上表填設定值。之後 push 就會自動建置部署，並且每個 PR 都有預覽網址。

**注意**：目前 `Specialized-Mentor` 還不是 git repo，也還沒有 remote。
要走這條路得先 `git init` 並建立遠端庫。

### 已經處理好的部署相關設定

- **`nuxt.config.ts` 的 `nitro.prerender`** — 明確列出所有路由（含 14 位導師的個人頁、
  五類導師頁，中英文各一份），`failOnError: true` 讓漏頁時建置直接失敗而不是默默上線。
  之後新增導師只要加進 `outstanding.ts`，路由清單會自動跟著長。
- **`public/_headers`** — Cloudflare Pages 專用。設了基本安全標頭
  （`X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、`Permissions-Policy`），
  並讓帶雜湊的 `/_nuxt/*` 長期快取、`/images/*` 快取一天。
- **`scripts/finalize-static.mjs`**（由 `postgenerate` 自動執行）— 把預先產生的 `/404`
  複製成主機看得懂的 `404.html`，並檢查關鍵檔案齊全，缺了就讓建置失敗。

  Nuxt 預設產出的 `404.html` 是 SPA 空殼：沒有 `<title>`、關掉 JS 就是一片空白。
  對有無障礙要求的公部門網站不合格，所以 404 做成真的會被預先渲染的頁面。

### 部署前自我檢查

```bash
npm run generate
npx serve .output/public        # 或任何靜態伺服器
```

`.output/public` 約 24 MB，其中 21 MB 是照片。Cloudflare Pages 單檔上限 25 MB、
單次部署 20,000 個檔案，這個規模遠低於限制。

## 待補素材清單

網站已用佔位框標示，補齊後只要換圖／改資料檔即可，版面不需調整。

**圖片**

- [x] ~~**首頁主視覺**~~ 已完成：`public/images/mainpage/hero-1～3.jpg`，一大兩小的固定拼貼（窄螢幕只顯示 hero-1）。
      換圖時直接覆蓋同檔名；hero-1 若換了畫面，記得更新 i18n 的 `home.heroAlt`。
      建議 1600 × 1200 以上。
- [x] ~~**宿舍組活動花絮 10 張**~~ 已上架（原始檔放在雲端資料的 `活動花絮照片(各類導師各10張)/宿舍/`）。
      服務學習「科學教案執行 (大溪區百吉國小)」因解析度不足已下架，原始檔移到雲端資料的 `_網站未使用/`。
- [ ] **系學會活動花絮 7 張**（目前 3 張）
- [x] ~~**傑出導師照片 14 位**~~ 已於 2026-09-18 全部換成 AI 生成版本（900×900 JPG）。
      AI 原檔 PNG 在雲端資料的 `114學年度傑出專項導師照片/AI生成版本/`，
      舊的實拍照備份在 `_網站未使用/導師照片_舊版（實拍）/`。
      首頁導師區按鈕上方有「圖片由AI生成」說明；傑出導師列表頁與個人頁**尚未標註**。
- [x] ~~**繪本封面 7 張**~~ 已完成，放在 `public/images/books/{年份}.jpg`。

**文字**

- [x] ~~**傑出導師心得**~~ 14 位全部上架（2026-09-18 補齊服務學習組 4 位）。
      陳秀琪老師原文「用熱情喜悅的行服務社會」漏字，已依使用者指示補成「行動」。
- [x] ~~**學生心得回饋**~~ 已上架 52 則（宿舍 30、職涯 7、服務學習 5、系學會 2、體育 8）。
- [x] ~~**頁尾聯絡資訊**：地址、電話~~ 已填入 `site.ts` 的 `contact`
      （單位、地址、電話、隱私權政策連結）。**但內容尚待正式確認**，見下方。

**雙語化**（英文版已完成，以下為待確認的正式名稱）

- [ ] 14 位導師的英文姓名拼法、6 本繪本的英文書名（見上方「雙語化」一節）。

**待確認（已填入但未經正式核可）**

- [ ] **深耕成果的目標值**：`results.ts` 的 `kpis[].target`／`over` 是由數值÷達成率反推
      （職涯 30 場、服學 90%、宿舍 15 場、系學會 150 場、體育 4,000 人次），請與教務處原始資料核對。
- [ ] **職涯亮點 1,988 人次**：首頁／導師列表的職涯數字，由新版成果的講座 1,771＋參訪 147＋測評 70 加總
      （與舊版 1,473 的算法相同，不含職涯諮詢 175 人次）。

- [ ] **頁尾聯絡資訊**：主管單位（學務處諮商中心）、郵遞區號 320017、電話分機 57261、
      隱私權政策網址 `https://www.cc.ncu.edu.tw/p/412-1033-159.php`。
      使用者於 2026-09-07 提供時的說法是「據我所知可能可以用」，尚未經徐姐或諮商中心確認。
      確認後把 `site.ts` 的 `contact.unconfirmed` 改成 `false`（畫面上的「待單位確認」提示會消失），
      並移除 `/accessibility` 已知限制中對應的那一條。
      目前沒有 Email，若之後提供可加進 `contact` 並在頁尾補一列。

## 加新照片的流程

1. 照片依規則命名：`年.月.日活動名稱.jpg`（例：`115.03.22課堂與職場-平行宇宙的對話.jpg`），
   放進雲端資料的對應類別資料夾。
2. 轉檔腳本會處理 HEIF / TIF / JFIF、依 EXIF 旋轉、縮到寬 1600、壓成 JPG，
   並把日期與標題從檔名解析出來寫進 `app/data/gallery.ts`。
3. 照片內容以全景、團體照或講師照為主，避免學生個人特寫。

## 已知事項

- `nuxt.config.ts` 關掉了 cssnano（`postcss: { plugins: { cssnano: false } }`）。
  cssnano 的 `postcss-merge-longhand` 與這版 rolldown-vite 不相容，會在 build 時丟
  `Method Set.prototype.has called on incompatible receiver`。CSS 改由 esbuild 壓縮。
- 編輯器若對 `~/data/...` 的 import 報 "Cannot find module"，是 VS Code 沒讀到
  `frontend/.nuxt/tsconfig.*.json`。把 `frontend` 直接開成工作區根目錄即可，`npm run build` 不受影響。
- 中文字型使用 Google Fonts 的 Noto Sans TC / Noto Serif TC。若部署環境擋外部連線，
  請改為自帶字型檔並修改 `nuxt.config.ts` 的 `app.head.link`。
