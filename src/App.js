/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Component/Shared/Header/Header";
import UserProvider from "./providers/userProvider";
import Home from "./Component/Home/Home";
import Dashboard from "./Component/Dashboard/Dashboard";
import "semantic-ui-css/semantic.min.css";
import Create from "./Component/Dashboard/Create/Create";
import ProductDetail from "./Component/ProductDetail/ProductDetail";
import ProductPage from "./Component/ProductPage/ProductPage";
import CompanyForm from "./Component/PostSignUp/DetailForms/CompanyForm";
import UserForm from "./Component/PostSignUp/DetailForms/UserForm";
import SelectRole from "./Component/PostSignUp/Roles/SelectRole";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CompanyInstance from "./ethereum/company";
import ProductInstance from "./ethereum/product";
import { newKitFromWeb3 } from "@celo/contractkit";
import Web3 from "web3";

// const connectCeloWallet = async () => {
//   if (window.celo) {
//     console.log(" this is called ");
//     try {
//       await window.celo.enable();
//       const web3 = new Web3(window.celo);
//       let kit = newKitFromWeb3(web3);

//       const accounts = await kit.web3.eth.getAccounts();
//       console.log(accounts[0]);
//       const user_address = accounts[0];
//       console.log("this is uyser address", user_address);

//       kit.defaultAccount = user_address;
//     } catch (error) {
//       console.log("There is an error");
//       console.log({ error });
//     }
//   } else {
//     console.log("please install the extension");
//   }
// };

const App = () => {
  const [kit, setKit] = useState(null);
  const [address, setAddress] = useState("");
  const [contract, setContract] = useState(null);

  const connectWithCelo = async () => {
    if (window.celo) {
      console.log(" this is called ");
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        console.log(accounts[0]);
        const user_address = accounts[0];
        setAddress(user_address);
        setKit(kit);
        console.log("this is uyser address", user_address);

        kit.defaultAccount = user_address;
      } catch (error) {
        console.log("There is an error");
        console.log({ error });
      }
    } else {
      console.log("please install the extension");
    }
  };

  useEffect(() => {
    connectWithCelo();
    setContract(CompanyInstance);
    console.log(address);
    deployIt()
  }, []);

 const deployIt = async () => {
   console.log(CompanyInstance)
   try {
    let temp = await CompanyInstance.methods.addAProduct("strring", "string", "sting",1,2).send({ from: '0x276A42eAc323740916De9829b1cA291c283b17fe' });
    console.log(temp)

   } catch(err) {
     console.log(err)
   }
  }

  return (
    <div>
      <UserProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/create" component={Create} />
            <Route
              exact
              path="/dashboard/detail/:id"
              component={ProductDetail}
            />
            <Route exact path="/company-form" component={CompanyForm} />
            <Route exact path="/user-form" component={UserForm} />
            <Route exact path="/select-role" component={SelectRole} />
            <Route exact path="/product" component={ProductPage} />
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
// export { connectCeloWallet };
