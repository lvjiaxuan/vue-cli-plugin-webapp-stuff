import Mock from 'mockjs'

const suc = (model = {}, base = {}) => Mock.mock(Object.assign({ retCode: 0, msg: '' }, { model }, base));
module.exports = [
  ['/mock/api', suc({ name: 'foo' })]
];