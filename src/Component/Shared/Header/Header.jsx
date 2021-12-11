import React, { useContext,useEffect } from "react";
import "./Header.scss";
import { signInWithGoogle, signOutFromGoogle } from "../../../services/auth";
import {UserContext} from "../../../providers/userProvider"
// import { UserContext } from "../../../Provider/UserAddressProvider";
import { useHistory,useLocation } from "react-router-dom"
import {correctLocation} from '../../../services/routes'
import { Link } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const {info,fetchInfo} = useContext(UserContext);
  const {user,isLoading} = info;
  const handleSignIn = async () => {
    await signInWithGoogle();
    fetchInfo();
  };

  useEffect(()=>{
    if(!isLoading){
      let newPath = correctLocation(user);
      let curPath = location.pathname;
      if(curPath!==(newPath)){
        let len = curPath.length > 10 ? 10:curPath.length;
        if(newPath==="/dashboard" && curPath.substr(0,len)==="/dashboard"){
          return
        }else{
          history.push(newPath);
        }
      }
    }
  },[info])

  return (
    <div className="head">
      <img className="head-logo" src="images/logo.png" alt="logo" />
      <div className="head-content">
        <div className="head-content-profile">
          <h1 onClick={handleSignIn}>Login with google</h1>
        </div>
        <div className="head-content-profile">
         
         <Link to="/exploration">
         <h1>
           See Products
          </h1>
          </Link>
       </div>
        <div className="head-content-profile">
          <h1 
          // onClick={connectCeloWallet}
          >
            Sign in with Celo Wallet</h1>
        </div>
        <div className="head-content-profile">
          <h1 onClick={signOutFromGoogle}>Logout</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
