# Node API Boilerplate 🚀

![Node.js](https://img.shields.io/badge/Node.js-21.x-brightgreen)
![Express](https://img.shields.io/badge/Express.js-Framework-blue)
![Docker](https://img.shields.io/badge/Docker-Supported-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A production-ready Node.js API boilerplate with:

- ✅ JWT Authentication
- ✅ Role & Permission Management
- ✅ Email Integration with Nodemailer
- ✅ Docker Support
- ✅ File Upload (Multer)
- ✅ Clean Folder Structure & Modular Code

---

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - Login / Registration with JWT
  - Secure password hashing with bcrypt
  - Access control via roles and permissions
  - https://private-user-images.githubusercontent.com/147582627/440175261-582d54f9-b0ef-4fa5-b1d4-ecef0821d7ea.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDYzNTI3NTcsIm5iZiI6MTc0NjM1MjQ1NywicGF0aCI6Ii8xNDc1ODI2MjcvNDQwMTc1MjYxLTU4MmQ1NGY5LWIwZWYtNGZhNS1iMWQ0LWVjZWYwODIxZDdlYS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNTA0JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDUwNFQwOTU0MTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iZmEzNzg4MWY4ODlmMzNiY2ZlOWQ1NmQ4MWVhMzU5ZjY1ZWQ3NWM0ODkzNDJlN2I1YTcxZjE5MDIwNDBjNTkzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.l5kv2MO72RR8rRL_VEPMjH2A4l5RbD3K3fafFuvvbBE

- 🧑‍💼 **User Management**
  - Manage users, roles, and permissions
  - Easily extensible

- 📦 **Docker Setup**
  - Ready-to-use Dockerfile and `docker-compose.yml`
  - One command to get started

- 📩 **Email Service**
  - Send transactional emails via Nodemailer
  - Predefined Email Templates

- 📁 **File Uploads**
  - Upload and serve files using Multer
  - Easily extendable to use S3 or Cloud Storage

- 📃 **Clean Code & Structure**
  - Follows industry standards
  - Organized by modules (controllers, routes, services, models)

---

## 🐳 Docker Setup

```bash
# Build and run
docker-compose up --build
