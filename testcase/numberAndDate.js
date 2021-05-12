import { DEFAULT_VALUE } from '../utils/const';

const numberAndDateCase = [
  {
    description: '空字符串',
    input: '',
    result: DEFAULT_VALUE,
  },
  {
    description: 'undefined',
    input: undefined,
    result: DEFAULT_VALUE,
  },
  {
    description: 'null',
    input: null,
    result: DEFAULT_VALUE,
  },
  {
    description: '0',
    input: 0,
    result: '0.00',
  },
  {
    description: '非数字字符串',
    input: '10.a',
    result: DEFAULT_VALUE,
  },
  {
    description: '字符串类型数字',
    input: '10',
    result: '10.00',
  },
  {
    description: '字符串类型',
    input: 'a',
    result: DEFAULT_VALUE,
  },
  {
    description: '整数，保留一位小数',
    input: 10,
    decimal: 1,
    result: '10.0',
  },
  {
    description: '整数，保留两位小数',
    input: 10,
    decimal: 2,
    result: '10.00',
  },
  {
    description: '整数，保留三位小数',
    input: 10,
    decimal: 3,
    result: '10.000',
  },
  {
    description: '小数，保留一位小数',
    input: 10.1254,
    decimal: 1,
    result: '10.1',
  },
  {
    description: '整数，保留两位小数',
    input: 10.1254,
    decimal: 2,
    result: '10.13',
  },
  {
    description: '整数，保留三位小数',
    input: 10.1254,
    decimal: 3,
    result: '10.125',
  },
];

const dateCase = [
  {
    description: '日期为undefined',
    input: undefined,
    result: DEFAULT_VALUE,
  },
  {
    description: '日期为空字符串',
    input: '',
    result: DEFAULT_VALUE,
  },
  {
    description: '日期为null',
    input: null,
    result: DEFAULT_VALUE,
  },
  {
    description: '字符串',
    input: '20190912',
    result: '2019-09-12',
  },
  {
    description: '非8位数',
    input: 2019912,
    result: DEFAULT_VALUE,
  },
  {
    description: '不合法日期-月份超过12月',
    input: 20191329,
    result: DEFAULT_VALUE,
  },
  {
    description: '不合法日期-日期超过31日',
    input: 20190332,
    result: DEFAULT_VALUE,
  },
  {
    description: '不合法日期-4月31日',
    input: 20190431,
    result: DEFAULT_VALUE,
  },
  {
    description: '不合法日期-非闰年2月29日',
    input: 20190229,
    result: DEFAULT_VALUE,
  },
  {
    description: '不合法日期-日期为1月0日',
    input: 20190100,
    result: DEFAULT_VALUE,
  },
  {
    description: '合法日期',
    input: 20190101,
    result: '2019-01-01',
  },
  {
    description: '使用.连字符',
    input: 20190101,
    hyphen: '.',
    result: '2019.01.01',
  },
];

const percentageCase = [
  {
    description: '非数字字符串',
    input: '1.a',
    result: DEFAULT_VALUE,
  },
  {
    description: '数字字符串',
    input: '1',
    result: '100.00%',
  },
  {
    description: '数字，不保留小数',
    input: '1',
    decimal: 0,
    result: '100%',
  },
  {
    description: '数字，保留一位小数',
    input: '1.267398',
    decimal: 1,
    result: '126.7%',
  },
  {
    description: '数字，保留两位小数',
    input: '1.267398',
    decimal: 2,
    result: '126.74%',
  },
  {
    description: '数字，保留三位小数',
    input: '1.267398',
    decimal: 3,
    result: '126.740%',
  },
  {
    description: '数字，保留四位小数',
    input: '1.267398',
    decimal: 4,
    result: '126.7398%',
  },
  {
    description: '数字，保留五位小数',
    input: '1.267398626',
    decimal: 5,
    result: '126.73986%',
  },
  {
    description: '数字，保留六位小数',
    input: '1.267398626',
    decimal: 6,
    result: '126.739863%',
  },
];

export default {
  numberAndDateCase,
  dateCase,
  percentageCase,
};
