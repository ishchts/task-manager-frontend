import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'https://petstore3.swagger.io/api/v3/openapi.json',
  apiFile: './src/store-v2/emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: './src/store-v2/petApi.ts',
  exportName: 'petApi',
  hooks: true,
}

export default config