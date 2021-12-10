import './App.css';
import Header from "./Component/Shared/Header/Header";
import Home from './Component/Home/Home';
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
          </Switch>
          </Router>
    </div>
  );
}

export default App;
