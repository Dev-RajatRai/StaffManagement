
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Layout from "../../Component/Layout/Layout";
import AdminMenu from "../../Component/Layout/adminMenu";

const AllEmployees = () => {
    const [employee, setEmployee] = useState([]);

    //getall products
    const getAllEmployees = async () => {
        try {
            const { data } = await axios.get("/api/employee/get-employee");
            setEmployee(data?.employee);
        } catch (error) {
            console.log(error);
            toast.error("Someething Went Wrong");
        }
    };

    //lifecycle method
    useEffect(() => {
        getAllEmployees();
    }, []);
    return (
        <>
            <Layout>
                <div className="row dashboard">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 ">
                        <h1 className="text-center">All Products List</h1>
                        <div className="d-flex flex-wrap">
                            {employee?.map((p) => (
                                <Link
                                    key={p._id}
                                    to={`/dashboard/admin/product/${p.slug}`}
                                    className="product-link">
                                    <div className="card m-2" style={{ width: "18rem" }}>
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.address}</p>
                                            <p className="card-text">{p.department}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}

export default AllEmployees;