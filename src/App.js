import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
// import Wallet from './pages/Wallet';

function App() {
  return (
    // criando a rota do Login
    <Router>
      <Switch>
        <Link to="/">Login</Link>
      </Switch>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </Router>
  );
}

export default App;
