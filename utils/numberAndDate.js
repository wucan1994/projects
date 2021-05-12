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

export default {
  keepDecimal,
  formatDate,
  toPercentage,
};
