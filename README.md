# 🧠 myjobb AI - Full Stack Developer Intern Assignment (Backend)

## 📘 Project Overview

This repository contains the backend implementation for the **myjobb AI Full Stack Developer Intern Assignment**.  
The backend is built using **Node.js** and **Express.js** with **MongoDB**, providing a RESTful API for Email OTP-based authentication and product data management.  
It is deployed on **Vercel** as a serverless API for production use.

---

### 🔗 Live Backend URL

> https://my-job-ai-backend.vercel.app/

---

## ✨ Features

### 🔐 Authentication System

#### ✅ Email OTP Verification:
- Users register with email, name, and password.
- A 6-digit OTP is sent via **Nodemailer**.
- OTP verification updates user status in MongoDB.
- A confirmation email is sent using **react-email** with professional, mobile-responsive designs.

#### 🔁 Resend OTP:
- Option to request a new OTP if the previous one expires.

#### 🔓 Login/Logout:
- Secure login with email/password and logout to clear cookies.

#### 🛡️ Security:
- Passwords hashed with **bcryptjs**.
- JWT-based authentication with secure cookies (`httpOnly`, `secure`, `sameSite: 'Lax'`).
- MongoDB for secure storage of user and OTP data.

---

## 📡 API Endpoints

```bash
POST   /api/auth/register       # Register a new user and send OTP
POST   /api/auth/verify         # Verify OTP and mark user as verified
POST   /api/auth/login          # Authenticate user and set JWT cookie
POST   /api/auth/logout         # Clear authentication cookie
GET    /api/auth/me             # Fetch authenticated user details
POST   /api/auth/resend-otp     # Resend OTP to user’s email
```

Product Routes:  
*(If implemented, e.g., `/api/products` for DummyJSON API data.)*

---

## ⚙️ Technical Stack

- **Node.js/Express.js** – RESTful API framework, adapted for Vercel serverless.
- **MongoDB** – Database for users and OTPs.
- **Nodemailer** – For sending emails.
- **react-email** – For responsive email designs.
- **jsonwebtoken** – For JWT authentication.
- **bcryptjs** – For password hashing.
- **cors** – For cross-origin requests.
- **cookie-parser** – For cookie handling.

---

## 🛠️ Setup Instructions

### 🔧 Prerequisites

- Node.js: v16 or higher
- MongoDB: Local or cloud instance (e.g., MongoDB Atlas)
- Email Service: SMTP credentials (e.g., Gmail, SendGrid)
- Vercel CLI: For local development and deployment

---

### 📥 Installation

```bash
https://github.com/amitsingh2775/myJobAi_backend.git
cd myJobAi_backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables:

```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-key
NODEMAILER_EMAIL=your-email@gmail.com
NODEMAILER_PASS=your-email-app-password
FRONTEND_URL=https://products-eight-dun.vercel.app
```

Start the backend server locally:

```bash
npm run dev
```

> The server runs on http://localhost:3000 (or another port if specified).

---

## 🚀 Deployment (Vercel)

Push the code to a GitHub repository:

```bash
git push origin main
```

Install Vercel CLI and deploy:

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard:

```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-key
NODEMAILER_EMAIL=your-email@gmail.com
NODEMAILER_PASS=your-email-app-password
FRONTEND_URL=https://products-eight-dun.vercel.app
```

> Deploy the service. Access the backend at: https://your-backend.vercel.app

---

## 🧼 Code Quality

- **Modular Structure**: Organized controllers, routes, models, and utilities.
- **Error Handling**: Robust handling for API requests, OTP verification, and DB operations.
- **Security**: Secure cookies and password hashing.
- **Logging**: Debug logs for troubleshooting (e.g., token generation, cookie setting).

---

## ⚠️ Known Issues

- **Cookie Persistence**: Some browsers may not persist cookies due to strict policies.
  - Mitigated with `sameSite: 'Lax'` and `secure: true`, but testing continues.
- **Debug Logs**: A `"yes removed"` log appears during development. Safe to ignore in production.

---

## 🌱 Future Improvements

- Add rate-limiting for OTP requests.
- Include API documentation with Swagger.
- Enhance email templates with branding.
