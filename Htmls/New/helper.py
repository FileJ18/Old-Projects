import psutil

def list_drives():
    drives = []
    partitions = psutil.disk_partitions()
    for p in partitions:
        drives.append(p.device)
    return drives
