# Express MongoDB Jobs API

A RESTful API for managing job listings built with Express.js and MongoDB.

## Features

- Create, read, update, and delete job listings
- User authentication and authorization
- MongoDB database integration
- RESTful API endpoints

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd express-mongo-jobs-api
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in the root directory
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Jobs
- `GET /api/v1/jobs` - Get all jobs
- `POST /api/v1/jobs` - Create a new job
- `GET /api/v1/jobs/:id` - Get a specific job
- `PATCH /api/v1/jobs/:id` - Update a job
- `DELETE /api/v1/jobs/:id` - Delete a job

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

## License

MIT
