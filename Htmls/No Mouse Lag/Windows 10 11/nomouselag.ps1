# Requires running as Administrator

Write-Host "Reducing mouse and keyboard lag settings..."

# 1. Disable USB selective suspend (to avoid USB power saving that can cause lag)
powercfg -SETACVALUEINDEX SCHEME_CURRENT SUB_USB USBSELECTSUSPEND 0
powercfg -SETDCVALUEINDEX SCHEME_CURRENT SUB_USB USBSELECTSUSPEND 0
powercfg -SETACTIVE SCHEME_CURRENT
Write-Host "Disabled USB selective suspend."

# 2. Disable Filter Keys (can cause keyboard delay)
$filterKeysPath = "HKCU:\Control Panel\Accessibility\Keyboard Response"
Set-ItemProperty -Path $filterKeysPath -Name "Flags" -Value 0
Write-Host "Filter Keys disabled."

# 3. Set keyboard repeat delay and repeat rate to faster values
# Delay before repeat (0 = shortest, 3 = longest)
Set-ItemProperty -Path "HKCU:\Control Panel\Keyboard" -Name "KeyboardDelay" -Value 0
# Repeat rate (0 = fastest, 31 = slowest)
Set-ItemProperty -Path "HKCU:\Control Panel\Keyboard" -Name "KeyboardSpeed" -Value 31
Write-Host "Keyboard repeat rate set to fastest."

# 4. Optional: Set mouse polling rate if applicable (many mice require driver tools)
# This step is hardware specific, not reliably set via registry or PowerShell.

Write-Host "Settings applied. You may need to log out and back in for all changes to take effect."
