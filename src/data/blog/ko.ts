import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
    {
        id: 'role-of-gantt-chart',
        title: '간트 차트의 역할: 프로젝트 관리의 초석',
        summary: '간트 차트는 프로젝트 관리에서 가장 고전적인 도구 중 하나입니다. 팀이 진행 상황을 시각화하고 리소스 할당을 최적화하는 데 어떻게 도움이 될까요?',
        date: '2024-01-15',
        tags: ['Project Management', 'Gantt Chart', 'Productivity'],
        content: `
# The Role of Gantt Charts: The Cornerstone of Project Management

(This content is currently available in English)

In modern project management, the **Gantt Chart** is an indispensable visualization tool. Invented by Henry Gantt in the 1910s, it remains a top choice for schedule planning across various industries after more than a century of development.
        `
    },
    {
        id: 'use-of-json',
        title: 'JSON의 용도: 현대 데이터 교환의 표준',
        summary: 'JSON(JavaScript Object Notation)은 웹에서 데이터 교환의 사실상 표준이 되었습니다. 왜 그렇게 인기가 있을까요?',
        date: '2024-02-01',
        tags: ['JSON', 'Web Development', 'Data Format'],
        content: `
# The Purpose of JSON: The Standard for Modern Data Exchange

(This content is currently available in English)

**JSON (JavaScript Object Notation)** is a lightweight data interchange format. It is easy for humans to read and write, and it is easy for machines to parse and generate.
        `
    },
    {
        id: 'json-vs-xml',
        title: 'JSON 대 XML: 이전 왕과 현대 표준 간의 전투',
        summary: 'XML은 한때 인터넷 데이터 교환을 지배했지만 이제는 JSON이 그 자리를 대신했습니다. 차이점은 무엇입니까?',
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
        title: '데이터 직렬화 전투: JSON vs MsgPack vs FlatBuffer vs Protobuf',
        summary: 'JSON 성능이 더 이상 충분하지 않을 때 무엇을 선택해야 할까요?',
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
        title: '인코딩, 암호화, 해시: 혼란스러우신가요?',
        summary: 'Base64는 암호화입니까? MD5는 복호화할 수 있습니까? 많은 개발자가 이 개념을 혼동합니다.',
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
        title: '이미지 형식 비교: JPG, PNG, WebP, AVIF',
        summary: '웹 이미지 형식에는 여러 가지가 있습니다. 어떤 것을 선택해야 할까요?',
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
        title: '마인드 맵 vs 피시본 다이어그램: 사고 도구의 힘',
        summary: '아이디어가 떠오르지 않나요? 마인드 맵은 확산적 사고를 돕고 피시본 다이어그램은 원인을 수렴하는 데 도움이 됩니다.',
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
        title: '컴퓨터의 "랜덤"은 진짜 랜덤일까요? 의사 난수 vs 진정한 난수',
        summary: 'Math.random()으로 생성된 숫자가 정말 무작위일까요? 왜 때로는 "더 무작위"인 숫자가 필요할까요?',
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
        title: '왜 Base64인가? 원리와 사용 사례',
        summary: '이메일 첨부 파일을 Base64로 변환하는 이유는 무엇입니까? Base64는 어떤 문제를 해결합니까?',
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
        title: 'JWT(JSON Web Token)의 원리와 응용',
        summary: '현대 웹 앱에서 가장 인기 있는 인증 방식입니다. JWT는 어떻게 작동합니까? 안전한가요?',
        date: '2024-04-20',
        tags: ['Security', 'JWT', 'Authentication'],
        content: `
# Principles and Applications of JWT (JSON Web Token)

(This content is currently available in English)

In separated frontend-backend architectures, **JWT** has become the mainstream standard for authentication.
        `
    }
];
