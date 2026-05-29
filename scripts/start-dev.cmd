@echo off
cd /d "%~dp0.."
echo Stopping old servers on port 3000...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul
timeout /t 2 /nobreak >nul
echo.
echo Starting dev server...
echo Open: http://127.0.0.1:3000/login  (NOT localhost:3000/ homepage)
echo First load ~30-40s on OneDrive. Refresh is fast. Move project off OneDrive for speed.
echo.
call npm.cmd run dev
pause
