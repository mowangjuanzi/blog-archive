# Sentry 磁盘占用清理

![](../images/20220120.jpg)

领导说 sentry 服务器的磁盘占用已经到70%了。需要看看到底是什么情况。要进行清理下了。

说干就干，登录服务器开搞。

## 查找原因

首先查看下磁盘占用

```bash
# df -h
Filesystem      Size  Used Avail Use% Mounted on
udev            1.9G     0  1.9G   0% /dev
tmpfs           395M   15M  381M   4% /run
/dev/vda1        99G   72G   22G  77% /
tmpfs           2.0G     0  2.0G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           2.0G     0  2.0G   0% /sys/fs/cgroup
overlay          99G   72G   22G  77% /var/lib/docker/overlay2/1c485f82cf5c3bc4e2f2bddb188c75d49a7b8ac0967cbe68832a0ecb0cd50f58/merged
overlay          99G   72G   22G  77% /var/lib/docker/overlay2/e3c403cfd6ad5e04315fa2a76d74ed4f17e488c3064fe758e5b7adcb2fe3ceeb/merged
shm              64M     0   64M   0% /var/lib/docker/containers/260521c9724405f001a37077a5050dab4b3c5bdd4eb221ad4671aeb1847bcd63/mounts/shm
shm              64M     0   64M   0% /var/lib/docker/containers/4e703b505142a907d4b185fab20e02527d92eae75e3d7e08b71e59bf6bd1600f/mounts/shm
overlay          99G   72G   22G  77% /var/lib/docker/overlay2/f28de75272635150fe679e18439a78700655eb516d8dfb2fcac8f27a6c529c7e/merged
overlay          99G   72G   22G  77% /var/lib/docker/overlay2/47b544fd6fed11659ff8cdc7f933e2ba71131b7154bd8c9f2f1c0368f159a454/merged
shm              64M     0   64M   0% /var/lib/docker/containers/4deecdec4225ea8af8d814fb0f32cae4dd815ddd1933d8e95ce6346ff573c44c/mounts/shm
shm              64M  4.0K   64M   1% /var/lib/docker/containers/bb4f05609f8a205dcf3757c9c507124d1ca6c99b0424c48cebde2e65fc14fb10/mounts/shm
overlay          99G   72G   22G  77% /var/lib/docker/overlay2/5d9f7ff501367a08580590a3ad02d88583bd066b369f1ad4e26c46d23febe439/merged
overlay          99G   72G   22G  77% /var/lib/docker/overlay2/430d0554ca28590b311668f03deb2a346ae8d1683b1157270cd6ad7c4e66b146/merged
overlay          99G   72G   22G  77% /var/lib/docker/overlay2/a02465942fd7b8a5d5d05f98ec3365c715ff4fd3608e8c6da28942ad10edc3e2/merged
shm              64M     0   64M   0% /var/lib/docker/containers/a5f04a7777f444c14723f291301854ced694daf7614dea5ad28bdf02c4a9a1b5/mounts/shm
shm              64M   32K   64M   1% /var/lib/docker/containers/f42cf5c7c314e6a757b59c44b4572745bbf6ef69857f8c97077acaf2800b1f0c/mounts/shm
shm              64M     0   64M   0% /var/lib/docker/containers/94f97a972c9e781cfa75aa043e03cd6a3d529ee6f359631f4aec35972ab58308/mounts/shm
tmpfs           395M     0  395M   0% /run/user/1000
```

感觉是docker 居多。那就看看 docker 占用吧

```bash
# docker system df
TYPE                TOTAL               ACTIVE              SIZE                RECLAIMABLE
Images              8                   5                   1.836GB             1.455GB (79%)
Containers          7                   7                   129.6MB             0B (0%)
Local Volumes       14                  5                   59.3GB              11.24MB (0%)
Build Cache         0                   0                   0B                  0B
```

看起来就是 docker 的本地磁盘卷占用太多了。进入实际目录，查看占用空间：

