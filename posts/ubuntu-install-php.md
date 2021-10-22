# Ubuntu 下安装 PHP

![](../images/20210328.jpg)

## 安装所需依赖

首先我们先安装一些依赖的包，以便后期进行安装处理：

```
sudo apt install ca-certificates apt-transport-https software-properties-common
```

首先我们执行以下命令安装PPA：

```
sudo add-apt-repository ppa:ondrej/php
```

这里有个注意事项，就是执行到一半，出现以下文字是需要一个回车才可以继续执行的。

```
Press [ENTER] to continue or Ctrl-c to cancel adding it.
```

执行完成后，我们看下目前的PHP的默认版本变成了多少

```
$ sudo apt show php
Package: php
Version: 2:8.0+82+ubuntu20.04.1+deb.sury.org+1
Priority: optional
Section: php
Source: php-defaults (82+ubuntu20.04.1+deb.sury.org+1)
Maintainer: Debian PHP Maintainers <team+pkg-php@tracker.debian.org>
Installed-Size: 13.3 kB
Depends: php8.0
Download-Size: 6,960 B
APT-Sources: http://ppa.launchpad.net/ondrej/php/ubuntu focal/main amd64 Packages
Description: server-side, HTML-embedded scripting language (default)
 PHP (recursive acronym for PHP: Hypertext Preprocessor) is a widely-used
 open source general-purpose scripting language that is especially suited
 for web development and can be embedded into HTML.
 .
 This package is a dependency package, which depends on latest stable
 PHP version (currently 8.0).

N: 有 1 条附加记录。请加上 ‘-a’ 参数来查看它们
```

可以看到默认的PHP版本已经从系统自带的7.4变成8.0了。

## 安装PHP

执行以下命令安装8.0的PHP：

```
sudo apt install php-fpm
```

也按照以下方法安装其他版本的PHP：

```
sudo apt install php7.4-fpm
```

我目前查询了一下，该PPA目前支持 `5.6.* ~ 8.0.*` 系列。

安装成功后可以执行命令查看下目前的版本：

```
$ php -v
PHP 8.0.3 (cli) (built: Mar  5 2021 07:54:13) ( NTS )
Copyright (c) The PHP Group
Zend Engine v4.0.3, Copyright (c) Zend Technologies
    with Zend OPcache v8.0.3, Copyright (c), by Zend Technologies
```

## 可执行命令

常用的有以下命令：

- php
- php-fpm
- pecl
- phpize
- php-config
- pear
- 等等

## 路径

日志路径:

```
$ ls /var/log/php*
/var/log/php7.4-fpm.log        /var/log/php8.0-fpm.log
```

## 管理命令

启动：

```
sudo systemctl start php8.0-fpm
```

停止：

```
sudo systemctl stop php8.0-fpm
```

重新启动：

```
sudo systemctl restart php8.0-fpm
```

设置开机启动：

```
sudo systemctl enable php8.0-fpm
```

取消开机启动

```
sudo systemctl disable php8.0-fpm
```

查看运行状态

```
sudo systemctl status php8.0-fpm
```

## apt 安装扩展

安装扩展可以执行以下命令：

```
sudo apt install php-mbstring php-dom php-mysql
```

通过这种方式可以安装一些扩展。

我们可以通过执行以下命令来查看可以安装那些扩展：

```
sudo apt search php-*
```

## 手动安装扩展

首先我们先安装PHP的编译依赖包

```
sudo apt install php-dev
```

> 这里还是要提醒下，如果要安装的不是默认版本的编译依赖包，需要执行版本。比如 `php7.4-dev`。

比如说安装一个 apt 不存在的包，可以执行如下命令：

```
sudo pecl install seaslog
```

这样就安装完成了。

## 配置文件

这里要介绍一下安装扩展的情况。因为PHP有两种运行方式，一种是FPM，一种是CLI。所以它可以控制一个扩展只在FPM加载，而不在CLI加载的方式。

首先看下它的目录

```
$ ls /etc/php/8.0/
cli  fpm  mods-available
```

首先我们扩展的管理是存储到 `mods-available` 中的。

然后如果我们要控制FPM加载这个某个配置，那么就要进行创建软链。

我们查看下面的命令就了解了：

```
$ ll /etc/php/8.0/fpm/conf.d/20-mbstring.ini 
lrwxrwxrwx 1 root root 40  7月 16 22:34 /etc/php/8.0/fpm/conf.d/20-mbstring.ini -> /etc/php/8.0/mods-available/mbstring.ini
```

好了。基本上介绍就是这样了。