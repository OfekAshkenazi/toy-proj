import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';

import routes from './routes.js'

import { AppHeader } from "./cmp/app-header.jsx";

import { store } from './store/store';
import './assets/style/main.css';


function App() {
  return (

    <Provider store={store}>
      <Router>
        <section>
          <AppHeader />
          <Routes>
            {routes.map(route =>
              <Route key={route.path} element={<route.component />} path={route.path} />
            )}
          </Routes>
        </section>
      </Router>
    </Provider>
  )
}

export default App
