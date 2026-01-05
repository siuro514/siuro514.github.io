import { BlogPost } from './types';

export const blogPosts: BlogPost[] = [
    {
        id: 'role-of-gantt-chart',
        title: 'The Role of Gantt Charts: The Cornerstone of Project Management',
        summary: 'Gantt Chart is one of the most classic tools in project management. How does it help teams visualize progress and optimize resource allocation? This article explores the core value and practical applications of Gantt charts.',
        date: '2024-01-15',
        tags: ['Project Management', 'Gantt Chart', 'Productivity'],
        content: `
# The Role of Gantt Charts: The Cornerstone of Project Management

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
        title: 'The Purpose of JSON: The Standard for Modern Data Exchange',
        summary: 'JSON (JavaScript Object Notation) has become the de facto standard for data exchange on the web. Why is it so popular? What are its practical applications?',
        date: '2024-02-01',
        tags: ['JSON', 'Web Development', 'Data Format'],
        content: `
# The Purpose of JSON: The Standard for Modern Data Exchange

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
        title: 'JSON vs XML: The Battle Between the Former King and the Modern Standard',
        summary: 'XML once ruled internet data exchange, but now JSON has taken its place. What are the differences? When should you still use XML?',
        date: '2024-02-10',
        tags: ['JSON', 'XML', 'Comparison'],
        content: `
# JSON vs XML: The Battle Between the Former King and the Modern Standard

In the early days of web development, **XML (Extensible Markup Language)** was the king of data exchange. However, with the rise of Web 2.0 and mobile internet, **JSON** has gradually replaced it.

## Syntax Comparison

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

## Main Differences

| Feature | JSON | XML |
| :--- | :--- | :--- |
| **Readability** | Concise, easy to read | Verbose, repetitive tags |
| **Size** | Small, fast transmission | Large, includes many tags |
| **Parsing Speed** | Extremely fast (Native browser support) | Slower (Requires DOM parser) |
| **Data Types** | Supports string, number, boolean, array, object | Text nodes only, types need extra Schema |
| **Schema** | JSON Schema (Optional) | DTD, XSD (Powerful but complex) |

## When to Still Use XML?
1.  **Complex Document Structures**: Formats like Word (.docx) are actually a collection of XMLs.
2.  **Strict Validation Needed**: Industries like finance requiring high stability rely on XSD for strict format validation.
3.  **HTML/SVG**: These markup languages are essentially variants of XML.

For the vast majority of Web API development, **JSON** is undoubtedly the better choice.
    `
    },
    {
        id: 'json-vs-msgpack-vs-protobuf',
        title: 'Data Serialization Battle: JSON vs MsgPack vs FlatBuffer vs Protobuf',
        summary: 'When JSON performance is no longer sufficient, what should we choose? This article details the pros and cons of binary formats like MessagePack, FlatBuffers, and Protocol Buffers.',
        date: '2024-02-20',
        tags: ['Performance', 'Serialization', 'Protocol Buffers', 'MessagePack'],
        content: `
# Data Serialization Battle

In high-performance transmission scenarios, the cost of parsing JSON's text format becomes a bottleneck. This is where binary serialization formats come in.

## Contenders

### 1. JSON (Text)
- **Pros**: Human-readable, highest compatibility, no Schema needed.
- **Cons**: Large size, slow parsing (requires string scanning).

### 2. MessagePack (Binary)
- **Positioning**: "Like JSON, but fast and small."
- **Pros**: Smaller and faster than JSON, supports binary data, no Schema needed (Self-describing).
- **Cons**: Not readable, requires tools to convert.

### 3. Protocol Buffers (Google)
- **Positioning**: Google's internal standard, emphasizes cross-language service communication (gRPC).
- **Pros**: Extremely small, fast parsing, strong backward compatibility (via \`.proto\` definitions).
- **Cons**: Must define Schema, more complex development workflow.

### 4. FlatBuffers (Google)
- **Positioning**: Game development and high-performance applications.
- **Pros**: **Zero-copy** reading. No need to parse the entire object; can read specific fields directly from memory.
- **Cons**: API is more complex, data size often slightly larger than Protobuf.

## Performance Comparison (Roughly)

| Format | Size | Parsing Speed | Schema | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **JSON** | Large | Slow | No | Web API, Configs, Debugging |
| **MsgPack** | Medium | Fast | No | Redis storage, Internal caching |
| **Protobuf** | Small | Very Fast | Yes | Microservices (gRPC), Cross-language |
| **FlatBuffer** | Small/Med | **Instant** | Yes | Games (Unity/Cocos), Real-time sync |

## Conclusion
- **Web Frontend**: Stick with **JSON**.
- **Internal Microservices**: Recommend **Protobuf**.
- **Games/Real-time Systems**: Consider **FlatBuffers**.
- **Want speed without Schema**: Try **MessagePack**.
    `
    },
    {
        id: 'encode-vs-encrypt-vs-hash',
        title: 'Encode vs Encrypt vs Hash: Confused?',
        summary: 'Is Base64 encryption? Can MD5 be decrypted? Many developers confuse Encode, Encrypt, and Hash. This article clears up the differences in the simplest way.',
        date: '2024-03-05',
        tags: ['Security', 'Cryptography', 'Base64'],
        content: `
# Encode vs Encrypt vs Hash: Confused?

As developers, we often hear Base64, AES, MD5, SHA-256. While they all turn "readable text" into "unreadable gibberish," they are fundamentally different.

## 1. Encoding
**Purpose**: For **data transmission** or **format conversion**.
- **Features**: No key needed, uses public algorithms, **anyone can reverse it**.
- **Common Examples**: Base64, URL Encoding, Unicode.
- **Myth**: Base64 is **NOT** encryption! Never use Base64 to "encrypt" passwords.
- **Tool**: [Ganttleman Encoder](/tools/base64)

## 2. Encryption
**Purpose**: To **keep secrets** and prevent unauthorized access.
- **Features**: Requires a **Key**. Only with the key can you decrypt; without it, it's theoretically impossible to crack.
- **Types**:
    - **Symmetric Encryption** (AES, DES): Same key for encryption and decryption. Fast.
    - **Asymmetric Encryption** (RSA, ECC): Public key to encrypt, private key to decrypt. More secure but slower.
- **Tool**: [Ganttleman Encryption Tool](/tools/crypto)

## 3. Hashing
**Purpose**: For **integrity verification** or **unique identification**.
- **Features**: **One-way**, irreversible. The same input always produces the same output.
- **Common Examples**: MD5, SHA-1, SHA-256, Bcrypt.
- **Applications**: Password storage (DB stores Hash, not plain text), file verification (integrity check).

## Summary Table

| Term | Key Needed | Reversible | Purpose | Examples |
| :--- | :--- | :--- | :--- | :--- |
| **Encoding** | No | Yes | Format Conversion | Base64 |
| **Encryption** | Yes | Yes (With Key) | Data Secrecy | AES, RSA |
| **Hashing** | No | No (One-way) | Verification/Fingerprint | SHA-256, MD5 |
    `
    },
    {
        id: 'image-formats-comparison',
        title: 'Comparison of Image Formats: JPG, PNG, WebP, AVIF',
        summary: 'There are many web image formats. Which one should you choose? JPG for photos, PNG for transparency... what about WebP and AVIF?',
        date: '2024-03-15',
        tags: ['Image', 'Optimization', 'WebP'],
        content: `
# Comparison of Image Formats: JPG, PNG, WebP, AVIF

Images often account for more than 60% of web traffic. Choosing the right format is critical for website performance.

## 1. JPEG (Joint Photographic Experts Group)
- **Pros**: Rich colors, high compression ratio, 100% compatibility.
- **Cons**: **Lossy compression** (artifacts), no transparency.
- **Use Case**: Photographs, images with complex colors.

## 2. PNG (Portable Network Graphics)
- **Pros**: **Lossless compression**, supports **Transparency (Alpha Channel)**, sharp lines.
- **Cons**: Larger file size.
- **Use Case**: Logos, screenshots, images requiring transparency.

## 3. WebP (Google)
- **Pros**: Combines pros of JPG and PNG. Supports lossy/lossless, transparency, usually ~30% smaller than JPG.
- **Cons**: Very old browsers (IE) don't support it (but in 2024 this is rarely an issue).
- **Use Case**: **The preferred standard for modern web images.**

## 4. AVIF (AV1 Image File Format)
- **Pros**: Derived from video coding technology, even higher compression than WebP! Better quality.
- **Cons**: Slow encoding speed, decoding might consume more battery on old devices, compatibility slightly lower than WebP.
- **Use Case**: Next-gen standard for extreme compression.

## 5. SVG (Scalable Vector Graphics)
- **Features**: Vector-based (code), infinite scaling without pixelation.
- **Use Case**: Icons, simple Logos, diagrams.

## Practical Advice
Use our [Image Compressor](/tools/image-compressor) to easily convert images to WebP and compress them. This is the simplest and most effective way to improve SEO and load speeds.
    `
    },
    {
        id: 'mindmap-vs-fishbone',
        title: 'Mind Map vs Fishbone Diagram: The Power of Thinking Tools',
        summary: 'Brain stuck? Mind maps help you think divergently, while Fishbone diagrams help you converge on causes. Master these two tools to solve problems efficiently.',
        date: '2024-03-22',
        tags: ['Thinking Tools', 'Productivity', 'Mind Map'],
        content: `
# Mind Map vs Fishbone Diagram: The Power of Thinking Tools

In the process of creative brainstorming and problem-solving, graphical tools help us organize our thoughts. The two most common charts are the Mind Map and the Fishbone Diagram.

## Mind Map
Popularized by Tony Buzan, it mimics the radial structure of brain neurons.
- **Structure**: Center is the main topic, with branches radiating outward.
- **Thinking Mode**: **Divergent Thinking**.
- **Uses**:
    - **Note-taking**: Transforming linear lessons into connected diagrams.
    - **Brainstorming**: Associating related concepts.
    - **Planning**: Breaking down various aspects.

## Fishbone Diagram
Also known as Ishikawa Diagram or Cause-and-Effect Diagram.
- **Structure**: The fish head is the "Result" (Problem), the bones are "Causes". Often combined with the **5M1E** method (Man, Machine, Material, Method, Environment, Measurement).
- **Thinking Mode**: **Convergent Thinking** and **Logical Analysis**.
- **Uses**:
    - **Root Cause Analysis (RCA)**: Why is the server down? Why is product yield low?
    - **Quality Management**: Identifying key variables affecting quality.

## Comparison
- When looking for **New Ideas**, use **Mind Map**.
- When looking for **Bug Causes**, use **Fishbone Diagram**.
    `
    },
    {
        id: 'is-random-true',
        title: 'Is Computer "Random" Truly Random? Pseudo vs True Random',
        summary: 'Is the number generated by \`Math.random()\` really random? Why do we sometimes need "more random" numbers?',
        date: '2024-04-01',
        tags: ['Computer Science', 'Random', 'Security'],
        content: `
# Is Computer "Random" Truly Random?

This is a classic computer science question. The answer is usually: **Mostly no, but it can be when needed.**

## Pseudo-Random Number Generator (PRNG)
\`Math.random()\` (JS) and \`random.random()\` (Python) are pseudo-random.
- **Principle**: Uses a mathematical formula to calculate the next number from a **Seed**.
- **Feature**: If the **Seed is the same**, the **sequence is identical**!
- **Usage**: Games (drop rates), simulations, graphics. Fast, but insecure.

## True Random Number Generator (TRNG)
- **Principle**: Relies on physical phenomena. E.g., atmospheric noise, thermal noise, radioactive decay, or mouse movements.
- **Usage**: **Cryptography**, key generation, gambling systems.
- **Cons**: Slow generation speed, requires hardware support.

## Cryptographically Secure Pseudo-Random Number Generator (CSPRNG)
In Web development, when generating Tokens or passwords, do not use \`Math.random()\`. If hackers guess the seed (usually timestamp), they can predict the next number.

You should use:
- **Browser**: \`window.crypto.getRandomValues()\`
- **Node.js**: \`crypto.randomBytes()\`

These APIs leverage the operating system's entropy pool to provide randomness secure enough for encryption.
    `
    },
    {
        id: 'why-base64',
        title: 'Why Base64? Principles and Use Cases',
        summary: 'Why convert email attachments to Base64? Why embed images in CSS? What problem does Base64 solve?',
        date: '2024-04-10',
        tags: ['Base64', 'Encoding', 'Web'],
        content: `
# Why Base64?

When using our [Base64 Encoder](/tools/base64), have you ever wondered: Why turn readable text or images into a string of garbled \`a-z, A-Z, 0-9, +, /\`?

## Background: ASCII Limitations
Early computer communication protocols (like SMTP for Email) were designed to transmit **Plain Text (ASCII)**. They were sensitive to **Binary Data** (like images) or **Control Characters**, which could cause transmission interruptions or corruption.

## The Base64 Solution
The core idea of Base64 is: **Convert any binary data into 64 of the safest, most universal printable characters.**

These 64 characters are: A-Z, a-z, 0-9, +, /. (And = for padding).

## Common Use Cases

### 1. Email Attachments
When you attach an image in an email, the email client automatically converts the image to a Base64 string and embeds it in the message body.

### 2. Data URLs (Web Optimization)
\`\`\`css
background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...");
\`\`\`
- **Pros**: Reduce HTTP Requests. Small icons become strings inside CSS/HTML, avoiding extra downloads.
- **Cons**: Size increases by ~33%, and cannot be cached by the browser separate from the CSS. Suitable only for tiny images.

### 3. API Binary Transfer
Sometimes JSON API responses need to include small files, returning them as Base64 strings.

## Conclusion
Base64 was born for **Compatibility**. It sacrifices about 1/3 of space efficiency in exchange for the ability to safely transmit binary data across any plain text channel.
    `
    },
    {
        id: 'what-is-jwt',
        title: 'Principles and Applications of JWT (JSON Web Token)',
        summary: 'The most popular authentication method in modern Web apps. How does JWT work? Is it secure?',
        date: '2024-04-20',
        tags: ['Security', 'JWT', 'Authentication'],
        content: `
# Principles and Applications of JWT (JSON Web Token)

In separated frontend-backend architectures, **JWT** has become the mainstream standard for authentication.

## Traditional Session vs JWT

### Session (Stateful)
1. User logs in.
2. Server remembers in memory/DB: "This SessionID is User A".
3. Returns SessionID to browser (Cookie).
4. Cons: Server needs to store state, making scaling out difficult.

### JWT (Stateless)
1. User logs in.
2. Server signs a Token with a private key saying "This is User A".
3. Returns Token to browser.
4. Next request, browser sends Token.
5. Server verifies signature. **Server does not need to query the database!**

## JWT Structure
JWT looks like this: \`xxxxx.yyyyy.zzzzz\` (3 parts separated by dots).

### 1. Header
Describes the algorithm (e.g., HS256).
\`\`\`json
{ "alg": "HS256", "typ": "JWT" }
\`\`\`

### 2. Payload
Stores user info. **Note: This is public, do not put passwords here!**
\`\`\`json
{ "sub": "1234567890", "name": "John Doe", "admin": true }
\`\`\`

### 3. Signature
Hashes (Header + Payload) with the server's secret key. Prevents tampering.

## Security Notes
1. **No sensitive info in Payload**: Can be seen by decoding Base64.
2. **Use HTTPS**: Prevent Token theft during transmission.
3. **Token Expiry (TTL)**: JWTs cannot be revoked easily by default, so keep validity short.

JWT perfectly combines the usability of **JSON** with the security of **Hashing/Encryption**.
    `
    }
];
