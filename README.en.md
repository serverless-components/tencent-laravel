[![Serverless PHP Laravel Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577347087676-website_%E9%95%BF.png)](http://serverless.com)

# Tencent Laravel Serverless Component

[![npm](https://img.shields.io/npm/v/%40serverless%2Ftencent-laravel)](http://www.npmtrends.com/%40serverless%2Ftencent-laravel)
[![NPM downloads](http://img.shields.io/npm/dm/%40serverless%2Ftencent-laravel.svg?style=flat-square)](http://www.npmtrends.com/%40serverless%2Ftencent-laravel)

[简体中文](https://github.com/serverless-components/tencent-thinkphp/blob/master/README.md) | English

## Introduction

[Laravel](https://github.com/laravel/laravel) Serverless Component for Tencent Cloud, support `Laravel >= 6.0`.

## Content

1. [Prepare](#0-prepare)
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

MyComponent:
  component: '@serverless/tencent-laravel'
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
      protocols:
        - https
      environment: release
```

- [More Options](https://github.com/serverless-components/tencent-laravel/tree/master/docs/configure.md)

### 4. Deploy

> Notice: **Before deploying, you should clear local run config cache, run `php artisan config:clear`.**

```bash
$ sls --debug

  DEBUG ─ Resolving the template's static variables.
  DEBUG ─ Collecting components from the template.
  DEBUG ─ Downloading any NPM components found in the template.
  DEBUG ─ Analyzing the template's components dependencies.
  DEBUG ─ Creating the template's components graph.
  DEBUG ─ Syncing template state.
  DEBUG ─ Executing the template's components graph.
  DEBUG ─ Compressing function laravel-function file to /Users/yugasun/Desktop/Develop/serverless/tencent-laravel/example/.serverless/laravel-function.zip.
  DEBUG ─ Compressed function laravel-function file successful
  DEBUG ─ Uploading service package to cos[sls-cloudfunction-ap-guangzhou-code]. sls-cloudfunction-default-laravel-function-1584409722.zip
  DEBUG ─ Uploaded package successful /Users/yugasun/Desktop/Develop/serverless/tencent-laravel/example/.serverless/laravel-function.zip
  DEBUG ─ Creating function laravel-function
  laravel-function [████████████████████████████████████████] 100% | ETA: 0s | Speed: 437.95k/s
  DEBUG ─ Created function laravel-function successful
  DEBUG ─ Setting tags for function laravel-function
  DEBUG ─ Creating trigger for function laravel-function
  DEBUG ─ Deployed function laravel-function successful
  DEBUG ─ Starting API-Gateway deployment with name ap-guangzhou-apigateway in the ap-guangzhou region
  DEBUG ─ Service with ID service-em7sgz40 created.
  DEBUG ─ API with id api-lln5145m created.
  DEBUG ─ Deploying service with id service-em7sgz40.
  DEBUG ─ Deployment successful for the api named ap-guangzhou-apigateway in the ap-guangzhou region.

  MyLaravel:
    functionName:        laravel-function
    functionOutputs:
      ap-guangzhou:
        Name:        laravel-function
        Runtime:     Php7
        Handler:     serverless-handler.handler
        MemorySize:  128
        Timeout:     10
        Region:      ap-guangzhou
        Namespace:   default
        Description: This is a template function
    region:              ap-guangzhou
    apiGatewayServiceId: service-em7sgz40
    url:                 https://service-em7sgz40-1251556596.gz.apigw.tencentcs.com/release/
    cns:                 (empty array)

  51s › MyLaravel › done
```

> Notice: `sls` is short for `serverless` command.

&nbsp;

### 5. Remove

```bash
$ sls remove --debug

  DEBUG ─ Flushing template state and removing all components.
  DEBUG ─ Removed function laravel-function successful
  DEBUG ─ Removing any previously deployed API. api-lln5145m
  DEBUG ─ Removing any previously deployed service. service-em7sgz40

  14s › MyLaravel › done
```

### More Components

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
