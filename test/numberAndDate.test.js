import util from '../utils/numberAndDate';
import cases from '../testcase/numberAndDate';

const {
  keepDecimal,
  formatDate,
  toPercentage,
  formatNumber,
  checkIsEmpty,
  isValidVersion,
  isLaterVersion,
} = util;
const {
  numberAndDateCase,
  dateCase,
  percentageCase,
  formatNumberCase,
  emptyCase,
  versionCase,
  compareVersionCase,
} = cases;
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

describe('将数字用千分位符分隔，最多保留四位小数', () => {
  formatNumberCase.forEach((item) => {
    test(item.description, () => {
      const value = formatNumber(item.input);
      expect(value).toEqual(item.result);
    });
  });
});

describe('将undefined、null、空字符串和NaN转换为默认值', () => {
  emptyCase.forEach((item) => {
    test(item.description, () => {
      const value = checkIsEmpty(item.input);
      expect(value).toEqual(item.result);
    });
  });
});

describe('判断给定版本号是否为有效版本号', () => {
  versionCase.forEach((item) => {
    test(item.description, () => {
      const value = isValidVersion(item.input);
      expect(value).toEqual(item.result);
    });
  });
});

describe('比较当前版本是否在给定版本之后', () => {
  compareVersionCase.forEach((item) => {
    test(item.description, () => {
      const value = isLaterVersion(item.givenVersion, item.curVersion);
      expect(value).toEqual(item.result);
    });
  });
});
