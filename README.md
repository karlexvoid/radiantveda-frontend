# Radiant - Skincare Routine Application

## Table of Contents
1. [Introduction to MERN Stack](#introduction-to-mern-stack)
2. [Project Overview](#project-overview)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Technical Architecture](#technical-architecture)
6. [Features](#features)
7. [API Documentation](#api-documentation)

## Introduction to MERN Stack

MERN is a popular full-stack JavaScript framework that consists of four main technologies:

- **MongoDB**: A NoSQL database that stores data in JSON-like documents
- **Express.js**: A backend web application framework for Node.js
- **React**: A frontend JavaScript library for building user interfaces
- **Node.js**: A JavaScript runtime environment that executes code outside a web browser

### How MERN Stack Works:
1. **Frontend (React)**
   - Handles user interface and interactions
   - Makes API calls to the backend
   - Manages application state
   - Renders dynamic content

2. **Backend (Node.js + Express)**
   - Handles HTTP requests
   - Processes business logic
   - Interacts with the database
   - Manages authentication and authorization

3. **Database (MongoDB)**
   - Stores application data
   - Provides flexible schema design
   - Scales horizontally
   - Supports complex queries

## Project Overview

Radiant is a skincare routine application that helps users create and manage their personalized skincare routines. The application features:

- User authentication system
- Skincare questionnaire
- Personalized routine recommendations
- Beauty tips
- Skin concern analysis

## Project Structure

```
radiant/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context providers
│   │   └── assets/       # Static assets
│   └── public/           # Public assets
│
└── server/                # Backend Node.js application
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    └── server.js         # Entry point
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd radiant
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

4. **Start the Application**
   ```bash
   # Start backend server (from server directory)
   npm start

   # Start frontend development server (from client directory)
   npm run dev
   ```

## Technical Architecture

### Frontend Architecture
- **React Components**: Modular UI components
- **Context API**: Global state management
- **Protected Routes**: Authentication-based routing
- **Vite**: Build tool and development server

### Backend Architecture
- **Express Routes**:
  - `/auth`: Authentication endpoints
  - `/questionaire`: Skincare questionnaire endpoints
  - `/routine`: Skincare routine endpoints
  - `/userResponses`: User response management

- **MongoDB Models**:
  - `User`: User account information
  - `Questionaire`: Skincare assessment questions
  - `UserResponse`: User's questionnaire responses

## Features

1. **Authentication System**
   - User registration
   - Login/Logout functionality
   - Protected routes

2. **Skincare Questionnaire**
   - Comprehensive skin assessment
   - Dynamic question flow
   - Response storage

3. **Personalized Routine**
   - Custom skincare recommendations
   - Morning and evening routines
   - Product suggestions

4. **Beauty Tips**
   - Curated skincare advice
   - Educational content
   - Best practices

## API Documentation

### Authentication Endpoints

```
POST /api/auth/register
- Register new user
- Body: { username, email, password }

POST /api/auth/login
- User login
- Body: { email, password }
```

### Questionnaire Endpoints

```
GET /api/questionaire
- Fetch questionnaire

POST /api/userResponses
- Submit user responses
- Protected route
- Body: { responses }
```

### Routine Endpoints

```
GET /api/routine
- Fetch personalized routine
- Protected route

PUT /api/routine
- Update routine
- Protected route
- Body: { routineData }
```

For more detailed information about specific components or features, please refer to the corresponding documentation in the code files.
