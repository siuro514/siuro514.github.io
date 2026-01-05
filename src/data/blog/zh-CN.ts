import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
    {
        id: 'role-of-gantt-chart',
        title: '甘特图的作用：项目管理的基石',
        summary: '甘特图（Gantt Chart）作为项目管理中最经典的工具之一，如何帮助团队可视化进度、优化资源分配？本文将深入探讨甘特图的核心价值与实际应用。',
        date: '2024-01-15',
        tags: ['Project Management', 'Gantt Chart', 'Productivity'],
        content: `
# 甘特图的作用：项目管理的基石

在现代项目管理中，**甘特图 (Gantt Chart)** 是一种不可或缺的可视化工具。它由 Henry Gantt 于 1910 年代发明，经过百年的发展，依然是各行各业规划行程的首选。

## 什么是甘特图？

甘特图是一种条状图，横轴表示时间，纵轴表示要完成的 活动。每个活动都由一个条形表示，条形的长度代表活动的持续时间，位置代表开始和结束时间。

## 甘特图的三大核心作用

### 1. 可视化项目进度 (Visualization)
甘特图最直观的作用就是将抽象的时间和任务转化为图形。
- **一目了然**：管理者可以瞬间掌握项目的整体全貌，哪些任务正在进行，哪些已经完成，哪些还未开始。
- **关键路径**：容易识别出哪些任务是瓶颈，哪些任务可以延后而不影响整体进度。

### 2. 资源管理与分配 (Resource Management)
在我们的 [人力资源甘特图](/tools/gantt) 工具中，这一点尤为重要。
- **避免冲突**：通过将任务分配给特定的成员，可以清楚地看到谁在什么时候有空，谁已经负荷过重。
- **优化排程**：合理安排并行任务，最大化团队效率。

### 3. 进度追踪与沟通 (Tracking & Communication)
- **基准比较**：可以设定计划进度与实际进度的对比。
- **沟通桥梁**：对于非技术背景的利益相关者（Stackholders），甘特图比复杂的表格或代码更容易理解，是汇报进度的绝佳工具。

## 结语

无论是软件开发的 Sprint 规划，还是传统工程的施工进度，甘特图都能提供强大的支持。善用甘特图，能让项目管理事半功倍。
    `
    },
    {
        id: 'use-of-json',
        title: 'JSON 的用途：现代数据交换的标准',
        summary: 'JSON (JavaScript Object Notation) 已经成为网络上数据交换的事实标准。它为什么这么受欢迎？有哪些实际应用场景？',
        date: '2024-02-01',
        tags: ['JSON', 'Web Development', 'Data Format'],
        content: `
# JSON 的用途：现代数据交换的标准

**JSON (JavaScript Object Notation)** 是一种轻量级的数据交换格式。它易于人阅读和编写，同时也易于机器解析和生成。

## JSON 的特点

1.  **轻量级**：相比 XML，JSON 的语法律更简洁，文件体积更小。
2.  **语言无关**：虽然源自 JavaScript，但目前几乎所有的编程语言（Python, Java, C#, Go 等）都支持 JSON。
3.  **结构化**：支持嵌套结构（Object 与 Array），能完美表达复杂的数据模型。

## 主要用途

### 1. 前后端数据传输
这是 JSON 最广泛的应用。
- **RESTful API**：现代 Web API 绝大多数默认使用 JSON 格式响应请求。
- **AJAX**：网页与服务器之间的异步通信。

### 2. 配置文件 (Configuration Files)
许多开发工具和软件使用 JSON 作为配置文件格式。
- **package.json**：Node.js 项目的核心设定。
- **tsconfig.json**：TypeScript 编译设定。
- **VS Code 设定**：编辑器的偏好设定也是 JSON 格式。

### 3. 数据存储 (NoSQL)
- **MongoDB**：使用 BSON（Binary JSON）存储文档。
- **Redis**：常将 JSON 字符串作为值存储。
- **PostgreSQL**：现代关系型数据库也原生支持 JSONB 字段，允许混合使用 SQL 与 NoSQL 特性。

## 如何处理 JSON？
使用我们的 [JSON 格式化工具](/tools/json-parser)，您可以轻松地格式化、验证和编辑 JSON 数据，让开发工作更顺畅。
    `
    },
    {
        id: 'json-vs-xml',
        title: 'JSON vs XML：昔日王者与现代标准的对决',
        summary: 'XML 曾经统治了互联网的数据交换，但现在 JSON 取代了它的地位。这两者有什么区别？在什么情况下你还应该使用 XML？',
        date: '2024-02-10',
        tags: ['JSON', 'XML', 'Comparison'],
        content: `
# JSON vs XML：昔日王者与现代标准的对决

在 Web 发展的早期，**XML (Extensible Markup Language)** 是数据交换的王者。然而，随着 Web 2.0 和移动网络的兴起，**JSON** 逐渐取而代之。

## 语法对比

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

## 主要差异

| 特性 | JSON | XML |
| :--- | :--- | :--- |
| **可读性** | 简洁，易读 | 较繁琐，标签重复 |
| **体积** | 小，传输快 | 大，包含大量标签 |
| **解析速度** | 极快 (浏览器原生支持) | 较慢 (需 DOM 解析器) |
| **数据类型** | 支持字符串, 数字, 布尔, 数组, 对象 | 只有文本节点，类型需额外 Schema 定义 |
| **Schema** | JSON Schema (非强制) | DTD, XSD (强大但复杂) |

## 什么时候还用 XML？
1.  **复杂的文档结构**：如 Word (.docx) 其实是一堆 XML。
2.  **需要严格验证**：金融业等需要极高稳定性的领域，依赖 XSD 进行严格的格式验证。
3.  **HTML/SVG**：这类标记语言本质上就是 XML 的变体。

对于绝大多数 Web API 开发，**JSON** 无疑是更好的选择。
    `
    },
    {
        id: 'json-vs-msgpack-vs-protobuf',
        title: '数据序列化大战：JSON vs MsgPack vs FlatBuffer vs Protobuf',
        summary: '当 JSON 的性能不再满足需求时，我们该选择什么？本文详细比较 MessagePack, FlatBuffers 和 Protocol Buffers 等二进制格式的优缺点。',
        date: '2024-02-20',
        tags: ['Performance', 'Serialization', 'Protocol Buffers', 'MessagePack'],
        content: `
# 数据序列化大战

在高性能传输场景下，JSON 的文本格式解析成本成为了瓶颈。这时，二进制序列化格式应运而生。

## 选手介绍

### 1. JSON (Text)
- **优点**：人类可读、通用性最高、无需定义 Schema。
- **缺点**：体积大、解析慢（需字符串扫描）。

### 2. MessagePack (Binary)
- **定位**："像 JSON 一样，但是是二进制的"。
- **优点**：比 JSON 小且快，支持更多类型（如二进制数据），无需 Schema（Self-describing）。
- **缺点**：不可读，需工具转换。

### 3. Protocol Buffers (Google)
- **定位**：Google 内部标准，强调跨语言服务通信 (gRPC)。
- **优点**：体积极小，解析速度快，向后兼容性强（透过 \`.proto\` 定义）。
- **缺点**：必须定义 Schema，开发流程较繁琐。

### 4. FlatBuffers (Google)
- **定位**：游戏开发与高性能应用。
- **优点**：**Zero-copy**（零拷贝）读取。不需要解析整个对象，可以直接读取内存中的特定字段。
- **缺点**：API 使用较复杂，数据大小通常比 Protobuf 稍大。

## 性能比较 (概略)

| 格式 | 体积 | 解析速度 | Schema | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **JSON** | 大 | 慢 | 否 | Web API, 配置文件, 调试 |
| **MsgPack** | 中 | 快 | 否 | Redis 存储, 内部缓存 |
| **Protobuf** | 小 | 极快 | 是 | 微服务 (gRPC), 跨语言通信 |
| **FlatBuffer** | 中小 | **瞬时** | 是 | 游戏 (Unity/Cocos), 实时通信 |

## 结论
- **Web 前端**：首选 **JSON**。
- **内部微服务**：推荐 **Protobuf**。
- **游戏/实时系统**：考虑 **FlatBuffers**。
- **不想写 Schema 但要快**：试试 **MessagePack**。
    `
    },
    {
        id: 'encode-vs-encrypt-vs-hash',
        title: '编码、加密与哈希：傻傻分不清楚？',
        summary: 'Base64 是加密吗？MD5 可以解密吗？许多开发者容易混淆 Encode, Encrypt 和 Hash 的概念。本文用最简单的方式厘清它们的区别。',
        date: '2024-03-05',
        tags: ['Security', 'Cryptography', 'Base64'],
        content: `
# 编码、加密与哈希：傻傻分不清楚？

作为开发者，我们常听到 Base64, AES, MD5, SHA-256。它们虽然都把"看得懂的字"变成了"看不懂的乱码"，但本质上完全不同。

## 1. 编码 (Encoding)
**目的**：为了**数据传输**或**格式转换**。
- **特点**：不需要密钥，使用公开算法，**任何人都可以还原**。
- **常见例子**：Base64, URL Encoding, Unicode。
- **误区**：Base64 **不是**加密！千万不要用 Base64 "加密" 密码。
- **工具**：[Ganttleman 编码工具](/tools/base64)

## 2. 加密 (Encryption)
**目的**：为了**保有秘密**，防止未授权的人读取。
- **特点**：需要**密钥 (Key)**。有密钥才能解密，没密钥理论上无法破解。
- **分类**：
    - **对称加密** (AES, DES)：加密解密用同一把钥匙。速度快。
    - **非对称加密** (RSA, ECC)：一把公钥加密，一把私钥解密。更安全但较慢。
- **工具**：[Ganttleman 加密工具](/tools/crypto)

## 3. 哈希 (Hashing)
**目的**：为了**验证完整性**或**唯一识别**。
- **特点**：**单向 (One-way)**，无法还原。同样的输入永远得到同样的输出。
- **常见例子**：MD5, SHA-1, SHA-256, Bcrypt。
- **应用**：密码存储（数据库只存 Hash，不存明码）、文件校验（下载文件是否完整）。

## 懒人包总结

| 术语 | 是否需要密钥 | 可否还原 | 目的 | 例子 |
| :--- | :--- | :--- | :--- | :--- |
| **Encoding** | 否 | 是 | 格式转换 | Base64 |
| **Encryption** | 是 | 是 (需密钥) | 数据保密 | AES, RSA |
| **Hashing** | 否 | 否 (不可逆) | 验证/指纹 | SHA-256, MD5 |
    `
    },
    {
        id: 'image-formats-comparison',
        title: '各种图片格式的差异：JPG, PNG, WebP, AVIF',
        summary: '网页图片格式百百种，到底该选哪一个？JPG 适合照片，PNG 适合去背图，那 WebP 和 AVIF 又是什么？',
        date: '2024-03-15',
        tags: ['Image', 'Optimization', 'WebP'],
        content: `
# 各种图片格式的差异：JPG, PNG, WebP, AVIF

图片通常占据网页流量的 60% 以上。选择正确的格式对于网站性能至关重要。

## 1. JPEG (Joint Photographic Experts Group)
- **优点**：色彩丰富，压缩率高，相容性 100%。
- **缺点**：**有损压缩**（会有噪点），不支持透明背景。
- **适用**：照片、色彩复杂的图片。

## 2. PNG (Portable Network Graphics)
- **优点**：**无损压缩**，支持**透明背景 (Alpha Channel)**，线条清晰。
- **缺点**：文件体积较大。
- **适用**：Logo、截图、需要去背的图片。

## 3. WebP (Google)
- **优点**：兼具 JPG 和 PNG 的优点。支持有损/无损压缩，支持透明，体积通常比 JPG 小 30%。
- **缺点**：极旧的浏览器（IE）不支持（但在 2024 年已不是问题）。
- **适用**：**现代网页图片的首选标准**。

## 4. AVIF (AV1 Image File Format)
- **优点**：源自视频编码技术，压缩率比 WebP 更高！画质更好。
- **缺点**：编码速度慢，旧设备解码可能耗电，兼容性略低于 WebP。
- **适用**：追求极致压缩的下一代标准。

## 5. SVG (Scalable Vector Graphics)
- **特点**：基于向量（代码），无限放大不失真。
- **适用**：图示 (Icons)、简单的 Logo、图表。

## 实战建议
使用我们的 [图片压缩工具](/tools/image-compressor) 可以轻松将图片转换为 WebP 格式并进行压缩，这是提升网站 SEO 和加载速度最简单有效的方法。
    `
    },
    {
        id: 'mindmap-vs-fishbone',
        title: '思维导图和鱼骨图的作用：思考工具的妙用',
        summary: '大脑打结了吗？思维导图帮助你发散思考，鱼骨图帮助你收敛找原因。学会这两种图表，解决问题更有效率。',
        date: '2024-03-22',
        tags: ['Thinking Tools', 'Productivity', 'Mind Map'],
        content: `
# 思维导图和鱼骨图的作用

在创意发想与问题解决的过程中，图形化工具能帮助我们整理思绪。最常见的两种图表就是思维导图与鱼骨图。

## 思维导图 (Mind Map)
由 Tony Buzan 推广，模仿脑神经的放射状结构。
- **结构**：中心是主题，向四周放射出分支。
- **思维模式**：**发散性思维 (Divergent Thinking)**。
- **用途**：
    - **做笔记**：将线性课程转化为关联图。
    - **创意发想**：Brainstorming，联想相关概念。
    - **规划**：各个面向的拆解。

## 鱼骨图 (Fishbone Diagram)
又称 Ishikawa Diagram（石川图）或因果图。
- **结构**：鱼头是"结果"（问题），鱼骨是"原因"。通常搭配 **5M1E** 分析法（人、机、料、法、环、测）。
- **思维模式**：**收敛性思维** 与 **逻辑分析**。
- **用途**：
    - **根本原因分析 (RCA)**：为什么服务器挂了？为什么产品良率低？
    - **质量管理**：找出影响质量的关键变因。

## 比较
- 想**新点子**时，用**思维导图**。
- 想**找 Bug 原因**时，用**鱼骨图**。
    `
    },
    {
        id: 'is-random-true',
        title: '电脑的 Random 真的为随机吗？浅谈伪随机与真随机',
        summary: '代码里的 \`Math.random()\` 产生的数字真的是随机的吗？为什么有时候我们需要"更随机"的乱数？',
        date: '2024-04-01',
        tags: ['Computer Science', 'Random', 'Security'],
        content: `
# 电脑的 Random 真的为随机吗？

这是一个经典的计算机科学问题。答案通常是：**大部分不是，但在需要的时候可以是。**

## 伪随机 (Pseudo-Random Number Generator, PRNG)
一般编程语言中的 \`Math.random()\` (JS), \`random.random()\` (Python) 属于伪随机。
- **原理**：使用一个数学公式，从一个**种子 (Seed)** 开始计算下一个数。
- **特点**：如果**种子相同**，产生的**数列就完全相同**！
- **用途**：游戏掉宝率、模拟运算、图形生成。速度快，但不安全。

## 真随机 (True Random Number Generator, TRNG)
- **原理**：依赖物理现象。例如：大气噪声、热噪声、放射性衰变、或是使用者鼠标的移动轨迹。
- **用途**：**密码学**、私钥生成、博弈系统。
- **缺点**：生成速度慢，需要硬件支持。

## 密码学安全伪随机 (CSPRNG)
在 Web 开发中，当我们需要生成 Token 或密码时，不能用 \`Math.random()\`，因为黑客如果猜到了种子（通常是时间戳），就能预测下一个乱数。

应该使用：
- **浏览器**：\`window.crypto.getRandomValues()\`
- **Node.js**：\`crypto.randomBytes()\`

这些 API 会结合操作系统的熵池（Entropy Pool），提供足够安全用于加密的乱数。
    `
    },
    {
        id: 'why-base64',
        title: '为什么需要 Base64？原理与应用场景',
        summary: '为什么电子邮件附件要转成 Base64？为什么图片可以直接写在 CSS 里？Base64 到底解决了什么问题？',
        date: '2024-04-10',
        tags: ['Base64', 'Encoding', 'Web'],
        content: `
# 为什么需要 Base64？

使用我们的 [Base64 编码工具](/tools/base64) 时，你是否好奇过：为什么要把好端端的文字或图片，转成一串 \`a-z, A-Z, 0-9, +, /\` 组成的乱码？

## 历史背景：ASCII 的限制
早期的电脑通讯协议（如 Email 的 SMTP）只被设计用来传输**纯文字 (ASCII)**。它们对于**二进制数据**（如图片、执行档）或是**控制字符**十分敏感，可能会导致传输中断或数据损坏。

## Base64 的解决方案
Base64 的核心思想是：**将任何二进制数据，都转换为 64 个最安全的、通用的可打印字符来表示。**

这 64 个字符是：A-Z, a-z, 0-9, +, /。（以及 = 用于填充结尾）。

## 常见应用场景

### 1. Email 附件
当你在 Email 里夹带一张图片时，Email 软件会自动将图片转为 Base64 字符串，嵌入在邮件内文中传送。

### 2. Data URLs (网页优化)
\`\`\`css
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...");
\`\`\`
- **优点**：减少 HTTP 请求 (Reduce Requests)。小图标直接变字符串塞在 CSS/HTML 里，不用多发一次请求去下载图片。
- **缺点**：体积会膨胀约 33%，且无法被浏览器快取（除非 CSS 被快取）。只适合极小的图片。

### 3. API 传输二进制档案
有时候 JSON API 响应中需要包含小档案，也会直接用 Base64 字符串回传。

## 结论
Base64 是为了**相容性**而生的。它牺牲了约 1/3 的空间效率，换取了在任何纯文字通道中安全传输二进制数据的能力。
    `
    },
    {
        id: 'what-is-jwt',
        title: 'JWT (JSON Web Token) 的原理与应用',
        summary: '现代 Web 应用最流行的身份验证方式。JWT 是如何运作的？它安全吗？Header, Payload, Signature 又是什么？',
        date: '2024-04-20',
        tags: ['Security', 'JWT', 'Authentication'],
        content: `
# JWT (JSON Web Token) 的原理与应用

在前后端分离的架构下，**JWT** 已成为身份验证的主流标准。

## 传统 Session vs JWT

### Session (有状态)
1. 用户登录。
2. 服务器在内存/数据库记住 "这个 SessionID 是 User A"。
3. 回传 SessionID 给浏览器 (Cookie)。
4. 缺点：服务器需要存储状态，水平扩展 (Scale out) 麻烦。

### JWT (无状态)
1. 用户登录。
2. 服务器用私钥签署一个 Token，里面写着 "这是 User A"。
3. 回传 Token 给浏览器。
4. 下次请求，浏览器带上 Token。
5. 服务器验证签名正确，就信任这是 User A。**服务器不需要查数据库！**

## JWT 的结构
JWT 看起来像这样：\`xxxxx.yyyyy.zzzzz\` (用点分隔的三段)

### 1. Header (标头)
说明加密算法 (如 HS256)。
\`\`\`json
{ "alg": "HS256", "typ": "JWT" }
\`\`\`

### 2. Payload (内容)
存放用户信息。**注意：这里是公开的，不要放密码！**
\`\`\`json
{ "sub": "1234567890", "name": "John Doe", "admin": true }
\`\`\`

### 3. Signature (签名)
用服务器的密钥对 (Header + Payload) 进行哈希。用来防止内容被篡改。

## 安全性注意事项
1. **不要在 Payload 放敏感信息**：Base64 解码就能看到 Payload。
2. **使用 HTTPS**：防止 Token 在传输中被窃取。
3. **Token 有效期 (TTL)**：JWT 默认无法撤销（除非服务器加黑名单），所以有效期不宜过长。

JWT 完美结合了 **JSON** 的易用性与 **哈希/加密** 的安全性，是现代 Web 开发者的必备知识。
    `
    }
];
