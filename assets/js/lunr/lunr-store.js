var store = [{
        "title": "山东炒鸡",
        "excerpt":"原料      三黄鸡，最好黑爪鸡。   步骤      将鸡进行分块，目标是3cm*3cm的小块，用水洗几遍。   锅里放油，将姜切片，放入锅中炒香。   然后放入调料（花椒，八角，桂皮，白芷）炒香   放入鸡肉翻炒，一直到有嘎崩的响声。   放入糖，鸡精，胡椒粉，啤酒炖15 ～ 20分钟（这里的时间按照半年15~20分钟计算，1年半就是45～60分钟）。   收汁，（调口？）然后放入拍好的大蒜，以及切好的大葱   放入切好的辣椒，香菜翻炒两下，出锅。   来源      炒鸡：https://www.bilibili.com/video/BV1x64y1975F  ","categories": ["docker"],
        "tags": ["ubuntu","docker"],
        "url": "/cook/2022-03-19-shan-dong-chao-ji/",
        "teaser": null
      },{
        "title": "Ubuntu 安装 Sentry",
        "excerpt":"之前写过一篇。但是现在 sentry 已经过去很久了。重新整理一下。 前置条件 Docker 19.03.6+ Compose 1.28.0+ 4 CPU Cores 8 GB RAM 20 GB Free Disk Space 安装 创建目录： mkdir /data 然后拉取命令 git clone git@github.com:getsentry/self-hosted.git sentry 然后进入目录 cd sentry 因为代码是随时进行更新的，所以需要切换为已经发行的最新稳定版本。 目前的稳定版本是 ‵22.3.0`。所以执行如下命令切换分支： git checkout tags/22.3.0 这里需要注意下映射端口。因为默认绑定端口为 9000，这跟 php-fpm 服务默认绑定 9000 端口相重复。所以修改 SENTRY_BIND 从 9000 改成 9999： COMPOSE_PROJECT_NAME=sentry-self-hosted SENTRY_EVENT_RETENTION_DAYS=90...","categories": ["sentry"],
        "tags": ["ubuntu","sentry"],
        "url": "/sentry/ubuntu-install-sentry/",
        "teaser": null
      },{
        "title": "Ubuntu 下安装 Docker",
        "excerpt":"老版本 docker 卸载 老版本的docker叫做 docker，docker.io，或者说 docker-engine。如果安装了，删除它们。 sudo apt remove docker docker-engine docker.io containerd runc 如果你已经存在已安装的镜像，容器，数据卷，或者自定义的配置文件需要删除，可执行以下命令： sudo rm -rf /var/lib/docker sudo rm -rf /var/lib/containerd 安装 Docker 首先安装 Docker 官方 GPG key： curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg 设置官网稳定版本源： echo \"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable\" |...","categories": ["docker"],
        "tags": ["ubuntu","docker"],
        "url": "/docker/ubuntu-install-docker/",
        "teaser": null
      },{
        "title": "Git 基础用法",
        "excerpt":"Git 基础用法 安装 直接执行以下命令即可 sudo apt install git 如果对版本有要求，需要使用最新版本的Git。可以通过以下命令安装： sudo add-apt-repository ppa:git-core/ppa sudo apt install git 配置秘钥 在拉取私有项目或者对项目进行提交代码时，需要检查你是否对项目的拉取和提交权限。 解决的方案有两种，第一种就是在URL中填写账户密码，其实这种并不安全，GitHub正在对其逐渐废弃。第二种就是配置秘钥的方式，这个安全性非常好。推荐这种方式。 $ ssh-keygen -t rsa -C \"baoguoxiao0538@hotmail.com\" Generating public/private rsa key pair. Enter file in which to save the key (/home/mowangjuanzi/.ssh/id_rsa): Created directory '/home/mowangjuanzi/.ssh'. Enter passphrase (empty for no passphrase): Enter same...","categories": ["git"],
        "tags": ["git"],
        "url": "/git/git-basic-usage/",
        "teaser": null
      },{
        "title": "Ubuntu 安装后",
        "excerpt":"执行 sudo 命令忽略密码 // TODO 安装 VSCode 参考：https://code.visualstudio.com/docs/setup/linux 安装源： cd /tmp wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor &gt; packages.microsoft.gpg sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/ sudo sh -c 'echo \"deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main\" &gt; /etc/apt/sources.list.d/vscode.list' 安装程序： sudo apt update sudo apt install code 安装...","categories": ["ubuntu"],
        "tags": ["ubuntu"],
        "url": "/ubuntu/ubuntu-post-installation/",
        "teaser": null
      },{
        "title": "Ubuntu 安装 NodeJS",
        "excerpt":"Ubuntu 目前支持 16.04 ~ 21.10 版本的。 安装 Node 以下命令安装的是长期支持版，也就是大部分人推荐安装的版本： 安装时可能需要输入 root 密码。 curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - sudo apt install -y nodejs 这样就安装完成了。并且顺带着安装了 npm。 下面查看下安装的版本。 $ node -v v16.14.2 $ npm -v 8.5.0 安装 yarn corepack 在 node &gt;= 16.10 是默认安装的，但是并未开启，需要执行以下命令启动： sudo corepack enable 现在查看下 yarn 的版本:...","categories": ["nodejs"],
        "tags": ["ubuntu","nodejs"],
        "url": "/nodejs/ubuntu-install-node/",
        "teaser": null
      }]
