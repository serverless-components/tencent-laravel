# Tencent Egg.js Serverless Component

[简体中文](./README.md) | English

## Introduction

[Laravel](https://github.com/laravel/laravel) Serverless Component for Tencent Cloud.

## Content

1. [Prepare](#0-prepare)
1. [Install](#1-install)
2. [Create](#2-create)
3. [Configure](#3-configure)
4. [Deploy](#4-deploy)
5. [Remove](#5-Remove)

### 0. Prepare

#### Initial Laravel Project

Before use this component, you should init a `laravel` project:

```shell
composer create-project --prefer-dist laravel/laravel serverless-laravel
```

> Notice：Laravel use Composer manage dependencies, so you should install Composer firstly. Refer to [Official Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos)

#### Modify Laravel Project

When cloud funtion running, only `/tmp` folder is writable, so we should change the `APP_STORAGE` folder to `/tmp`.

Add this line in `bootstrap/app.php` after `$app = new Illuminate\Foundation\Application`:

```php
$app->useStoragePath($_ENV['APP_STORAGE'] ?? $app->storagePath());
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

```shell
$ npm install -g serverless
```

### 2. Create

Just create the following simple boilerplate:

```shell
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

MyComponent:
  component: "@serverless/tencent-laravel"
  inputs:
    region: ap-guangzhou 
    functionName: laravel-function
    code: ./
    functionConf:
      timeout: 10
      memorySize: 128
      environment:
        variables:
          TEST: vale
      vpcConfig:
        subnetId: ''
        vpcId: ''
    apigatewayConf:
      protocol: https
      environment: release
```

- [More Options](https://github.com/serverless-components/tencent-laravel/tree/master/docs/configure.md)

### 4. Deploy

```shell
$ sls --debug
```

> Notice: `sls` is short for `serverless` command.

&nbsp;

### 5. Remove

```shell
$ sls remove --debug
```

### More Components

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
