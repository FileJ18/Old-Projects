#!/bin/bash

echo "Reducing keyboard and mouse lag on Raspberry Pi (Linux)..."

# 1. Set keyboard repeat rate and delay using xset (X server)
xset r rate 200 30
# Explanation: 200 ms delay before repeat, 30 repeats per second (adjust if needed)

# 2. Restart USB subsystem to clear USB device lag
echo "Restarting USB subsystem..."
for usb_bus in /sys/bus/usb/drivers/usb*/; do
  echo -n "1" | sudo tee "$usb_bus/authorized" > /dev/null 2>&1
done

# 3. Restart Bluetooth service (optional, if using Bluetooth input devices)
if systemctl is-active bluetooth > /dev/null; then
  echo "Restarting Bluetooth service..."
  sudo systemctl restart bluetooth
fi

echo "Settings applied. You may need to reconnect your devices or reboot for full effect."
