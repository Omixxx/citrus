import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class Jwt {
	generateToken(userIdentifier: number) {
		console.log(process.env.JWT_SECRET);
		return jwt.sign(
			{
				expiration: "30d",
				data: userIdentifier,
			},
			process.env.JWT_SECRET || "secret "
		);
	}

	getUserId(token: string): number {
		const myToken: string | JwtPayload = jwt.verify(
			token,
			process.env.JWT_SECRET || "secret"
		);
		return parseInt(myToken.toString().split(".")[1]);
	}

	verify(token: string): boolean {
		const myToken = jwt.verify(token, process.env.JWT_SECRET || "secret");
		return myToken === null || token === undefined ? false : true;
	}
}
