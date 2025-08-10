# ⚡️ Scalable Real-Time Chat Application

This project is a **scalable, real-time chat application** designed to handle a high volume of concurrent users and messages. It is built with a **modern tech stack** to ensure **high performance, reliability, and maintainability**.

---

## 🚀 Features

- **Real-time Messaging** – Users can send and receive messages instantly.
- **Scalable Architecture** – Designed to handle increasing user loads by distributing traffic across multiple server instances.
- **User Authentication** – Secure sign-up and login system.
- **Message Persistence** – Chat history is stored securely in a database.
- **Distributed Communication** – A message broker ensures reliable communication between different parts of the system.

---

## 🛠 Tech Stack

| Layer              | Technologies |
|--------------------|-------------|
| **Frontend**       | Next.js, React, TypeScript |
| **Backend**        | Node.js, Express.js |
| **Real-time**      | Socket.IO, Redis (Pub/Sub) |

---

## 🏗 Architecture

This application follows a **distributed system architecture** to ensure scalability.

- **Redis Pub/Sub** – All servers subscribe to a Redis channel. When a message is published, all servers receive it and emit it to their connected clients.


**Workflow Overview:**
1. Client sends a message via **Socket.IO**.
2. Server publishes the message to a **Redis channel**.
3. All subscribed server instances broadcast the message to connected clients.

---