```bash
# du -s /var/lib/docker/volumes/* | sort -nr
33881516	/var/lib/docker/volumes/sentry-postgres
24058796	/var/lib/docker/volumes/sentry-data
9940	/var/lib/docker/volumes/aee3aa319732ad3cbb44faf7baf0f581ecc14be1de1cfb9b23d28c5c9390d2eb
3216	/var/lib/docker/volumes/a81733e5b24c5383701b1e21fed3d5da9960aa95b5dc8b36d614047909d946af
832	/var/lib/docker/volumes/f6daa8fab886fc27f2d09a27a7e09b30342ef52b966a6e20a3fbfb6850bfaaa1
236	/var/lib/docker/volumes/0dfc197df98db0c904081e5fe66e3dc5719669563b6f22d3719b3f628db2d791
32	/var/lib/docker/volumes/metadata.db
24	/var/lib/docker/volumes/ed21cb90f016a54c1ab1c956cc211d092ee2864ee997d64251d1481317431cae
24	/var/lib/docker/volumes/6f42418f60a04468a7a3d399ab88635316599e482b71f99929517da57d945bc6
24	/var/lib/docker/volumes/4aa1b8619ef1af4b7b730553925acd5f6d7b530a789608e33aa487c83a839160
24	/var/lib/docker/volumes/391b1f63593fb34a951e06b694ec6ed07ac17787d7d98d79de9303a52f186d1e
12	/var/lib/docker/volumes/87b6a0244ea8b73b93e67dd27a2e0c718a28badc3a1d3d73ef1ee7bce7c65ef7
12	/var/lib/docker/volumes/5c005c93e46c4f9a201a034f90bfc0e381daee46fe0d64bbb266664724f6087a
12	/var/lib/docker/volumes/5b8898b4359de7562d3ff5ef9914e46b101709a7480fbb2c6842206e783b07c6
12	/var/lib/docker/volumes/355839504ead6fe40255b5927f355de642b80409f220f7eca79dcc0d4d880456
```

那问题就妥了。想办法处理 sentry吧。

## 解决问题

凭借我的聪明才智（谷歌搜索），知道sentry是可以清理以前的老数据的。进入 docker 内部执行一个命令就好了

首先进入 docker container 内部：

```bash
# docker container ls
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                     NAMES
94f97a972c9e        onpremise_web          "/entrypoint.sh run …"   2 years ago         Up 2 years          0.0.0.0:10000->9000/tcp   onpremise_web_1_fea05a7b90a2
f42cf5c7c314        onpremise_worker       "/entrypoint.sh run …"   2 years ago         Up 2 years          9000/tcp                  onpremise_worker_1_57ce3a84691a
a5f04a7777f4        onpremise_cron         "/entrypoint.sh run …"   2 years ago         Up 2 years          9000/tcp                  onpremise_cron_1_a31c5e717224
4deecdec4225        memcached:1.5-alpine   "docker-entrypoint.s…"   2 years ago         Up 2 years          11211/tcp                 onpremise_memcached_1_fb6edce69e61
bb4f05609f8a        postgres:9.5           "docker-entrypoint.s…"   2 years ago         Up 2 years          5432/tcp                  onpremise_postgres_1_102cbc49a57c
4e703b505142        redis:3.2-alpine       "docker-entrypoint.s…"   2 years ago         Up 2 years          6379/tcp                  onpremise_redis_1_8eafa91c4965
260521c97244        tianon/exim4           "docker-entrypoint.s…"   2 years ago         Up 2 years          25/tcp                    onpremise_smtp_1_68e8e9ddf908
# docker exec -it onpremise_worker_1_57ce3a84691a /bin/bash
root@f42cf5c7c314:/usr/src/sentry#
```

然后执行如下命令获取帮助

```bash
# sentry cleanup --help
Usage: sentry cleanup [OPTIONS]

  Delete a portion of trailing data based on creation date.

  All data that is older than `--days` will be deleted.  The default for this is 30 days.  In
  the default setting all projects will be truncated but if you have a specific project you want
  to limit this to this can be done with the `--project` flag which accepts a project ID or a
  string with the form `org/project` where both are slugs.

Options:
  --days INTEGER                  Numbers of days to truncate on.  [default: 30]
  --project TEXT                  Limit truncation to only entries from project.
  --concurrency INTEGER           The total number of concurrent worker processes to run.
                                  [default: 1]
  -q, --silent                    Run quietly. No output on success.
  -m, --model TEXT
  -r, --router TEXT               Database router
  -t, --timed                     Send the duration of this command to internal metrics.
  -l, --loglevel [DEBUG|INFO|WARNING|ERROR|CRITICAL|FATAL]
                                  Global logging level. Use wisely.
  --logformat [human|machine]     Log line format.
  --help                          Show this message and exit.
```
按照帮助信息的提示可以执行如下命令：

```bash
sentry cleanup --days 60
```

但是有个问题，因为我很久没执行过了。所以会执行很久的时间，结果因为执行太久而断开了。这里我们需要使用`screen`开启一个单独的终端来处理问题。

首先需要执行如下确定的是 `screen` 命令是否已经安装：

```bash
# screen --version

Command 'screen' not found, but can be installed with:

apt install screen
```

提示没有安装，我们可以根据最后的提示来安装命令：

```bash
apt install screen
```

这样就安装完成了。


首先使用如下命令开启一个新终端：
```bash
screen -S sentryClean
```

执行上面写的命令：

```bash
sentry cleanup --days 60
```

然后同时按住 `Ctrl a+d` 就可以从 `screen` 终端中离开了。

然后就等着吧。。。

## 总结

未完待续

## 参考

- [Linux screen命令详解](https://os.51cto.com/article/623749.html)
- [sentry磁盘占用过大如何清理历史数据](https://www.codenong.com/cs109581367/)
- [Linux du 命令](https://www.runoob.com/linux/linux-comm-du.html)