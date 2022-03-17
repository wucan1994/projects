import isFinite from 'lodash/isFinite';
import { DEFAULT_VALUE, NUMBER_REGEX } from './const';

/**
 * 保留特定位数小数
 * @param {number | string} input 输入值
 * @param {number} decimal 保留的精度
 * @returns {string}
 */
const keepDecimal = (input, decimal = 2) => {
  if (!NUMBER_REGEX.test(input)) return DEFAULT_VALUE;
  const num = parseFloat(input);
  if (!isFinite(num)) return DEFAULT_VALUE;
  return (Math.round(num * 10 ** decimal) / 10 ** decimal).toFixed(decimal);
};

/**
 * 判断日期是否为有效日期
 * @param {string} input 用特定分隔符分隔的日期
 * @returns {boolean}
 */
const isValidDate = (input, hyphen) => {
  const dateArr = input.split(hyphen);
  const year = parseInt(dateArr[0], 10);
  const month = parseInt(dateArr[1], 10);
  const day = parseInt(dateArr[2], 10);
  if (year < 0) return false;
  if (month < 1 || month > 12) return false;
  if (new Date(input).getDate() !== day) return false;
  return true;
};

/**
 * 将8位数字格式的日期用特定的连字符连接
 * @param {number | string} input 输入的日期，如: 20180901
 * @param {string} hyphen 输入的连字符
 * @returns {string}
 */
const formatDate = (input, hyphen = '-') => {
  if (!/^\d{8}$/.test(input)) return DEFAULT_VALUE;
  const result = input
    .toString()
    .replace(/(\d{4})(\d\d)(\d\d)/, ['$1', '$2', '$3'].join(hyphen));
  if (isValidDate(result, hyphen)) return result;
  return DEFAULT_VALUE;
};

/**
 * 将数字转换为保留特定位数的百分数
 * @param {number | string} input 输入值
 * @param {number} decimal 保留的精度
 * @returns {number}
 */
const toPercentage = (input, decimal = 2) => {
  if (!NUMBER_REGEX.test(input)) return DEFAULT_VALUE;
  const num = parseFloat(input);
  if (!isFinite(num)) return DEFAULT_VALUE;
  // eslint-disable-next-line no-restricted-properties
  return `${(
    Math.round(num * 10 ** (4 + decimal)) /
    10 ** (2 + decimal)
  ).toFixed(decimal)}%`;
};

/**
 * 将数字格式化为每三位数用逗号分隔的形式，最多保留四位小数
 * @param {number | num} num 输入数字
 * @returns {string}
 */
const formatNumber = (input) => {
  if (!NUMBER_REGEX.test(input)) return DEFAULT_VALUE;
  const num = parseFloat(input);
  if (!isFinite(num)) return DEFAULT_VALUE;
  return num.toLocaleString(undefined, {
    maximumFractionDigits: 4,
  });
};

/**
 * 对于undefined、null、空字符串和NaN，设定默认值
 * @param {string|number} input 输入值
 * @returns
 */
const checkIsEmpty = (input) => {
  if (Number.isNaN(input)) return DEFAULT_VALUE;
  const emptyArr = [undefined, null, ''];
  if (emptyArr.indexOf(input) !== -1) return DEFAULT_VALUE;
  return input;
};

// 获取uuid的hash值
const getHash = (uuid) => {
  let hash = 0;
  for (let i = 0; i < uuid.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = (hash << 4) ^ (hash >> 28) ^ uuid.charCodeAt(i);
  }
  return Math.abs(hash % 100);
};

/**
 * 判断是否包含有效的版本号，是则返回第一个匹配的版本号，不是则返回false;
 * @param {string} version 版本号
 * @returns {string}
 */
const isValidVersion = (version) => {
  const regex = /^\d+(\.\d+)*/; // 匹配版本号
  if (!regex.test(version)) return '';
  const matches = version.match(regex);
  if (matches !== null && matches.length) return matches[0];
  return '';
};

/**
 * 比较当前版本是不是在指定版本之后
 * @param {*} givenVersion 给定版本，如'9.5.7.0'
 * @param {*} curVersion 当前版本，如'9.6.0.0_debug'
 */
const isLaterVersion = (givenVersion, curVersion) => {
  const givenVer = isValidVersion(givenVersion);
  const curVer = isValidVersion(curVersion);
  if (!givenVer || !curVer) return false;

  const givenVerArr = givenVer.split('.');
  const curVerArr = curVer.split('.');
  console.log(givenVer, curVer);
  let curIndex = 0;
  for (let i = 0; i < givenVerArr.length; i += 1) {
    if (curVerArr[i] === undefined) curVerArr[i] = 0;
    if (parseInt(curVerArr[i], 10) < parseInt(givenVerArr[i], 10)) return false;
    if (parseInt(curVerArr[i], 10) > parseInt(givenVerArr[i], 10)) return true;
    curIndex = i;
  }
  if (curVerArr[curIndex] !== undefined) return true;
  return false;
};

/**
 * 获取指定日期是周几
 * @param {number|string} date 输入的日期，格式为20190820这种
 */
const getWeekdayFromDate = (input) => {
  const date = formatDate(input);
  if (date === DEFAULT_VALUE) return date;
  const weekdays = '日一二三四五六';
  const standardDate = new Date(date);
  const weekday = weekdays.split('')[standardDate.getDay()];
  return weekday;
};

/**
 * 格式化日期
 * 当天：今天
 * 昨天：昨天
 * 最近一周&非当天&非昨天：星期X
 * 其余均显示具体日期：YYYY-MM-DD
 * @param {string} input 输入日期
 * @returns string
 */
const transformDate = (input) => {
  const date = formatDate(input);
  if (date === DEFAULT_VALUE) return date;
  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = today - 24 * 3600 * 1000;
  const recentWeek = today - 24 * 3600 * 1000 * 7;
  const viewTime = new Date(date).getTime();
  if (viewTime >= today) return '今天';
  if (viewTime >= yesterday) return '昨天';
  if (viewTime > recentWeek) return `星期${getWeekdayFromDate(input)}`;
  return date;
};

/**
 * 格式化金额
 * @param {number | string} input 输入金额
 * @returns string
 */
const formatAmount = (input) => {
  if (!NUMBER_REGEX.test(input)) return DEFAULT_VALUE;
  const num = parseInt(input, 10);
  const WAN = 10 ** 4;
  const YI = 10 ** 8;
  if (num < 0) return DEFAULT_VALUE;
  if (num < WAN) return `${num}`;
  if (num < YI) return `${num / WAN}万`;
  const mod = num % YI;
  if (mod < WAN) return `${Math.floor(num / YI)}亿`;
  return `${(Math.floor(num / WAN) * WAN) / YI}亿`;
};

export default {
  keepDecimal,
  formatDate,
  toPercentage,
  formatNumber,
  checkIsEmpty,
  getHash,
  isValidVersion,
  isLaterVersion,
  getWeekdayFromDate,
  transformDate,
  formatAmount,
};
