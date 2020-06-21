import React, {useMemo} from 'react';
import './App.scss';
import Layout from "./hor/Layout/Layout";
import Navbar from "./components/navigation/Navbar/Navbar";
import {useRoutes} from "./hooks/useRoutes";
import {useAuth} from "./hooks/useAuth";
import {AuthContext} from "./context/auth/AuthContext";
import StateAlert from "./context/alert/StateAlert";

function App() {
	const {ready, token, logout, login, userId} = useAuth()
	const isAuth = !!token
	const routes = useRoutes(isAuth)
	const valueAuthContext = useMemo(() => ({ready, token, logout, login, isAuth, userId}),
		[ready, token, logout, login, isAuth, userId])
	return (
		<AuthContext.Provider value={valueAuthContext}>
			<StateAlert>
				<Navbar/>
				<Layout>
					{routes}
				</Layout>
			</StateAlert>
		</AuthContext.Provider>
	)
}

export default App;