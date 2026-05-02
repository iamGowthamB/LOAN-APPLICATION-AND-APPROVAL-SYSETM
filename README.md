# Loan Application and Approval System

A full-stack web application that manages the complete loan application
workflow using role-based access control and real-time email notifications.

---

## 👨‍💻 Developer
**Name:** Gowtham B  
**Course:** B.E. Computer Science and Engineering  
**Academic Level:** Final Year  
**Project Type:** Academic & Professional Portfolio Project  

---

## 📌 Overview
The **Loan Application and Approval System** is designed to digitize and
streamline the loan approval process by introducing structured workflows,
secure role-based access, and automated notifications.

The application ensures transparency, accountability, and efficiency across
all stakeholders involved in the loan approval lifecycle.

---

## 👥 System Roles & Responsibilities

### 👤 User
- Secure authentication and personalized dashboard
- Submission of loan applications with required details
- Real-time email notifications for:
  - Application submission confirmation
  - Agent recommendation updates
  - Final approval or rejection status
- Application status tracking

---

### 🧑‍💼 Agent
- Secure login and dashboard
- Review submitted loan applications
- Recommend **Approval** or **Rejection**
- Automatic notification to:
  - User
  - Admin

---

### 🛡️ Admin
- Full system access and control
- Review all loan applications
- Final decision authority (Approve / Reject)
- Status update notifications to users

---

## 🔔 Notification Mechanism
- Email-based real-time notifications
- Triggered on every application status change
- Ensures timely and transparent communication between all roles

---

## 🛠️ Technology Stack

### Frontend
- React + Vite
- Bootstrap 5
- Axios for API calls
- React Router for navigation

### Backend
- Spring Boot 3.x (RESTful APIs)
- Spring Security (JWT Authentication)
- Spring Data JPA (Database ORM)
- MySQL Database
- Java Mail (Email notifications)

### Database
- MySQL 8.0+

---

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Node.js 18+** and npm
- **MySQL 8.0+**
- **Maven 3.6+**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamGowthamB/LOAN-APPLICATION-AND-APPROVAL-SYSETM.git
   cd LOAN-APPLICATION-AND-APPROVAL-SYSETM/backend/springapp
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Fill in your database and email credentials:
   ```env
   # Database Configuration
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key

   # Email Configuration
   MAIL_PASSWORD=your_gmail_app_password
   ```

3. **Database Setup**
   - Create MySQL database: `loanapp`
   - Update connection details in `.env`

4. **Run Backend**
   ```bash
   mvn spring-boot:run
   ```
   Server starts on: `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend/reactapp
   ```

2. **Environment Configuration**
   - Copy `.env.example` to `.env`
   - Configure API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run Frontend**
   ```bash
   npm run dev
   ```
   Frontend starts on: `http://localhost:5173`

### Database Schema
The application uses JPA auto-creation. Tables are created automatically on startup.

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/password-reset/request-otp` - Request password reset
- `POST /api/password-reset/verify-otp` - Verify OTP and reset password

### Applications (User)
- `GET /api/applications/my-applications` - Get user's applications
- `POST /api/applications/post` - Submit new application

### Applications (Agent)
- `GET /api/applications/agent/paged` - Get assigned applications
- `PUT /api/applications/{id}/status` - Update application status

### Applications (Admin)
- `GET /api/applications/paged` - Get all applications
- `GET /api/applications/{id}` - Get application details

### Loan Types
- `GET /api/loan-types` - Get all loan types
- `POST /api/loan-types` - Create loan type (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)

---

## 🔐 Security Features
- JWT-based authentication
- Role-based access control (USER, AGENT, ADMIN)
- Password encryption
- CORS configuration
- Input validation

---

## 📧 Email Configuration
Uses Gmail SMTP for notifications. Requires:
- Gmail account
- App password (not regular password)
- Enable 2-factor authentication

---

## ✨ Key Features
- Secure role-based access control
- End-to-end loan workflow automation
- Real-time email notifications
- Scalable backend architecture
- Modular and maintainable codebase
- Responsive UI with Bootstrap
- File upload for documents

---


## ⚠️ Usage & Restrictions
This repository is shared strictly for **learning, evaluation, and portfolio review**.

Unauthorized copying, modification, redistribution, or submission of this
project as academic or commercial work is prohibited.

© 2026 Gowtham B. All rights reserved.
