# MySQL  重置密码

![](/assets/images/20220215.jpg)

> 参考文档：[B.3.3.2 How to Reset the Root Password](https://dev.mysql.com/doc/refman/8.0/en/resetting-permissions.html)

这里需要说明的是我是在mac 上进行的操作。

## 停止运行服务

这一步非常简单，首先运行如下命令：

```bash
brew services stop mysql
```

这里需要主要是了解你安装的是什么版本的包，如果不是最新版本，那就需要指定版本就停止：

```bash
brew services stop mysql@5.7
```

## 设置初始化文件

这里就是运行的重点了。首先呢。我运行如下命令查看启动信息

```bash
% brew info mysql
mysql: stable 8.0.26 (bottled)
Open source relational database management system
https://dev.mysql.com/doc/refman/8.0/en/
Conflicts with:
  mariadb (because mysql, mariadb, and percona install the same binaries)
  percona-server (because mysql, mariadb, and percona install the same binaries)
/usr/local/Cellar/mysql/8.0.26 (304 files, 296MB) *
  Poured from bottle on 2022-01-27 at 10:58:20
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/mysql.rb
License: GPL-2.0-only with Universal-FOSS-exception-1.0
==> Dependencies
Build: cmake ✘, pkg-config ✔
Required: icu4c ✔, libevent ✔, lz4 ✔, openssl@1.1 ✔, protobuf ✔, zstd ✔
==> Caveats
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

To restart mysql after an upgrade:
  brew services restart mysql
Or, if you don't want/need a background service you can just run:
  /usr/local/opt/mysql/bin/mysqld_safe --datadir=/usr/local/var/mysql
==> Analytics
install: 92,820 (30 days), 237,270 (90 days), 943,044 (365 days)
install-on-request: 92,437 (30 days), 236,308 (90 days), 937,806 (365 days)
build-error: 418 (30 days)
```

通过读取最后的内容就发现。前台运行 MySQL 需要执行如下命令：

```
/usr/local/opt/mysql/bin/mysqld_safe --datadir=/usr/local/var/mysql
```

然后根据最上面的参考文档，重置密码的话，首先是需要创建一个文件。比如说位置是 `/tmp/mysql-init`，内容是：

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
```

然后将文档中的启动命令跟现有的 brew 介绍的启动命令相结合，那么就变成了这样：

```bash
mysqld --init-file=/Users/baoguoxiao/mysql-init --datadir=/usr/local/var/mysql
```

## 收尾

启动成功后，使用使用 `kill` 命令将启动的服务关掉，并使用如下命令启动 `mysql`

```bash
brew services start mysql
```

然后使用修改后的密码进行登录就可以正常访问了。

## 总结

还是得多看官方文档，官方文档里啥都有。

