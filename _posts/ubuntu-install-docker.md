# Ubuntu 下安装 Docker

![](../images/20211030.jpg)

## 老版本 docker 卸载

老版本的docker叫做 `docker`，`docker.io`，或者说 `docker-engine`。如果安装了，删除它们。

```bash
sudo apt remove docker docker-engine docker.io containerd runc
```

如果你已经存在已安装的镜像，容器，数据卷，或者自定义的配置文件需要删除，可执行以下命令：

```bash
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

## 安装 Docker

首先安装 Docker 官方 GPG key：

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

设置官网稳定版本源：

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

更新索引，并安装最新版本的 docker。

```bash
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

通过运行`hello-world`镜像确认 Docker Engine 是否安装正确：

```bash
sudo docker run hello-world
```

## 安装后设置

- 非root用户运行

创建 `docker` 用户组（执行这一步可能会提示该用户组已经存在）：

```bash
sudo groupadd docker
```

然后添加当前登录的 用户到 `docker` 组。

```bash
sudo usermod -aG docker $USER
```

执行以下命令，实现更改。

```bash
newgrp docker 
```

- 开机启动

这个在 Ubuntu 上是默认启动的。如果需要禁用自动自动可执行以下命令：

```bash
sudo systemctl disable docker.service
sudo systemctl disable containerd.service
```

## Docker Compose 安装

之前的 v1 版本是使用 Python 实现的。然后 v2 是使用 Golang进行的重写。所以在命令上可能会有些不同。

安装命令如下：

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.0.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

对二进制文件赋予执行权限

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

执行如下命令测试安装

```bash
$ docker-compose --version
Docker Compose version v2.0.1
```

## Docker Compose 卸载

直接执行如下命令即可：

```bash
sudo rm /usr/local/bin/docker-compose
```

## Docker 添加镜像

首先使用打开 `/etc/docker/daemon.json`，并添加以下内容

```json
{
  "registry-mirrors": ["http://hub-mirror.c.163.com"]
}
```

最后重启服务：

```bash
sudo systemctl restart docker.service
```

## 总结

好了。基本上 Ubuntu 下安装 Docker 就介绍完毕了。