import jwt from 'jsonwebtoken';


export function generateToken(userIdentifier: number) {
  return jwt.sign({
    data: userIdentifier.toString()
  }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

export default function getUserId(token: string): number {
  return (jwt.verify(token, process.env.JWT_SECRET).data).parseInt()
}


