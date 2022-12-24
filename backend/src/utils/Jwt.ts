import jwt from "jsonwebtoken";
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
		const myToken = jwt.verify(token, process.env.JWT_SECRET || "secret");
		return parseInt(myToken.split(".")[1]);
	}

	verify(token: string): boolean {
		const tok = jwt.verify(token, process.env.JWT_SECRET || "secret");
		return tok !== null && tok !== undefined ? true : false;
	}
}
