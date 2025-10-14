# 🚀 Backend API Setup Guide

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 2: Create Backend `.env` File

```bash
cd backend
cp env.example .env
```

Edit `backend/.env` and add your PostgreSQL connection:

```env
DATABASE_URL=postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/crowley_capital
PORT=3001
FRONTEND_URL=http://localhost:8080
```

**Replace:**
- `YOUR_USERNAME` - Your PostgreSQL username
- `YOUR_PASSWORD` - Your PostgreSQL password

## Step 3: Update Frontend `.env` File

In your **main project root** (not backend folder), update your `.env` file:

```env
VITE_API_URL=http://localhost:3001/api
```

## Step 4: Start the Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ PostgreSQL connected successfully
🚀 Backend API server running on http://localhost:3001
```

## Step 5: Start the Frontend

In a **new terminal**, from the project root:

```bash
npm run dev
```

## Step 6: Test It!

1. Go to `http://localhost:8080/admin`
2. Log in with your admin password
3. Go to "AI Settings" tab
4. Change some settings and click "Save Settings"
5. Refresh the page - your settings should persist! ✅

---

## 🧪 Quick Test

Test the backend API directly:

```bash
# Health check
curl http://localhost:3001/api/health

# Get settings
curl http://localhost:3001/api/settings
```

---

## ✅ What's Working Now

- ✅ Settings save to PostgreSQL (not just localStorage)
- ✅ Settings persist across browser sessions
- ✅ Settings shared across all devices
- ✅ Ready for article management

---

## 🐛 Troubleshooting

### "Error connecting to PostgreSQL"
Check your `DATABASE_URL` in `backend/.env` is correct.

### "Port 3001 already in use"
Change `PORT` in `backend/.env` to 3002 (and update `VITE_API_URL` in frontend `.env`)

### Settings still using localStorage
Make sure:
1. Backend is running (`npm run dev` in backend folder)
2. `VITE_API_URL` is set in frontend `.env`
3. You restarted the frontend after changing `.env`

---

## 📁 File Structure

```
crowley-capital.com/
├── backend/              ← New backend folder
│   ├── src/
│   │   └── server.js    ← API server
│   ├── package.json
│   ├── .env             ← Your database credentials (create this)
│   └── env.example
├── src/                 ← Frontend (React)
├── .env                 ← Frontend config (update VITE_API_URL)
└── database/            ← PostgreSQL schema
```

---

## 🎉 Next Steps

Once the backend is running:

1. **Test settings** - Save and reload to confirm PostgreSQL connection
2. **Generate articles** - Use the "Generate" tab
3. **Manage articles** - View/edit/delete in "All Articles" tab

All data will now be stored in PostgreSQL! 🎊
