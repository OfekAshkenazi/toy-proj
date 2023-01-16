import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';

import routes from './routes.js'

import { AppHeader } from "./cmp/app-header.jsx";

import { store } from './store/store';
import { AppFooter } from "./cmp/app-footer.jsx";

import './assets/scss/styels.scss';
import { UserMsg } from "./cmp/user-msg.jsx";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout">
          <AppHeader />
          <main>
            <Routes>
              {routes.map(route =>
                <Route key={route.path} element={<route.component />} path={route.path} />
              )}
            </Routes>
          </main>
          <AppFooter />
        </section>
        <UserMsg />
      </Router>
    </Provider>
  )
}

export default App
