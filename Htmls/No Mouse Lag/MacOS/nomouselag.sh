#!/bin/bash

echo "Reducing keyboard and mouse lag on macOS..."

# Disable press-and-hold for keys (enables faster key repeat)
defaults write -g ApplePressAndHoldEnabled -bool false

# Set fast keyboard repeat rate
defaults write NSGlobalDomain KeyRepeat -int 1
defaults write NSGlobalDomain InitialKeyRepeat -int 10

# Restart Bluetooth daemon to reduce Bluetooth input lag
echo "Restarting Bluetooth daemon..."
sudo pkill -HUP blued

# Optional: Reset USB devices (use with caution)
# echo "Resetting USB devices..."
# sudo kextunload -b com.apple.iokit.IOUSBHostFamily
# sudo kextload -b com.apple.iokit.IOUSBHostFamily

echo "Settings applied. Please log out and back in or reboot for all changes to take effect."
