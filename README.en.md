[![Serverless PHP Laravel Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577347087676-website_%E9%95%BF.png)](http://serverless.com)

# Tencent Laravel Serverless Component

[简体中文](./README.md) | English

## Introduction

[Laravel](https://github.com/laravel/laravel) Serverless Component for Tencent Cloud, support `Laravel >= 6.0`.

## Content

0. [Prepare](#0-prepare)
1. [Install](#1-install)
1. [Create](#2-create)
1. [Configure](#3-configure)
1. [Deploy](#4-deploy)
1. [Remove](#5-Remove)

### 0. Prepare

#### Initial Laravel Project

Before use this component, you should init a `laravel` project:

```bash
composer create-project --prefer-dist laravel/laravel serverless-laravel
```

> Notice：Laravel use Composer manage dependencies, so you should install Composer firstly. Refer to [Official Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)

#### Modify Laravel Project

When cloud funtion running, only `/tmp` folder is writable, so we should change the `APP_STORAGE` folder to `/tmp`.

Add this line in `bootstrap/app.php` after `$app = new Illuminate\Foundation\Application`:

```php
$app->useStoragePath(env('APP_STORAGE', '/tmp'));
```

We will also need to customize the location for compiled views, as well as customize a few variables in the .env file:

```dotenv
# views compiled path
VIEW_COMPILED_PATH=/tmp/storage/framework/views

# We cannot store sessions to disk: if you don't need sessions (e.g. API)
# then use `array`, else store sessions in database or cookies
SESSION_DRIVER=array

# Logging to stderr allows the logs to end up in Cloudwatch
LOG_CHANNEL=stderr

# app storage dir must be /tmp
APP_STORAGE=/tmp
```

### 1. Install

Install the Serverless Framework globally:

```bash
$ npm install -g serverless
```

### 2. Create

Just create the following simple boilerplate:

```bash
$ touch serverless.yml
$ touch .env           # your Tencent api keys
```

Add the access keys of a [Tencent CAM Role](https://console.cloud.tencent.com/cam/capi) with `AdministratorAccess` in the `.env` file, using this format:

```
# .env
TENCENT_SECRET_ID=XXX
TENCENT_SECRET_KEY=XXX
```

- If you don't have a Tencent Cloud account, you could [sign up](https://intl.cloud.tencent.com/register) first.

### 3. Configure

```yml
# serverless.yml

component: laravel
name: laravelDemo
org: orgDemo
app: appDemo
stage: dev

inputs:
  src: ./
  region: ap-guangzhou
  runtime: Php7
  apigatewayConf:
    protocols:
      - http
      - https
    environment: release
```

- [More Options](./docs/configure.md)

### 4. Deploy

> Notice: **Before deploying, you should clear local run config cache, run `php artisan config:clear`.**

```bash
$ sls deploy
```

> Notice: `sls` is short for `serverless` command.

&nbsp;

### 5. Remove

```bash
$ sls remove
```

### More Components

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
