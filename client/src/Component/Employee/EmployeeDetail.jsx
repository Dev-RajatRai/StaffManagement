import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useAuth } from '../../Contexts/authContext';

const EmployeeDetails = () => {
    const { id } = useParams();
    const [auth] = useAuth();
    // Fetch employee details by ID from API and display them
    return (
        <>
            <Layout>
                <div className="container-fluid m-3 p-3">
                    <div className='row'>
                        <div className="col-md-9">
                            <div className="card w-75 p-3">
                                <h3>Admin Name: {auth?.user?.name}</h3>
                                <h3>Admin Email: {auth?.user?.email}</h3>
                                <h3>Admin Address: {auth?.user?.address}</h3>
                                <h3>Admin Phone No.: {auth?.user?.phone}</h3>
                                <h3>Designation: {auth?.user?.role < 2 ? "Employee" : "Manager"}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default EmployeeDetails;