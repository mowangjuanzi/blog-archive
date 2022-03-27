# Ubuntu 安装 Nginx

![](../images/20211106.jpg)

使用 apt 安装 nginx，方便快捷，省去了编译失败的可能。

## 支持平台

| 版本 | 别名 | 支持平台 |
|:----:|:----:|:----:|
| 18.04 | bionic | x86_64, aarch64/arm64 |
| 20.04 | focal | x86_64, aarch64/arm64 |
| 21.04 | hirsute | x86_64, aarch64/arm64 |
| 21.10 | impish | x86_64, aarch64/arm64 |


我这里的ubuntu的环境是21.10。通过上面的表格可以了解到我这里是支持安装的。

## 安装

首先，载入官方签名 key

```bash
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
```

然后执行命令添加源

```bash
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg arch=amd64] http://nginx.org/packages/mainline/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
```

> 这里介绍一下，跟官网的安装命令稍微有一点点的区别。区别是在于限定了版本是 `amd64`。因为如果不设置，会在更新时弹出以下警告：
>
> ```bash
> N: 鉴于仓库 'http://nginx.org/packages/mainline/ubuntu impish InRelease' 不支持 'i386' 体系结构，跳过配置文件 'nginx/binary-i386/Packages' 的获取。
> ```

好了。添加完成之后，执行如下命令：

```bash
sudo apt update
```

下面就可以进行安装了，只需执行以下命令：

```bash
sudo apt install nginx
```

执行完成之后，这样就安装完成了，是不是非常方便呢。

## 管理命令

启动：

```bash
sudo systemctl start nginx
```

停止:

```bash
sudo systemctl stop nginx
```

重启：

```bash
sudo systemctl restart nginx
```

状态：

```bash
sudo systemctl status nginx
```

默认开机启动，可以使用如下命令取消开机启动

```bash
sudo systemctl disable nginx
```

## 用户权限

nginx 默认的用户和用户组是 `nginx`。这里为了和FPM做配合，需要将其修改为 `www-data` 用户

首先打开 `etc/nginx/nginx.conf`：

```nginx
user  nginx;
worker_processes  auto;
```

将其修改如下：

```nginx
user  www-data;
worker_processes  auto;
```

然后重启 nginx。

这里要注意的是修改 Nginx 日志的权限问题。

执行如下命令对其进行修改用户群权限。

```bash
sudo chown www-data:www-data /var/log/nginx/*
```