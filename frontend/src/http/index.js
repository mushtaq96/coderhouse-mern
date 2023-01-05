import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true, // when you need to set the cookies, along the request
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
	// http://localhost:5500/api/send-otp
});

//list of all the endpoinsts
export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate/", data);
export const logout = () => api.post("/api/logout"); //post is secure for logout bcz data is not visible in the URL, making it harderd to intercept.

//Interceptors - sit between req and response

api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			originalRequest &&
			!originalRequest.isRetry
		) {
			originalRequest._isRetry = true;
			try {
				await axios.get(
					`${process.env.REACT_APP_API_URL}/api/refresh`,
					{
						withCredentials: true,
					}
				);

				return api.request(originalRequest);
			} catch (error) {
				console.log(error.message);
			}
		}
		throw error;
	}
);
export default api;
