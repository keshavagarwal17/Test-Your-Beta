import React, { useState, useContext, useEffect } from "react";
import Navigation from "../Shared/Navigation/Navigation";
import "./Dashboard.scss";
import { NavLink } from "react-router-dom";
import Loader from "../Shared/Loader/Loader";
import company from "../../ethereum/company";
import web3 from "../../ethereum/web3";
import ProductCard from "../Shared/Card/Card";
import Reviews from "../../data/Reviews.json";
const Dashboard = () => {
  const [myProducts, setMyProducts] = useState([]);
  const [fetchAllProducts, setFetchedProducts] = useState(false);

  const fetchMyProduct = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0], company.methods);
      setFetchedProducts(true);
      let userAddress = accounts[0];
      // const balance = await Factory.methods.getUserBalance(userAddress).call();
      // console.log("this is account balance", balance + " " + userAddress);
      const myProductAddress = await company.methods
        .getAllMyProducts(userAddress)
        .call();
      console.log(myProductAddress);
      setMyProducts(myProductAddress);
      // 1000000000000000000 10^18
      // setCurrentBalance(balance / 1000000000000000000);
      setFetchedProducts(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  const fetchData = async () => {
    const data = Reviews;
    setMyProducts(data);
  };
  useEffect(() => {
    fetchMyProduct()
    // fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="page">
          <div className="body-area">
            <div className="body-area-content">
              <div className="body-area-content-box">
                <div className="status">
                  <div className="status-actions">
                    <div className="status-actions-element">
                      <h1 className="colored"> Your Products</h1>
                    </div>
                  </div>
                </div>
                <div className="contain">
                  {myProducts.map((address, index) => {
                    return (
                      <NavLink
                        key={index}
                        exact
                        activeClassName="current"
                        to={`/dashboard/your-product/${address}`}
                      >
                        <ProductCard data={address} />
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
