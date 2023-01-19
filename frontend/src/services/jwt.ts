import { Storage } from '@ionic/storage'

const store = new Storage()
let storage: Storage | null = null

export async function storeJwt (token: string): Promise<boolean> {
  if (storage == null) await initStorage()
  if (token === null || token === undefined) return false

  await storage?.set('jwt', token)
  return true
}

export async function getJwt () {
  if (storage == null) await initStorage()
  const token = await storage?.get('jwt')

  if (token === null || token === undefined) return ''

  return token
}

export async function removeJwt () {
  await storage?.remove('jwt').catch((erro: any) => { console.log(erro) })
}

async function initStorage () {
  if (storage == null) {
    storage = await store.create()
  }
}
