const { generateId, getServerlessSdk } = require('./lib/utils')
const axios = require('axios')

const instanceYaml = {
  org: 'orgDemo',
  app: 'appDemo',
  component: 'laravel@dev',
  name: `laravel-integration-tests-${generateId()}`,
  stage: 'dev',
  inputs: {
    runtime: 'Php7',
    region: 'ap-guangzhou',
    apigatewayConf: { environment: 'test' }
  }
}

const credentials = {
  tencent: {
    SecretId: process.env.TENCENT_SECRET_ID,
    SecretKey: process.env.TENCENT_SECRET_KEY
  }
}

const sdk = getServerlessSdk(instanceYaml.org)

it('should deploy success', async () => {
  const instance = await sdk.deploy(instanceYaml, credentials)

  expect(instance).toBeDefined()
  expect(instance.instanceName).toEqual(instanceYaml.name)
  expect(instance.outputs).toBeDefined()
  // get src from template by default
  expect(instance.outputs.templateUrl).toBeDefined()
  expect(instance.outputs.region).toEqual(instanceYaml.inputs.region)
  expect(instance.outputs.apigw).toBeDefined()
  expect(instance.outputs.apigw.environment).toEqual(instanceYaml.inputs.apigatewayConf.environment)

  const response = await axios.get(instance.outputs.apigw.url)
  expect(response.data.includes('Laravel')).toBeTruthy()
})

it('should remove success', async () => {
  await sdk.remove(instanceYaml, credentials)
  result = await sdk.getInstance(
    instanceYaml.org,
    instanceYaml.stage,
    instanceYaml.app,
    instanceYaml.name
  )

  expect(result.instance.instanceStatus).toEqual('inactive')
})
