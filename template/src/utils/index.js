export const getRandomIntInclusive = (min, max) => {

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive 
}

export const realTypeOf = obj => Object.prototype.toString.call(obj).replace(/(^\[object )|(\]$)/g, '').toLowerCase();

export const parseTime = (time, format = '{y}-{m}-{d} 星期{a} {h}:{i}:{s}') => {

  if(Object.prototype.toString.call(time).replace(/(^\[object )|(\]$)/g, '').toLowerCase() !== 'date') {
    time = new Date(+time);
  }

  const formatObj = {
    y: time.getFullYear(),
    m: time.getMonth() + 1,
    d: time.getDate(),
    h: time.getHours(),
    i: time.getMinutes(),
    s: time.getSeconds(),
    a: time.getDay()
  }

  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}

export const isWx = () => navigator.userAgent.toLowerCase().includes('micromessenger');

export const isMobile = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ['android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod', 'ucweb', 'ucbrowser'].some(item => ua.includes(item));
}

export const isIOS = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ['iphone', 'ipad', 'ipod'].some(item => ua.includes(item));
}

export const isAndroid = () => navigator.userAgent.toLowerCase().includes('android');

export const addHeightForInput = box => {
  if(!box) return ;
  const oldHeight = document.documentElement.clientHeight;
  function main() {
    
    const el = document.querySelector(box);
    const newHeight = document.documentElement.clientHeight;

    if(newHeight === oldHeight) el.style.bottom = 0;
    else if(newHeight < oldHeight) el.style.bottom = -(oldHeight - newHeight) + 'px';
  }
  window.addEventListener('resize', main);
  return () => window.removeEventListener('resize', main);
}

export const getLastMonthDay = time => {

  if(Object.prototype.toString.call(time).replace(/(^\[object )|(\]$)/g, '').toLowerCase() !== 'date') {
    time = new Date(+time);
  }

  return new Date(time.getFullYear(), time.getMonth() + 1, 0).getDate();
}