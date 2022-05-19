import { useDispatch } from "react-redux";
import { getProduct } from "../redux/actions/dashboard";
import { logout } from "../redux/actions/login";
import Products from "./products";
import Profile from "./profile";

function Dashboard() {
  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          <img
            src={process.env.PUBLIC_URL + "/company.png"}
            width="50%"
            height="auto"
            className="d-inline-block align-top"
            alt=""
          />
        </a>
        <span
          onClick={() => {
            doLogout();
          }}
          className="navbar-text p-1"
        >
          Logout
        </span>
      </nav>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="d-flex flex-row justify-content-center">
            <div className="p-2">
              <Profile />
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div className="d-flex flex-row justify-content-center">
            <div className="p-2">
              <button
                type="button"
                onClick={() => {
                  dispatch(getProduct());
                }}
                className="btn btn-success mb-3"
              >
                Bank products
              </button>
              <Products />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
