import React, { useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "./dashboard/dashboard";
import Login from "./login/login";
import Register from "./register/register";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const selectedData = useSelector((state) => state.loginData);

  const clickHandler = (val) => {
    setIsLogin(val);
  };

  return (
    <div className="App">
      <div className="row">
        {!selectedData.isAuthenticated ? (
          <>
            <div className="col-md-6 col-sm-12">
              <div className="d-flex align-items-center p-3">
                <img
                  alt="company"
                  className="img-fluid"
                  src={process.env.PUBLIC_URL + "/company.png"}
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-12 p-5">
              <ul
                className="nav nav-pills nav-justified mb-3"
                id="ex1"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  {/* eslint-disable-next-line */}
                  <button
                    className={isLogin ? "nav-link active" : "nav-link"}
                    id="tab-login"
                    onClick={() => {
                      setIsLogin(true);
                    }}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={isLogin ? "nav-link" : "nav-link active"}
                    id="tab-register"
                    onClick={() => {
                      setIsLogin(false);
                    }}
                  >
                    Register
                  </button>
                </li>
              </ul>
              <div className="tab-content">
                {isLogin ? (
                  <Login isLogin={isLogin} />
                ) : (
                  <Register isLogin={isLogin} />
                )}
              </div>
            </div>
          </>
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
}

export default App;
