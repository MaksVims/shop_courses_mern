import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import ProfileView from "../../components/Profile/ProfileView/ProfileView";
import {useHttp} from "../../hooks/useHttp";
import Loader from "../../components/Loader/Loader";
import {AuthContext} from "../../context/auth/AuthContext";

const Profile = () => {
	const [data, setData] = useState(null)
	const {request, loading} = useHttp()
	const {token} = useContext(AuthContext)


	const fetchProfile = useCallback(async () => {
		try {
			const resData = await request('/api/profile/', 'POST', null, {
				authorization: `Bearer ${token}`
			})
			if (resData) {
				setData(resData);
			}
		} catch (e) {
		}
	}, [request, token])

	const updateAvatar = useCallback(async (avatar) => {
		try {
			await request('api/profile/save_avatar', 'POST', avatar, {
				authorization: `Bearer ${token}`
			}, false, true)
			await fetchProfile()
		} catch (e) {
		}
	}, [request, token])

	const updateUserInfo = useCallback(async (body) => {
		try {
			await request('api/profile/save', 'POST', body, {
				authorization: `Bearer ${token}`
			})
			await fetchProfile()
		} catch (e) {
		}
	}, [request, token])

	const handlers = useMemo(() => ({updateAvatar, updateUserInfo}),
		[updateAvatar, updateUserInfo])

	useEffect(() => {
		fetchProfile()
	}, [fetchProfile])

	if (loading || !data) return <Loader/>

	return (
		<section className="page">
			<h1>Ваш профиль</h1>
			<ProfileView
				profile={data}
				handlers={handlers}
			/>
		</section>
	)
}

export default Profile