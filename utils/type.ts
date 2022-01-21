export const EmptyString = '';
export const EmptyArray = [];
export const EmptyObject = {};
export const EmptyFunc = () => null;

import _ from 'lodash';

// 对象
export const isObject = _.isObject;

// 字符串
export const isString = (value: any): boolean => {
  return typeof value === 'string';
};

// 非空字符串
export const isValidString = (value: any): boolean => {
  return typeof value === 'string' && value !== '';
};

// 数组类型
export const isArray = (value: any): boolean => {
  return Array.isArray(value);
};

// 非空数组
export const isValidArray = (value: any): boolean => {
  return Array.isArray(value) && value.length > 0;
};

// 是 undefined 或者 null
export const isNil = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'number' && isNaN(value))
  );
};

// 不是 undefined 或者 null
export const notNil = (value: any): boolean => {
  return !isNil(value);
};

// 函数
export const isFunction = (value: any): boolean => {
  return typeof value === 'function';
};

// 转换为可执行函数
export const validFunction = (value: any): Function => {
  return isFunction(value) ? value : EmptyFunc;
};

// 容错的 JSON parse
export const parseJSON = (value: string): any => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};
