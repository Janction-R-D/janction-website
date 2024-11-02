export default class is {
  static isUndefined(value) {
    return typeof value === 'undefined';
  }

  static isDefined(value) {
    return typeof value !== 'undefined';
  }

  static isObject(value) {
    // http://jsperf.com/isobject4
    return Object.prototype.toString.call(value) === '[object Object]';
  }

  static isString(value) {
    return typeof value === 'string';
  }

  static isNumber(value) {
    return typeof value === 'number';
  }

  static isDate(value) {
    return toString.call(value) === '[object Date]';
  }

  static isFunction(value) {
    return typeof value === 'function';
  }

  static isRegExp(value) {
    return toString.call(value) === '[object RegExp]';
  }

  static isBoolean(value) {
    return typeof value === 'boolean';
  }

  static isElement(node) {
    return !!(
      node &&
      (node.nodeName || // we are a direct element
        (node.prop && node.attr && node.find))
    ); // we have an on and find method part of jQuery API
  }

  static isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === 'object' || typeof obj === 'function') &&
      typeof obj.then === 'function'
    );
  }

  static isArray = Array.isArray;
}
