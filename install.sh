#!/usr/bin/env bash

# build screen
PATH_TO_INDEX="$(pwd)/dist/index.html"


# save backup of autostart
date=$(date '+%Y-%m-%d')
sudo cp ~/.config/lxsession/LXDE/autostart  "$(pwd)/autostart-${date}.backup"

# create new autostart
sudo cp ./autostart  ~/.config/lxsession/LXDE/autostart
sed -i -e "s/\<PATH\>/${PATH_TO_INDEX}/g" ~/.config/lxsession/LXDE/autostart
