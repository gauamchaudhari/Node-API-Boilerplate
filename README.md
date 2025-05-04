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
![Screenshot from 2025-05-04 15-33-15](https://github.com/user-attachments/assets/b0081d50-719f-46e5-b426-3da823bd486a)



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

---

📦  **GitHub Actions – CI/CD Pipeline** 🚀
This project supports automated deployment to an AWS EC2 instance using GitHub Actions.

✅ **CI/CD Flow:**
Push to main branch

GitHub Actions runs:

Linting / tests (optional)

Build (if needed)

SSH into EC2

Pull latest code

Restart server (Node.js) with PM2 or systemd

An EC2 instance (Amazon Linux / Ubuntu)

SSH key pair added to EC2

Node.js, Git, and PM2 installed on EC2

EC2's public IP or domain

Your .pem or private SSH key stored in GitHub as a secret

🔐** GitHub Secrets Required**
Secret Name	Description
EC2_HOST	Public IP or domain of EC2
EC2_USERNAME	Default is ec2-user or ubuntu
EC2_KEY	Your private SSH key (as plain text)
EC2_APP_DIR	App directory on EC2 (e.g., /var/www/backend)
