import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
// import Wallet from './pages/Wallet';

function App() {
  return (
    // criando a rota do Login
    <Router>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </Router>
  );
}

export default App;
