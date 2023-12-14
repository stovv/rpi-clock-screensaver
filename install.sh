#!/usr/bin/env bash

# build screen
PATH_TO_INDEX="$(pwd)/dist/index.html"


# save backup of autostart
date=$(date '+%Y-%m-%d')
cp ~/.config/lxsession/LXDE/autostart  "~/.config/lxsession/LXDE/autostart-${date}.backup"

# create new autostart
cp ./autostart  ~/.config/lxsession/LXDE/autostart
sed -i -e 's/\<PATH\>/${PATH_TO_INDEX}/g' ~/.config/lxsession/LXDE/autostart