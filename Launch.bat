@echo off
title Launching Modules v.1.1.0
cls
echo [!] Modules will be installed on your system...
pause
cls
echo Tip: For the first installation, you are only required to press the Enter key untill you have nothing else to fill in.
pause
cls
echo Starting:
    call npm init
    call npm install discord.js@12.5.1
    call npm install chalk
    call npm install discord.js-pagination
    call npm install mv
pause
exit
