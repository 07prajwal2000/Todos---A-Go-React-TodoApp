import {
	LoginRequest,
	LoginResponse,
	SignupRequest,
	SignupResponse,
	UserProfile,
} from "../types/auth";
import URLS from "./endpoints";
import Http from "./fetcher";

export async function LoginAsync(request: LoginRequest) {
	const response = await Http.Post(URLS.auth.login, {
		email: request.Email,
		password: request.Password,
	});
	if (response.data) {
		const data: LoginResponse = {
			AccessToken: response.data.accessToken,
			RefreshToken: response.data.refreshToken,
			Message: response.data.message,
			Success: response.data.success,
		};
		return data;
	}
	return null;
}

export async function SignupAsync(request: SignupRequest) {
	const response = await Http.Post(URLS.auth.signup, {
		email: request.Email,
		password: request.Password,
		firstName: request.FirstName,
		lastName: request.LastName,
	});
	if (response.data) {
		const data: SignupResponse = {
			Message: response.data.message,
			Success: response.data.success,
		};
		return data;
	}
	return null;
}

export async function CheckLoggedIn(token: string) {
	const response = await Http.Get(URLS.auth.authenticate, {
		Authorization: token,
	});
	return response;
}

export async function GetProfile(token: string) {
	const response = await Http.Get(URLS.auth.profile, {
		Authorization: token,
	});
	if (response?.data?.data) {
		const user: UserProfile = {
			Id: response.data.data.id,
			FirstName: response.data.data.firstName,
			LastName: response.data.data.lastName,
			Email: response.data.data.email,
			PaymentType: response.data.data.paymentType,
			Verified: response.data.data.verified,
			CreatedAt: response.data.data.createdAt,
		};
		return user;
	}
	return null;
}
