
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Layout from "../../Component/Layout/Layout";
import AdminMenu from "../../Component/Layout/adminMenu";
import { Checkbox, Modal, Radio } from "antd";

const AllEmployees = () => {
    const [employee, setEmployee] = useState([]);
    const [radio, setRadio] = useState([]);
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    //getall employee
    const getAllEmployees = async () => {
        try {
            const { data } = await axios.get(`/api/employee/employee-list/${page}`);
            setEmployee(data?.employee);
        } catch (error) {
            console.log(error);
            toast.error("Someething Went Wrong");
        }
    };
    // Get page Count
    const PageGetter = async () => {
        try {
            const { data } = await axios.get("/api/employee/get-total-employee")
            setTotal(data?.Total)
        } catch (error) {
            console.log(error);
        }
    }
    const FilterEmployee = async () => {
        try {
            const res = await axios.post(`/api/employee/filter-employee`, {
                radio
            })
            if (res.status == 200) {

                const { data } = res;
                setEmployee(data?.employee);
            } else {
                console.log('something went wrong, please try again later')
            }
        } catch (error) {
            console.log(error);
        }
    }
    //lifecycle method
    useEffect(() => {
        getAllEmployees();
        PageGetter();

    }, [page]);
    useEffect(() => {
        FilterEmployee()
    }, [radio, radio.length]);
    return (
        <>
            <Layout>
                <div className="row dashboard">
                    <div className="col-md-3">
                        <AdminMenu />
                        <div className="text-center">
                            <h5>Filter By Department</h5>
                            <div className="d-grid " style={{ padding: "0 10%" }}>
                                <Radio.Group onChange={(e) => { setRadio(e.target.value); }}>
                                    <Radio value={"accending by name"} >Accending by Name</Radio>
                                    <Radio value={"desending by name"} >Desending by Name</Radio>
                                    <Radio value={"accending by address"} >Accending by Address</Radio>
                                    <Radio value={"desending by address"} >Desending by Address</Radio>
                                </Radio.Group>
                            </div>
                            <button className="btn btn-primary" onClick={() => window.location.reload()}>
                                Clear Filter
                            </button>
                        </div>
                    </div>

                    <div className="col-md-9 ">
                        <h1 className="text-center">All Employees List</h1>
                        <div className="d-flex flex-wrap">
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
                                                <button className='btn btn-primary' onClick={() => navigate(`/dashboard/admin/edit-employee/${e._id}`)}>
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex">
                            <div className="m-3 p-3">
                                {
                                    page >= 2 && (
                                        <button className="btn btn-success"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPage(page - 1)
                                            }}
                                        >

                                            Prev
                                        </button>
                                    )
                                }
                            </div>
                            {`Page:${page} and total Employe: ${total}`}
                            <div className="m-3 p-3">
                                {
                                    employee && employee.length && (
                                        <button className="btn btn-success"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setPage(page + 1)
                                            }}
                                        >

                                            Next
                                        </button>
                                    )
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}

export default AllEmployees;