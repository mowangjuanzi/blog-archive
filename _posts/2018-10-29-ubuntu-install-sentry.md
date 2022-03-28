---
layout: post
title:  "Ubuntu 安装 Sentry"
---

![](../images/20181029.jpg)

```bash
sudo SENTRY_IMAGE=getsentry/sentry:21.10.0 ./install.sh
```

之前写过一篇。但是现在 sentry 已经过去很久了。重新整理一下。

## 前置条件

* Docker 19.03.6+
* Compose 1.28.0+
* 4 CPU Cores
* 8 GB RAM
* 20 GB Free Disk Space

## 安装

创建目录：

```bash
mkdir /data
```

然后拉取命令

```bash
git clone git@github.com:getsentry/self-hosted.git sentry
```

然后进入目录

```bash
cd sentry
```

因为代码是随时进行更新的，所以需要切换为已经发行的最新[稳定版本](https://github.com/getsentry/self-hosted/releases/latest)。

目前的稳定版本是 ‵22.3.0`。所以执行如下命令切换分支：

```bash
git checkout tags/22.3.0
```

这里需要注意下映射端口。因为默认绑定端口为 9000，这跟 php-fpm 服务默认绑定 9000 端口相重复。所以修改 `SENTRY_BIND` 从 `9000` 改成 `9999`：

```ini
COMPOSE_PROJECT_NAME=sentry-self-hosted
SENTRY_EVENT_RETENTION_DAYS=90
# You can either use a port number or an IP:PORT combo for SENTRY_BIND
# See https://docs.docker.com/compose/compose-file/#ports for more
SENTRY_BIND=9999
# Set SENTRY_MAIL_HOST to a valid FQDN (host/domain name) to be able to send emails!
# SENTRY_MAIL_HOST=example.com
SENTRY_IMAGE=getsentry/sentry:22.3.0
SNUBA_IMAGE=getsentry/snuba:22.3.0
RELAY_IMAGE=getsentry/relay:22.3.0
SYMBOLICATOR_IMAGE=getsentry/symbolicator:0.4.2
WAL2JSON_VERSION=latest
HEALTHCHECK_INTERVAL=30s
HEALTHCHECK_TIMEOUT=60s
HEALTHCHECK_RETRIES=5
```

修改完成配置后，执行如下命令即可安装：

```bash
sudo ./install.sh
```

好了，这样sentry就安装完成了。

> 其实并没有成功，我已经提交PR了。等修复之后再继续后面的编写。

## Nginx转发

```conf
server {
    listen 80;
    server_name abc.example.com;

    location / {
          proxy_set_header X-Real-IP  $remote_addr;
          proxy_set_header Host-Real-IP  $http_host;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Real-Pcol http;
          proxy_pass http://localhost:10000;
   }
}
```

这样我们就可以使用绑定的域名进行访问了。

## 端口安全

使用netstat命令查询端口状态：

```bash
# netstat -ntlp | grep 10000
tcp6       0      0 :::10000                :::*                    LISTEN      22354/docker-proxy
```

发现这个并没有绑定127.0.0.1。这里我并没有研究好如何绑定127.0.0.1。这里可以通过防火墙进行端口控制。比如阿里云的入网端口管理，或者centos的firewalld命令都可以进行控制。具体就不展开了。

PS：明天具体写如何配置邮件发送。