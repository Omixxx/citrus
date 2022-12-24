export function storeJwt(token: string): boolean {
	if (token === null || token === undefined) return false;

	localStorage.setItem("jwt", token);
	return true;
}

export function getJwt(): string {
	const token = localStorage.getItem("jwt");
	console.log(token);

	if (token === null || token === undefined) return "";
	return token;
}
