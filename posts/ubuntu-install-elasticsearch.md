# Ubuntu 安装 ElasticSearch

![](../images/20210916.jpg)

> 2022-03-15 已更新为 v8 版本。

## 前置条件

> 本环境默认是在 Ubuntu21.10 上操作的。

## Elasticsearch PGP公钥和源

在安装之前我们需要下载和安装公钥，否则没有办法使用apt安装 Elasticsearch。

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
```

添加源：

```bash
sudo apt install apt-transport-https
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list
```

## 安装Elasticsearch

接下来，我们就可以更新源毕竟切装Es了：

```bash
sudo apt update && sudo apt install elasticsearch
```

这样就安装好了。

这里需要注意的是在安装过程中会出现如下信息：

```bash
--------------------------- Security autoconfiguration information ------------------------------

Authentication and authorization are enabled.
TLS for the transport and HTTP layers is enabled and configured.

The generated password for the elastic built-in superuser is : <password>

If this node should join an existing cluster, you can reconfigure this with
'/usr/share/elasticsearch/bin/elasticsearch-reconfigure-node --enrollment-token <token-here>'
after creating an enrollment token on your existing cluster.

You can complete the following actions at any time:

Reset the password of the elastic built-in superuser with 
'/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic'.

Generate an enrollment token for Kibana instances with 
 '/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana'.

Generate an enrollment token for Elasticsearch nodes with 
'/usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s node'.
```

因为从 es 8 开始默认开启并启动安全功能，所以默认会启动认证，并为超级用户 `elastic` 生成一个密码，密码就在上面的 `<password>`。



## Elasticsearch命令管理

我们可以使用`systemd`方式进行Elasticsearch进行管理

### `systemd`

设置开机启动：

```bash
sudo systemctl daemon-reload
sudo systemctl enable elasticsearch
```

启动：

```bash
sudo systemctl start elasticsearch
```

关闭：

```bash
sudo systemctl stop elasticsearch
```

重新启动

```bash
sudo systemctl restart elasticsearch
```

## 检测是否安装成功：

首先我们要执行命令将其启动（如果已经启动了，那就不用执行下面的启动命令了）：

```bash
sudo systemctl start elasticsearch
```

然后执行以下命令：

```bash
sudo curl --cacert /etc/elasticsearch/certs/http_ca.crt -u elastic https://localhost:9200
```

如果返回的数据如下所示，即表示安装成功了：

```json
{
  "name" : "mowangjuanzi",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "0LoyDy-nQ92uf9kiiCCnsg",
  "version" : {
    "number" : "8.1.0",
    "build_flavor" : "default",
    "build_type" : "deb",
    "build_hash" : "3700f7679f7d95e36da0b43762189bab189bc53a",
    "build_date" : "2022-03-03T14:20:00.690422633Z",
    "build_snapshot" : false,
    "lucene_version" : "9.0.0",
    "minimum_wire_compatibility_version" : "7.17.0",
    "minimum_index_compatibility_version" : "7.0.0"
  },
  "tagline" : "You Know, for Search"
}
```

> 注意：Elasticsearch需要启动一会。如果启动完成立马执行上面的命令，可以会提示拒绝连接，多试几次就好了。

## 配置 Elasticsearch

Elasticsearch 默认情况下从 **/etc/elasticsearch/elasticsearch.yml** 文件中加载它的配置。

Debian 包也有一个系统配置文件（`/etc/default/elasticsearch`），它允许你设置以下参数：

| 参数 | 解释 |
| --- | --- |
| `ES_JAVA_HOME` | 设置要使用的自定义 Java 路径 |
| `ES_PATH_CONF` | 配置文件目录（需要包含 `elasticsearch.yml`, `jvm.options` 和 `log4j2.properties` 文件），默认路径是： `/etc/elasticsearch` |
| `ES_JAVA_OPTS` | 你可能希望应用的任何其他 JVM 系统属性。 |
| `RESTART_ON_UPGRADE` | 配置软件包升级时将会重新启动，默认是 `false` 。这意味着你在手动安装软件包之后重启elasticsearch实例。这样做的原因是为了保障, 在集群中更新时，在高流量网络和减少你集群的响应时间的情况下导致分片的重新分配。 |

## 包的目录布局

| 类型 | 描述 | 默认路径 | 设置 |
| --- | --- | --- | --- |
| **home** | Elasticsearch home 目录或者 `$ES_HOME` | `/usr/share/elasticsearch` |  |
| **bin** | 二进制脚本，包括 `elasticsearch` 去启动节点和 `elasticsearch-plugin` 安装插件 | `/usr/share/elasticsearch/bin` |  |
| **conf** | 配置文件，包含 `elasticsearch.yml` | `/etc/elasticsearch` | `[ES_PATH_CONF](https://www.elastic.co/guide/en/elasticsearch/reference/current/settings.html#config-files-location)` |
| **conf** | 环境变量，包含 heap size，文件描述符。 | `/etc/default/elasticsearch` |  |
| **conf** | 为传输层和 http 层生成的 TLS 密钥和证书。 | `/etc/elasticsearch/certs` | |
| **data** | 在节点上分配的每个索引/分片的数据文件的位置。 | `/var/lib/elasticsearch` | `path.data` |
| **jdk** | 用于捆绑运行 ElasticSearch 的 JDK。可以通过在 `/etc/default/elasticsearch` 中设置 `ES_JAVA_HOME` 环境变量来覆盖。 | `/usr/share/elasticsearch/jdk` |  |
| **logs** | 日志文件位置。 | `/var/log/elasticsearch` | `path.logs` |
| **plugins** | 插件文件位置。每个插件将包含在一个子目录中. | `/usr/share/elasticsearch/plugins` |  |
| **repo** | 共享文件系统存储库位置。可以容纳多个位置。文件系统存储库可以放置在指定目录中任何子目录中。 | 不能配置 | `path.repo` |
