
import { TrueApi, testnet } from '@truenetworkio/sdk'
import { TrueConfig } from '@truenetworkio/sdk/dist/utils/cli-config'

// If you are not in a NodeJS environment, please comment the code following code:
import dotenv from 'dotenv'
dotenv.config()

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  const trueApi = await TrueApi.create(config.account.secret)

  await trueApi.setIssuer(config.issuer.hash)

  return trueApi;
}

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: 'jC8xneuCyDFGEK6cPFrV2vbFdf2GdCp5oFkXg1QWav14UNR',
    secret: process.env.NEXT_PUBLIC_TRUE_NETWORK_SECRET_KEY ?? ''
  },
  issuer: {
    name: 'PixelProof',
    hash: '0x89de65ce9c08071cbbca1e9683d8a9a6b5470cdc44e5d17c7592edc809cd8c69'
  },
  algorithm: {
    id: undefined,
    path: undefined,
    schemas: []
  },
}
  