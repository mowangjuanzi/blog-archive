# Ubuntu 安装 NodeJS

Ubuntu 目前支持 16.06 ~ 21.10 版本的。

## 安装 node 和 npm

以下命令安装的是长期支持版，也就是大部分人推荐安装的版本：

> 安装时可能需要输入 root 密码。

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

这样就安装完成了。并且顺带着安装了 yarn。

下面查看下安装的版本。

```bash
$ node -v
v14.18.1
$ npm -v
6.14.15
```

## 安装 yarn

如果你想用 `yarn`。也可以使用如下命令安装:

```bash
$ sudo npm install -g yarn

> yarn@1.22.17 preinstall /usr/lib/node_modules/yarn
> :; (node ./preinstall.js > /dev/null 2>&1 || true)

/usr/bin/yarn -> /usr/lib/node_modules/yarn/bin/yarn.js
/usr/bin/yarnpkg -> /usr/lib/node_modules/yarn/bin/yarn.js
+ yarn@1.22.17
added 1 package in 13.702s
$ yarn -v
1.22.17
```

这样就齐活了。

## 设置镜像

其实淘宝是提供了镜像，可以对其进行加速。

执行以下命令就可以直接加速了：

```bash
npm config set registry https://registry.npm.taobao.org
```

## npm 基本用法

## 尾巴

我能想到的就是这些了。后续如果还有什么我再去更新。