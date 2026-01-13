# Swagger UI Setup - Jobs API (YAML-based)

## 🎉 Swagger UI Successfully Configured with Industry Standard!

### Access Swagger Documentation
Open your browser and navigate to:
```
http://localhost:5000/swagger_doc
```

## Architecture (Professional Standard)

```
├── swagger/
│   └── openapi.yaml          # Complete API documentation in YAML
├── routes/
│   ├── auth.js               # Clean routes, no comments!
│   └── jobs.js               # Clean routes, no comments!
└── swagger.js                # Loads YAML file
```

**Benefits:**
- ✅ Clean separation of concerns
- ✅ Routes files stay clean and readable
- ✅ Easy to maintain and scale
- ✅ Industry standard approach (like Laravel)
- ✅ Can be edited without touching code

## How to Update Documentation

**Simply edit:** `swagger/openapi.yaml`

No need to touch route files! Just restart the server after updating the YAML file.

## How to Use Swagger UI

### 1. **Register a New User**
- Click on `POST /api/v1/auth/register`
- Click "Try it out"
- Edit the request body:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Click "Execute"
- **Copy the token** from the response

### 2. **Authenticate for Protected Routes**
- Click the **"Authorize"** button (🔓 icon) at the top right
- In the popup, enter: `Bearer YOUR_TOKEN_HERE`
  - Example: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- Click "Authorize"
- Click "Close"

### 3. **Test Job APIs**
Now you can test all job endpoints:
- `GET /api/v1/jobs` - Get all your jobs
- `POST /api/v1/jobs` - Create a new job
- `GET /api/v1/jobs/{id}` - Get specific job
- `PATCH /api/v1/jobs/{id}` - Update a job
- `DELETE /api/v1/jobs/{id}` - Delete a job

## Example Job Creation
```json
{
  "company": "Google",
  "position": "Senior Software Engineer",
  "status": "pending"
}
```

## Available Status Values
- `pending`
- `interview`
- `declined`

## Tips
1. **Always authenticate first** for job routes
2. **Token expires in 30 days** - login again if expired
3. **Use the green "Authorize" button** to set your JWT token
4. **All job routes require authentication**

## Troubleshooting
- If you get 401 Unauthorized: Make sure you clicked "Authorize" and added the token
- Token format must be: `Bearer <your-token>`
- Token is case-sensitive

Enjoy testing your API! 🚀
