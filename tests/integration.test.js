const { generateId, getServerlessSdk } = require('./utils')
const execSync = require('child_process').execSync
const path = require('path')
const axios = require('axios')

// set enough timeout for deployment to finish
jest.setTimeout(600000)

// the yaml file we're testing against
const instanceYaml = {
  org: 'orgDemo',
  app: 'appDemo',
  component: 'laravel',
  name: `laravel-integration-tests-${generateId()}`,
  stage: 'dev',
  inputs: {
    runtime: 'Php7',
    region: 'ap-guangzhou',
    apigatewayConf: { environment: 'test' }
  }
}

// get credentials from process.env but need to init empty credentials object
const credentials = {
  tencent: {}
}

// get serverless construct sdk
const sdk = getServerlessSdk(instanceYaml.org)

it('should successfully deploy laravel app', async () => {
  const instance = await sdk.deploy(instanceYaml, { tencent: {} })

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

it('should successfully remove laravel app', async () => {
  await sdk.remove(instanceYaml, credentials)
  result = await sdk.getInstance(
    instanceYaml.org,
    instanceYaml.stage,
    instanceYaml.app,
    instanceYaml.name
  )

  expect(result.instance.instanceStatus).toEqual('inactive')
})
