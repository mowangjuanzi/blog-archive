# 目录

## 简介

我是一名PHP开发。

我的开源项目有：

- [PHP 配置翻译](https://gitee.com/watermelon-team/php-ini)
- [Docker 环境搭建](https://gitee.com/watermelon-team/docker)
- [数据库结构生成 Markdown](https://gitee.com/watermelon-team/data-dict)

目前正在参与的项目：

- [php/doc-zh](https://github.com/php/doc-zh)

## 【译】PHP Annotated

- [2022 年 1 月](./posts/php-annotated-january-2022.md)

## 原创

### 操作系统

- [Ubuntu 安装后 2022-03-13](/posts/ubuntu-post-installation.md)
- [ubuntu 安装 Nginx 2021-11-06](/posts/ubuntu-install-nginx.md)
- [Ubuntu 安装 Docker 2021-10-30](/posts/ubuntu-install-docker.md)
- [ubuntu 支持 OneDrive 2021-10-20](/posts/ubuntu-install-onedrive.md)

### 编程语言

- [Ubuntu 安装 PHP 2021-03-28](/posts/ubuntu-install-php.md)

### 数据库

- [MySQL 重置密码 2022-02-15](/posts/mysql-reset-password.md)

### ELK

- [Ubuntu 安装 ElasticSearch 2021-09-16](/posts/ubuntu-install-elasticsearch.md)
- [Ubuntu 安装 Kibana 2021-09-17](/posts/ubuntu-install-kibana.md)

### 杂项

- [Sentry 磁盘清理 2022-01-20](/posts/sentry-cleanup-data.md)
- [Git 基础用法 2021-10-21](/posts/git-basic-usage.md)

## Cook

- [辣椒炒鸡](./cook/shan-dong-chao-ji.md)

> 以下是后期要做的。先记录下相关命令。

## Require

- [Jekyll](https://jekyllrb.com/)
- [Minimal Mistakes Jekyll theme](https://github.com/mmistakes/minimal-mistakes)

## 本地运行

```bash
bundle install
bundle exec jekyll serve
```

## 推送 `_site` 到 `gh-pages`

```bash
git subtree push --prefix=_site origin gh-pages
```