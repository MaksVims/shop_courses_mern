import {useCallback, useState} from "react";

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null)

	const clearError = useCallback(() => setError(null), [])

	let repeatRequestCounter = 0;

	const request = useCallback(
		async (url, method = 'GET', body = null, headers = {}, loader = true, file = false) => {
		if (loader) {
			setLoading(true)
		}

		if (body && !file) {
			body = JSON.stringify(body);
			headers['Content-Type'] = 'application/json';
		}

		if (body && file) {
			console.log(body)
		}

		try {
			const response = await fetch(url, {method, body, headers})
			const data = await response.json();

			if (!response.ok) {
				if (repeatRequestCounter !== 2) {
					repeatRequestCounter++;
					await request(url, method, body, headers, loader)
				} else {
					repeatRequestCounter = 0
					throw new Error(data.message);
				}
			}
			setLoading(false);
			return data;

		} catch (e) {
			setLoading(false);
			setError(e.message);
			throw e;
		}
	}, [])

	return {request, loading, error, clearError}
}