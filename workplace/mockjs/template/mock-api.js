import Mock from 'mockjs'
import mockData from './mock-data'

Mock.setup({ timeout: 200 });
const mockr = (url, temlpate) => Mock.mock(new RegExp(url), temlpate);
mockData.forEach(item => mockr(item[0], item[1]));