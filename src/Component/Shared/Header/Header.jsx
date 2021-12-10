import React, { useContext } from "react";
import "./Header.scss";
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
         
          <h1>
            Login with google
            </h1>
        </div>
        <div className="head-content-profile">
         
         <h1>
           See Products
           </h1>
       </div>
       <div className="head-content-profile">
         
         <h1>
           About
           </h1>
       </div>
      </div>
    </div>
  );
};

export default Header;