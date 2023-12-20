#!/usr/bin/env bash

REPO_PATH="$(pwd)"

# install node
if ! which node > /dev/null; then
   echo "Error: Install node v18"
   exit 1
fi

# build screen
npm install
npm run build

# save backup of autostart
date=$(date '+%Y-%m-%d')
sudo cp ~/.config/lxsession/LXDE/autostart  "$REPO_PATH/autostart-${date}.backup"

# create new autostart
sudo cp $REPO_PATH/autostart  ~/.config/lxsession/LXDE/autostart
sudo sed -i -e "s|PATH|$REPO_PATH|" ~/.config/lxsession/LXDE/autostart

echo -e "Reboot now? (y/n)"
read
if "$REPLY" = "y"; then
  sudo reboot
fi