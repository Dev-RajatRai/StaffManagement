import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import axios from 'axios';

const EmployeeDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    //getEmployee
    const getEmployee = async () => {
        try {
            const { data } = await axios.get(
                `/api/employee/get-employee/${params.id}`
            );
            setEmployee(data?.employee);


        } catch (error) {
            console.log(error);
        }
    };
    //initalp details
    useEffect(() => {
        if (params?.id) getEmployee();
    }, [params?.id]);
    return (
        <>
            <Layout>
                <div className="container-fluid m-3 p-3">
                    <div className='row'>
                        <div className="col-md-9">
                            <div className="card w-75 p-3">
                                <h3>Admin Name: {employee?.name}</h3>
                                <h3>Admin Email: {employee?.email}</h3>
                                <h3>Admin Address: {employee?.address}</h3>
                                <h3>Admin Phone No.: {employee?.phone}</h3>
                                <h3>Designation: {employee?.role < 2 ? "Employee" : "Manager"}</h3>
                            </div>
                            <button className='btn btn-primary' onClick={() => navigate(`/dashboard/admin/edit-employee/${employee._id}`)}>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default EmployeeDetails;