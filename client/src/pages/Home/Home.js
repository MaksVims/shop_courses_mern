import React from 'react'
import './Home.scss'
import useTitle from "../../hooks/useTitle";

const Home = () => {
	useTitle('Главная')
	return (
		<section className="page mt-4 home-page">
			<h1>Добро пожаловать!</h1>
			<p>На нашем портале собраны лучшие онлайн курсы на просторах интернета.</p>
			<p>Здесь вы найдете эксклюзивные материалы от лучших менторов.</p>
			<p>Также вы можете сами предложить свои услуги!</p>
		</section>
	)
}

export default Home