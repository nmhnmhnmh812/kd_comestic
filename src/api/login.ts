import baseAxios from ".";

const ENDPOINT = "/api/auth/login";

export async function login(data: { username: string; password: string }) {
  return await baseAxios.post(ENDPOINT, data);
}
