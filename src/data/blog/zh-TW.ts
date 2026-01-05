import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
    {
        id: 'role-of-gantt-chart',
        title: '甘特圖的作用：專案管理的基石',
        summary: '甘特圖（Gantt Chart）作為專案管理中最經典的工具之一，如何幫助團隊可視化進度、優化資源分配？本文將深入探討甘特圖的核心價值與實際應用。',
        date: '2024-01-15',
        tags: ['Project Management', 'Gantt Chart', 'Productivity'],
        content: `
# 甘特圖的作用：專案管理的基石

在現代專案管理中，**甘特圖 (Gantt Chart)** 是一種不可或缺的視覺化工具。它由 Henry Gantt 於 1910 年代發明，經過百年的發展，依然是各行各業規劃行程的首選。

## 什麼是甘特圖？

甘特圖是一種條狀圖，橫軸表示時間，縱軸表示要完成的活動。每個活動都由一個條形表示，條形的長度代表活動的持續時間，位置代表開始和結束時間。

## 甘特圖的三大核心作用

### 1. 視覺化專案進度 (Visualization)
甘特圖最直觀的作用就是將抽象的時間和任務轉化為圖形。
- **一目了然**：管理者可以瞬間掌握專案的整體全貌，哪些任務正在進行，哪些已經完成，哪些還未開始。
- **關鍵路徑**：容易識別出哪些任務是瓶頸，哪些任務可以延後而不影響整體進度。

### 2. 資源管理與分配 (Resource Management)
在我們的 [人力資源甘特圖](/tools/gantt) 工具中，這一點尤為重要。
- **避免衝突**：通過將任務分配給特定的成員，可以清楚地看到誰在什麼時候有空，誰已經負荷過重。
- **優化排程**：合理安排並行任務，最大化團隊效率。

### 3. 進度追蹤與溝通 (Tracking & Communication)
- **基準比較**：可以設定計劃進度與實際進度的對比。
- **溝通橋樑**：對於非技術背景的利害關係人（Stackholders），甘特圖比複雜的表格或代碼更容易理解，是匯報進度的絕佳工具。

## 結語

無論是軟體開發的 Sprint 規劃，還是傳統工程的施工進度，甘特圖都能提供強大的支持。善用甘特圖，能讓專案管理事半功倍。
    `
    },
    {
        id: 'use-of-json',
        title: 'JSON 的用途：現代資料交換的標準',
        summary: 'JSON (JavaScript Object Notation) 已經成為網路上資料交換的事實標準。它為什麼這麼受歡迎？有哪些實際應用場景？',
        date: '2024-02-01',
        tags: ['JSON', 'Web Development', 'Data Format'],
        content: `
# JSON 的用途：現代資料交換的標準

**JSON (JavaScript Object Notation)** 是一種輕量級的資料交換格式。它易於人閱讀和編寫，同時也易於機器解析和生成。

## JSON 的特點

1.  **輕量級**：相比 XML，JSON 的語法更簡潔，檔案體積更小。
2.  **語言無關**：雖然源自 JavaScript，但目前幾乎所有的程式語言（Python, Java, C#, Go 等）都支援 JSON。
3.  **結構化**：支援巢狀結構（Object 與 Array），能完美表達複雜的資料模型。

## 主要用途

### 1. 前後端資料傳輸
這是 JSON 最廣泛的應用。
- **RESTful API**：現代 Web API 絕大多數預設使用 JSON 格式回應請求。
- **AJAX**：網頁與伺服器之間的非同步通訊。

### 2. 設定檔 (Configuration Files)
許多開發工具和軟體使用 JSON 作為設定檔格式。
- **package.json**：Node.js 專案的核心設定。
- **tsconfig.json**：TypeScript 編譯設定。
- **VS Code 設定**：編輯器的偏好設定也是 JSON 格式。

### 3. 資料儲存 (NoSQL)
- **MongoDB**：使用 BSON（Binary JSON）儲存文件。
- **Redis**：常將 JSON 字串作為值儲存。
- **PostgreSQL**：現代關聯式資料庫也原生支援 JSONB 欄位，允許混合使用 SQL 與 NoSQL 特性。

## 如何處理 JSON？
使用我們的 [JSON 格式化工具](/tools/json-parser)，您可以輕鬆地格式化、驗證和編輯 JSON 資料，讓開發工作更順暢。
    `
    },
    {
        id: 'json-vs-xml',
        title: 'JSON vs XML：昔日王者與現代標準的對決',
        summary: 'XML 曾經統治了網際網路的資料交換，但現在 JSON 取代了它的地位。這兩者有什麼區別？在什麼情況下你還應該使用 XML？',
        date: '2024-02-10',
        tags: ['JSON', 'XML', 'Comparison'],
        content: `
# JSON vs XML：昔日王者與現代標準的對決

在 Web 發展的早期，**XML (Extensible Markup Language)** 是資料交換的王者。然而，隨著 Web 2.0 和行動網路的興起，**JSON** 逐漸取而代之。

## 語法對比

### XML
\`\`\`xml
<user>
  <id>1</id>
  <name>John Doe</name>
  <roles>
    <role>Admin</role>
    <role>User</role>
  </roles>
</user>
\`\`\`

### JSON
\`\`\`json
{
  "id": 1,
  "name": "John Doe",
  "roles": ["Admin", "User"]
}
\`\`\`

## 主要差異

| 特性 | JSON | XML |
| :--- | :--- | :--- |
| **可讀性** | 簡潔，易讀 | 較繁瑣，標籤重複 |
| **體積** | 小，傳輸快 | 大，包含大量標籤 |
| **解析速度** | 極快 (瀏覽器原生支援) | 較慢 (需 DOM 解析器) |
| **資料類型** | 支援字串, 數字, 布林, 陣列, 物件 | 只有文字節點，類型需額外 Schema 定義 |
| **Schema** | JSON Schema (非強制) | DTD, XSD (強大但複雜) |

## 什麼時候還用 XML？
1.  **複雜的文檔結構**：如 Word (.docx) 其實是一堆 XML。
2.  **需要嚴格驗證**：金融業等需要極高穩定性的領域，依賴 XSD 進行嚴格的格式驗證。
3.  **HTML/SVG**：這類標記語言本質上就是 XML 的變體。

對於絕大多數 Web API 開發，**JSON** 無疑是更好的選擇。
    `
    },
    {
        id: 'json-vs-msgpack-vs-protobuf',
        title: '資料序列化大戰：JSON vs MsgPack vs FlatBuffer vs Protobuf',
        summary: '當 JSON 的效能不再滿足需求時，我們該選擇什麼？本文詳細比較 MessagePack, FlatBuffers 和 Protocol Buffers 等二進位格式的優缺點。',
        date: '2024-02-20',
        tags: ['Performance', 'Serialization', 'Protocol Buffers', 'MessagePack'],
        content: `
# 資料序列化大戰

在高效能傳輸場景下，JSON 的文字格式解析成本成為了瓶頸。這時，二進位序列化格式應運而生。

## 選手介紹

### 1. JSON (Text)
- **優點**：人類可讀、通用性最高、無需定義 Schema。
- **缺點**：體積大、解析慢（需字串掃描）。

### 2. MessagePack (Binary)
- **定位**："像 JSON 一樣，但是是二進位的"。
- **優點**：比 JSON 小且快，支援更多類型（如二進位數據），無需 Schema（Self-describing）。
- **缺點**：不可讀，需工具轉換。

### 3. Protocol Buffers (Google)
- **定位**：Google 內部標準，強調跨語言服務通訊 (gRPC)。
- **優點**：體積極小，解析速度快，向後兼容性強（透過 \`.proto\` 定義）。
- **缺點**：必須定義 Schema，開發流程較繁瑣。

### 4. FlatBuffers (Google)
- **定位**：遊戲開發與高效能應用。
- **優點**：**Zero-copy**（零拷貝）讀取。不需要解析整個物件，可以直接讀取記憶體中的特定欄位。
- **缺點**：API 使用較複雜，資料大小通常比 Protobuf 稍大。

## 效能比較 (概略)

| 格式 | 體積 | 解析速度 | Schema | 適用場景 |
| :--- | :--- | :--- | :--- | :--- |
| **JSON** | 大 | 慢 | 否 | Web API, 設定檔, 除錯 |
| **MsgPack** | 中 | 快 | 否 | Redis 儲存, 內部快取 |
| **Protobuf** | 小 | 極快 | 是 | 微服務 (gRPC), 跨語言通訊 |
| **FlatBuffer** | 中小 | **瞬時** | 是 | 遊戲 (Unity/Cocos), 即時通訊 |

## 結論
- **Web 前端**：首選 **JSON**。
- **內部微服務**：推薦 **Protobuf**。
- **遊戲/即時系統**：考慮 **FlatBuffers**。
- **不想寫 Schema 但要快**：試試 **MessagePack**。
    `
    },
    {
        id: 'encode-vs-encrypt-vs-hash',
        title: '編碼、加密與雜湊：傻傻分不清楚？',
        summary: 'Base64 是加密嗎？MD5 可以解密嗎？許多開發者容易混淆 Encode, Encrypt 和 Hash 的概念。本文用最簡單的方式釐清它們的區別。',
        date: '2024-03-05',
        tags: ['Security', 'Cryptography', 'Base64'],
        content: `
# 編碼、加密與雜湊：傻傻分不清楚？

作為開發者，我們常聽到 Base64, AES, MD5, SHA-256。它們雖然都把"看得懂的字"變成了"看不懂的亂碼"，但本質上完全不同。

## 1. 編碼 (Encoding)
**目的**：為了**資料傳輸**或**格式轉換**。
- **特點**：不需要金鑰，使用公開演算法，**任何人都可以還原**。
- **常見例子**：Base64, URL Encoding, Unicode。
- **誤區**：Base64 **不是**加密！千萬不要用 Base64 "加密" 密碼。
- **工具**：[Ganttleman 編碼工具](/tools/base64)

## 2. 加密 (Encryption)
**目的**：為了**保有秘密**，防止未授權的人讀取。
- **特點**：需要**金鑰 (Key)**。有金鑰才能解密，沒金鑰理論上無法破解。
- **分類**：
    - **對稱加密** (AES, DES)：加密解密用同一把鑰匙。速度快。
    - **非對稱加密** (RSA, ECC)：一把公鑰加密，一把私鑰解密。更安全但較慢。
- **工具**：[Ganttleman 加密工具](/tools/crypto)

## 3. 雜湊 (Hashing)
**目的**：為了**驗證完整性**或**唯一識別**。
- **特點**：**單向 (One-way)**，無法還原。同樣的輸入永遠得到同樣的輸出。
- **常見例子**：MD5, SHA-1, SHA-256, Bcrypt。
- **應用**：密碼儲存（資料庫只存 Hash，不存明碼）、檔案校驗（下載檔案是否完整）。

## 懶人包總結

| 術語 | 是否需要金鑰 | 可否還原 | 目的 | 例子 |
| :--- | :--- | :--- | :--- | :--- |
| **Encoding** | 否 | 是 | 格式轉換 | Base64 |
| **Encryption** | 是 | 是 (需金鑰) | 資料保密 | AES, RSA |
| **Hashing** | 否 | 否 (不可逆) | 驗證/指紋 | SHA-256, MD5 |
    `
    },
    {
        id: 'image-formats-comparison',
        title: '各種圖片格式的差異：JPG, PNG, WebP, AVIF',
        summary: '網頁圖片格式百百種，到底該選哪一個？JPG 適合照片，PNG 適合去背圖，那 WebP 和 AVIF 又是什麼？',
        date: '2024-03-15',
        tags: ['Image', 'Optimization', 'WebP'],
        content: `
# 各種圖片格式的差異：JPG, PNG, WebP, AVIF

圖片通常佔據網頁流量的 60% 以上。選擇正確的格式對於網站效能至關重要。

## 1. JPEG (Joint Photographic Experts Group)
- **優點**：色彩豐富，壓縮率高，相容性 100%。
- **缺點**：**有損壓縮**（會有雜訊），不支援透明背景。
- **適用**：照片、色彩複雜的圖片。

## 2. PNG (Portable Network Graphics)
- **優點**：**無損壓縮**，支援**透明背景 (Alpha Channel)**，線條清晰。
- **缺點**：檔案體積較大。
- **適用**：Logo、截圖、需要去背的圖片。

## 3. WebP (Google)
- **優點**：兼具 JPG 和 PNG 的優點。支援有損/無損壓縮，支援透明，體積通常比 JPG 小 30%。
- **缺點**：極舊的瀏覽器（IE）不支援（但在 2024 年已不是問題）。
- **適用**：**現代網頁圖片的首選標準**。

## 4. AVIF (AV1 Image File Format)
- **優點**：源自影片編碼技術，壓縮率比 WebP 更高！畫質更好。
- **缺點**：編碼速度慢，舊設備解碼可能耗電，兼容性略低於 WebP。
- **適用**：追求極致壓縮的下一代標準。

## 5. SVG (Scalable Vector Graphics)
- **特點**：基於向量（代碼），無限放大不失真。
- **適用**：圖示 (Icons)、簡單的 Logo、圖表。

## 實戰建議
使用我們的 [圖片壓縮工具](/tools/image-compressor) 可以輕鬆將圖片轉換為 WebP 格式並進行壓縮，這是提升網站 SEO 和載入速度最簡單有效的方法。
    `
    },
    {
        id: 'mindmap-vs-fishbone',
        title: '心智圖和魚骨圖的作用：思考工具的妙用',
        summary: '大腦打結了嗎？心智圖幫助你發散思考，魚骨圖幫助你收斂找原因。學會這兩種圖表，解決問題更有效率。',
        date: '2024-03-22',
        tags: ['Thinking Tools', 'Productivity', 'Mind Map'],
        content: `
# 心智圖和魚骨圖的作用

在創意發想與問題解決的過程中，圖形化工具能幫助我們整理思緒。最常見的兩種圖表就是心智圖與魚骨圖。

## 心智圖 (Mind Map)
由 Tony Buzan 推廣，模仿腦神經的放射狀結構。
- **結構**：中心是主題，向四周放射出分支。
- **思維模式**：**發散性思維 (Divergent Thinking)**。
- **用途**：
    - **做筆記**：將線性課程轉化為關聯圖。
    - **創意發想**：Brainstorming，聯想相關概念。
    - **規劃**：各個面向的拆解。

## 魚骨圖 (Fishbone Diagram)
又稱 Ishikawa Diagram（石川圖）或因果圖。
- **結構**：魚頭是"結果"（問題），魚骨是"原因"。通常搭配 **5M1E** 分析法（人、機、料、法、環、測）。
- **思維模式**：**收斂性思維** 與 **邏輯分析**。
- **用途**：
    - **根本原因分析 (RCA)**：為什麼伺服器掛了？為什麼產品良率低？
    - **品質管理**：找出影響品質的關鍵變因。

## 比較
- 想**新點子**時，用**心智圖**。
- 想**找 Bug 原因**時，用**魚骨圖**。
    `
    },
    {
        id: 'is-random-true',
        title: '電腦的 Random 真的為隨機嗎？淺談偽隨機與真隨機',
        summary: '程式碼裡的 \`Math.random()\` 產生的數字真的是隨機的嗎？為什麼有時候我們需要"更隨機"的亂數？',
        date: '2024-04-01',
        tags: ['Computer Science', 'Random', 'Security'],
        content: `
# 電腦的 Random 真的為隨機嗎？

這是一個經典的計算機科學問題。答案通常是：**大部分不是，但在需要的時候可以是。**

## 偽隨機 (Pseudo-Random Number Generator, PRNG)
一般程式語言中的 \`Math.random()\` (JS), \`random.random()\` (Python) 屬於偽隨機。
- **原理**：使用一個數學公式，從一個**種子 (Seed)** 開始計算下一個數。
- **特點**：如果**種子相同**，產生的**數列就完全相同**！
- **用途**：遊戲掉寶率、模擬運算、圖形生成。速度快，但不安全。

## 真隨機 (True Random Number Generator, TRNG)
- **原理**：依賴物理現象。例如：大氣雜訊、熱雜訊、放射性衰變、或是使用者滑鼠的移動軌跡。
- **用途**：**密碼學**、私鑰生成、博弈系統。
- **缺點**：生成速度慢，需要硬體支持。

## 密碼學安全偽隨機 (CSPRNG)
在 Web 開發中，當我們需要生成 Token 或密碼時，不能用 \`Math.random()\`，因為駭客如果猜到了種子（通常是時間戳），就能預測下一個亂數。

應該使用：
- **瀏覽器**：\`window.crypto.getRandomValues()\`
- **Node.js**：\`crypto.randomBytes()\`

這些 API 會結合作業系統的熵池（Entropy Pool），提供足夠安全用於加密的亂數。
    `
    },
    {
        id: 'why-base64',
        title: '為什麼需要 Base64？原理與應用場景',
        summary: '為什麼電子郵件附件要轉成 Base64？為什麼圖片可以直接寫在 CSS 裡？Base64 到底解決了什麼問題？',
        date: '2024-04-10',
        tags: ['Base64', 'Encoding', 'Web'],
        content: `
# 為什麼需要 Base64？

使用我們的 [Base64 編碼工具](/tools/base64) 時，你是否好奇過：為什麼要把好端端的文字或圖片，轉成一串 \`a-z, A-Z, 0-9, +, /\` 組成的亂碼？

## 歷史背景：ASCII 的限制
早期的電腦通訊協議（如 Email 的 SMTP）只被設計用來傳輸**純文字 (ASCII)**。它們對於**二進位資料**（如圖片、執行檔）或是**控制字元**十分敏感，可能會導致傳輸中斷或資料損壞。

## Base64 的解決方案
Base64 的核心思想是：**將任何二進位資料，都轉換為 64 個最安全的、通用的可列印字元來表示。**

這 64 個字元是：A-Z, a-z, 0-9, +, /。（以及 = 用於填充結尾）。

## 常見應用場景

### 1. Email 附件
當你在 Email 裡夾帶一張圖片時，Email 軟體會自動將圖片轉為 Base64 字串，嵌入在郵件內文中傳送。

### 2. Data URLs (網頁優化)
\`\`\`css
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...");
\`\`\`
- **優點**：減少 HTTP 請求 (Reduce Requests)。小圖標直接變字串塞在 CSS/HTML 裡，不用多發一次請求去下載圖片。
- **缺點**：體積會膨脹約 33%，且無法被瀏覽器快取（除非 CSS 被快取）。只適合極小的圖片。

### 3. API 傳輸二進位檔案
有時候 JSON API 回應中需要包含小檔案，也會直接用 Base64 字串回傳。

## 結論
Base64 是為了**相容性**而生的。它犧牲了約 1/3 的空間效率，換取了在任何純文字通道中安全傳輸二進位資料的能力。
    `
    },
    {
        id: 'what-is-jwt',
        title: 'JWT (JSON Web Token) 的原理與應用',
        summary: '現代 Web 應用最流行的身份驗證方式。JWT 是如何運作的？它安全嗎？Header, Payload, Signature 又是什麼？',
        date: '2024-04-20',
        tags: ['Security', 'JWT', 'Authentication'],
        content: `
# JWT (JSON Web Token) 的原理與應用

在前後端分離的架構下，**JWT** 已成為身份驗證的主流標準。

## 傳統 Session vs JWT

### Session (有狀態)
1. 用戶登入。
2. 伺服器在記憶體/資料庫記住 "這個 SessionID 是 User A"。
3. 回傳 SessionID 給瀏覽器 (Cookie)。
4. 缺點：伺服器需要儲存狀態，水平擴展 (Scale out) 麻煩。

### JWT (無狀態)
1. 用戶登入。
2. 伺服器用私鑰簽署一個 Token，裡面寫著 "這是 User A"。
3. 回傳 Token 給瀏覽器。
4. 下次請求，瀏覽器帶上 Token。
5. 伺服器驗證簽名正確，就信任這是 User A。**伺服器不需要查資料庫！**

## JWT 的結構
JWT 看起來像這樣：\`xxxxx.yyyyy.zzzzz\` (用點分隔的三段)

### 1. Header (標頭)
說明加密演算法 (如 HS256)。
\`\`\`json
{ "alg": "HS256", "typ": "JWT" }
\`\`\`

### 2. Payload (內容)
存放使用者資訊。**注意：這裡是公開的，不要放密碼！**
\`\`\`json
{ "sub": "1234567890", "name": "John Doe", "admin": true }
\`\`\`

### 3. Signature (簽名)
用伺服器的密鑰對 (Header + Payload) 進行雜湊。用來防止內容被篡改。

## 安全性注意事項
1. **不要在 Payload 放敏感資訊**：Base64 解碼就能看到 Payload。
2. **使用 HTTPS**：防止 Token 在傳輸中被竊取。
3. **Token 有效期 (TTL)**：JWT 預設無法撤銷（除非伺服器加黑名單），所以有效期不宜過長。

JWT 完美結合了 **JSON** 的易用性與 **雜湊/加密** 的安全性，是現代 Web 開發者的必備知識。
    `
    }
];
