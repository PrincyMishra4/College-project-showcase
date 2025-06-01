@echo off
echo Starting College Project Showcase...
echo.

echo Starting Backend Server...
cd "c:\Users\91809\Desktop\College project showcase\backend"
start "Backend Server" cmd /k "node index.js"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
cd "c:\Users\91809\Desktop\College project showcase\frontend"
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
