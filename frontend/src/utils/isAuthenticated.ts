import axios from "axios";
import { getJwt } from "../services/jwt";

export async function isAuthenticated() {
	const token = getJwt();
	if (token === null || token === undefined) return false;

	try {
		await axios.get(
			`http://localhost:${process.env.REACT_APP_BACKEND_PORT}/user/isAuth`
		);
	} catch (error) {
		alert(error);
		return false;
	}
	return true;
}
