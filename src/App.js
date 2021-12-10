import "./App.css";
import Header from "./Component/Shared/Header/Header";
import UserProvider from "./providers/userProvider";
import Home from "./Component/Home/Home";
import Dashboard from "./Component/Dashboard/Dashboard";
import React from "react";
import "semantic-ui-css/semantic.min.css";
import Create from "./Component/Dashboard/Create/Create";
import ProductPage from "./Component/ProductPage/ProductPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
const connectCeloWallet = async () => {
  if (window.celo) {
    try {
      await window.celo.enable();
      const web3 = new Web3(window.celo);
      let kit = newKitFromWeb3(web3);

      const accounts = await kit.web3.eth.getAccounts();
      const user_address = accounts[0];

      kit.defaultAccount = user_address;
    } catch (error) {
      console.log("There is an error");
      console.log({ error });
    }
  } else {
    console.log("please install the extension");
  }
};
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
            <Route exact path="/product" component={ProductPage} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
export { connectCeloWallet };
