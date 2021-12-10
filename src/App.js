import './App.css';
import Header from "./Component/Shared/Header/Header";
import Home from './Component/Home/Home';
import Dashboard from './Component/Dashboard/Dashboard';
import React from "react";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
          <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
          </Router>
    </div>
  );
}

export default App;
