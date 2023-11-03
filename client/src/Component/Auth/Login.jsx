// Login.js
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from '../../Contexts/authContext';
import Layout from '../Layout/Layout';


const Login = () => {
    // States and Veriables
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation()

    // Form Submit Handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/auth/login`, { email, password })
            if (res && res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(`/dashboard/${res.data.user.role == 2 ? `admin` : `user`}`)
                toast.success(res.data.massage);

            } else {
                toast.error(res.data.massage)
            }

        } catch (error) {
            console.log("error in Registering");
            toast.error("Something Went Wrong")
        }
    }
    return (
        <>
            <Layout>
                <div className="form-container">
                    <form onSubmit={submitHandler}>
                        <div className="mb-3"><h1>Login Now</h1></div>
                        <div className="mb-3" >
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your email"
                                className="form-control"
                                id="exampleInputEmail1"
                                required />
                        </div>
                        <div className="mb-3" >
                            <input type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Your Password"
                                className="form-control"
                                id="exampleInputPassword1"
                                required />
                        </div>

                        <button type="submit" className="btn btn-primary mb-3">Submit</button>
                        <div >
                            <button className="btn btn-primary" onClick={() => navigate("/forget-password")}>Forget password</button>
                        </div>
                        <Link to={"/signup"}>New User?</Link>
                    </form>
                </div>
            </Layout>
        </>
    );
}

export default Login;
