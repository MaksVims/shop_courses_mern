import React from 'react'
import './Navbar.scss'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
	const links = [
		{to: '/', label: 'Главная', exact: true},
		{to: '/courses', label: 'Курсы', exact: false},
		{to: '/auth', label: 'Авторизация', exact: false}
	]

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