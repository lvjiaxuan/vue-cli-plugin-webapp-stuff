// 数字金额格式化
export const moneyFormat = Vue => {

  String.prototype.moneyFormat = Number.prototype.moneyFormat = function(decimals = 2) {
    return mainFilter(this, decimals);
  }

  Vue.filter('moneyFormat', mainFilter);

  function mainFilter(value, decimals) {

    if(Number.isNaN(+value)) return value;

    const arr = value.toString().split('.');
    decimals = +decimals;
    if(arr.length === 2) {
  
      const integer = transformInteger(arr[0]);
      if(arr[1].length < decimals) {
        return integer + '.' + arr[1] + ''.padEnd(decimals - arr[1].length, '0');
      } else {
        return integer + '.' + arr[1].substring(0, decimals);
      }
    } else if(arr.length === 1) {
      return transformInteger(value);
    }

    function transformInteger(number) {
      const arr = number.toString().split('');
      const length = arr.length || 0;
      if(length <= 3) {
        return number;
      } else {
        const del = length % 3;
        if(del > 0) {
          arr.splice(del, 0, ',');
          for(let i = 1; i < length / 3 - 1; i++) {
            arr.splice(4 * i + del, 0, ',');
          }
        } else {
          for(let i = 1; i < length / 3; i++) {
            arr.splice(4 * i - 1, 0, ',');
          }
        }
        return arr.join('');
      }
    }
  }
}

// 全局请求loading混入
export const loadingMixin = Vue => {

  Vue.mixin({
    methods: {
      beforeBtn() {
        if(this.btnLoading) return true;
        this.btnLoading = true;
        this.btnToast = this.$toast.loading({ duration: 0 });// custom
        return false;
      },
  
      afterBtn() {
        this.btnLoading = false;
        this.btnToast.clear();// custom
      },
    }
  });
}

// 分转元
export const cent2yuan = () => {

  String.prototype.cent2yuan = Number.prototype.cent2yuan = function(rmLastZero = true) {

    if(rmLastZero) {
      return (this / 100).toString();
    } else {
      const arr = this.toString().split('');
      const length = arr.length;
      if(length === 1) {
        return '0.0' + this;
      } else if(length === 2) {
        return '0.' + this;
      } else {
        arr.splice(length - 2, 0, '.');
        return arr.join('');
      }
    }
  }
}

// 可拖拽指令
export const drag = Vue => {

  Vue.directive('drap', {

    bind(el) {

      const screenH = document.body.clientHeight;
      const screenW = document.body.clientWidth;

      el.ontouchstart = e => {

        // 算出鼠标相对元素的位置
        const disX = e.changedTouches[0].clientX - el.offsetLeft;
        const disY = e.changedTouches[0].clientY - el.offsetTop;

        const elW = el.clientWidth;
        const elH = el.clientHeight;

        document.ontouchmove = e =>{

          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          let left = e.changedTouches[0].clientX - disX;    
          let top = e.changedTouches[0].clientY - disY;

          if(top < 0) {
            top = 0;
          } else {
            top = Math.min(top, screenH - elH);
          }

          if(left < 0) {
            left = 0;
          } else {
            left = Math.min(left, screenW - elW);
          }

          // 移动当前元素
          el.style.left = left + 'px';
          el.style.top = top + 'px';

          // return false;
        }
        document.ontouchend = e => {
          document.ontouchmove = null;
          document.ontouchstart = null;
        }
      }
    }
  });
}