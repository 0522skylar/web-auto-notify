# 微应用自动更新提示

在子应用中监听各自是否需要更新

## webpack-plugin

build构建时，保存最新的git commitId值作为版本号，保存到一个json文件中，方便客户端去请求最新的版本号

将版本号同静态资源一样保存起来，方便客户端去读取最新的版本号

具体使用，请查看[client](./packages/webpack-plugin/README.md)

## client

需要提示用户，网页更新啦！请刷新页面后使用。

什么时候去请求最新的版本号？

1.首次加载页面时

2.定时（10min/1次）

3.静态资源获取失败（404）

4.页面refocus或者revisible


具体使用，请查看[client](./packages/client/README.md)