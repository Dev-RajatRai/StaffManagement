import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";


const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    // Form Control
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/auth/forgot-password`, { email, newPassword, answer })
            if (res && res.data.success) {
                toast.success(res.data.massage)
                    .then(navigate('/'))

            } else {
                toast.error(res.data.massage)
            }

        } catch (error) {
            console.log("error in Registering");
            toast.error("Something Went Wrong")
        }
    }
    return (<>
        <Layout title={"Forget-Password "}>

            <div className="form-container">
                <form onSubmit={submitHandler}>
                    <div className="mb-3"><h1>Forgot Password ?</h1></div>

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
                        <input type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Enter Your Nickname"
                            className="form-control"
                            id="exampleInputPassword1"
                            required />
                    </div>
                    <div className="mb-3" >
                        <input type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter Your New Password"
                            className="form-control"
                            id="exampleInputPassword1"
                            required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    </>)
}

export default ForgetPassword;