import webview
import helper

class API:
    def get_drives(self):
        return helper.list_drives()

if __name__ == '__main__':
    api = API()
    webview.create_window('Custom Browser', 'index.html', js_api=api)
    webview.start()
