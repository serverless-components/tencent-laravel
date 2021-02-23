## 文件上传说明

项目中如果涉及到文件上传，需要依赖 API 网关提供的 [Base64 编码能力](https://cloud.tencent.com/document/product/628/51799)，使用时只需要 `serverless.yml` 中配置 `isBase64Encoded` 为 `true`，如下：

```yaml
app: appDemo
stage: dev
component: laravel
name: laravelDemo

inputs:
  # 省略...
  apigatewayConf:
    isBase64Encoded: true
    # 省略...
  # 省略...
```

当前 API 网关支持上传最大文件大小为 `2M`，如果文件过大，请修改为前端直传对象存储方案。

## Base64 示例

此 Github 项目的 `example` 目录下 `routes/api.php` 文件中有 `POST /upload` 接口如下：

```php
// 上传文件接口
Route::post('/upload', function (Request $request) {
    // 表单中字段为 file
    if ($request->file) {
        // TODO: 这里只是存储在了 /tmp 临时目录下，用户需要根据个人需要存储到持久化存储服务，比如腾讯云的对象存储、文件存储等。
        $upload = $request->file->store('upload');
        $uploadFile = storage_path()."/app/".$upload;
    }

    return response()->json([
        'title' => 'serverless',
        'upload' => $uploadFile ?? null,
    ]);
});
```
