@echo off
title Launching Modules v.1.1.0
:top
cls
node launch.js
pause
    call npm init
    call npm install discord.js@12.5.1
    call npm install chalk
    call npm install discord.js-pagination
pause
exit
goto :top