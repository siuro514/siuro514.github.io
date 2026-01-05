import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
    {
        id: 'role-of-gantt-chart',
        title: 'ガントチャートの役割：プロジェクト管理の礎',
        summary: 'ガントチャートは、プロジェクト管理における最も古典的なツールの一つです。チームが進行状況を可視化し、リソース配分を最適化するのをどのように助けるのでしょうか？',
        date: '2024-01-15',
        tags: ['Project Management', 'Gantt Chart', 'Productivity'],
        content: `
# The Role of Gantt Charts: The Cornerstone of Project Management

(This content is currently available in English)

In modern project management, the **Gantt Chart** is an indispensable visualization tool. Invented by Henry Gantt in the 1910s, it remains a top choice for schedule planning across various industries after more than a century of development.

## What is a Gantt Chart?

A Gantt chart is a type of bar chart that illustrates a project schedule. The horizontal axis represents time, while the vertical axis represents tasks to be completed. Each task is represented by a bar; the length of the bar shows the duration, and its position indicates the start and end dates.

## Three Core Roles of Gantt Charts

### 1. Visualization of Project Progress
The most intuitive role of a Gantt chart is transforming abstract time and tasks into graphics.
- **At a Glance**: Managers can instantly grasp the overall picture of the project—which tasks are in progress, which are completed, and which haven't started.
- **Critical Path**: Easily identify bottleneck tasks and those that can be delayed without affecting the overall schedule.

### 2. Resource Management and Allocation
This is particularly important in our [Resource Gantt Chart](/tools/gantt) tool.
- **Avoid Conflicts**: By assigning tasks to specific members, you can clearly see who is available and who is overloaded.
- **Optimize Scheduling**: Rationally arrange parallel tasks to maximize team efficiency.

### 3. Progress Tracking and Communication
- **Baseline Comparison**: You can compare the planned schedule against actual progress.
- **Communication Bridge**: For non-technical stakeholders, Gantt charts are easier to understand than complex spreadsheets or code, making them an excellent tool for reporting progress.

## Conclusion

Whether it's Sprint planning in software development or construction scheduling in traditional engineering, Gantt charts provide powerful support. Mastering Gantt charts can make project management significantly more effective.
        `
    },
    {
        id: 'use-of-json',
        title: 'JSONの用途：現代データ交換の標準',
        summary: 'JSON (JavaScript Object Notation) は、ウェブ上のデータ交換における事実上の標準となりました。なぜこれほど人気があるのでしょうか？',
        date: '2024-02-01',
        tags: ['JSON', 'Web Development', 'Data Format'],
        content: `
# The Purpose of JSON: The Standard for Modern Data Exchange

(This content is currently available in English)

**JSON (JavaScript Object Notation)** is a lightweight data interchange format. It is easy for humans to read and write, and it is easy for machines to parse and generate.

## Features of JSON

1.  **Lightweight**: Compared to XML, JSON has a simpler syntax and smaller file size.
2.  **Language Independent**: Although it originated from JavaScript, almost all programming languages (Python, Java, C#, Go, etc.) support JSON.
3.  **Structured**: Supports nested structures (Objects and Arrays), perfectly expressing complex data models.

## Main Uses

### 1. Frontend-Backend Data Transmission
This is the most widespread application of JSON.
- **RESTful API**: Most modern Web APIs default to using JSON format for responses.
- **AJAX**: Asynchronous communication between the web page and the server.

### 2. Configuration Files
Many development tools and software use JSON as their configuration format.
- **package.json**: Core configuration for Node.js projects.
- **tsconfig.json**: TypeScript compilation settings.
- **VS Code Settings**: Editor preferences are also in JSON format.

### 3. Data Storage (NoSQL)
- **MongoDB**: Uses BSON (Binary JSON) to store documents.
- **Redis**: Often stores JSON strings as values.
- **PostgreSQL**: Modern relational databases also natively support JSONB fields, allowing a mix of SQL and NoSQL features.

## How to Handle JSON?
Use our [JSON Parser](/tools/json-parser) to easily format, validate, and edit JSON data, making your development work smoother.
        `
    },
    {
        id: 'json-vs-xml',
        title: 'JSON vs XML：かつての王者と現代の標準の戦い',
        summary: 'XMLはかつてインターネットデータ交換を支配していましたが、現在はJSONがその座を奪いました。両者の違いは何ですか？',
        date: '2024-02-10',
        tags: ['JSON', 'XML', 'Comparison'],
        content: `
# JSON vs XML: The Battle Between the Former King and the Modern Standard

(This content is currently available in English)

In the early days of web development, **XML (Extensible Markup Language)** was the king of data exchange. However, with the rise of Web 2.0 and mobile internet, **JSON** has gradually replaced it.
        `
    },
    {
        id: 'json-vs-msgpack-vs-protobuf',
        title: 'データシリアライゼーション戦争：JSON vs MsgPack vs FlatBuffer vs Protobuf',
        summary: 'JSONのパフォーマンスが十分でなくなった場合、何を選択すべきでしょうか？',
        date: '2024-02-20',
        tags: ['Performance', 'Serialization', 'Protocol Buffers', 'MessagePack'],
        content: `
# Data Serialization Battle

(This content is currently available in English)

In high-performance transmission scenarios, the cost of parsing JSON's text format becomes a bottleneck. This is where binary serialization formats come in.
        `
    },
    {
        id: 'encode-vs-encrypt-vs-hash',
        title: 'エンコード、暗号化、ハッシュ：違いがわかりますか？',
        summary: 'Base64は暗号化ですか？MD5は復号できますか？多くの開発者がこれらの概念を混同しています。',
        date: '2024-03-05',
        tags: ['Security', 'Cryptography', 'Base64'],
        content: `
# Encode vs Encrypt vs Hash: Confused?

(This content is currently available in English)

As developers, we often hear Base64, AES, MD5, SHA-256. While they all turn "readable text" into "unreadable gibberish," they are fundamentally different.
        `
    },
    {
        id: 'image-formats-comparison',
        title: '画像フォーマットの比較：JPG, PNG, WebP, AVIF',
        summary: 'Web画像フォーマットはたくさんあります。どれを選ぶべきでしょうか？',
        date: '2024-03-15',
        tags: ['Image', 'Optimization', 'WebP'],
        content: `
# Comparison of Image Formats: JPG, PNG, WebP, AVIF

(This content is currently available in English)

Images often account for more than 60% of web traffic. Choosing the right format is critical for website performance.
        `
    },
    {
        id: 'mindmap-vs-fishbone',
        title: 'マインドマップ vs フィッシュボーン図：思考ツールの力',
        summary: 'アイデアが出ませんか？マインドマップは発散的思考を、フィッシュボーン図は原因の収束を助けます。',
        date: '2024-03-22',
        tags: ['Thinking Tools', 'Productivity', 'Mind Map'],
        content: `
# Mind Map vs Fishbone Diagram: The Power of Thinking Tools

(This content is currently available in English)

In the process of creative brainstorming and problem-solving, graphical tools help us organize our thoughts.
        `
    },
    {
        id: 'is-random-true',
        title: 'コンピュータの「ランダム」は本当にランダムですか？擬似乱数と真の乱数',
        summary: 'Math.random()で生成される数字は本当にランダムですか？なぜ「よりランダム」な数字が必要な場合があるのですか？',
        date: '2024-04-01',
        tags: ['Computer Science', 'Random', 'Security'],
        content: `
# Is Computer "Random" Truly Random?

(This content is currently available in English)

This is a classic computer science question. The answer is usually: **Mostly no, but it can be when needed.**
        `
    },
    {
        id: 'why-base64',
        title: 'なぜBase64が必要なのか？原理と使用例',
        summary: 'なぜメールの添付ファイルをBase64に変換するのですか？Base64はどのような問題を解決するのでしょうか？',
        date: '2024-04-10',
        tags: ['Base64', 'Encoding', 'Web'],
        content: `
# Why Base64?

(This content is currently available in English)

When using our [Base64 Encoder](/tools/base64), have you ever wondered: Why turn readable text or images into a string of garbled \`a-z, A-Z, 0-9, +, /\`?
        `
    },
    {
        id: 'what-is-jwt',
        title: 'JWT (JSON Web Token) の原理と応用',
        summary: '現代のWebアプリで最も人気のある認証方法。JWTはどのように機能しますか？それは安全ですか？',
        date: '2024-04-20',
        tags: ['Security', 'JWT', 'Authentication'],
        content: `
# Principles and Applications of JWT (JSON Web Token)

(This content is currently available in English)

In separated frontend-backend architectures, **JWT** has become the mainstream standard for authentication.
        `
    }
];
