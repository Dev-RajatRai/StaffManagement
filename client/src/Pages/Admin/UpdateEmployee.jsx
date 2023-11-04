import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Modal, Select } from 'antd'
import { Option } from 'antd/es/mentions'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../Component/Layout/Layout'
import AdminMenu from '../../Component/Layout/adminMenu'
import useDepartment from '../../Component/Hooks/useDepartment'

const UpdateEmployee = () => {
    const params = useParams()
    const department = useDepartment();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [newDepartment, setNewDepartment] = useState();
    const [id, setId] = useState();
    const [employee, setEmployee] = useState([]);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();


    // Single employee
    const getEmployee = async () => {
        try {
            const { data } = await axios.get(
                `/api/employee/get-employee/${params.id}`
            );
            setEmployee(data?.employee);
            setId(data?.employee._id)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEmployee();
    }, [])

    // employeeEditer
    const UpdateEmployee = async (e) => {
        console.log(newDepartment);
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/employee/update-employee-department/${id}`, { department: newDepartment });
            if (data?.success) {
                toast.success("employee updated Successfully");
                navigate("/dashboard/admin/employee");
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("some thing Went Wrong")
        }
    }
    // Deleteemployee
    const Deleteemployee = async () => {
        try {

            await axios.delete(`/api/employee/delete-employee/${id}`);
            toast.success("employee Deleted Successfully");
            navigate("/dashboard/admin/employee");
        } catch (error) {
            console.log(error);
            toast.error("some thing Went Wrong")
        }
    }
    return (
        <Layout title={"Update-employees Ecommerce-app"}>
            <div className="container-fluid m-3 p-3">

                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Update Employee</h1>
                        <div className='m-1 w-75'>
                            <div className='mb-3' >
                                <input type='text' className='form-control' value={employee.name} />
                            </div>
                            <div className='mb-3' >
                                <input type='text' className='form-control' value={employee.email} />
                            </div>
                            <div className='mb-3' >
                                <input type='text' className='form-control' value={employee.phone} />
                            </div>
                            <div className='mb-3' >
                                <input type='text' className='form-control' value={employee.address} />
                            </div>
                            <div className='mb-3' >
                                <p >Change the Department? current Department is {employee.department} </p>
                                <Select className='form-select mb-3' bordered={false} placeholder={"Please select Department"} size='large' showSearch onChange={(value) => { setNewDepartment(value) }}
                                    value={newDepartment}
                                >
                                    {
                                        department?.map((d) => (
                                            <Option key={d._id} value={d.name} >{d.name}</Option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary col-md-12" onClick={UpdateEmployee}>Update employee</button>
                            </div>
                            <div className="mb-3">

                                <button className="btn btn-danger col-md-12" onClick={() => { setVisible(true); }}>Delete employee</button>

                            </div>
                            <Modal onCancel={() => setVisible(false)}
                                onOk={() => Deleteemployee()}
                                open={visible} >
                                Are You Sure You want to Delete This employee
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>


    )
}

export default UpdateEmployee;
