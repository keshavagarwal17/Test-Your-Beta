import './App.css';
import Header from "./Component/Shared/Header/Header";
import UserProvider from './providers/userProvider';
import Home from './Component/Home/Home';
import Dashboard from './Component/Dashboard/Dashboard';
import React from "react";
import "semantic-ui-css/semantic.min.css";
import Create from './Component/Dashboard/Create/Create';
import CompanyForm from './Component/PostSignUp/DetailForms/CompanyForm';
import UserForm from './Component/PostSignUp/DetailForms/UserForm';
import SelectRole from './Component/PostSignUp/Roles/SelectRole';
import ProductPage from './Component/ProductPage/ProductPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <UserProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/create" component={Create} />
            <Route exact path="/company-form" component={CompanyForm} />
            <Route exact path="/user-form" component={UserForm} />
            <Route exact path="/select-role" component={SelectRole} />
            <Route exact path="/product" component={ProductPage} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
