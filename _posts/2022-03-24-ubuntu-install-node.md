---
layout: posts
title:  "Ubuntu 安装 NodeJS"
last_modified_at: 2022-03-14T22:38:00
categories:
  - nodejs
tags:
  - ubuntu
  - nodejs
excerpt: ""
header:
  overlay_image: /assets/images/20220314.jpg
---

Ubuntu 目前支持 16.04 ~ 21.10 版本的。

## 安装 Node

以下命令安装的是长期支持版，也就是大部分人推荐安装的版本：

> 安装时可能需要输入 root 密码。

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

这样就安装完成了。并且顺带着安装了 npm。

下面查看下安装的版本。

```bash
$ node -v
v16.14.2
$ npm -v
8.5.0
```

## 安装 yarn

corepack 在 node >= 16.10 是默认安装的，但是并未开启，需要执行以下命令启动：

```bash
sudo corepack enable
```

现在查看下 yarn 的版本:

```bash
$ yarn -v
1.22.15
```

这样就齐活了。

## 设置镜像

这里需要注意的是，[淘宝镜像即将停止解析](https://zhuanlan.zhihu.com/p/465424728) ，需要使用 npmmirror 进行替换。

```bash
npm config set registry https://registry.npmmirror.com
```

## npm 基本用法

// TODO

## 尾巴

我能想到的就是这些了。后续如果还有什么我再去更新。