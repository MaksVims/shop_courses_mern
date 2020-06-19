import React from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import './Auth.scss'
import FormLogin from "../../components/forms/FormLogin/FormLogin";
import FormRegister from "../../components/forms/FromRegister/FormRegister";

const Auth = () => {
	const hash = document.location.hash.slice(1)
	return (
		<section className={'Auth'}>
			<div className="mt-3 d-flex flex-column align-items-center">
				<Tabs
					defaultActiveKey={hash === 'register' ? 'register' : 'login'}
					className={"mt-3"}
					id="controlled-tab-example"
				>
					<Tab eventKey="login" title="Вход" className={"mt-3"}>
						<div id="login" className={'tabs'}>
							<h1>Войти в систему</h1>
							<FormLogin />
						</div>
					</Tab>
					<Tab eventKey="register" title="Регистрация"className={"mt-3"}>
						<div id="register" className={'tabs'}>
							<h1>Форма регистрации</h1>
							<FormRegister />
						</div>
					</Tab>
				</Tabs>
			</div>
		</section>
	)
}

export default Auth