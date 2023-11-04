import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Radio, Select } from "antd";
import Layout from "../Layout/Layout";
import { useAuth } from "../../Contexts/authContext";
import useDepartment from "../Hooks/useDepartment";
import { Option } from "antd/es/mentions";

const Register = () => {
    // Input States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState();
    const [answer, setAnswer] = useState("");
    const [department, setDepartment] = useState();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const departments = useDepartment();
    // submit Handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/auth/register`, { name, email, password, phone, address, answer, role, department })

            if (res && res.data.success) {
                toast.success(res.data && res.data.massage);
                navigate('/')

            } else {
                toast.error(res.data.massage)
            }

        } catch (error) {
            console.log("error in Registering");
            toast.error("Something Went Wrong")
        }
        console.log(role);
    }
    return (
        <Layout title={"Register Sign-Up"}>
            <div className="form-container">
                <form onSubmit={submitHandler}>
                    <div className="mb-3"><h1>Register Now</h1></div>
                    <div className="mb-3">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter Your Full Name"
                            className="form-control"
                            id="exampleInputName"
                            required />
                    </div>
                    <div className="mb-3" >
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your email"
                            className="form-control"
                            id="exampleInputEmail1"
                            required />
                    </div>
                    <div className="mb-3  text-center " >
                        <Radio.Group onChange={(e) => setRole(e.target.value)}  >
                            <Radio value={1} onClick={() => setDepartment("")}>Employee</Radio>
                            <Radio value={2} onClick={() => setDepartment("Manager")}>Manager</Radio>
                        </Radio.Group>
                    </div>
                    {
                        role < 2 ?
                            <div className="mb-3">
                                <Select className='form-select mb-3' bordered={false} placeholder={"Please select the Shipping"} size='large' showSearch onChange={(value) => { setDepartment(value) }} >
                                    {
                                        departments?.map((item) => (
                                            <Option key={item._id} value={item?.name} >{item.name}</Option>
                                        ))
                                    }
                                </Select>
                            </div>
                            : ""}
                    <div className="mb-3" >
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Your Password"
                            className="form-control"
                            id="exampleInputPassword1"
                            required />
                    </div>
                    <div className="mb-3" >
                        <input type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Your Address"
                            className="form-control"
                            id="exampleInputAddress"
                            required />
                    </div>
                    <div className="mb-3" >
                        <input type="tel"
                            value={phone}
                            pattern="\d{10}"
                            maxLength={10}
                            onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                            placeholder="Enter Your Phone Number"
                            className="form-control"
                            id="exampleInputPhone"
                            required />
                    </div>

                    <div className="mb-3" >
                        <input type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Please Enter Your nickname"
                            className="form-control"
                            id="exampleInputAnswer"
                            required />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                    <Link to={"/"}>Existing User?</Link>
                </form>
            </div>
        </Layout>

    )
}

export default Register