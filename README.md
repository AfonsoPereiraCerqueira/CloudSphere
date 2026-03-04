# ☁️ **CloudSphere** - VPS/Cloud Management Sales Website

Welcome to **CloudSphere**, a full-stack web application for managing and selling VPS/Cloud services! This project is built using modern technologies to provide a fast, secure, and responsive user experience. 🚀

> [!NOTE]
> **Educational Project:** This is my first full-stack project, developed primarily for educational purposes. As such, it may contain bugs and might not be fully updated with the latest software versions or functionalities.

## ✨ Features

- 🔐 **JWT Authentication**: Secure login and user management with JSON Web Tokens.
- 🍪 **Cookie-Parser Integration**: Manage authentication tokens easily via cookies.
- 📦 **Service Management**: Users can purchase, manage, and renew their VPS/Cloud services.
- 🛠️ **Admin Panel**: Admin interface for managing users, orders, and services.
- 💳 **Payment Gateway**: Integration-ready for payment systems.
- 📱 **Mobile Responsive**: Fully optimized for desktop and mobile use.
- ⚡ **Fast Development**: Vite for development and Tailwind CSS for utility-first styling.

## 🛠️ Tech Stack

### Frontend
- ⚛️ **ReactJS**: JavaScript library for building dynamic user interfaces.
- ⚡ **Vite**: Lightning-fast development and build tool.
- 🎨 **Tailwind CSS**: A utility-first CSS framework for styling.

### Backend
- 🟢 **NodeJS**: Backend runtime environment for scalable server-side applications.
- ⚙️ **ExpressJS**: Web framework for building APIs.
- 🍃 **MongoDB**: NoSQL database to store user and service data.
- 🔐 **JWT**: For secure authentication.
- 🍪 **Cookie-Parser**: Middleware to handle cookies in authentication.
- ♻️ **Nodemon**: Automatically restarts the server when changes are detected in the backend code.

### Others
- 🛠️ **RESTful API**: For frontend-backend communication.
- 🧑‍💻 **ESLint & Prettier**: For code formatting and consistency.

## 📂 Project Structure

```bash
CloudSphere/
├── backend/             # NodeJS backend
│   ├── config/          # Configuration (DB, JWT secrets, etc.)
│   ├── controllers/     # API request handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   └── server.js        # Entry point for the backend server
├── frontend/            # ReactJS frontend
│   ├── src/             # Source code for React components and views
│   ├── public/          # Static assets (images, fonts, etc.)
│   └── vite.config.js   # Vite configuration
└── README.md            # Project documentation
```