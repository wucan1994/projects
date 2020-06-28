const LOCAL_SERVER = 'http://localhost:4000';

// 将参数拼接到url上
function addUrlParam(url, name, value) {
  let urlWithParm = '';
  urlWithParm += url.indexOf('?') === -1 ? '?' : '&';
  urlWithParm += `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  return urlWithParm;
}

class HttpClient {
  constructor() {
    this.xhr = new XMLHttpRequest();

    this.xhr.timeout = 3000;
    this.xhr.ontimeout = function () {
      console.log('请求超时');
    };
    this.xhr.onerror = function () {
      console.log('请求错误');
    };
  }

  request(params) {
    const {
      url,
      method = 'get',
      data = null,
      success = () => {},
      fail = () => {},
      isSync = true,
    } = params;

    this.xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        try {
          if (
            (this.status >= 200 && this.status < 300) ||
            this.status === 304
          ) {
            success(JSON.parse(this.responseText));
          } else {
            fail();
          }
        } catch (e) {
          fail();
        }
      }
    };

    if (method.toUpperCase() === 'GET') {
      let requestUrl = url;

      Object.keys(data).forEach((item) => {
        requestUrl = addUrlParam(requestUrl, item, data[item]);
      });
      this.xhr.open(method, requestUrl, isSync);
      this.xhr.withCredentials = true;
      this.xhr.setRequestHeader('Access-Control-Allow-Origin', LOCAL_SERVER);
      this.xhr.send(null);
    } else if (method.toUpperCase() === 'POST') {
      this.xhr.open(method, url, isSync);
      this.xhr.withCredentials = true;
      this.xhr.setRequestHeader('Access-Control-Allow-Origin', LOCAL_SERVER);
      if (url.indexOf('/header') !== -1) {
        this.xhr.send(data);
      } else {
        // 加不加都可以
        // this.xhr.setRequestHeader(
        //   'Content-Type',
        //   'application/x-www-form-urlencoded',
        // );
        let body = '';
        Object.keys(data).forEach((item) => {
          body += `${encodeURIComponent(item)}=${encodeURIComponent(
            data[item],
          )}&`;
        });
        body = body.substring(0, body.length - 1);
        this.xhr.send(body);
      }
    }
  }
}

export default new HttpClient();
