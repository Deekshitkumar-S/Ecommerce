# E-Commerce Platform - Production Implementation

## Project Overview

A production-grade, full-stack e-commerce platform built with React.js, Node.js/Express, and MongoDB Atlas. This platform enables users to explore products, view detailed product information, and manage a shopping cart with a clean, responsive UI and lightweight backend.

## Features

### Core Functionality
- **Product Browsing**: Grid/list view with filtering and sorting
- **Product Details**: Comprehensive product information with image gallery
- **Shopping Cart**: Add/remove items, update quantities, persist cart state
- **User Authentication**: JWT-based secure authentication
- **Responsive Design**: Mobile-first, clean UI across all devices
- **Search**: Real-time product search
- **Checkout**: Order placement and management

### Technical Highlights
- Production-ready architecture with scalability in mind
- TypeScript for type safety across frontend and backend
- Comprehensive error handling and validation
- Security best practices implemented
- Performance optimizations (caching, lazy loading)
- CI/CD pipeline ready
- Docker containerization
- Comprehensive logging and monitoring

## Tech Stack

### Frontend
- **React.js 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Context API** for state management
- **Axios** for API calls
- **React Hook Form** + **Zod** for form validation
- **Vite** as build tool

### Backend
- **Node.js 20 LTS**
- **Express.js** with TypeScript
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Mongoose** for MongoDB ODM
- **Winston** for logging
- **Zod** for request validation
- **Helmet** + **CORS** for security

### Database
- **MongoDB Atlas** (primary database)
- **Redis** (caching and session management)

### DevOps
- **Docker** & **Docker Compose**
- **GitHub Actions** (CI/CD)
- **Nginx** (reverse proxy)

## Project Structure

```
ecommerce-platform/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context providers
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Helper functions
│   │   ├── types/           # TypeScript type definitions
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/                 # Express API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── services/        # Business logic
│   │   ├── config/          # Configuration files
│   │   ├── utils/           # Helper functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── server.ts        # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                    # Documentation
│   └── technical-architecture.md
│
├── docker-compose.yml       # Docker orchestration
├── .env.example            # Environment variables template
└── README.md               # This file
```

## Prerequisites

- **Node.js**: v20.x or higher
- **npm**: v10.x or higher
- **MongoDB Atlas**: Account with cluster setup
- **Redis**: v7.x or higher (optional for local dev)
- **Docker**: v24.x or higher (optional)
- **Git**: For version control

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ecommerce-platform
```

### 2. Environment Configuration

Create `.env` files for both frontend and backend:

**Backend `.env`:**
```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
DB_NAME=ecommerce

# Redis (optional for development)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=info
```

**Frontend `.env`:**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=E-Commerce Platform
```

### 3. Backend Setup

```bash
cd backend
npm install
npm run build
npm run dev
```

The backend server will start at `http://localhost:5000`

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`

### 5. Database Setup

#### MongoDB Atlas
1. Create a cluster on MongoDB Atlas
2. Create a database user with read/write permissions
3. Whitelist your IP address or use 0.0.0.0/0 for development
4. Get the connection string and update `MONGODB_URI` in backend `.env`

#### Initial Data Seeding (Optional)

```bash
cd backend
npm run seed
```

## Running with Docker

### Development

```bash
# Build and start all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017
- Redis: localhost:6379

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### Product Endpoints

#### Get All Products
```http
GET /products?page=1&limit=20&category=electronics&sort=-createdAt&search=laptop
```

#### Get Product by ID
```http
GET /products/:id
```

### Cart Endpoints

#### Get Cart
```http
GET /cart
Authorization: Bearer <token>
```

#### Add to Cart
```http
POST /cart/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439011",
  "quantity": 2,
  "selectedAttributes": {
    "size": "M",
    "color": "Blue"
  }
}
```

#### Update Cart Item
```http
PUT /cart/items/:itemId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /cart/items/:itemId
Authorization: Bearer <token>
```

### Order Endpoints

#### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

## Testing

### Backend Tests

```bash
cd backend
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

### Frontend Tests

```bash
cd frontend
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
```

## Deployment

### Frontend Deployment (Vercel)

```bash
cd frontend
npm run build
vercel --prod
```

### Backend Deployment (AWS EC2 / DigitalOcean)

1. Set up server with Node.js and PM2
2. Clone repository
3. Install dependencies
4. Build application
5. Start with PM2

```bash
npm install -g pm2
cd backend
npm install
npm run build
pm2 start dist/server.js --name ecommerce-api
pm2 save
pm2 startup
```

### Using Docker on Production Server

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Monitoring & Logging

### View Logs

```bash
# Backend logs
cd backend
npm run logs

# Docker logs
docker-compose logs -f backend
```

### Health Check

```http
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2025-11-10T07:51:00.000Z",
  "uptime": 12345,
  "database": "connected"
}
```

## Performance Optimization

1. **Frontend**
   - Code splitting implemented
   - Lazy loading for routes
   - Image optimization with WebP
   - CDN for static assets

2. **Backend**
   - Redis caching for products and cart
   - Database query optimization with indexes
   - Response compression (gzip)
   - Connection pooling

3. **Database**
   - Indexes on frequently queried fields
   - Aggregation pipelines optimized
   - TTL indexes for cart expiration

## Security

### Implemented Security Measures

1. **Authentication**: JWT with HTTP-only cookies
2. **Authorization**: Role-based access control
3. **Input Validation**: Zod schema validation
4. **Rate Limiting**: Express rate limiter
5. **CORS**: Configured for specific origins
6. **Helmet**: Security headers
7. **Password Hashing**: Bcrypt with 12 rounds
8. **SQL/NoSQL Injection**: Mongoose sanitization
9. **XSS Protection**: Input sanitization

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check MongoDB URI in `.env`
   - Verify network access in MongoDB Atlas
   - Ensure IP is whitelisted

2. **Port Already in Use**
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   ```

