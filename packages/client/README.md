## web-auto-notify-client

后台提示自动更新机制，与web-auto-notify-webpack插件搭配一起使用

定时去读取pluginWebUpdateNotice/web_version_by_plugin.json文件中的版本号


## 何时去读取
1.首次加载页面时

2.定时（10min/1次）

3.静态资源获取失败（404）

4.页面refocus或者revisible


## 使用demo
在main.js中引入

```js
import { __checkUpdateSetup__ } from "web-auto-notify-client";


__checkUpdateSetup__({ logVersion: true, injectFileBase: "/abc/" });

// injectFileBase: 如果是微应用中的子应用，需要指定自定义的目录，如果是单独的后台，可以直接省略这个参数

```


## 自定义样式
可以全局样式覆盖

```html
<!-- notification html content -->

<div class="plugin-web-update-notice-anchor">
  <div class="plugin-web-update-notice">
    <div class="plugin-web-update-notice-content" data-cy="notification-content">
      <div class="plugin-web-update-notice-content-title">
        📢 发现新版本
      </div>
      <div class="plugin-web-update-notice-content-desc">
        ⭐ 网页更新啦！请刷新页面后使用。
      </div>
      <div class="plugin-web-update-notice-tools">
        <a class="plugin-web-update-notice-btn plugin-web-update-notice-dismiss-btn">忽略</a>
        <a class="plugin-web-update-notice-btn plugin-web-update-notice-refresh-btn">
          刷新
        </a>
      </div>
    </div>
  </div>
</div>
```


## 自定义html内容

customNotificationHTML自定义html， 如果使用该参数，就不会有默认的内容

```js
import { __checkUpdateSetup__ } from "web-auto-notify-client";

__checkUpdateSetup__(
  {
    logVersion: true,
    injectFileBase: "/abc/",
    customNotificationHTML: `<div>自定义<div>`
  }
);

```
