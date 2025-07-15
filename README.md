myjobb AI - Full Stack Developer Intern Assignment (Backend)
Project Overview
This repository contains the backend implementation for the myjobb AI Full Stack Developer Intern Assignment. The backend is built using Node.js and Express.js with MongoDB as the database, providing a robust RESTful API for an Email OTP-based authentication system and product data management. The backend is deployed on Vercel as a serverless API for production use.
Live Backend URL

Backend: https://your-backend.vercel.app (Replace with your actual Vercel backend URL)

Features
1. Authentication System

Email OTP Verification:
Users can register with email, name, and password.
A 6-digit OTP is generated and sent to the user's email via Nodemailer.
OTP verification marks the user as verified in the MongoDB database.
A confirmation email is sent upon successful verification using react-email for professional, mobile-responsive designs.


Resend OTP: Users can request a new OTP if the previous one expires or is lost.
Login/Logout: Secure login with email and password, and logout functionality to clear session cookies.
Security:
Passwords are hashed using bcryptjs.
JWT-based authentication with secure cookies (httpOnly, secure, sameSite: 'Lax' for same-domain requests).
MongoDB stores user and OTP data securely.



2. API Endpoints

POST /api/auth/register: Register a new user and send OTP.
POST /api/auth/verify: Verify OTP and mark user as verified.
POST /api/auth/login: Authenticate user and set JWT cookie.
POST /api/auth/logout: Clear authentication cookie.
GET /api/auth/me: Fetch authenticated user details.
POST /api/auth/resend-otp: Resend OTP to user’s email.
Product Routes: (If implemented, e.g., /api/products for fetching product data from DummyJSON API.)

3. Technical Stack

Node.js/Express.js: RESTful API framework, adapted for Vercel serverless functions.
MongoDB: Database for storing users and OTPs.
Nodemailer: For sending OTP and confirmation emails.
react-email: For designing professional, responsive emails.
jsonwebtoken: For secure JWT-based authentication.
bcryptjs: For password hashing.
cors: For enabling cross-origin requests from the frontend.
cookie-parser: For handling cookies in Express.

Setup Instructions
Prerequisites

Node.js: v16 or higher
MongoDB: Local or cloud instance (e.g., MongoDB Atlas)
Email Service: SMTP credentials (e.g., Gmail, SendGrid) for Nodemailer
Vercel CLI: For local development and deployment

Installation

Clone the repository:git clone https://github.com/your-username/your-backend-repo.git
cd your-backend-repo


Install dependencies:npm install


Create a .env file in the root directory with the following variables:MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-key
NODEMAILER_EMAIL=your-email@gmail.com
NODEMAILER_PASS=your-email-app-password
FRONTEND_URL=https://products-eight-dun.vercel.app


Start the backend server locally:npm run dev

The server will run on http://localhost:5000 (or another port if specified).

Deployment (Vercel)

Push the code to a GitHub repository.
Install Vercel CLI and deploy:vercel


Add environment variables in Vercel dashboard:MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-key
NODEMAILER_EMAIL=your-email@gmail.com
NODEMAILER_PASS=your-email-app-password
FRONTEND_URL=https://products-eight-dun.vercel.app


Deploy the service. The backend will be accessible at https://your-backend.vercel.app.

Code Quality

Modular Structure: Separate controllers, routes, models, and utilities for maintainability.
Error Handling: Comprehensive handling for API requests, OTP verification, and database operations.
Security: Secure cookie settings (httpOnly, secure, sameSite: 'Lax') and password hashing.
Logging: Debug logs for troubleshooting token generation and cookie handling.

Known Issues

Cookie Persistence: In some browsers, the authentication cookie may not persist due to strict cross-site or subdomain policies. This is mitigated by using sameSite: 'Lax' for same-domain requests and ensuring HTTPS, but further testing is ongoing.

Future Improvements

Implement rate-limiting for OTP requests to prevent abuse.
Add API documentation using Swagger or Postman.
Enhance email templates with additional branding and interactivity.

