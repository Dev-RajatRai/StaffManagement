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
    }, [Params])
    return (
        <Layout title={"employee-Employee"}>
            <div className="container">
                <div className="text-center mt-3">
                    Employees Of the Deaprtment: {(department?.name)?.toUpperCase()}
                </div>
                {
                    employee ?
                        <div className="d-flex flex-wrap container-fluid similar-Employee">
                            <table className="table table-bordered border-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Department</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employee?.map(e => (

                                        <tr key={e._id}>
                                            <td >{e.name}</td>
                                            <td >{e.address}</td>
                                            <td >{e.department}</td>
                                            <td>
                                                <button className="btn btn-primary ms-1" onClick={() => navigate(`/employee/${e?._id}`)}>More Details </button>

                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        : "There is No Employee in this Deaprtment"}
            </div>
        </Layout>
    )
}

export default DepartmentwiseEmployee;