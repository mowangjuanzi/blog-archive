# Git 基础用法

![](../images/20211021.jpg)

## 安装

直接执行以下命令即可

```bash
sudo apt install git
```

如果对版本有要求，需要使用最新版本的Git。可以通过以下命令安装：

```bash
sudo add-apt-repository ppa:git-core/ppa
sudo apt install git
```

## 配置秘钥

在拉取私有项目或者对项目进行提交代码时，需要检查你是否对项目的拉取和提交权限。

解决的方案有两种，第一种就是在URL中填写账户密码，其实这种并不安全，GitHub正在对其逐渐废弃。第二种就是配置秘钥的方式，这个安全性非常好。推荐这种方式。

```bash
$ ssh-keygen -t rsa -C "baoguoxiao0538@hotmail.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/home/mowangjuanzi/.ssh/id_rsa): 
Created directory '/home/mowangjuanzi/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/mowangjuanzi/.ssh/id_rsa
Your public key has been saved in /home/mowangjuanzi/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:lXOmP4F0IXyrbrNek9wTPJVP7sZmsAJxzTWyo2A0P+Y baoguoxiao0538@hotmail.com
The key's randomart image is:
+---[RSA 3072]----+
|         .. .o o.|
|          .oo.+.+|
|          *.=*o++|
|         o X=.++o|
|        S +o. =Eo|
|          .+ + B |
|         .  O + *|
|          +. + = |
|         ooo     |
+----[SHA256]-----+
```

然后通过以下命令获取秘钥

```bash
cat ~/.ssh/id_rsa.pub
```

然后将输出的内容添加到 [GitHub](https://github.com/settings/keys) 或者 [Gitee](https://gitee.com/profile/sshkeys)。

## 设置用户名和邮箱

下面的命令是全局设置

```bash
git config --global user.name "your name"
git config --global user.email "your email"
```

当然你也可以根据项目来设置不同的名称和密码。在指定的项目根目录执行以下命令：

```bash
git config user.name "your name"
git config user.email "your email"
```

## 小技巧

我这里列出了全局执行和单项目执行，直接取一个执行就好。

- 关闭换行符的转换

```bash
git config --global core.autocrlf false # 全局
git config core.autocrlf false # 针对项目
```

- 提交忽略文件权限

```bash
git config --global core.filemode false # 全局
git config core.filemode false # 针对项目
```

- Git历史中删除但不删除实际文件

```bash
git rm --cached FILENAME
```

- 修改默认编辑器 从nano修改为vim

```bash
git config --global core.editor vim # 全局
git config core.editor vim # 针对项目
```

- 显示两个 commit 的区别

```bash
git diff commit_id commit_id
```

- 显示两个 commit 中某个文件的区别

```bash
git diff commit_id commit_id FILENAME
```

- 查看 Git 版本

```bash
git --version
```

- 删除远程仓库已经删除过的分支

```bash
git remote prune origin
```

## 设置全局 `.gitignore`

```bash
echo -e "/.idea/\n/.vscode/" > ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global
```

## 以前 Windows 碰到的问题记录

- 有的电脑 win10 命令行或者 `git bash` 命令行 会出现空格现象。 

解决方案： `win+R` 打开 `cmd`，在标题栏上右键， 属性 -> 选项 -> 使用旧控制台样式(选中)

- 命令行反应缓慢

一般是因为双显卡引起的。我的是 amd 和 inter 双显卡。

解决方案： 打开 amd 控制中心 -> 游戏 -> 全局设置 -> 曲面细分模式 -> 使用应用程序的设置  

消除混杂模式 -> 使用应用程序设置

amd 可切换显卡应用程序设置 -> 将编辑器和 cmd 和 `git bash` 的都调为 高性能。