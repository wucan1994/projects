const LOCAL_SERVER = 'http://localhost:4000';

class HttpClient {
    constructor() {
        this.xhr = new XMLHttpRequest();
        
        this.xhr.timeout = 3000;
        this.xhr.ontimeout = function() {
            console.log('请求超时');
        };
        this.xhr.onerror = function() {
            console.log('请求错误');
        }
    }

    request(params) {
        const { method, url, data = null, success = () => {}, fail = () => {}, isSync = true } = params;

        this.xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                try {
                    if (this.status >= 200 && this.status < 300 || this.status == 304) {
                        success(this.responseText);
                    } else {
                        fail();
                    }
                } catch {
                    fail();
                }
            }
        }

        this.xhr.open(method, url, isSync);
        this.xhr.setRequestHeader('Access-Control-Allow-Origin', LOCAL_SERVER);
        this.xhr.send(data);
    }
}

export default new HttpClient();