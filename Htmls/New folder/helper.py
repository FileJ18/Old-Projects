import psutil

def list_drives():
    drives = []
    partitions = psutil.disk_partitions()
    for p in partitions:
        drives.append(p.device)
    return drives

if __name__ == "__main__":
    drives = list_drives()
    for d in drives:
        print(d)
