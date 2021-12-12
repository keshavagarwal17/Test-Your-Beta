import React, { useContext, useEffect } from "react";
import "./Header.scss";
import { signInWithGoogle, signOutFromGoogle } from "../../../services/auth";
import { UserContext } from "../../../providers/userProvider";
// import { UserContext } from "../../../Provider/UserAddressProvider";
import { useHistory, useLocation } from "react-router-dom";
import { correctLocation } from "../../../services/routes";
import { Link } from "react-router-dom";
import { fetchInfo } from "../../../providers/userProvider";
import { Dropdown, Icon, Button, Menu } from "semantic-ui-react";

const Header = () => {
  const history = useHistory();
  const location = useLocation();
  const { info } = useContext(UserContext);
  const { user, isLoading } = info;
  const handleSignIn = async () => {
    await signInWithGoogle();
    await fetchInfo();
  };

  const trigger = (
    <span>
      <Icon name="user circle" size="large" />
    </span>
  );

  const options = [
    {
      key: "user",
      text: <span>{user && <strong>{user.companyName}</strong>}</span>,
    },
    {
      key: "update",
      text: (
        <Link to="/dashboard/update">
          <h4>Update Profile</h4>
        </Link>
      ),
    },
    {
      key: "logout",
      text: (
        <Button
          size="tiny"
          onClick={signOutFromGoogle}
          icon
          labelPosition="left"
        >
          <Icon name="log out" />
          Logout
        </Button>
      ),
    },
  ];
  const options2 = [
    {
      key: "user",
      text: <span>{user && <strong>{user.name}</strong>}</span>,
    },
    {
      key: "logout",
      text: (
        <Button
          size="tiny"
          onClick={signOutFromGoogle}
          icon
          labelPosition="left"
        >
          <Icon name="log out" />
          Logout
        </Button>
      ),
    },
  ];

  const options3 = [
    {
      key: "logout",
      text: (
        <Button
          size="tiny"
          onClick={signOutFromGoogle}
          icon
          labelPosition="left"
        >
          <Icon name="log out" />
          Logout
        </Button>
      ),
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      let newPath = correctLocation(user);
      let curPath = location.pathname;
      console.log("printing from header", newPath, user);
      if (curPath !== newPath) {
        let len = curPath.length > 10 ? 10 : curPath.length;
        if (
          newPath === "/dashboard" &&
          curPath.substr(0, len) === "/dashboard"
        ) {
          return;
        } else {
          len = curPath.length > 5 ? 5 : curPath.length;
          if (
            newPath === "/user/exploration" &&
            curPath.substr(0, len) === "/user" && curPath !== "/user-form"
          ) {
            return;
          }
          history.push(newPath);
        }
      }
    }
  }, [info]);

  const isCompany = () => {
    return user && user.role === "company" && user.companyName;
  };

  const isUser = () => {
    return user && user.role === "user" && user.dob;
  };

  return (
    <div className="head">
      <Link to="/" style={{ color: "black" }}>
        <h3>Test your Beta</h3>
      </Link>
      {/* <img className="head-logo" src="images/logo.png" alt="logo" /> */}
      <div className="head-content">
        {!user && (
          <div className="head-content-profile">
            <h1 onClick={handleSignIn}>Login with google</h1>
          </div>
        )}
        {/* <div className="head-content-profile">
          <Link to="/exploration">
            <h1>See Products</h1>
          </Link>
        </div> */}
        {user && !isCompany() && !isUser() && (
          <Menu>
          <Menu.Menu position='right'>
              <Dropdown item simple trigger={trigger} options={options3} />
            </Menu.Menu>
          </Menu>
        )}
        {user && isCompany() && (
          <Menu>
          <Menu.Menu position='right'>
              <Dropdown item simple trigger={trigger} options={options} />
            </Menu.Menu>
          </Menu>
        )}
        {user && isUser() && (
          <Menu>
            <Menu.Menu position='right'>
              <Dropdown item simple trigger={trigger} options={options2} />
            </Menu.Menu>
          </Menu>
        )}
        {user && isCompany() && (
          <div className="head-content-profile">
            <Link to="/dashboard">
              <h1>Dashboard</h1>
            </Link>
          </div>
        )}
        {isUser() && (
          <div className="head-content-profile">
            <Link to="/user/exploration">
              <h1>Dashboard</h1>
            </Link>
          </div>
        )}
        {user && isCompany() && (
          <div className="head-content-profile">
            <Link to="/dashboard/create">
              <h1>Add Products</h1>
            </Link>
          </div>
        )}
        {/* <div className="head-content-profile">
          <h1
          // onClick={connectCeloWallet}
          >
            Sign in with Celo Wallet
          </h1>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
