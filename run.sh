#!/usr/bin/env bash

cd /home/pi/rpi-clock-screensaver
npm run build
npm run preview &
chromium --kiosk http://localhost:4173/ --window-size=800,480 --window-position=0,0 --enable-features=WebContentsForceDark