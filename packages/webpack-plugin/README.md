## web-auto-notify-webpack

适用于vue-cli脚手架
记录每次提交commit，将commitId记录到打包对应的地址的pluginWebUpdateNotice文件夹的web_version_by_plugin.json中


.npmrc文件中指定

```
registry=https://registry.npmjs.org/
```

下载:`npm i -D web-auto-notify-webpack`

使用demo
在vue.config.js中引入

```js
const { WebUpdateNotificationPlugin }  = require('web-auto-notify-webpack')

...
plugins: [
  new WebUpdateNotificationPlugin({
    logVersion: true,
    injectFileBase: "./abc/"
  })
],

// injectFileBase: 如果是微应用中的子应用，需要指定自定义的目录，如果是单独的后台，可以直接省略这个参数
....

```