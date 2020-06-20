import React from 'react'

import {Switch, Route} from 'react-router-dom'
import Home from "../pages/Home/Home";
import Courses from "../pages/Courses/Courses";
import Auth from "../pages/Auth/Auth";
import Error404 from "../pages/404/404";
import Logout from "../components/Logout/Logout";

export const useRoutes = (isAuth) => {
	if (isAuth) {
		return (
			<Switch>
				<Route path={'/'} exact>
					<Home />
				</Route>
				<Route path={'/courses'}>
					<Courses />
				</Route>
				<Route path={'/logout'}>
					<Logout />
				</Route>
				<Route>
					<Error404 />
				</Route>
			</Switch>
		)
	} else {
		return (
			<Switch>
				<Route path={'/'} exact>
					<Home />
				</Route>
				<Route path={'/courses'}>
					<Courses />
				</Route>
				<Route path={'/auth'} exact>
					<Auth />
				</Route>
				<Route>
					<Error404 />
				</Route>
			</Switch>
		)
	}
}