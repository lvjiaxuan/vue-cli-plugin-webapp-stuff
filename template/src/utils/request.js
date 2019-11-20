import axios from 'axios'
import Qs from 'qs'
import { Toast } from 'vant'

/**
 * 创建axios实例
 */
const service = axios.create({
  baseURL: +process.env.VUE_APP_ISSEPARATION === 1 ? process.env.VUE_APP_SERVICE_API : '',
  timeout: 10000
});

// request拦截器
// service.interceptors.request.use(config => config, error => Promise.reject(error));

// response拦截器
service.interceptors.response.use(response => {

  const { data: { retCode, msg, model } } = response;

  if(retCode !== 0) {
    return Promise.reject({retCode, msg});
  }

  return model || 'no model';
}, error => {
  
  Toast(error.toString());
  return Promise.reject(error);
});

export const aget = ({ url = '', params = {}, opts = {} } = {}) => service.get(url, Object.assign({}, { params }, opts));
export const apost = ({ url = '', data = {}, params = {}, opts = {}, isqs = true } = {}) => {

  if(isqs) Object.assign(opts, { transformRequest: [data => Qs.stringify(data)] });
  return service.post(url, data, Object.assign({}, { params }, opts));
}
export default service;