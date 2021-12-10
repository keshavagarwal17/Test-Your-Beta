import React, { useContext } from "react";
import "./Header.scss";
import { signInWithGoogle } from "../../../services/auth";
// import { UserContext } from "../../../Provider/UserAddressProvider";
import { connectCeloWallet } from "../../../App";
const Header = () => {

  const handleSignIn = async () => {
    const tem = await signInWithGoogle();
  };

  return (
    <div className="head">
      <img className="head-logo" src="/asset/images/logo.png" alt="logo" />
      <div className="head-content">
        <div className="head-content-profile">
          <h1 onClick={handleSignIn}>Login with google</h1>
        </div>
        <div className="head-content-profile">
          <h1>See Products</h1>
        </div>
        <div className="head-content-profile">
          <h1>About</h1>
        </div>
        <div className="head-content-profile">
          <h1 onClick={connectCeloWallet}>Sign in with Celo Wallet</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
