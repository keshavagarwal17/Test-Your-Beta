import React, { useState, useContext, useEffect } from "react";
import Navigation from "../Shared/Navigation/Navigation";
import "./Dashboard.scss";
import { NavLink } from "react-router-dom";
import Loader from "../Shared/Loader/Loader";

const Dashboard = () => {

  return (
    <>
      <div>
        <div className="page">
          <div className="body-area">
            <Navigation />
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
                    here all testing cards will reside
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