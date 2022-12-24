import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class Jwt {

	generateToken(userIdentifier: number) {
		console.log(process.env.JWT_SECRET);
		return jwt.sign(
			{
				data: userIdentifier.toString(),
			},
			process.env.JWT_SECRET || "secret ",
			{ expiresIn: "30d" },
		);
	}

	getUserId(token: string): number {
		const myToken = jwt.verify(token, process.env.JWT_SECRET || "secret");
		return parseInt(myToken.split(".")[1]);
	}

	verify(token: string) {
		return jwt.verify(token, process.env.JWT_SECRET || "secret");
	}
}
