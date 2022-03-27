# Ubuntu 安装 Docker

## 卸载老版本

老版本的 docker 叫做 `docker`，`docker.io` 或者 `docker-engine`，先卸载它们。

‵``bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

添加官方 GPG key：

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

添加稳定源：

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
```

安装：

```bash
sudo apt install docker-ce docker-ce-cli containerd.io
```

验证 `docker` 引擎是否正确安装：

```bash
sudo docker run hello-world
```

## 卸载



## 来源

https://docs.docker.com/engine/install/ubuntu/