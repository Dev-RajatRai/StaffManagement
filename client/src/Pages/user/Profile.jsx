import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/userMenu'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserProfile = () => {
    // Input States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();

    // submit Handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/update-user", {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user]);
    return (
        <Layout title={"User-Order Ecommerce-App"}>
            <div className="container-fluid m-3 p-3">

                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className="form-container">
                            <form onSubmit={submitHandler}>
                                <div className="mb-3"><h1>{auth?.user.name}</h1></div>
                                <div className="mb-3">

                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        placeholder="Enter Your Name"
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
                                        disabled
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
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter Your Phone Number"
                                        className="form-control"
                                        id="exampleInputPhone"
                                        required />
                                </div>


                                <button type="submit" className="btn btn-primary">Update Profle</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserProfile
