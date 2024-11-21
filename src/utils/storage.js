import is from './is';

const objectReplacer = (key, value) => {
  if (typeof value == 'bigint') {
    return value.toString();
  }
  return value;
};

const storage = {
  set: (params) => {
    const obj = {
      name: ' ',
      value: '',
      expires: '',
      startTime: new Date().getTime(),
    };
    const options = {};
    //将obj和传进来的params合并
    Object.assign(options, obj, params);
    if (options.expires) {
      localStorage.setItem(options.name, JSON.stringify(options));
    } else {
      const type = Object.prototype.toString.call(options.value);
      if (type === '[object Object]') {
        options.value = JSON.stringify(options.value, objectReplacer);
      }
      if (type === '[object Array]') {
        options.value = JSON.stringify(options.value);
      }
      localStorage.setItem(options.name, options.value);
    }
  },
  get: (name) => {
    let item = localStorage.getItem(name);
    try {
      item = JSON.parse(item);
    } catch (error) {
      return item;
    }
    if (is.isObject(item) && item.startTime) {
      const date = new Date().getTime();
      if (date - item.startTime > item.expires) {
        localStorage.removeItem(name);
        return false;
      }
      return item.value;
    }
    return item;
  },
  remove: (name) => {
    localStorage.removeItem(name);
  },
  clear: () => {
    localStorage.clear();
  },
};

export default storage;
