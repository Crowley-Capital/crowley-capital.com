# Crowley Capital Backend API

Simple Express.js backend for the Crowley Capital blog system.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file in the `backend` directory:

```bash
cp env.example .env
```

Edit `.env` and update your PostgreSQL connection:

```env
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/crowley_capital
PORT=3001
FRONTEND_URL=http://localhost:8080
```

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001`

---

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

### Settings

**Get Settings:**
```
GET /api/settings
```

**Save Settings:**
```
PUT /api/settings
Body: { topics: [], schedule: "0 9 * * 1", auto: false, model: "gpt-5-mini" }
```

### Articles

**Get All Articles:**
```
GET /api/articles?status=published&search=keyword&limit=100
```

**Get Single Article:**
```
GET /api/articles/:id
```

**Create Article:**
```
POST /api/articles
Body: { title, description, article, url, topic, featured, ... }
```

**Update Article:**
```
PUT /api/articles/:id
Body: { title, status, featured, ... }
```

**Delete Article:**
```
DELETE /api/articles/:id
```

---

## 🔧 Frontend Configuration

Update your frontend `.env` file to point to the backend:

```env
VITE_API_URL=http://localhost:3001/api
```

Then restart your frontend dev server.

---

## ✅ Testing

Test the API with curl:

```bash
# Health check
curl http://localhost:3001/api/health

# Get settings
curl http://localhost:3001/api/settings

# Get articles
curl http://localhost:3001/api/articles
```

---

## 🐛 Troubleshooting

### "Error connecting to PostgreSQL"
- Check your `DATABASE_URL` in `.env`
- Make sure PostgreSQL is running: `pg_ctl status`
- Verify database exists: `psql -l`

### "Port 3001 already in use"
- Change `PORT` in `.env` to another port (e.g., 3002)
- Or kill the process using port 3001

### CORS errors
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Restart the backend after changing `.env`

---

## 📦 Dependencies

- **express** - Web framework
- **pg** - PostgreSQL client
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

---

## 🔐 Security Notes

- Never commit `.env` file to git
- Use strong database passwords
- In production, use HTTPS
- Add rate limiting for production use
