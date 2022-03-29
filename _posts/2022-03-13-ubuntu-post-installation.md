---
layout: posts
title:  "Ubuntu 安装后"
last_modified_at: 2022-03-13T00:00:00
categories:
  - ubuntu
tags:
  - ubuntu
excerpt: ""
header:
  overlay_image: /assets/images/20220313.jpg
---

## 执行 `sudo` 命令忽略密码

// TODO

## 安装 VSCode

> 参考：https://code.visualstudio.com/docs/setup/linux

安装源：

```bash
cd /tmp
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
```

安装程序：

```bash
sudo apt update
sudo apt install code
```

## 安装 Microsoft Edge 浏览器

> 参考：https://www.microsoftedgeinsider.com/zh-cn/download/

```bash
cd /tmp
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /usr/share/keyrings/
sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/repos/edge stable main" > /etc/apt/sources.list.d/microsoft-edge-beta.list'
sudo apt update
sudo apt install microsoft-edge-stable
```

## 安装 Git

参考 [Git 基础用法](./git-basic-usage.md)

## 安装 SimpleNote

```bash
sudo snap find simplenote
```

## 邮件客户端

```bash
sudo apt install thunderbird thunderbird-locale-zh-hans
```

## QQ 音乐

下载地址: https://y.qq.com/download/download.html

双击安装。

## 网盘/下载 —— 百度网盘

下载：https://pan.baidu.com/download

双击安装。

## 小技巧

- 终端临时设置语言：

```bash
locale -a # 获取已经安装的语言
LANG=en_US # 临时设置语言
```

- 修复 apt 安装错误

如果出现以下问题：

```bash
$ sudo apt --fix-broken install
正在读取软件包列表... 完成
正在分析软件包的依赖关系树... 完成
正在读取状态信息... 完成                 
正在修复依赖关系... 完成
下列软件包是自动安装的并且现在不需要了：
  libpcre2-posix2
使用'sudo apt autoremove'来卸载它(它们)。
将会同时安装下列软件：
  libpcre2-posix3
下列【新】软件包将被安装：
  libpcre2-posix3
升级了 0 个软件包，新安装了 1 个软件包，要卸载 0 个软件包，有 4 个软件包未被升级。
有 4 个软件包没有被完全安装或卸载。
需要下载 0 B/8,354 B 的归档。
解压缩后会消耗 34.8 kB 的额外空间。
您希望继续执行吗？ [Y/n] y
(正在读取数据库 ... 系统当前共安装有 274263 个文件和目录。)
准备解压 .../libpcre2-posix3_10.39-3+ubuntu21.10.1+deb.sury.org+1_amd64.deb  ...
正在解压 libpcre2-posix3:amd64 (10.39-3+ubuntu21.10.1+deb.sury.org+1) ...
dpkg: 处理归档 /var/cache/apt/archives/libpcre2-posix3_10.39-3+ubuntu21.10.1+deb.sury.org+1_amd64.deb (--unpack)时出错：
 正试图覆盖 /usr/lib/x86_64-linux-gnu/libpcre2-posix.so.3.0.1，它同时被包含于软件包 libpcre2-posix2:amd64 10.39-2+ubuntu21.10.1+deb.sury.org+1
在处理时有错误发生：
 /var/cache/apt/archives/libpcre2-posix3_10.39-3+ubuntu21.10.1+deb.sury.org+1_amd64.deb
E: Sub-process /usr/bin/dpkg returned an error code (1)
```

可以通过以下命令修复：

```bash
$ sudo dpkg --purge libpcre2-dev
dpkg: 依赖问题阻止了卸载 libpcre2-dev:amd64 的操作：
 php8.1-dev 依赖于 libpcre2-dev (>= 10.30).

dpkg: 处理软件包 libpcre2-dev:amd64 (--purge)时出错：
 依赖问题 - 不会执行卸载
在处理时有错误发生：
 libpcre2-dev:amd64
$ sudo dpkg --purge php8.1-dev
(正在读取数据库 ... 系统当前共安装有 274263 个文件和目录。)
正在卸载 php8.1-dev (8.1.3-1+ubuntu21.10.1+deb.sury.org+1) ...
正在处理用于 man-db (2.9.4-2) 的触发器 ...
$ sudo dpkg --purge libpcre2-dev
(正在读取数据库 ... 系统当前共安装有 273904 个文件和目录。)
正在卸载 libpcre2-dev:amd64 (10.39-3+ubuntu21.10.1+deb.sury.org+1) ...
正在处理用于 man-db (2.9.4-2) 的触发器 ...
```