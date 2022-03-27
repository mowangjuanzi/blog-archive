# Ubuntu 安装后

![](../images/20220313.jpg)

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