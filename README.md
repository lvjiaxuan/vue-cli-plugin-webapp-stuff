# H5前端项目模板

> 基于vue-cli插件开发，集成H5常见业务。

## 安装

**项目已创建**：`vue add webapp-stuff`。

**项目未创建**：

1. 拷贝`preset.json`模板到本地，[模板](./preset.json)，[preset项说明](./PRESET.md)
2. 创建：`vue create --preset preset.json my-project`

## prompts问答项

### 选择css预处理器

若选择不使用css，则使用[css自动化导入](https://cli.vuejs.org/zh/guide/css.html#%E8%87%AA%E5%8A%A8%E5%8C%96%E5%AF%BC%E5%85%A5)，导入常用工具样式（可pr），路径位置在`src/styles/imports`文件，即可在任意样式或vue文件使用。*这里推荐使用scss*。

> 1. 目前项目模板只有scss + rem的本人工作中收集的常用工具样式，其它的预处理器的工具样式，日后慢慢补充。
>
> 2. 使用了reset样式：使用了`normalize.css`。

### 选择适配方案

提供的两种rem和vw两种移动端适配方案。rem方案使用vw + rem方式，100 (设计图 px) = 1 (css rem) 即可；vw方案使用`postcss-px-to-viewport`插件自动转换样式单位，配置好相关参数，直接使用设计图px，webpack自动转为vw。

> ps：其中rem设置有最大布局视口的样式，vw没有。

### 设计图分辨率

需要输入用于移动端适配的设计图尺寸，默认有有750px和640px设计图分辨率可选，亦可选择自定义输入，设计图分辨率至少为320px。然后会自动生成适配的css文件并导入。

**比如，选中rem方案，选中750px，生成：adaption-750.css**

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

选择vuex，则生成到`/src/store/index.js`，模版为入门示例。

选择vue-router，则生成到`/src/router/index.js`和`/src/views/Home.vue`，模版为入门示例。

### 其它常用

- 微信分享wx-share.js
- mock-server
- 图片预加载组件

#### 微信分享wx-share.js

生成到`/src/utils/wx-share.js`。文件导出一个方法，返回promise实例，用于初始化和设置微信分享信息。

- 获取签名凭证的url对应`preset.json`的`ticketUrl`，后可在`.env`的`VUE_APP_TICKETURL`文件设置
- 接口响应返回的data格式按需修改，模版中以`response.data.model`接收，按需修改
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

模板生成：

- `/mock/mock-data.js`：mock接口
- `/mock/mock-api.js`：本地mock形式
- `/mock/mock-server.js`：本地mock-server形式

项目启动后，mock-server跟随启动，更改`mock-data.js`可热更新服务。若想在线上使用mock，需在相关配置文件设置`VUE_APP_MOCK = 1`，但此时不会产生任何真实请求。

#### 图片预加载组件

相关文件：`/src/assets/imgs.json`

使用自己封装的组件：[vue-imgs-preload](https://github.com/lvjiaxuan/vue-imgs-preload)

**`/src/assets/imgs.json`说明：**

图片名称数组，用于配合图片预加载组件使用。当添加往`/src/assets/images/`目录添加图片，会自动进行压缩，同时`imgs.json`也会刷新。

#### webpack-cdn-plugin

[webpack-cdn-plugin](https://github.com/shirotech/webpack-cdn-plugin)：第三方库使用cdn加载。目前默认选择的库有vue、axios，可在`vue.config.js·`自行更改相关配置。

## axios请求封装

相关文件：`/src/utils/request.js`

1. 默认响应data格式：（按需修改）

```js
data = {
  retCode: 0,
  msg: '',
  model: {
    // foo
  }
}
```

2. 封装了axios的get和post：

- 响应拦截器了所有`+retCode !== 0`的请求及处理其它请求错误（如Error: timeout），并把msg，Toast（vant）出来
- 使用post请求默认使用qs表单提交，相关字段`isqs`

## gulpfile.js

### 自动上传代码到服务器

提供打包后自动上传代码到服务器的gulp任务：

- 初始的服务器信息配置来自创建项目时的preset
- `gulp deploysit`：测试环境，资源上传cdn，上传index.html文件
- `gulp deployprodcdn`：生产环境，资源上传cdn，没有上传index.html文件

打包命令：

> 使用了`--report`会生成report.html以帮助分析包内容

```json
"scripts": {
  "build": "vue-cli-service build --report",
  "postbuild": "gulp deployprodcdn",
  "build:sit": "vue-cli-service build --mode sit --report",
  "postbuild:sit": "gulp deploysit",
}
```

### 图片压缩

使用自己封装的gulp插件：[gulp-tiny-imgmin](https://github.com/lvjiaxuan/gulp-tiny-imgmin)

- 被压缩目录为`/src/assets/images`下的图片，只支持这一层目录，子级目录自己敲代码加
- 当`/src/assets/images`被添加图片，会自动执行`gulp tiny`压缩命令

## 字体抽离

相关文件：`/fontmin.js`

使用说明：

- 使用字体抽离工具[fontmin](https://github.com/ecomfe/fontmin)的相关api实现
- 需手动收集项目中的字体文字（不知道还有其它方法没），再手动地粘贴到`fontmin.js`文件中，再执行`node fontmin`，抽离好的结果在`/src/assets/fonts`
- fontmin只支持对ttf文件的抽离，项目模板中提供了思源黑体的ttf文件

## webpack打包优化

[hard-source-webpack-plugin](https://github.com/mzgoddard/hard-source-webpack-plugin)：DLL已被webpack4“优化”掉了，这是更好的DLL，webpack5可能会自带实现。

## 其它预装库

- fastclick
- Toast from Vant