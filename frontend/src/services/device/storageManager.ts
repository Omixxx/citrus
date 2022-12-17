
export default function getJwtToken(): string | null {
  return storage.getItem('token')
}


