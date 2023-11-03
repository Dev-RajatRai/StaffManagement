import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Layout from '../Component/Layout/Layout';

function DepartmentwiseEmployee() {
    const [employee, setEmployee] = useState([]);
    const [department, setDepartment] = useState([]);
    const Params = useParams();
    const navigate = useNavigate();
    const employeeDepartment = async () => {
        try {
            const { data } = await axios.get(`/api/employee/employee-department/${Params.slug}`);
            setEmployee(data?.employee);
            setDepartment(data?.department);
            console.log(department);
            console.log("data", data);
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong")
        }
    }
    useEffect(() => {
        employeeDepartment();
    }, [])
    return (
        <Layout title={"employee-Employee"}>
            <div className="container">
                <div className="text-center mt-3">
                    Items Of The Categoey Of {(department?.name)?.toUpperCase()}
                </div>
                <div className="d-flex flex-wrap container-fluid similar-Employee">

                    {employee?.map((p) => (
                        < div className="card m-2" key={p?._id} style={{ width: "18rem" }}>

                            <div className="card-body">
                                <h5 className="card-title">{p?.name?.substring(0, 15)}...</h5>
                                <p className="card-text">{p?.department?.substring(0, 30)}</p>
                                <p className="card-text">{p.address}</p>
                            </div>
                            <div className="btn">
                                <button className="btn btn-primary ms-1" onClick={() => navigate(`/product/${p?.slug}`)}>More Details </button>

                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default DepartmentwiseEmployee;