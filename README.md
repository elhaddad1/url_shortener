URL Shortener
=============

A full-stack URL Shortener application built with Angular and Node.js, offering robust user authentication, URL management, and analytics. Users can shorten URLs, track their performance, and manage links via an intuitive dashboard.

Features
--------

*   **User Authentication**: Secure login and registration using JWT.
    
*   **URL Management**: Create, view, and manage short URLs.
    
*   **Analytics**: Track clicks, user demographics, and usage data.
    
*   **Responsive Design**: User-friendly interface built with Angular Material.
    
*   **RESTful API**: Backend powered by Node.js and Express.
    
*   **Scalability**: Modular and scalable architecture for future enhancements.
    

Technologies Used
-----------------

### Frontend:

*   **Framework**: Angular 18
    
*   **Styling**: Angular Material, CSS
    
*   **State Management**: Reactive Forms
    

### Backend:

*   **Framework**: Node.js with Express.js
    
*   **Database**: MongoDB
    
*   **Authentication**: JSON Web Tokens (JWT)
    
*   **Environment Management**: dotenv
    

### DevOps:

*   **Containerization**: Docker and Docker Compose
    
*   **Version Control**: GitHub
    

Installation
------------

### Prerequisites

*   **Node.js and npm**
    
*   **MongoDB**
    
*   **Angular CLI**
    

### Backend Setup

1.  Navigate to the backend directory:**cd url\_shortener\_backend**
    
2.  Install dependencies:**npm install**
    
3.  Set up environment variables in .env:**MONGO\_URI=mongodb://localhost:27017/url\_shortener****JWT\_SECRET=your\_secret\_key****PORT=3000**
    
4.  Start the backend server:**npm start**
    

### Frontend Setup

1.  Navigate to the frontend directory:**cd url\_shortener\_frontend**
    
2.  Install dependencies:**npm install**
    
3.  typescriptCopy codeexport const environment = { production: false, apiUrl: 'http://localhost:3000'};
    
4.  Start the development server:**ng serve**
    

Usage
-----

1.  Register or log in to the system.
    
2.  Use the dashboard to:
    
    *   Shorten URLs.
        
    *   View and manage existing links.
        
    *   Analyze performance metrics for each link.
        

API Endpoints
-------------

### Authentication

*   **POST /auth/register**: Register a new user.
    
*   **POST /auth/login**: Log in and receive a JWT token.
    

### URL Management

*   **POST /url/shorten**: Shorten a URL (requires authentication).
    
*   **GET /url/:slug**: Redirect to the original URL.
    

### Analytics

*   **GET /url/:id/analytics**: Fetch analytics for a URL (requires authentication).
    

Testing
-------

### Backend Tests

1.  Navigate to the backend directory:**cd url\_shortener\_backend**
    
2.  Run tests:**npm test**
    

### Frontend Tests

1.  Navigate to the frontend directory:**cd url\_shortener\_frontend**
    
2.  Run tests:**ng test**
    

Deployment
----------

### Docker Setup

1.  Ensure Docker and Docker Compose are installed.
    
2.  Navigate to the project root directory.
    
3.  Build and run the containers:**docker-compose up --build**
    

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.
