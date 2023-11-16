import React from "react";
import { NavLink, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Contexts/authContext";
import useDepartment from "../Hooks/useDepartment";
import Search from "../Form/Search";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const departments = useDepartment();
  const HandleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem('auth');
    toast.success("logOut SuccessFully")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to={`${auth?.user ? `/dashboard/${auth?.user?.role === 2 ? `admin` : `user`}` : "/"}`} className="navbar-brand">
              Employee Mnagement</Link>
            {
              auth?.user ?
                <>


                  <ul className="navbar-nav mb-2 mb-lg-0" style={{ marginLeft: "35%" }}>
                    {
                      auth?.user?.role === 2 ?
                        <>
                          <Search />
                          <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                              Departments
                            </Link>
                            <ul className="dropdown-menu">
                              <li>
                                <Link to={"/alldepartment"} className="dropdown-item">All Department</Link>
                              </li>
                              {
                                departments?.map((item) => {
                                  return <li key={item._id}><Link to={`/department/${item.slug}`} className="dropdown-item" >{item?.name}</Link></li>
                                })
                              }

                            </ul>
                          </li>
                        </> : ""}
                    <li className="nav-item">

                      <NavLink to={`/dashboard/${auth?.user?.role === 2 ? `admin` : `user`}`} className="nav-link ">
                        Dashboard
                      </NavLink>
                    </li>

                    <li className="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.name}
                      </NavLink>
                      <ul className="dropdown-menu ">
                        <li >
                          <NavLink to={`/dashboard/${auth?.user?.role === 2 ? `admin` : `user`}`} className="dropdown-item">
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink onClick={HandleLogout} to="/" className="dropdown-item">
                            LogOut
                          </NavLink>
                        </li>
                      </ul>
                    </li>


                  </ul>
                </> : ""
            }
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
