#!/bin/bash
# Start all development servers

echo "🚀 Starting Crowley Capital Development Servers..."
echo ""

# Start backend in background
echo "📡 Starting API server (port 3001)..."
cd apps/api && npm run dev &
API_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "🌐 Starting Web server (port 8080)..."
cd apps/web && npm run dev

# Cleanup on exit
trap "kill $API_PID" EXIT
