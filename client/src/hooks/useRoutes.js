import React from 'react'

import {Switch, Route} from 'react-router-dom'
import Home from "../pages/Home/Home";
import Courses from "../pages/Courses/Courses";
import Auth from "../pages/Auth/Auth";
import Error404 from "../pages/404/404";

export const useRoutes = (isAuth) => {
	if (isAuth) {

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