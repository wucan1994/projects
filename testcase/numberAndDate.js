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
  {
    description: '负数，保留两位小数',
    input: -10.1254,
    result: '-10.13',
  },
  {
    description: '负数，保留三位小数',
    input: -10.1255,
    decimal: 3,
    result: '-10.125', // Math.round(x)，x为负数时，小数部分<=0.5时，原负数的整数部分不变
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
  {
    description: '负数，保留两位小数',
    input: '-0.267398626',
    result: '-26.74%',
  },
  {
    description: '负数，保留三位小数',
    input: '-0.267398626',
    decimal: 3,
    result: '-26.740%',
  },
];

const formatNumberCase = [
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
    description: '非数字字符串',
    input: '1.a',
    result: DEFAULT_VALUE,
  },
  {
    description: '数字字符串',
    input: '1',
    result: '1',
  },
  {
    description: '数字，不足3位',
    input: 123,
    result: '123',
  },
  {
    description: '数字，4位',
    input: 1234,
    result: '1,234',
  },
  {
    description: '数字，5位',
    input: 12345,
    result: '12,345',
  },
  {
    description: '数字，6位',
    input: 123456,
    result: '123,456',
  },
  {
    description: '数字，7位',
    input: 1234567,
    result: '1,234,567',
  },
  {
    description: '数字，8位',
    input: 12345678,
    result: '12,345,678',
  },
  {
    description: '数字，9位',
    input: 123456789,
    result: '123,456,789',
  },
  {
    description: '数字，10位',
    input: 1234567890,
    result: '1,234,567,890',
  },
  {
    description: '数字，一位小数',
    input: 1234.1,
    result: '1,234.1',
  },
  {
    description: '数字，两位小数',
    input: 1234.12,
    result: '1,234.12',
  },
  {
    description: '数字，三位小数',
    input: 1234.123,
    result: '1,234.123',
  },
  {
    description: '数字，四位小数',
    input: 1234.1256,
    result: '1,234.1256',
  },
  {
    description: '数字，五位小数',
    input: 1234.12567,
    result: '1,234.1257',
  },
  {
    description: '数字，六位小数',
    input: 1234.125678,
    result: '1,234.1257',
  },
  {
    description: '数字，小数最后一位为0',
    input: 1234.125,
    result: '1,234.125',
  },
];

const emptyCase = [
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
    description: 'NaN',
    input: NaN,
    result: DEFAULT_VALUE,
  },
  {
    description: '数字0',
    input: 0,
    result: 0,
  },
  {
    description: '字符串0',
    input: '0',
    result: '0',
  },
  {
    description: '非空字符串',
    input: '123',
    result: '123',
  },
];

const versionCase = [
  {
    description: '空字符串',
    input: '',
    result: '',
  },
  {
    description: '正常版本号',
    input: '9.5.0',
    result: '9.5.0',
  },
  {
    description: '小数点开头',
    input: '.9.3',
    result: '',
  },
  {
    description: '小数点结尾',
    input: '9.3.0.',
    result: '9.3.0',
  },
  {
    description: 'app内版本号',
    input: '9.5.7_debug',
    result: '9.5.7',
  },
  {
    description: '一个字符串中有多个版本号',
    input: '9.5.7_9.5.6.0',
    result: '9.5.7',
  },
];

