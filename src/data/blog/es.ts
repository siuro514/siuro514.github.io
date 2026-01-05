import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
    {
        id: 'role-of-gantt-chart',
        title: 'El papel de los diagramas de Gantt: La piedra angular de la gestión de proyectos',
        summary: 'El diagrama de Gantt es una de las herramientas más clásicas en la gestión de proyectos. ¿Cómo ayuda a los equipos a visualizar el progreso y optimizar la asignación de recursos?',
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
        title: 'El propósito de JSON: El estándar para el intercambio de datos moderno',
        summary: 'JSON (JavaScript Object Notation) se ha convertido en el estándar de facto para el intercambio de datos en la web. ¿Por qué es tan popular?',
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
        title: 'JSON vs XML: La batalla entre el antiguo rey y el estándar moderno',
        summary: 'XML dominó una vez el intercambio de datos en Internet, pero ahora JSON ha ocupado su lugar. ¿Cuáles son las diferencias?',
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
        title: 'Batalla de serialización de datos: JSON vs MsgPack vs FlatBuffer vs Protobuf',
        summary: 'Cuando el rendimiento de JSON ya no es suficiente, ¿qué debemos elegir?',
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
        title: 'Codificar vs Cifrar vs Hash: ¿Confundido?',
        summary: '¿Es Base64 un cifrado? ¿Se puede descifrar MD5? Muchos desarrolladores confunden estos conceptos.',
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
        title: 'Comparación de formatos de imagen: JPG, PNG, WebP, AVIF',
        summary: 'Hay muchos formatos de imagen web. ¿Cuál deberías elegir?',
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
        title: 'Mapa mental vs Diagrama de espina de pescado: El poder de las herramientas de pensamiento',
        summary: '¿Bloqueo mental? Los mapas mentales ayudan a pensar de forma divergente, mientras que los diagramas de espina de pescado ayudan a converger en las causas.',
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
        title: '¿Es el "aleatorio" de la computadora realmente aleatorio? Pseudo vs Real',
        summary: '¿Es el número generado por Math.random() realmente aleatorio? ¿Por qué a veces necesitamos números "más aleatorios"?',
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
        title: '¿Por qué Base64? Principios y casos de uso',
        summary: '¿Por qué convertir archivos adjuntos de correo electrónico a Base64? ¿Qué problema resuelve Base64?',
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
        title: 'Principios y aplicaciones de JWT (JSON Web Token)',
        summary: 'El método de autenticación más popular en las aplicaciones web modernas. ¿Cómo funciona JWT?',
        date: '2024-04-20',
        tags: ['Security', 'JWT', 'Authentication'],
        content: `
# Principles and Applications of JWT (JSON Web Token)

(This content is currently available in English)

In separated frontend-backend architectures, **JWT** has become the mainstream standard for authentication.
        `
    }
];
