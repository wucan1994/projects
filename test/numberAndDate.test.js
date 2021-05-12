import util from '../utils/numberAndDate';
import cases from '../testcase/numberAndDate';

const { keepDecimal, formatDate, toPercentage } = util;
const { numberAndDateCase, dateCase, percentageCase } = cases;
const { describe, test, expect } = global;

describe('保留固定位数的小数', () => {
  numberAndDateCase.forEach((item) => {
    test(item.description, () => {
      const value = keepDecimal(item.input, item.decimal);
      expect(value).toEqual(item.result);
    });
  });
});

describe('格式化日期', () => {
  dateCase.forEach((item) => {
    test(item.description, () => {
      const value = formatDate(item.input, item.hyphen);
      expect(value).toEqual(item.result);
    });
  });
});

describe('将数字转换成百分比，保留固定位数的小数', () => {
  percentageCase.forEach((item) => {
    test(item.description, () => {
      const value = toPercentage(item.input, item.decimal);
      expect(value).toEqual(item.result);
    });
  });
});
