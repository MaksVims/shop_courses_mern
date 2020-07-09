import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import axios from 'axios'
import ProfileView from "../../components/Profile/ProfileView/ProfileView";
import {useHttp} from "../../hooks/useHttp";
import Loader from "../../components/Loader/Loader";
import {AuthContext} from "../../context/auth/AuthContext";
import useTitle from "../../hooks/useTitle";

const Profile = () => {
	const [data, setData] = useState(null)
	const {request, loading} = useHttp()
	const {token} = useContext(AuthContext)
	useTitle('Профиль')

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
			console.log(avatar)
			const fd = new FormData()
			fd.append('avatar', avatar, avatar.name)
			await axios.post('/api/profile/save_avatar', fd, {
				headers: {
					authorization: `Bearer ${token}`,
				},
				onUploadProgress: function (progress) {
					console.log(progress.loaded / progress.total)
				}
			})
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