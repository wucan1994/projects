/**
 * 获取页面路径中的参数
 */
function getUrlParam() {
  const { search } = window.location;
  if (search.indexOf('?') !== -1) {
    const searchStr = search.split('?')[1];
    const kvPairArr = searchStr.split('&');
    const kvPairs = {};
    for (let i = 0; i < kvPairArr.length; i += 1) {
      const key = kvPairArr[i].split('=')[0];
      const value = kvPairArr[i].split('=')[1];
      kvPairs[key] = value;
    }

    return kvPairs;
  }
  return null;
}

// 替换字符串中的特殊字符，进行简单的xss过滤
function encodeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
}

// 将特殊字符替换回来
function decodeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, '\'')
    .replace(/&quot;/g, '"');
}

export default {
  getUrlParam,
  encodeHtml,
  decodeHtml,
};
