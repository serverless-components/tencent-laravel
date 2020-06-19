const CONFIGS = {
  templateUrl:
    'https://serverless-templates-1300862921.cos.ap-beijing.myqcloud.com/laravel-demo.zip',
  compName: 'laravel',
  compFullname: 'Laravel',
  handler: 'sl_handler.handler',
  runtime: 'PHP 7.2',
  exclude: ['.git/**', '.gitignore', '.DS_Store'],
  timeout: 3,
  memorySize: 128,
  namespace: 'default',
  description: 'Function created by serverless component'
}

module.exports = CONFIGS
