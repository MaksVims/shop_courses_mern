import React from 'react';
import './App.scss';
import Layout from "./hor/Layout/Layout";
import Navbar from "./components/navigation/Navbar/Navbar";
import {useRoutes} from "./hooks/useRoutes";

function App() {
  const routes = useRoutes(false)
  return (
    <>
      <Navbar />
      <Layout>
        {routes}
      </Layout>
    </>
  )
}

export default App;