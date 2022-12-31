import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class Jwt {
	generateToken(userIdentifier: number) {
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

		if (
			myToken === null ||
			myToken === undefined ||
			typeof myToken === "string"
		) {
			throw new Error("token is not valid");
		}

		return myToken.data;
	}

	verify(token: string): boolean {
		const myToken = jwt.verify(token, process.env.JWT_SECRET || "secret");
		return myToken === null || token === undefined ? false : true;
	}
}
