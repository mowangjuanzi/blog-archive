# Ubuntu 安装 Kibana

![](../images/20210917.jpg)

> 2022-03-16 已更新为 v8.1 版本。

## 前置条件

> 本环境默认是在 Ubuntu 21.10 上操作的。


如果你已经参考过之前的文章，已经安装了 [ElasticSearch](./ubuntu-install-elasticsearch.md)。那么可以直接跳转到安装小节。

## Elastic PGP 公钥和源

在安装之前我们需要下载和安装公钥，否则没有办法使用 apt 安装 Kibana。

```bash
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
```

添加源：

```bash
sudo apt install apt-transport-https
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] https://artifacts.elastic.co/packages/8.x/apt stable main" | sudo tee /etc/apt/sources.list.d/elastic-8.x.list
```

## 安装 Kibana

接下来，我们就可以更新源毕竟切装Es了：

```bash
sudo apt update && sudo apt install kibana
```

这样就安装好了。

## Kibana 命令管理

我们可以使用 `systemd` 方式进行 Kibana 进行管理

### `systemd`

设置开机启动：

```bash
sudo systemctl daemon-reload
sudo systemctl enable kibana
```

启动：

```bash
sudo systemctl start kibana
```

关闭：

```bash
sudo systemctl stop kibana
```

查看状态：

```bash
sudo systemctl status kibana
```

然后在浏览器中使用 http://localhost:5601 访问。

## 访问配置

访问后提示需要提供 `Enrollment token`，可以执行如下命令获取 `token`

```bash
sudo /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

将获取到的 token 粘贴到刚刚在浏览器中打开的网页的 input 输入框中。

点击 `Configure Elastic` 按钮，接着出现一个弹出框，要求输入 `Verification required` 的 `code`。

接着执行如下命令获取 `code`：

```bash
$ sudo /usr/share/kibana/bin/kibana-verification-code 
Your verification code is:  756 267
```

点击 `verify` 验证输入的六位数验证码是否正确。接着跳转到一个登录页面，输入 Es 的用户名和密码。还记得安装 ElasticSearch 中出现的密码吗？

## Kibana 配置文件

Kibana 默认加载的配置文件位置为 `/etc/kibana/kibana.yml`，关于配置文件的具体解释可以参考[配置 Kibana](https://www.elastic.co/guide/en/kibana/8.1/settings.html)

这里只介绍一个，就是 `i18n.locale`。它的位置在最后一行。

我们修改配置值如下：

```yml
i18n.locale: "zh-CN"
```

然后重启 kibana。然后就可以看到是中文界面了。这样看着总比英文舒服。

## 目录布局

| 类型 | 描述 | 默认路径 | 设置 |
| --- | --- | --- | --- |
| **home** | Kibana home 目录或者 `$KIBANA_HOME` | `/usr/share/kibana` |  |
| **bin** | 二进制脚本，包括 `kibana` 去启动节点和 `kibana-plugin` 安装插件 | `/usr/share/kibana/bin` |  |
| **config** | 配置文件，包含 `kibana.yml` | `/etc/kibana` | `[KBN_PATH_CONF](https://www.elastic.co/guide/en/kibana/7.14/settings.html)` |
| **data** | Kibana和它的插件写入到磁盘的数据文件位置 | `/var/lib/kibana` | `path.data` |
| **logs** | 日志文件位置。 | `/var/log/kibana` | `path.logs` |
| **plugins** | 插件文件位置. 每个插件将包含在一个子目录中. | `/usr/share/kibana/plugins` |  |


这样，Kibana 的安装就算是介绍完成了。
