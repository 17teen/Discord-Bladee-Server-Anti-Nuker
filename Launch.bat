@echo off
title Bladee Anti-Nuke

if exist node_modules\ (
  echo You've already installed this
  echo Navigate to Global directory or the Private directory
) else (
  call npm i >> NUL
  echo Succesfully installed!
  echo Please re-run this file.
)