const compareVersionCase = [
  {
    description: '给定版本号异常',
    givenVersion: '',
    curVersion: '9.5.6.0',
    result: false,
  },
  {
    description: '当前版本号异常',
    givenVersion: '9.5.7.0',
    curVersion: '',
    result: false,
  },
  {
    description: '当前版本号小于给定版本号',
    givenVersion: '9.5.7.0',
    curVersion: '9.4.0.12_debug',
    result: false,
  },
  {
    description: '当前版本号等于给定版本号',
    givenVersion: '9.5.7.0',
    curVersion: '9.5.7.0_release',
    result: true,
  },
  {
    description: '当前版本号大于给定版本号',
    givenVersion: '9.5.7.0',
    curVersion: '9.6.4.0_release',
    result: true,
  },
  {
    description: '当前版本号位数小于给定版本号，当前版本号小于给定版本号',
    givenVersion: '9.5.7.0',
    curVersion: '9.5.4',
    result: false,
  },
  {
    description: '当前版本号位数小于给定版本号，当前版本号等于给定版本号',
    givenVersion: '9.5.7.0',
    curVersion: '9.5.7',
    result: true,
  },
  {
    description: '当前版本号位数小于给定版本号，当前版本号大于给定版本号',
    givenVersion: '9.5.7.0',
    curVersion: '9.6.0',
    result: true,
  },
  {
    description: '当前版本号位数大于给定版本号，当前版本号小于给定版本号',
    givenVersion: '9.5.7.0',
    curVersion: '9.5.4.0.1',
    result: false,
  },
  {
    description: '当前版本号位数大于给定版本号，当前版本号等于给定版本号',
    givenVersion: '9.5.7.0',
    curVersion: '9.5.7.0.0',
    result: true,
  },
  {
    description: '当前版本号位数大于给定版本号，当前版本号大于给定版本号',
    givenVersion: '9.5.7.0',
    curVersion: '9.6.0.0.1',
    result: true,
  },
];

const weeekDayCase = [
  {
    description: '非法数日',
    input: undefined,
    result: DEFAULT_VALUE,
  },
  {
    description: '非法日期',
    input: 201909200,
    result: DEFAULT_VALUE,
  },
  {
    description: '不存在的日期',
    input: 20190229,
    result: DEFAULT_VALUE,
  },
  {
    description: '正常日期——周一',
    input: 20200101,
    result: '三',
  },
  {
    description: '正常日期——2020年2月29日',
    input: 20200229,
    result: '六',
  },
  {
    description: '正常日期——2021年5月28日',
    input: 20210528,
    result: '五',
  },
  {
    description: '正常日期——2021年5月28日',
    input: '20210528',
    result: '五',
  },
];

// 以2021年5月25日为例，如日期不对，请更新测试用例
const transformDateCase = [
  {
    description: '非法输入',
    input: '20199999',
    result: DEFAULT_VALUE,
  },
  {
    description: '今天——2021年5月25日',
    input: '20210525',
    result: '今天',
  },
  {
    description: '昨天——2021年5月24日',
    input: '20210524',
    result: '昨天',
  },
  {
    description: '最近一周——2021年5月23日',
    input: '20210523',
    result: '星期日',
  },
  {
    description: '最近一周——2021年5月20日',
    input: '20210520',
    result: '星期四',
  },
  {
    description: '最近一周——2021年5月18日',
    input: '20210518',
    result: '星期二',
  },
  {
    description: '最近一周之前——2021年5月17日',
    input: '20210517',
    result: '2021-05-17',
  },
  {
    description: '最近一周之前——2021年3月3日',
    input: '20210303',
    result: '2021-03-03',
  },
];

const formatAmountCase = [
  {
    description: '非法输入——多个小数点',
    input: '10.2.3',
    result: DEFAULT_VALUE,
  },
  {
    description: '非法输入——含有字母',
    input: '1a',
    result: DEFAULT_VALUE,
  },
  {
    description: '小于1万的数字',
    input: '10',
    result: '10',
  },
  {
    description: '小于1万的数字——临界值',
    input: '9999.9',
    result: '9999',
  },
  {
    description: '1万',
    input: '10000',
    result: '1万',
  },
  {
    description: '大于1万的数字——临界值',
    input: '10001.1',
    result: '1.0001万',
  },
  {
    description: '大于1万的数字',
    input: '50000',
    result: '5万',
  },
  {
    description: '大于1万的数字——99999000',
    input: '99999000',
    result: '9999.9万',
  },
  {
    description: '大于1万的数字——临界值',
    input: '99999999',
    result: '9999.9999万',
  },
  {
    description: '1亿',
    input: '100000000',
    result: '1亿',
  },
  {
    description: '大于1亿的数字——余数小于1万',
    input: '100009909',
    result: '1亿',
  },
  {
    description: '大于1亿的数字——余数大于1万',
    input: '102300110',
    result: '1.023亿',
  },
];

export default {
  numberAndDateCase,
  dateCase,
  percentageCase,
  formatNumberCase,
  emptyCase,
  versionCase,
  compareVersionCase,
  weeekDayCase,
  transformDateCase,
  formatAmountCase,
};
