import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';

import routes from './routes.js'

import { AppHeader } from "./cmp/app-header.jsx";

import { store } from './store/store';
import './scss/styels.scss';
import { AppFooter } from "./cmp/app-footer.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout">
          <AppHeader />
          <Routes>
            {routes.map(route =>
              <Route key={route.path} element={<route.component />} path={route.path} />
            )}
          </Routes>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}

export default App
