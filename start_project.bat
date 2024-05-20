@echo off

:: Command 1
set FRONTEND_CMD=cd /d "%~dp0\front-end" ^&^& npm run dev

:: Command 2
set BACKEND_CMD=cd /d "%~dp0\back-end" ^&^& py manage.py runserver

:: Open Windows Terminal with two tabs
start wt new-tab cmd /k "%FRONTEND_CMD%" ; new-tab cmd /k "%BACKEND_CMD%"
