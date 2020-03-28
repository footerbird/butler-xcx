export const Valid = {
  isUrl(str) { // 验证域名合法
    return /^(http:\/\/)?(www\.)?.+\..+$/.test(str);
  },
  isEmail(str) { // 验证邮箱
    return /^.+@.+\.[\w]{2,4}$/.test(str);
  },
  isMobile(str) { // 验证手机号码
    return /^1[3|4|5|8][0-9]\d{8}$/.test(str);
  },
  isCode6(str) { // 验证手机验证码，6位数字
    return /^\d{6}$/.test(str);
  },
  isInt(str) { // 验证正整数
    return /^\d+$/.test(str);
  },
  isNumber(str) { // 验证是否是数字（包括负数和小数）
    return /^(-)?\d+(\.\d+)?$/.test(str);
  },
  isCardNo(str) { // 验证身份证号码
    const len = str.length;
    if (len === 15) {
      return /^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/.test(str);
    } if (len === 18) {
      return /^(\d{6})(19|20)(\d{2})((0\d)|(1[0-2]))(([0-2]\d)|(3[0-1]))(\d{3})(\w)$/.test(str);
    }
    return false;
  },
  isCnChar(str) { // 验证中文
    return /^[\u4e00-\u9fa5]+$/.test(str);
  },
  isEqualto(str1, str2) { // 验证一致性
    return str1 === str2;
  },
};

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return false;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return false;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
  if (!name) return false;
  window.localStorage.removeItem(name);
};

export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
};

export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
};