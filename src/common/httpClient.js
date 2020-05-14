const LOCAL_SERVER = 'http://localhost:4000';

// 将参数拼接到url上
function addUrlParam(url, name, value) {
    url += (url.indexOf('?') == -1 ? '?' : '&');
    url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
    return url;
}

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

        if (method.toUpperCase() === 'GET') {
            let requestUrl = url;

            for (let item in data) {
                requestUrl = addUrlParam(requestUrl, item, data[item]);
            }
            this.xhr.open(method, requestUrl, isSync);
            this.xhr.setRequestHeader('Access-Control-Allow-Origin', LOCAL_SERVER);
            this.xhr.send(null);
        } else if (method.toUpperCase() === 'POST') {
            this.xhr.open(method, url, isSync);
            this.xhr.setRequestHeader('Access-Control-Allow-Origin', LOCAL_SERVER);
            this.xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            let params = '';
            for(let item in data) {
                params += encodeURIComponent(item) + '=' + encodeURIComponent(data[item]) + '&';
            }
            params.substring(0, params.length - 1);
            this.xhr.send(params);
        }
    }
}

export default new HttpClient();