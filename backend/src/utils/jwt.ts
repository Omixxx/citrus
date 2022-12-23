import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export function generateToken(userIdentifier: number) {
  console.log(process.env.JWT_SECRET)
  return jwt.sign(
    {
      data: userIdentifier.toString(),
    },
    process.env.JWT_SECRET || "secret ",
    { expiresIn: "30d" }
  );
}

// export function getUserId(token: string): number {
//   return jwt.verify(token, process.env.JWT_SECRET || "secret").data.parseInt();
// }

export function verify(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET || "secret");
}
