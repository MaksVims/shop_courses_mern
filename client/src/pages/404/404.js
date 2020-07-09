import React from 'react'
import {Link} from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const Error404 = () => {
	useTitle('Ошибка')
  return (
    <section>
    	<h1>Ошибка 404</h1>
			<p>Страница не найдена</p>
			<Link to={'/'}>Вернуться на главную</Link>
    </section>
  )
}

export default Error404