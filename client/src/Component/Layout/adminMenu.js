import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <h4>Admin Dashboard</h4>

                <div className="list-group">

                    <NavLink to="/dashboard/admin/create-department" className="list-group-item list-group-item-action">Create Department</NavLink>


                    <NavLink to="/dashboard/admin/employee" className="list-group-item list-group-item-action">All Employees</NavLink>

                </div>
            </div>
        </>
    );
}

export default AdminMenu;