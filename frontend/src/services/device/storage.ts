import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


export async function storeJwt(token: string) {
  await Filesystem.writeFile({
    path: 'jwt.txt',
    data: token,
    directory: Directory.Documents,
    encoding: Encoding.UTF8
  })
}

export async function getJwt() {
  const token = await Filesystem.readFile({
    path: 'jwt.txt',
    directory: Directory.Documents,
    encoding: Encoding.UTF8
  }).catch(() => {
    return null
  })
  return token ? token.data : null
}

