import React from 'react'
import Alert from "../../components/Alert/Alert";

const Layout = ({children}) => {
  return (
   	<>
			<Alert />
			<div className="container">
				<main>
					{children}
				</main>
			</div>
		</>
  )
}

export default Layout