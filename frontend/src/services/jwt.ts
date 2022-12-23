export function storeJwt(token: string) {
  if (token === null || token === undefined || token === "") return false;

  localStorage.setItem("jwt", token);
  return true;
}

export function getJwt(): string {
  const token = localStorage.getItem("jwt");
  if (token === null || token === undefined) return "";
  return token;
}
