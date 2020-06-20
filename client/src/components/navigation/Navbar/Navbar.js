import React, {useContext} from 'react'
import './Navbar.scss'
import {NavLink} from 'react-router-dom'
import {AuthContext} from "../../../context/auth/AuthContext";

const Navbar = () => {
	const {isAuth} = useContext(AuthContext)
	const links = [
		{to: '/', label: 'Главная', exact: true},
		{to: '/courses', label: 'Курсы', exact: false},
	]

	if (isAuth) {
		links.push({to: '/create', label: 'Создать', exact: false})
		links.push({to: '/profile', label: 'Профиль', exact: false})
		links.push({to: '/cart', label: 'Корзина', exact: false})
		links.push({to: '/orders', label: 'Заказы', exact: false})
		links.push({to: '/logout', label: 'Выйти', exact: false})
	} else {
		links.push({to: '/auth#login', label: 'Авторизация', exact: false})
	}


	const createLinks = () => {
		return links.map(link => (
			<li className={"nav-item"} key={link.label}>
				<NavLink className={'nav-link'} to={link.to} exact={link.exact}>
					{link.label}
				</NavLink>
			</li>
		))
	}

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-primary">
			<span className="navbar-brand">Онлайн курсы</span>
			<div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
				<ul className="navbar-nav">
					{createLinks()}
				</ul>
			</div>
		</nav>
	)
}

export default Navbar