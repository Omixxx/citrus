import axios from "axios";
import { getJwt } from "../services/jwt";

export function isAuthenticated(): boolean {
	let autenticationStatus: boolean = false;
	const token = getJwt();

	if (token === null || token === undefined) {
		return autenticationStatus;
	}
	axios
		.get(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/user/isAuth`)
		.catch(() => {
			alert("notAuth");
		});
	return autenticationStatus;
}
