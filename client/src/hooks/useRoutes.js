import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from "../pages/Home/Home";
import Courses from "../pages/Courses/Courses";
import Auth from "../pages/Auth/Auth";
import Error404 from "../pages/404/404";
import Logout from "../components/Logout/Logout";
import Cart from "../pages/Cart/Cart";
import Profile from "../pages/Profile/Profile";
import Orders from "../pages/Orders/Orders";
import CreateCourse from "../pages/CreateCourse/CreateCourse";

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
				<Route path={'/create'}>
					<CreateCourse />
				</Route>
				<Route path={'/cart'}>
					<Cart />
				</Route>
				<Route path={'/profile'}>
					<Profile />
				</Route>
				<Route path={'/orders'}>
					<Orders />
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