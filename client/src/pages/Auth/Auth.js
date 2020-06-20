import React, {useCallback, useEffect, useState} from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import './Auth.scss'
import FormLogin from "../../components/forms/FormLogin/FormLogin";
import FormRegister from "../../components/forms/FromRegister/FormRegister";
import {useHash} from "../../hooks/useHash";


const Auth = () => {
	const {hash: currentTab} = useHash()
	const selectHandler = useCallback(tab => window.location.hash = tab, [] )

	return (
		<section className={'Auth page'}>
			<div className="mt-3 d-flex flex-column align-items-center">
				<Tabs
					defaultActiveKey={'login'}
					activeKey={currentTab}
					className={"mt-3"}
					id="controlled-tab-example"
					onSelect={selectHandler}
				>
					<Tab eventKey="login" title="Вход" className={"mt-3"}>
						<div id="login" className={'tabs'}>
							<h1>Войти в систему</h1>
							<FormLogin/>
						</div>
					</Tab>
					<Tab eventKey="register" title="Регистрация" className={"mt-3"}>
						<div id="register" className={'tabs'}>
							<h1>Форма регистрации</h1>
							<FormRegister
								onRegister={selectHandler}
							/>
						</div>
					</Tab>
				</Tabs>
			</div>
		</section>
	)
}

export default Auth