import { LoginRequest } from "../types/auth";
import { DefaultResponse } from "../types/commonTypes";
import URLS from "./endpoints";
import Http from "./fetcher";

export async function LoginAsync(request: LoginRequest) {
	const response = await Http.Post(URLS.auth.login, {
		email: request.Email,
		password: request.Password,
	});
  return response.data as DefaultResponse;
}
