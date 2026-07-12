# comming soon --
1. profile picture
2. profile edit
3. group creation
4. file sharing
5. voice call
6. video call


# Chat Application - Complete API Documentation

A real-time chat application built with **FastAPI** (backend) and **React** (frontend), featuring user authentication via JWT tokens and WebSocket-based real-time messaging.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [API Routes Documentation](#api-routes-documentation)
  - [Authentication Routes](#authentication-routes)
  - [WebSocket Routes](#websocket-routes)
  - [Test Routes](#test-routes)
- [Usage Examples](#usage-examples)
  - [REST API Examples](#rest-api-examples)
  - [WebSocket Examples](#websocket-examples)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Security & Authentication](#security--authentication)
- [Step-by-Step Usage Instructions](#step-by-step-usage-instructions)
- [Building the Frontend](#building-the-frontend)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This is a **full-stack real-time messaging application** that allows users to:

- **Register** with a username and password
- **Login** and receive JWT authentication tokens
- **Establish WebSocket connections** for real-time chat
- **Send and receive messages** instantly with other connected users

The application uses **FastAPI** for high-performance asynchronous backend operations and **SQLAlchemy** as the ORM for database management.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.139.0
- **Database**: SQLite with SQLAlchemy 2.0.51
- **Authentication**: JWT (PyJWT 2.13.0) with password hashing (pwdlib 0.3.0)
- **WebSocket**: websockets 16.0
- **Server**: Uvicorn 0.51.0
- **Language**: Python 3.8+

### Frontend
- **Framework**: React 19.2.7
- **Build Tool**: Vite 8.1.1
- **Styling**: CSS
- **HTTP Client**: Fetch API

### Additional Libraries
- **python-dotenv**: Environment variable management
- **python-multipart**: Form data parsing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8** or higher ([Download](https://www.python.org/downloads/))
- **Node.js 16** or higher ([Download](https://nodejs.org/))
- **pip** (Python package manager - comes with Python)
- **npm** (Node package manager - comes with Node.js)
- **Git** (for version control)

Verify installations:
```bash
python --version  # Should show Python 3.8+
node --version    # Should show Node 16+
npm --version     # Should show npm 7+
```

---

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Chatapp.worktrees
```

### Step 2: Set Up Backend (Python)

#### 2.1 Navigate to the server directory
```bash
cd server
```

#### 2.2 Create a virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python -m venv venv
source venv/bin/activate
```

#### 2.3 Install dependencies
```bash
pip install -r requirements.txt
```

#### 2.4 Configure environment variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
# Set DB_URL (see Environment Configuration section)
```

#### 2.5 Run database migrations
```bash
# The database tables will be created automatically when you start the server
# If you need to reset the database, delete mydatabase.db and restart the server
```

#### 2.6 Start the backend server
```bash
# Development mode (with auto-reload)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Alternative using FastAPI CLI
fastapi run main.py --port 8000
```

**Expected output:**
```
INFO:     Application startup complete
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Step 3: Set Up Frontend (React)

#### 3.1 In a new terminal, navigate to the client directory
```bash
cd client
```

#### 3.2 Install dependencies
```bash
npm install
```

#### 3.3 Start the development server
```bash
npm run dev
```

**Expected output:**
```
VITE v8.x.x  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

The application is now ready to use!

---

## ⚙️ Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
# Database Configuration
# SQLite (default) - stores data in mydatabase.db
DB_URL=sqlite:///./mydatabase.db

# PostgreSQL example (if you want to use PostgreSQL)
# DB_URL=postgresql://username:password@localhost/chatapp_db

# JWT Secret Configuration (IMPORTANT: Change in production)
# Stored in: src/auth/auth.py
# SECRET_KEY=ssjspkvic@gmail.comemail  # Change this to a secure random string

# Access Token Expiration (in minutes)
# ACCESS_TOKEN_EXPIRE_MINUTES=600  # 10 hours
```

**Important Security Notes:**
- ⚠️ **Never commit `.env` files to git** - they contain sensitive data
- 🔐 Change `SECRET_KEY` to a strong random string in production
- 🔐 Use strong database passwords in production
- 🔐 Use HTTPS in production environments

---

## 📚 API Routes Documentation

### Base URLs
- **Backend API**: `http://localhost:8000`
- **WebSocket**: `ws://localhost:8000`

---

### Authentication Routes

#### 1. **Register New User**

**Endpoint**: `POST /auth/register`

**Purpose**: Create a new user account with username and password

**Request Headers**:
```
Content-Type: application/x-www-form-urlencoded
```

**Request Body** (Form Data):
```
username=john_doe
password=securePassword123
```

**Example with cURL**:
```bash
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john_doe&password=securePassword123"
```

**Example with JavaScript/Fetch**:
```javascript
const formData = new FormData();
formData.append('username', 'john_doe');
formData.append('password', 'securePassword123');

const response = await fetch('http://localhost:8000/auth/register', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data);
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "username": "john_doe",
  "password": "$hashed_password_here"
}
```

**Error Responses**:

- **409 Conflict** - Username already taken:
```json
{
  "detail": "Username already taken"
}
```

---

#### 2. **Login User**

**Endpoint**: `POST /auth/login`

**Purpose**: Authenticate user and receive JWT access token

**Request Headers**:
```
Content-Type: application/x-www-form-urlencoded
```

**Request Body** (Form Data):
```
username=john_doe
password=securePassword123
```

**Example with cURL**:
```bash
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john_doe&password=securePassword123"
```

**Example with JavaScript/Fetch**:
```javascript
const formData = new FormData();
formData.append('username', 'john_doe');
formData.append('password', 'securePassword123');

const response = await fetch('http://localhost:8000/auth/login', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data);
// Output: { "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...", "token_type": "bearer" }

// Store token for future requests
localStorage.setItem('authToken', data.access_token);
```

**Success Response (200 OK)**:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb2huX2RvZSIsImV4cCI6MTcyODcyNDQ0Mn0.xyz...",
  "token_type": "bearer"
}
```

**Error Responses**:

- **404 Not Found** - User doesn't exist:
```json
{
  "detail": "User not found"
}
```

- **401 Unauthorized** - Incorrect password:
```json
{
  "detail": "Wrong password"
}
```

---

#### 3. **Get Current User (Test Endpoint)**

**Endpoint**: `GET /auth/test`

**Purpose**: Retrieve information about the authenticated user (requires valid JWT token)

**Request Headers**:
```
Authorization: Bearer <your_jwt_token>
```

**Example with cURL**:
```bash
curl -X GET "http://localhost:8000/auth/test" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

**Example with JavaScript/Fetch**:
```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('http://localhost:8000/auth/test', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const user = await response.json();
console.log(user);
```

**Success Response (200 OK)**:
```json
{
  "id": 1,
  "username": "john_doe",
  "password": "$hashed_password"
}
```

**Error Responses**:

- **401 Unauthorized** - Missing or invalid token:
```json
{
  "detail": "Not authenticated"
}
```

- **401 Unauthorized** - Token expired:
```json
{
  "detail": "Token has expired"
}
```

---

### WebSocket Routes

#### **Real-Time Messaging Connection**

**Endpoint**: `GET /ws`

**WebSocket URL**: `ws://localhost:8000/ws?from=<sender_id>&to=<recipient_id>`

**Purpose**: Establish a persistent WebSocket connection for real-time messaging between two users

**Query Parameters**:
- `from` (required): The ID of the user sending the message
- `to` (required): The ID of the user receiving the message

**Connection Flow**:
1. User must be registered and their `id` must be known
2. Establish WebSocket connection with `from` and `to` parameters
3. Send text messages through the connection
4. Receive JSON messages from other users

---

#### **WebSocket Message Format**

**Outgoing Message** (sent by client):
```
Plain text string
Example: "Hello, how are you?"
```

**Incoming Message** (received by client):
```json
{
  "sender_id": 1,
  "message": "Hello, how are you?"
}
```

---

#### **WebSocket Examples**

**Example with JavaScript (Browser)**:
```javascript
// Establish WebSocket connection
// User 1 (ID: 1) connecting to User 2 (ID: 2)
const ws = new WebSocket('ws://localhost:8000/ws?from=1&to=2');

// Connection opened
ws.onopen = function(event) {
  console.log('Connected to WebSocket');
  ws.send('Hello from User 1!');
};

// Receive messages
ws.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log(`Message from User ${data.sender_id}: ${data.message}`);
  
  // Display in UI
  const messageDiv = document.createElement('div');
  messageDiv.textContent = `${data.sender_id}: ${data.message}`;
  document.getElementById('messages').appendChild(messageDiv);
};

// Connection closed
ws.onclose = function(event) {
  console.log('Disconnected from WebSocket');
};

// Error handling
ws.onerror = function(error) {
  console.error('WebSocket error:', error);
};

// Send a message
function sendMessage(text) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(text);
  }
}
```

**Example with Python (Client)**:
```python
import asyncio
import websockets
import json

async def chat_client():
    # User 1 connecting to User 2
    async with websockets.connect('ws://localhost:8000/ws?from=1&to=2') as websocket:
        # Send a message
        await websocket.send('Hello from User 1')
        
        # Receive a message
        response = await websocket.recv()
        message_data = json.loads(response)
        print(f"Received from {message_data['sender_id']}: {message_data['message']}")

# Run the client
asyncio.run(chat_client())
```

**Example with Node.js**:
```javascript
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8000/ws?from=1&to=2');

ws.on('open', function() {
  console.log('Connected');
  ws.send('Hello from User 1');
});

ws.on('message', function(data) {
  const message = JSON.parse(data);
  console.log(`User ${message.sender_id}: ${message.message}`);
});

ws.on('close', function() {
  console.log('Disconnected');
});

ws.on('error', function(error) {
  console.error('Error:', error);
});
```

---

#### **WebSocket Error Handling**

**Connection Fails - User Not Found (401 Unauthorized)**:
```
Connection closed with code 1008
Message: "User with ID {user_id} is not registered"
```

**Solution**: Ensure both users are registered before establishing the connection.

```javascript
// Verify users exist first
const user1 = await fetch('http://localhost:8000/auth/test', {
  headers: { 'Authorization': `Bearer ${token1}` }
});

const user2 = await fetch('http://localhost:8000/auth/test', {
  headers: { 'Authorization': `Bearer ${token2}` }
});

// Only proceed if both users exist
if (user1.ok && user2.ok) {
  const ws = new WebSocket('ws://localhost:8000/ws?from=1&to=2');
}
```

---

### Test Routes

#### **Simple API Test**

**Endpoint**: `GET /test`

**Purpose**: Verify the API is running

**Example with cURL**:
```bash
curl -X GET "http://localhost:8000/test"
```

**Success Response (200 OK)**:
```json
{
  "new_user": "you"
}
```

---

#### **Database Connection Test**

**Endpoint**: `GET /test/db`

**Purpose**: Test database connection by creating a test user (for development only)

**Example with cURL**:
```bash
curl -X GET "http://localhost:8000/test/db"
```

**Success Response (200 OK)**:
```json
{
  "id": 2,
  "username": "Saurabh",
  "password": "$hashed_password"
}
```

⚠️ **Warning**: This endpoint creates a test user each time it's called. Use only for development/debugging.

---

## 📖 Usage Examples

### Complete Workflow Example

#### Step 1: Register Two Users

```bash
# Create User 1
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=alice&password=pass123"

# Create User 2
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=bob&password=pass456"
```

#### Step 2: Login Both Users

```bash
# Login as Alice
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=alice&password=pass123"

# Response: { "access_token": "token_alice", "token_type": "bearer" }

# Login as Bob
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=bob&password=pass456"

# Response: { "access_token": "token_bob", "token_type": "bearer" }
```

#### Step 3: Connect to WebSocket

Open two browser windows or terminals:

**Window 1 - Alice (User ID: 1) to Bob (User ID: 2)**:
```javascript
const ws1 = new WebSocket('ws://localhost:8000/ws?from=1&to=2');

ws1.onopen = () => {
  console.log('Alice connected');
  ws1.send('Hi Bob, this is Alice!');
};

ws1.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(`Bob says: ${data.message}`);
};
```

**Window 2 - Bob (User ID: 2) to Alice (User ID: 1)**:
```javascript
const ws2 = new WebSocket('ws://localhost:8000/ws?from=2&to=1');

ws2.onopen = () => {
  console.log('Bob connected');
};

ws2.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(`Alice says: ${data.message}`);
  
  // Reply to Alice
  ws2.send('Hi Alice, nice to hear from you!');
};
```

---

### REST API Examples

#### Using Postman

1. **Import into Postman**:
   - Import the collection from: [Postman Collection Link]
   - Or manually create the following requests:

2. **Register Request**:
   - Method: `POST`
   - URL: `http://localhost:8000/auth/register`
   - Body (form-data):
     - Key: `username`, Value: `testuser`
     - Key: `password`, Value: `testpass123`

3. **Login Request**:
   - Method: `POST`
   - URL: `http://localhost:8000/auth/login`
   - Body (form-data):
     - Key: `username`, Value: `testuser`
     - Key: `password`, Value: `testpass123`
   - Save the `access_token` from response

4. **Auth Test Request**:
   - Method: `GET`
   - URL: `http://localhost:8000/auth/test`
   - Headers:
     - Key: `Authorization`, Value: `Bearer {access_token}`

---

### WebSocket Examples

#### Using WebSocket Client Tools

**Option 1: Browser Console**
```javascript
// Open DevTools (F12) in any browser tab, then:
const ws = new WebSocket('ws://localhost:8000/ws?from=1&to=2');
ws.onopen = () => console.log('Connected');
ws.onmessage = (event) => console.log('Message:', event.data);
ws.send('Test message');
```

**Option 2: Online WebSocket Client**
- Visit: https://www.websocket.org/echo.html
- Change URL to: `ws://localhost:8000/ws?from=1&to=2`
- Click "Connect"
- Send messages using the text field

**Option 3: Install ws CLI**
```bash
npm install -g wscat

# Connect to WebSocket
wscat -c "ws://localhost:8000/ws?from=1&to=2"

# Type messages and send
> Hello, this is a test message
```

---

## 📁 Project Structure

```
Chatapp.worktrees/
│
├── server/                          # FastAPI Backend
│   ├── main.py                      # Application entry point
│   ├── requirements.txt             # Python dependencies
│   ├── mydatabase.db               # SQLite database file
│   ├── .env.example                # Environment variables template
│   └── src/
│       ├── auth/
│       │   └── auth.py             # Authentication logic (JWT, passwords)
│       │
│       ├── database/
│       │   ├── model.py            # Database models (User)
│       │   └── setup.py            # Database connection setup
│       │
│       ├── routes/
│       │   ├── auth_route.py       # Login/Register endpoints
│       │   ├── websocket_route.py  # WebSocket endpoint
│       │   └── websocket_config.py # WebSocket connection manager
│       │
│       └── schema/
│           └── user.py             # Pydantic models (response schemas)
│
└── client/                          # React Frontend
    ├── package.json                # Node dependencies
    ├── index.html                  # HTML entry point
    ├── vite.config.js              # Vite configuration
    └── src/
        ├── App.jsx                 # Main React component
        ├── main.jsx                # React entry point
        └── components/             # React components
```

---

## 💾 Database Schema

### Users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);
```

**Fields**:
- `id`: Unique user identifier (auto-increment)
- `username`: User's login name (unique)
- `password`: Hashed password (never stored in plain text)

**Sample Data**:
```
| id | username | password                                           |
|----|----------|-----------------------------------------------------|
| 1  | alice    | $argon2id$v=19$m=65540,t=3,p=4$...$... (hashed)  |
| 2  | bob      | $argon2id$v=19$m=65540,t=3,p=4$...$... (hashed)  |
```

---

## 🔐 Security & Authentication

### JWT Token Details

- **Type**: Bearer token
- **Algorithm**: HS256 (HMAC SHA256)
- **Expiration**: 600 minutes (10 hours)
- **Secret Key**: Stored in `src/auth/auth.py` (⚠️ Change in production)

### Token Structure

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.
eyJzdWIiOiJqb2huX2RvZSIsImV4cCI6MTcyODcyNDQ0Mn0.
abc123...
```

**Header** (decoded):
```json
{
  "typ": "JWT",
  "alg": "HS256"
}
```

**Payload** (decoded):
```json
{
  "sub": "john_doe",
  "exp": 1728724442
}
```

### Password Hashing

- **Algorithm**: Argon2id (recommended by OWASP)
- **Library**: pwdlib 0.3.0
- **Process**: Passwords are automatically hashed before storage

### Security Best Practices

✅ **Do:**
- Change `SECRET_KEY` to a strong random string in production
- Use HTTPS/WSS in production environments
- Never commit `.env` files to version control
- Implement rate limiting on login endpoints
- Add CORS restrictions in production
- Validate all user inputs
- Use environment variables for sensitive data

❌ **Don't:**
- Use default/example SECRET_KEY in production
- Transmit tokens over unencrypted HTTP
- Commit credentials to git
- Use weak passwords
- Expose database details in error messages

---

## 📖 Step-by-Step Usage Instructions

### Quick Start Guide (First Time Setup)

#### Complete Setup in 5 Minutes

##### **1. Backend Setup**

```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file with database configuration
# Windows PowerShell:
echo "DB_URL=sqlite:///./mydatabase.db" | Out-File -Encoding UTF8 .env
# macOS/Linux:
echo "DB_URL=sqlite:///./mydatabase.db" > .env

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

✅ **Server is ready!** Keep this terminal running.

---

##### **2. Frontend Setup (New Terminal Window)**

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
VITE v8.x.x  ready in 123 ms

➜  Local:   http://localhost:5173/
```

✅ **Frontend is ready!** Open http://localhost:5173 in your browser.

---

### Complete User Flow Example

#### **Scenario**: Two users (Alice and Bob) want to chat

##### **Step 1: Register Users**

**Option A - Using Browser Console**:

Open browser DevTools (F12) on `http://localhost:5173` and run:

```javascript
// Register Alice
async function registerAlice() {
  const formData = new FormData();
  formData.append('username', 'alice');
  formData.append('password', 'alice123');
  
  const response = await fetch('http://localhost:8000/auth/register', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  console.log('Alice registered:', data);
  localStorage.setItem('alice_id', data.id);
  return data;
}

registerAlice();
```

```javascript
// Register Bob
async function registerBob() {
  const formData = new FormData();
  formData.append('username', 'bob');
  formData.append('password', 'bob123');
  
  const response = await fetch('http://localhost:8000/auth/register', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  console.log('Bob registered:', data);
  localStorage.setItem('bob_id', data.id);
  return data;
}

registerBob();
```

**Option B - Using cURL**:

```bash
# Register Alice
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=alice&password=alice123"

# Register Bob
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=bob&password=bob123"
```

**Sample Response:**
```json
{
  "id": 1,
  "username": "alice",
  "password": "$argon2id$v=19$...$..."
}
```

✅ **Remember the IDs**: Alice = 1, Bob = 2

---

##### **Step 2: Login Users**

**Option A - Using Browser Console**:

```javascript
// Login Alice and store token
async function loginAlice() {
  const formData = new FormData();
  formData.append('username', 'alice');
  formData.append('password', 'alice123');
  
  const response = await fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  console.log('Alice logged in:', data);
  localStorage.setItem('alice_token', data.access_token);
  return data.access_token;
}

const alice_token = await loginAlice();
```

```javascript
// Login Bob and store token
async function loginBob() {
  const formData = new FormData();
  formData.append('username', 'bob');
  formData.append('password', 'bob123');
  
  const response = await fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  console.log('Bob logged in:', data);
  localStorage.setItem('bob_token', data.access_token);
  return data.access_token;
}

const bob_token = await loginBob();
```

**Option B - Using cURL**:

```bash
# Login Alice
ALICE_TOKEN=$(curl -s -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=alice&password=alice123" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

echo "Alice Token: $ALICE_TOKEN"

# Login Bob
BOB_TOKEN=$(curl -s -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=bob&password=bob123" | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

echo "Bob Token: $BOB_TOKEN"
```

**Sample Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbGljZSIsImV4cCI6...",
  "token_type": "bearer"
}
```

✅ **Tokens are ready!** Now we can use them for authentication.

---

##### **Step 3: Establish WebSocket Connection**

Open **two browser tabs** side by side and run these separately:

**Tab 1 - Alice's Chat (ID: 1 chatting with ID: 2)**:

```javascript
// Alice connects to Bob
const ws_alice = new WebSocket('ws://localhost:8000/ws?from=1&to=2');

ws_alice.onopen = function(event) {
  console.log('✓ Alice connected to Bob');
  ws_alice.send('Hi Bob! This is Alice. Can you hear me?');
};

ws_alice.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log(`📨 Bob says: ${data.message}`);
};

ws_alice.onclose = function(event) {
  console.log('✗ Alice disconnected');
};

ws_alice.onerror = function(error) {
  console.error('✗ Connection error:', error);
};

// Function to send messages from Alice
function alice_send(message) {
  if (ws_alice.readyState === WebSocket.OPEN) {
    ws_alice.send(message);
    console.log(`📤 Alice sends: ${message}`);
  } else {
    console.log('✗ Connection is not open');
  }
}
```

**Tab 2 - Bob's Chat (ID: 2 chatting with ID: 1)**:

```javascript
// Bob connects to Alice
const ws_bob = new WebSocket('ws://localhost:8000/ws?from=2&to=1');

ws_bob.onopen = function(event) {
  console.log('✓ Bob connected to Alice');
};

ws_bob.onmessage = function(event) {
  const data = JSON.parse(event.data);
  console.log(`📨 Alice says: ${data.message}`);
};

ws_bob.onclose = function(event) {
  console.log('✗ Bob disconnected');
};

ws_bob.onerror = function(error) {
  console.error('✗ Connection error:', error);
};

// Function to send messages from Bob
function bob_send(message) {
  if (ws_bob.readyState === WebSocket.OPEN) {
    ws_bob.send(message);
    console.log(`📤 Bob sends: ${message}`);
  } else {
    console.log('✗ Connection is not open');
  }
}
```

---

##### **Step 4: Send and Receive Messages**

Now you can send messages between the two connections:

**From Tab 1 (Alice's Console)**:
```javascript
alice_send('Hello Bob! How are you?');
alice_send('Are you there?');
```

**From Tab 2 (Bob's Console)**:
```javascript
bob_send('Hi Alice! I am doing great!');
bob_send('Yes, I can see your messages!');
```

**Watch the Console Output:**
```
Tab 1 Output:
✓ Alice connected to Bob
📤 Alice sends: Hello Bob! How are you?
📨 Bob says: Hi Alice! I am doing great!
📤 Alice sends: Are you there?
📨 Bob says: Yes, I can see your messages!

Tab 2 Output:
✓ Bob connected to Alice
📨 Alice says: Hello Bob! How are you?
📤 Bob sends: Hi Alice! I am doing great!
📨 Alice says: Are you there?
📤 Bob sends: Yes, I can see your messages!
```

✅ **Real-time messaging is working!**

---

### Common Usage Patterns

#### **Pattern 1: Single User Registration**

```javascript
async function quickRegister(username, password) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const response = await fetch('http://localhost:8000/auth/register', {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('Registration failed:', error.detail);
    return null;
  }
  
  const user = await response.json();
  console.log(`✓ User registered: ${user.username} (ID: ${user.id})`);
  return user;
}

// Usage
const alice = await quickRegister('alice', 'securepass123');
```

#### **Pattern 2: Automatic Login and Token Storage**

```javascript
async function loginAndStore(username, password) {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const response = await fetch('http://localhost:8000/auth/login', {
    method: 'POST',
    body: formData
  });
  
  const data = await response.json();
  
  // Store both token and username
  localStorage.setItem(`token_${username}`, data.access_token);
  localStorage.setItem(`username`, username);
  
  console.log(`✓ ${username} logged in successfully`);
  return data.access_token;
}

// Usage
const token = await loginAndStore('alice', 'securepass123');
console.log('Token saved to localStorage');
```

#### **Pattern 3: Protected API Request with Token**

```javascript
async function getAuthenticatedUser(token) {
  const response = await fetch('http://localhost:8000/auth/test', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    console.error('Authentication failed:', await response.json());
    return null;
  }
  
  const user = await response.json();
  console.log('Current user:', user);
  return user;
}

// Usage
const token = localStorage.getItem('token_alice');
const user = await getAuthenticatedUser(token);
```

#### **Pattern 4: Reconnect WebSocket on Disconnect**

```javascript
class ChatConnection {
  constructor(userId, targetUserId, reconnectInterval = 3000) {
    this.userId = userId;
    this.targetUserId = targetUserId;
    this.ws = null;
    this.reconnectInterval = reconnectInterval;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }
  
  connect() {
    try {
      this.ws = new WebSocket(
        `ws://localhost:8000/ws?from=${this.userId}&to=${this.targetUserId}`
      );
      
      this.ws.onopen = () => {
        console.log(`✓ User ${this.userId} connected`);
        this.reconnectAttempts = 0;
      };
      
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(`📨 Message from ${data.sender_id}: ${data.message}`);
        this.onMessageReceived(data);
      };
      
      this.ws.onclose = () => {
        console.log(`✗ User ${this.userId} disconnected`);
        this.attemptReconnect();
      };
      
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Connection failed:', error);
      this.attemptReconnect();
    }
  }
  
  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Reconnecting... (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      setTimeout(() => this.connect(), this.reconnectInterval);
    } else {
      console.error('✗ Max reconnection attempts reached');
    }
  }
  
  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
  }
  
  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
  
  onMessageReceived(data) {
    // Override this method in subclass
  }
}

// Usage
const chat = new ChatConnection(1, 2);
chat.connect();
chat.send('Hello!');
```

---

## 🏗️ Building the Frontend

### Development Build

The frontend is configured with **Vite** for fast development experience.

#### **Development Server**

```bash
cd client
npm run dev
```

Features:
- Hot Module Replacement (HMR) - instant code updates
- Fast refresh - preserves component state
- Development console for debugging
- Automatic browser open

**Output:**
```
VITE v8.1.1  ready in 287 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

Open http://localhost:5173 in your browser to see the app.

---

### Production Build

Optimize your React app for deployment:

#### **Step 1: Build the Application**

```bash
cd client
npm run build
```

**Expected Output:**
```
vite v8.1.1 building for production...
✓ 147 modules transformed.
dist/index.html                   0.46 kB │ gzip: 0.23 kB
dist/assets/index-abc123.js     245.67 kB │ gzip: 78.52 kB
dist/assets/index-def456.css     12.34 kB │ gzip: 3.45 kB

✓ built in 12.45s
```

**Output Folder**: `client/dist/`

---

#### **Step 2: Verify the Build**

```bash
# Preview the production build locally
npm run preview
```

**Output:**
```
  ➜  Local:   http://localhost:4173/
```

Visit http://localhost:4173 to test the production build.

---

### Build Configuration Details

#### **Vite Configuration** (`client/vite.config.js`):

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,  // Set to true for debugging
    minify: 'terser'
  }
})
```

**Key Settings**:
- **Port**: 5173 (development)
- **Output**: `dist/` directory
- **Minification**: Enabled for production
- **Sourcemap**: Disabled (change to true for production debugging)

---

### Frontend Optimization Tips

#### **1. Code Splitting**

```javascript
// Lazy load components
import { lazy, Suspense } from 'react';

const ChatWindow = lazy(() => import('./components/ChatWindow'));

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatWindow />
    </Suspense>
  );
}
```

#### **2. Environment Variables**

Create `client/.env` and `client/.env.production`:

```env
# .env (development)
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000

# .env.production (production)
VITE_API_URL=https://api.example.com
VITE_WS_URL=wss://api.example.com
```

**Usage in React:**
```javascript
const API_URL = import.meta.env.VITE_API_URL;
const WS_URL = import.meta.env.VITE_WS_URL;
```

#### **3. ESLint and Code Quality**

```bash
# Run linter
npm run lint

# Fix issues automatically
npx eslint . --fix
```

---

### Deployment Options

#### **Option 1: Vercel (Recommended for React)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd client
vercel
```

#### **Option 2: Netlify**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd client
netlify deploy --prod --dir=dist
```

#### **Option 3: GitHub Pages**

```bash
# Update vite.config.js
export default {
  base: '/repository-name/',
  // ... rest of config
}

# Build
npm run build

# Deploy using gh-pages
npm install --save-dev gh-pages
npx gh-pages -d dist
```

#### **Option 4: Docker Containerization**

Create `client/Dockerfile`:

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

**Build and run:**
```bash
docker build -t chatapp-client .
docker run -p 3000:3000 chatapp-client
```

---

### Troubleshooting Frontend Build

#### **Issue: "Module not found" error**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **Issue: Vite port already in use**

```bash
# Use custom port
npm run dev -- --port 3000
```

#### **Issue: Build size is too large**

```bash
# Analyze bundle size
npm install --save-dev vite-plugin-visualizer

# Update vite.config.js
import { visualizer } from 'vite-plugin-visualizer';

export default {
  plugins: [visualizer()]
}

# Run build and open stats.html
npm run build
```

#### **Issue: CSS not loading in production**

Make sure all CSS imports use `.css` extension:
```javascript
// Correct
import './styles.css'

// Incorrect
import './styles'
```

---

## 🐛 Troubleshooting

### Backend Issues

#### Error: "DB_URL environment variable is not set"
**Solution**:
```bash
# Create .env file in server directory
echo "DB_URL=sqlite:///./mydatabase.db" > .env

# Or for PostgreSQL
echo "DB_URL=postgresql://user:password@localhost/chatapp_db" > .env
```

#### Error: "Port 8000 is already in use"
**Solution**:
```bash
# Use a different port
uvicorn main:app --reload --port 8001

# Or find and kill the process using port 8000
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :8000
kill -9 <PID>
```

#### Error: "Module 'main' not found"
**Solution**:
```bash
# Ensure you're in the server directory
cd server

# Install dependencies
pip install -r requirements.txt

# Run from the correct directory
uvicorn main:app --reload
```

#### Database Locked Error
**Solution**:
```bash
# Delete the database and let it recreate
rm mydatabase.db

# Restart the server
uvicorn main:app --reload
```

---

### Frontend Issues

#### Error: "Cannot find module 'react'"
**Solution**:
```bash
cd client
npm install
npm run dev
```

#### WebSocket Connection Fails
**Solution**:
1. Verify both users exist in the database
2. Check user IDs are correct in the query parameters
3. Ensure backend is running on port 8000
4. Check browser console for detailed error messages
5. Verify firewall isn't blocking WebSocket connections

**Debug WebSocket**:
```javascript
const ws = new WebSocket('ws://localhost:8000/ws?from=1&to=2');

ws.addEventListener('open', () => console.log('✓ Connected'));
ws.addEventListener('close', () => console.log('✗ Disconnected'));
ws.addEventListener('error', (error) => console.error('✗ Error:', error));
```

#### CORS Error
**Error**: "Access to XMLHttpRequest has been blocked by CORS policy"

**Solution**: Add CORS middleware to `main.py`:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### Common Issues & Solutions

| Issue | Symptom | Solution |
|-------|---------|----------|
| **Invalid Token** | 401 Unauthorized on `/auth/test` | Login again to get a fresh token |
| **User Not Found** | 404 on login | Register the user first with `/auth/register` |
| **Username Taken** | 409 Conflict on register | Use a different username |
| **WebSocket Won't Connect** | Connection refused | Ensure backend is running and firewall allows WebSocket |
| **Messages Not Received** | Sent but no response | Verify both users are connected and IDs are correct |
| **Password Not Working** | 401 on login | Ensure you're using the correct password (case-sensitive) |

---

## 📝 API Response Codes Reference

| Code | Status | Meaning |
|------|--------|---------|
| **200** | OK | Request successful |
| **201** | Created | Resource created successfully |
| **400** | Bad Request | Invalid request parameters |
| **401** | Unauthorized | Missing or invalid authentication |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Resource already exists (e.g., username taken) |
| **500** | Server Error | Internal server error |
| **1000** | WebSocket Close | Normal closure |
| **1008** | WebSocket Close | Policy violation (user not found) |

---

## 🚀 Deployment

### Deploy to Production

**Backend (Uvicorn + Gunicorn)**:
```bash
# Install production dependencies
pip install gunicorn

# Run with production settings
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
```

**Frontend (Build & Deploy)**:
```bash
cd client
npm run build

# Static files are in dist/ directory
# Deploy to Vercel, Netlify, or any static hosting
```

**Environment Variables in Production**:
```env
# Use strong secrets
SECRET_KEY=your-very-long-random-string-min-32-chars
DB_URL=postgresql://prod_user:strong_password@prod-db-host:5432/chatapp_prod

# CORS settings
ALLOWED_ORIGINS=https://yourdomain.com

# WebSocket
WSS_URL=wss://yourdomain.com/ws
```

---

## 📞 Support & Contact

- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Start a discussion for questions
- **Documentation**: Full API docs at `http://localhost:8000/docs` (Swagger UI)
- **Alternative Docs**: `http://localhost:8000/redoc` (ReDoc)

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [WebSockets in FastAPI](https://fastapi.tiangolo.com/advanced/websockets/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [React Documentation](https://react.dev/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

---

**Last Updated**: July 2026
**Version**: 1.0.0
