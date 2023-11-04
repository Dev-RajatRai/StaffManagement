import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import DepartmentForm from '../../Component/Form/departmentForm';
import Layout from '../../Component/Layout/Layout';
import AdminMenu from '../../Component/Layout/adminMenu';
import { Modal } from 'antd';

const Createdepartment = () => {
    const [department, setDepartment] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [newName, setNewName] = useState("");
    const [selected, setSelected] = useState(null);

    // create department
    const departmentFormSubmitter = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/department/create-department", { name });
            if (data?.success) {
                toast.success(`${name} is created Successfully`);
                getAllDepartment();
            } else {
                toast.error(data.massage)
            }
        } catch (error) {
            console.log(error)
            toast.error("Error in Setting Name")
        }
    }
    // Get all department
    const getAllDepartment = async () => {
        try {
            const { data } = await axios.get("/api/department/get-all-department");
            if (data?.success) {
                setDepartment(data?.department)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong in getting departments")
        }
    }
    useEffect(() => {
        getAllDepartment();
    }, [])

    // Edit department
    const editdepartment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/department/update-department/${selected._id}`, { name: newName });
            if (data?.success) {
                toast.success(`${newName} is Updated Successfully`);
                setSelected(null);
                setNewName("");
                setVisible(false)
                getAllDepartment();
            } else {
                toast.error(data.massage)
            }
        } catch (error) {
            toast.error("Something Went Wrong In editdepartment")
        }
    }
    // Handle delete
    const deletedepartment = async (pid) => {
        try {
            const { data } = await axios.delete(`/api/department/delete-department/${pid}`);
            if (data?.success) {
                toast.success(`department is Deleted Successfully`);
                getAllDepartment();
            } else {
                toast.error(data.massage)
            }
        } catch (error) {
            toast.error("Something Went Wrong In editdepartment")
        }
    }
    return (
        <Layout title={"Create-department "}>
            <div className="container-fluid m-3 p-3">
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Manage  department</h1>
                        <div className='p-3 w-50'>
                            <DepartmentForm departmentFormSubmitter={departmentFormSubmitter} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table table-bordered border-primary">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {department?.map(item => (

                                        <tr key={item._id}>
                                            <td >{item.name}</td>
                                            <td>
                                                <button className='btn btn-primary' onClick={() => { setVisible(true); setNewName(item.name); setSelected(item) }}>
                                                    Edit
                                                </button>
                                                <button className='btn btn-danger ms-3' onClick={() => { deletedepartment(item._id) }}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)}
                            footer={null}
                            open={visible} >
                            <DepartmentForm value={newName} setValue={setNewName} departmentFormSubmitter={editdepartment} />
                        </Modal>
                    </div>
                </div>
            </div>

        </Layout>


    )
}

export default Createdepartment
