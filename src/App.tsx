import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Dashboard from './screens/Dashboard';
import DrawingStepOne from './screens/CreatePattern/DrawingStepOne';
import CreatePattern from './screens/CreatePattern';
// import CreatePattern from './screens/CreatePattern';

import './App.css';

// Redux
import { Provider } from 'react-redux';
import { store } from './store';
import setAuthToken from './utils/setAuthToken'
import { LOGOUT } from './actions/types'
import { loadUser } from './actions/auth'

import Home from './screens/Home';
import Signin from './screens/Signin';
import UpdateProfile from './screens/UpdateProfile';
import Footer from './components/layout/Footer';

function App() {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token)
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser())

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({ type: LOGOUT })
      }
    })
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/udpate-profile" element={<UpdateProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/create-pattern" element={<CreatePattern />} /> */}
          <Route path="/create-pattern" element={<CreatePattern />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
