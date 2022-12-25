import { getJwt } from "./jwt";
import axios from "axios";

export function tokenInterceptorRequest(): any {
	axios.interceptors.request.use(
		(config: any) => {
			const token = getJwt();
			config.headers.authorization = token;
			return config;
		},
		function(error) {
			// Do something with request error
			return Promise.reject(error);
		},
	);
	console.log("request");
	return tokenInterceptorRequest;
}

export function tokenInterceptorResponse(): any {
	axios.interceptors.response.use(
		(response) => {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			console.log("response");
			return response;
		},
		function(error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger

			// Do something with response error
			return Promise.reject(error);
		},
	);
}
