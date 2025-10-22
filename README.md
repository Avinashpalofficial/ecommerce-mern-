# MERN E-Commerce Application

A full-stack e-commerce application built with MongoDB, Express.js, React.js, and Node.js.

## Features

- User authentication (Register/Login)
- Product catalog with search and filter
- Shopping cart
- Order management
- Payment integration
- Admin dashboard
- Product reviews and ratings

## Tech Stack

**Frontend:**
- React.js
- Redux (State Management)
- Axios
- React Router

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/ecommerce-mern.git
cd ecommerce-mern
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Create config.env file in backend/config folder
```
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
```

4. Run backend server
```bash
npm run dev
```

### Frontend Setup

1. Install frontend dependencies
```bash
cd frontend
npm install
```

2. Create .env file in frontend folder
```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

3. Run frontend
```bash
npm start
```

## API Endpoints

### User Routes
- POST `/api/v1/users/register` - Register new user
- POST `/api/v1/users/login` - Login user
- GET `/api/v1/users/logout` - Logout user

### Product Routes
- GET `/api/v1/products` - Get all products
- GET `/api/v1/products/:id` - Get single product
- POST `/api/v1/admin/products/new` - Create product (Admin)

### Order Routes
- POST `/api/v1/orders/new` - Create new order
- GET `/api/v1/orders/me` - Get logged in user orders

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

Your Name - [Your GitHub Profile](https://github.com/your-username)