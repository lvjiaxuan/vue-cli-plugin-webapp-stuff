# H5前端项目模板

> 基于vue-cli3插件开发，集成H5常见业务

## prompts问答项

### css预处理器

选择安装css预处理器，并通过[自动化导入文件](https://cli.vuejs.org/zh/guide/css.html#%E8%87%AA%E5%8A%A8%E5%8C%96%E5%AF%BC%E5%85%A5)，导入常用功能样式（可pr），路径是styles/imports文件，即可在任意样式或vue文件使用。*推荐使用sass*。

> 目前项目模板只提供了scss+rem的常用工具样式，其它的预处理器和对应vw适配方式的工具样式，没有，但是可加可pr，日后再慢慢更新。

**reset样式：**

1. 使用了`normalize.css`
2. 预设的以下几个reset

```css
p { margin: 0; padding: 0; }
img, video { object-fit: cover; }
*:not(input) { user-select: none; }
img[src=''], video[src=''] { display: none; }
input { border: none; background-color: transparent; box-sizing: border-box; }
button { border: none; background: none; padding: 0; display: flex; justify-content: center; align-items: center; }
```

### 适配方案

选择设计图尺寸，提供的两种rem和vw两种适配方案，其中rem使用vw+rem方式，即设计图px / 100（rem）即可，vw使用`postcss-px-to-viewport`插件自动转换，配置好相关参数，直接使用设计图px，打包自动转为vw。目前有750和640设计图尺寸可选。

**vw+rem方式下的750.css示例：**

```css
html { font-size: 13.333333333333334vw; }
html, body { margin: 0 auto; }

@media only screen and (max-width: 320px) {
  html { font-size: 42.66666667px; }
  html, body { min-width: 320px; }
}

@media only screen and (min-width: 540px) {
  html { font-size: 72px; }
  html, body { max-width: 540px; }
}
```

### vue常用

- `vuex`
- `vue-router`

选择vuex，则生成到`/src/store/index.js`，为简单入门示例。

选择vue-router，则生成到`/src/router/index.js`和`/src/views/Home.vue`，为简单入门示例。

### 其它常用

- 微信分享wx-share.js
- mock-server
- 图片预加载组件

#### 微信分享wx-share.js

生成到`/src/utils/wx-share.js`。文件导出一个方法返回promise实例，用于初始化和设置微信分享信息。

- 获取签名凭证的url对应preset的`ticketUrl`，可在`.env`的`VUE_APP_TICKETURL`文件设置
- 接口响应返回的data格式按需修改，目前以`response.data.model`接收
- `newVersion`表示是否使用新版api，`successCallback`对于新版api无效
- 新旧版api不可同时使用

```js
export default ({
  title = '分享标题',
  desc = '分享描述',
  link = window.location.href.split('#')[0],
  imgUrl = '',
  successCallback = () => {}
} = {}, newVersion = false) => {
  // ...
}
```

#### mock-server

生成：

- `/mock/mock-data.js`：mock接口
- `/mock/mock-api.js`：本地mock形式
- `/mock/mock-server.js`：本地mock-server形式

项目启动后，mock-server自动启动，更改`mock-data.js`可热更新服务。若想在线上使用mock，需在相关配置文件设置`VUE_APP_MOCK = 1`，但此时不会产生任何真实请求。

#### 图片预加载组件

**`imgs.json`说明：**

图片名称数组。

**使用说明：**

有时候预加载除了图片因素之外，异步接口的返回也可能是因素之一。此时可以使用`:add-conditions-num`说明有多少因素（相当于多一张图片），示例代码如下：

```vue
<imgs-preload ref="imgs-preload" :imgs="require('@/assets/imgs.json')" :preload-visible.sync="preloadVisible" :add-conditions-num="1">
  <template #default="{ imgsPercentage }">{{ imgsPercentage }}</template>
</imgs-preload>

// ...

created() {
  this.init();
},
methods: {
  init() {
    this.$request('/url').then(() => {
      // ...
      this.$refs['imgs-preload'].imgsLoaded++;
    });
  }
}
```

## axios请求封装

相关文件：`/src/utils/request.js`

**默认响应data格式：**（按需修改）

```js
data = {
  retCode: 0,
  msg: '',
  model: {
    // foo
  }
}
```

**封装了axios的get和post：**

- 响应拦截器了所有`+retCode !== 0`的请求及处理其它请求错误（如Error: timeout），并把msg，Toast（vant）出来
- 使用post请求默认使用qs表单提交，相关字段`isqs`

**到出的方法：**

```js
export const aget = ({ url = '', params = {}, opts = {} } = {}) => service.get(url, Object.assign({}, { params }, opts));
export const apost = ({ url = '', data = {}, params = {}, opts = {}, isqs = true } = {}) => {

  isqs && Object.assign(opts, { transformRequest: [data => Qs.stringify(data)] });
  return service.post(url, data, Object.assign({}, { params }, opts));
}
```

## gulpfile.js

### 自动发版

>  提供打包后自动上传代码到服务器的gulp任务。

- 初始的服务器信息配置来自创建项目时的preset
- `gulp deploysit`：测试环境，上传cdn，上传index.html文件
- `gulp deployprodcdn`：生产环境，上传cdn，index.html文件交给后端大佬发

**打包命令：**

> `使用--report`会生成report.html以帮助分析包内容

```json
"scripts": {
	"build": "vue-cli-service build --report",
  "postbuild": "gulp deployprodcdn",
  "build:sit": "vue-cli-service build --mode sit --report",
  "postbuild:sit": "gulp deploysit",
}
```

### 图片压缩

> 使用熊猫压缩api，所以需要联网

- 被压缩目录为`/src/assets/images`下的图片，只支持这一层目录，子级目录自己敲代码加
- 压缩成功的图片，名称会自动追加`-tiny`
- 若压缩后重命名重复，旧图片文件会继续追加一个当前时间戳
- 当`/src/assets/images`被添加图片，会自动执行`gulp tiny`压缩命令

## 字体抽离

相关文件：`/fontmin.js`

**使用说明：**

- 使用字体抽离工具[fontmin](https://github.com/ecomfe/fontmin)的相关api实现
- 需手动收集项目中的字体文字（不知道还有其它方法没），再对应地粘贴到`fontmin.js`文件中，再执行`node fontmin`，抽离好的结果在`/src/assets/fonts`
- fontmin只支持对ttf文件的抽离，项目模板中提供了思源黑体的ttf文件。有其他字体需求需自行扩展（欢迎pr）

## webpack打包优化

为了提高构建速度和减少构建后的文件体积，目前使用的方式是cdn优化打包（[webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)）。

```js
// vue.config.js

module.exports = {
  // ...
  config.plugin('webpack-cdn').use('webpack-cdn-plugin', [{
    optimize: true,
    prodUrl: 'https://cdn.jsdelivr.net/npm/:name@:version/:path',
    modules: [{
      name: 'vue',
      var: 'Vue',
      path: 'dist/vue.runtime.min.js'
    }, {
      name: 'axios',
      path: 'dist/axios.min.js'
    }]
  }]);
	// ...
})
```

## 其它预装库

- fastclick
- Toast from Vant