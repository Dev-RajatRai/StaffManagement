import React from 'react'
import Layout from '../Component/Layout/Layout'
import useDepartment from '../Component/Hooks/useDepartment'
import { Link, useNavigate } from 'react-router-dom';

function AllDepartment() {
    const value = useDepartment();
    console.log(value);
    const navigate = useNavigate();
    return (
        <>
            <Layout>
                <div className="container">
                    <div className="text-center d-flex similar-products
                flex-wrap">
                        {value?.map((p) => (
                            < div className="card m-2" key={p?._id} style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{p?.name.substring(0, 15)}...</h5>
                                </div>
                                <div className="btn">
                                    <Link className="btn btn-primary ms-1" to={`/department/${p?.slug}`}>View Employees</Link>

                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default AllDepartment
