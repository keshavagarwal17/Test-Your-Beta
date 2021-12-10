import React, { useContext } from "react";
import "./Header.scss";
import { useContractKit } from "@celo-tools/use-contractkit";
import { ContractKitProvider } from "@celo-tools/use-contractkit";
import "@celo-tools/use-contractkit/lib/styles.css";
// import { UserContext } from "../../../Provider/UserAddressProvider";

const Header = () => {
  // const info = useContext(UserContext);
  // const { userAddress } = info;
  // console.log(userAddress);
  return (
    <div className="head">
      <img className="head-logo" src="/asset/images/logo.png" alt="logo" />
      <div className="head-content">
        <div className="head-content-profile">
          <h1>Login with google</h1>
        </div>
        <div className="head-content-profile">
          <h1>See Products</h1>
        </div>
        <div className="head-content-profile">
          <h1>About</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
