import React, { useContext } from "react";
import "./Header.scss";
<<<<<<< HEAD
import { useContractKit } from "@celo-tools/use-contractkit";
import { ContractKitProvider } from "@celo-tools/use-contractkit";
import "@celo-tools/use-contractkit/lib/styles.css";
=======
import {signInWithGoogle} from '../../../services/auth'
>>>>>>> 503c19d6d0e3f825a9a3f199a1de844a316541f6
// import { UserContext } from "../../../Provider/UserAddressProvider";

const Header = () => {
  // const info = useContext(UserContext);
  // const { userAddress } = info;
  // console.log(userAddress);

  const handleSignIn = async()=>{
    const tem = await signInWithGoogle();
  }

  return (
    <div className="head">
      <img className="head-logo" src="/asset/images/logo.png" alt="logo" />
      <div className="head-content">
        <div className="head-content-profile">
<<<<<<< HEAD
          <h1>Login with google</h1>
=======
          <h1 onClick={handleSignIn}>
            Login with google
          </h1>
>>>>>>> 503c19d6d0e3f825a9a3f199a1de844a316541f6
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
