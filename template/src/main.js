import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import { Toast } from 'vant'
import { aget, apost } from '@/utils/request'
import 'normalize.css'
import '@/styles/index.<%= cssPreprocessor %>'
<%_ if(cssPreprocessor === 'css') { %>
import '@/styles/adaption-<%= adaptionSize %>.css'
<%_ } %>


FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.use(Toast);
Vue.prototype.$aget = aget;
Vue.prototype.$apost = apost;

<%_ if(mockjs) { _%>
process.env.NODE_ENV === 'development' && !process.env.VUE_APP_SERVICE_API && require('./mock');
<%_ } _%>
if(process.env.VUE_APP_VCONSOLE === '1') {
  const vc = require('vconsole');
  new vc();
}

new Vue({
  <%_ if(doesCompile) { _%>
  render: h => h(App),
  <%_ } else { _%>
  render: function (h) { return h(App) },
  <%_ } _%>
}).$mount('#app');