3. **CORS Errors**
   - Verify `CORS_ORIGIN` in backend `.env`
   - Check frontend API base URL

4. **JWT Token Expired**
   - Implement token refresh logic
   - Check token expiration settings

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, contact: [your-email@example.com]

---

## Prompts Used for Generating Documentation and Code

### System Prompt for Technical Architecture

```
You are a Principal Staff Engineer with 15+ years of experience in building scalable, production-grade e-commerce platforms. Your expertise includes:

- Microservices architecture and distributed systems
- Full-stack development with React, Node.js, and MongoDB
- DevOps, CI/CD, and cloud infrastructure (AWS, Azure, GCP)
- Security best practices and compliance
- Performance optimization and scalability
- System design and technical leadership

Context: You are designing a production-ready e-commerce platform with the following requirements:
- Product browsing with filtering and search
- Product detail pages with rich information
- Shopping cart management with state persistence
- Clean, responsive UI
- Lightweight backend with Express.js
- MongoDB Atlas for database
- React.js for frontend with React Router
- State management for cart functionality

Task: Generate a comprehensive technical architecture document that includes:
1. High-level system architecture diagram (ASCII/Mermaid)
2. Database schema design with proper indexing strategy
3. API design with RESTful endpoints
4. Frontend component structure
5. Security measures and best practices
6. Performance optimization strategies
7. Scalability considerations
8. Deployment strategy
9. Monitoring and observability setup

Output Format:
- Markdown document with clear sections
- Include code snippets where relevant
- Provide rationale for architectural decisions
- Focus on production-grade implementation, not prototypes
```

### System Prompt for Backend Code Generation

```
You are a Senior Backend Engineer specializing in Node.js/Express and MongoDB. Generate production-grade backend code for an e-commerce API with:

Requirements:
- TypeScript for type safety
- Express.js framework
- MongoDB with Mongoose ODM
- JWT authentication with refresh tokens
- Comprehensive error handling
- Request validation with Zod
- Security middleware (Helmet, CORS, rate limiting)
- Winston logging
- RESTful API design
- Proper separation of concerns (controllers, services, models)

Endpoints to implement:
1. Auth: register, login, logout, refresh token
2. Products: CRUD operations with filtering, sorting, pagination
3. Cart: get, add item, update item, remove item, clear
4. Orders: create, list, get details

Code requirements:
- Follow SOLID principles
- Implement repository pattern
- Add JSDoc comments
- Include input validation
- Handle edge cases
- Production-ready error handling
- Environment-based configuration
- Database connection pooling
- Graceful shutdown

Generate:
1. Complete Express server setup
2. All route handlers
3. Mongoose models with schemas
4. Middleware (auth, error handling, validation)
5. Utility functions
6. Configuration management
```

### System Prompt for Frontend Code Generation

```
You are a Senior Frontend Engineer specializing in React and TypeScript. Generate production-grade frontend code for an e-commerce platform with:

Requirements:
- React 18 with TypeScript
- React Router v6 for navigation
- Tailwind CSS for styling
- Context API for state management (auth, cart)
- Axios for API calls with interceptors
- React Hook Form + Zod for form validation
- Responsive, mobile-first design
- Lazy loading and code splitting
- Error boundaries
- Loading states and skeletons
- Accessibility (ARIA labels)

Pages to implement:
1. Home - Product grid with featured items
2. Product List - Filtering, sorting, pagination
3. Product Detail - Image gallery, add to cart, reviews
4. Cart - Item management, quantity updates, summary
5. Checkout - Shipping info, payment (placeholder)
6. Login/Register

Components to create:
- Layout components (Header, Footer, Sidebar)
- Product components (Card, Grid, Details, Filter)
- Cart components (Item, Summary, Drawer)
- Common components (Button, Input, Modal, Loader)
- Form components with validation

Code requirements:
- Follow React best practices
- Use custom hooks for reusability
- Implement proper TypeScript types
- Add PropTypes/TypeScript interfaces
- Optimize re-renders with memo
- Implement error handling
- Add loading states
- Include accessibility features
- Mobile-first responsive design

Generate:
1. Complete React app structure
2. All page components
3. Reusable components
4. Context providers
5. API service layer
6. Custom hooks
7. Utility functions
8. Type definitions
```

### Prompt for Docker Configuration

```
Generate production-ready Docker configuration for a full-stack e-commerce application:

Services needed:
1. Frontend (React/Vite)
2. Backend (Node.js/Express)
3. MongoDB
4. Redis
5. Nginx (reverse proxy)

Requirements:
- Multi-stage builds for optimization
- Development and production configurations
- Health checks for all services
- Volume mounts for persistence
- Network isolation
- Environment variable management
- Proper service dependencies
- Resource limits

Generate:
1. Dockerfile for frontend (multi-stage)
2. Dockerfile for backend (multi-stage)
3. docker-compose.yml for development
4. docker-compose.prod.yml for production
5. .dockerignore files
6. Nginx configuration
```

---

**Note**: This is a production-grade implementation. Ensure all environment variables are properly configured before deployment. Never commit `.env` files to version control.
