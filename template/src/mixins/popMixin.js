import { isIOS } from './../utils'

export default {

  props: {

    popVisible: {
      type: Boolean,
      default: false
    },
    popType: {
      type: String,
      default: ''
    }
  },

  mounted() {

    const listenHeightChange = () => {

      const oldHeight = document.documentElement.clientHeight;
      const main = () => {
        const newHeight = document.documentElement.clientHeight;
        this.handleHeightChange(newHeight, oldHeight);
      }
      window.addEventListener('resize', main);
      return () => window.removeEventListener('resize', main);
    }

    this.removeAddResize = listenHeightChange();
  },

  beforeDestroy() {
    this.removeAddResize();
  },

  methods: {

    handlePopOpen() {
      if(isIOS()) document.body.classList.add('pop-open');
    },

    handlePopClose() {
      document.body.classList.remove('pop-open');
    },

    handleHeightChange(newHeight, oldHeight) {
      console.log('keep handleHeightChange：' + newHeight + '-' + oldHeight)
    }
  }
}
