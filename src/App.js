import "./App.css";
import Header from "./Component/Shared/Header/Header";
import Home from "./Component/Home/Home";
import Dashboard from "./Component/Dashboard/Dashboard";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import Create from "./Component/Dashboard/Create/Create";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ContractKitProvider } from "@celo-tools/use-contractkit";
import "@celo-tools/use-contractkit/lib/styles.css";

const App = () => {
  return (
    <div>
      <ContractKitProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/create" component={Create} />
          </Switch>
        </Router>
      </ContractKitProvider>
    </div>
  );
};

export default App;
