import { Storage } from "@ionic/storage";

const store = new Storage();
let storage: Storage | null = null;

export async function storeJwt(token: string): Promise<Boolean> {
	if (!storage) await initStorage();
	if (token === null || token === undefined) return false;

	await storage?.set("jwt", token);
	return true;
}

export async function getJwt() {
	if (!storage) await initStorage();
	const token = await storage?.get("jwt");

	if (token === null || token === undefined) return "";

	return token;
}

async function initStorage() {
	if (!storage) {
		storage = await store.create();
	}
}
