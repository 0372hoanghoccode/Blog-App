
A full-stack blogging application built with the MERN stack (MongoDB, Express, React, Node.js), featuring user authentication, CRUD operations, and modern UI components.

## ✨ Features
- **User Authentication**: JWT-based signup/login + Google OAuth
- **Content Management**:
  - Create/Edit/Delete blog posts
  - Category system with CRUD operations
  - Rich text editor support (React Quill)
- **Social Features**:
  - Nested comments with replies
  - Comment liking/disliking
- **Admin Controls**:
  - User management (view/update/delete users)
  - Role-based access control
- **Modern UI**:
  - Responsive design with Tailwind CSS
  - Animated components (Framer Motion)
  - Radix UI primitives for accessibility

## 🛠 Tech Stack
**Backend**  
![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)
![Express](https://img.shields.io/badge/Express-4.21-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-8.9-green)
![Cloudinary](https://img.shields.io/badge/Cloudinary-2.5-blueviolet)

**Frontend**  
![React](https://img.shields.io/badge/React-18.3-blue)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.5-purple)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4)
![ShadCN](https://img.shields.io/badge/ShadCN-Components-orange)
![Framer_Motion](https://img.shields.io/badge/Framer_Motion-10.12.0-FF007F)

**Auth**  
![JWT](https://img.shields.io/badge/JWT-9.0-orange)
![Google_OAuth](https://img.shields.io/badge/Google_OAuth-2.0-blue)

## 🚀 Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/mern-blog.git  https://github.com/0372hoanghoccode/Blog-App.git
   cd Blog-App
2. Install dependencies
   # Server
   npm install
  # Client
  cd client && npm install
3.Environment Setup
  # Server .env
  MONGO_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  # Client .env
  VITE_FIREBASE_API_KEY=your_api_key
4.Run the application
  # Start server
  npm run dev
  # In separate terminal (from client directory)
  npm run dev
