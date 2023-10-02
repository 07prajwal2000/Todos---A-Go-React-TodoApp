import axios from "axios";

const BASE_URL = "http://127.0.0.1:5555/api/v1";

const Http = Object.freeze({
	Get,
	Post,
	Put,
	Delete,
});

const fetcher = axios.create({
	baseURL: BASE_URL,
});

async function Get(route: string, headers: any = null) {
	return await fetcher.get(route, { headers });
}

async function Post(
	route: string,
	body: any,
	headers: any = null,
	contentType = "application/json"
) {
	return await fetcher.post(route, {
		headers: {
			...headers,
			"Content-Type": contentType,
		},
		data: body,
	});
}

async function Put(
	route: string,
	body: any,
	headers: any = null,
	contentType = "application/json"
) {
	return await fetcher.put(route, {
		headers: {
			...headers,
			"Content-Type": contentType,
		},
		data: body,
	});
}

async function Delete(route: string, headers: any = null) {
	return await fetcher.delete(route, { headers });
}

export default Http;
