## ElasticSearch 添加 APM 支持

![](../images/20210921.jpg)

本篇文章主要是解释如何使用 ES 的 APM 功能进行获取运行状态。其实官网有安装流程，我仅仅是把我安装的过程记录下。

## 前言

因为阿里云有 ARMS。正好跟网上的朋友沟通的时候知道了 APM。突然发现阿里云的 AMRS 不就是 APM 么。又因为 ARMS 只最高支持PHP7.3，所以我特意过来看下ES的APM如何安装，因为它支持PHP8.0。支持的版本也比较新。

阿里云本来是有 ARMS，但是因为已经不再更新，最新版本仅支持 PHP 7.3。所以特意学习一下 ElasticSearch 的 APM 功能使用。

## Elastic PGP 公钥和源

如果已经按照我的示例添加过 [ubuntu 安装 ElasticSearch](./ubuntu-install-elasticsearch.md)和[ubuntu 安装 kibana](./ubuntu-install-kibana.md) 则可以跳过该公钥和源设置。

在安装之前我们需要下载和安装公钥，否则没有办法使用 apt 安装 APM。

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
```

添加源：

```bash
sudo apt install apt-transport-https
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list
```

## 安装所需的包

这里我们需要的是 apm-server。执行以下命令即可安装：

```bash
sudo apt install apm-server
```

安装完成后我们需要配置 APM Server 请求 ElasticSearch 的认证信息。

主要是修改 `/etc/apm-server/apm-server.yml` 文件中的以下配置：

```yml
output.elasticsearch:
    hosts: ["<es_url>"]
    username: <username>
    password: <password>
```

还记得我们在安装 ElasticSearch 时生成的密码吗？

## 管理命令

启动：

```bash
sudo systemctl start apm-server
```

停止：

```bash
sudo systemctl stop apm-server
```

重新启动：

```bash
sudo systemctl restart apm-server
```

设置开机启动：

```bash
sudo systemctl enable apm-server
```

取消开机启动

```bash
sudo systemctl disable apm-server
```

查看运行状态

```bash
sudo systemctl status apm-server
```

## PHP Agent

这里需要安装一个扩展。首先的话是需要安装PHP的。这里有一篇安装 [PHP8.0](https://www.yuque.com/mowangjuanzi/techblog/zc46wi) 的文章可以用来参考。

> 如果不是 `apt` 安装的 PHP，建议采用下面的 [手动安装](#%E6%89%8B%E5%8A%A8%E5%AE%89%E8%A3%85) 的办法。


首先从 [GitHub 包下载](https://github.com/elastic/apm-agent-php/releases/latest) 中下载指定的 `deb` 包。

然后执行命令安装 `agent`:

```bash
sudo dpkg -i <package-file>.deb
```

安装成功后可编辑的配置文件地址为：`/etc/php/8.0/fpm/conf.d/99-elastic-apm-custom.ini`。

## 手动安装

可以执行如下步骤进行编译安装。

首先我们需要将源代码存储到一个目录中。比如说 `/usr/local/src`。

首先就是下载文件并解压：

```bash
sudo wget -c https://github.com/elastic/apm-agent-php/archive/refs/tags/v1.3.tar.gz
sudo tar zxf v1.3.tar.gz
```

然后我们切入要编译的目录并执行编译命令

```bash
cd apm-agent-php-1.3/src/ext
sudo phpize
sudo CFLAGS="-std=gnu99" ./configure --enable-elastic_apm
sudo make
sudo make install
```

完成后在 `php.ini` 添加以下配置，以便启用 `elastic_apm`。

```ini
extension=elastic_apm.so
elastic_apm.bootstrap_php_part_file=<repo root>/src/bootstrap_php_part.php
```

## 配置

- `elastic_apm.environment`

设置环境名称。比如说测试环境可以设置为 `testing` 或者 `production`。用来区分环境变量。

- `elastic_apm.hostname`

设置主机名称。因为默认都是随机的名称，可以设置为更加人性化的名称。如果该名称没有设置，则默认读取主机的名称

- `elastic_apm.server_url`

APM 服务器的链接地址。包含协议和端口。默认地址是 `http://localhost:8200`，如果 APM 服务器不在本机则需要进行设置。

- `elastic_apm.service_name`

服务的名称。也就是项目的名称。比如说 `api` 项目, `base` 项目等。

- `elastic_apm.service_node_name`

节点名称。当有web集群的时候，该设置特别有用。比如说名称为 `php-1`等等。

- `elastic_apm.service_version`

服务的版本号。比如说PHP的话可以使用 `commit ID` 作为版本号。可以设置为 `git rev-parse HEAD` 或者使用简写 `git log --pretty="%h" -n1 HEAD`。

- `elastic_apm.transaction_sample_rate`

设置对请求采样的频率。默认是 `1.0`，范围是 `0.0` ~ `1.0` 之间，如果为不收集，则不记录上下文信息，标签或者跨度。

## 最后

这样重启PHP，访问几个链接就可以在 Kibana 中查看到 APM 收集的相关信息了。
