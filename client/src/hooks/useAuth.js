import {useCallback, useEffect, useState} from "react";

const storageName = 'user-data-course-shop'

export function useAuth() {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null)
	const [ready, setReady] = useState(false)

	const login = useCallback((jwtToken, id) => {
		setToken(jwtToken);
		setUserId(id)
		localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id}))
	}, [])

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null)
		localStorage.removeItem(storageName)
	}, [])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName)) || {}
		if (data.token) {
			login(data.token, data.userId)
		}
		setReady(true)
	}, [login])

	return {token, userId, ready, login, logout}
}