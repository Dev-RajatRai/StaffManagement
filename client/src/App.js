import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Signup from './Component/Auth/Signup';
import EmployeeDetails from './Component/Employee/EmployeeDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/user/Dashboard';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import PrivateRoute from './Component/ProtectedRoute/Route';
import AdminRoutes from './Component/ProtectedRoute/AdminRoutes';
import Createdepartment from './Pages/Admin/CreateDepartment';
import AllEmployees from './Pages/Admin/AllEmployees';
import Search from './Pages/Search';
import DepartmentwiseEmployee from './Pages/DepartmentEmployees';
import AllDepartment from './Pages/AllDepartment';
import ForgetPassword from './Component/Auth/ForgetPassword';
import UpdateEmployee from './Pages/Admin/UpdateEmployee';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/alldepartment" element={<AllDepartment />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="user" element={<Dashboard />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-department" element={<Createdepartment />} />
          <Route path="admin/employee" element={<AllEmployees />} />
          <Route path="admin/edit-employee/:id" element={<UpdateEmployee />} />
        </Route>
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/department/:slug" element={<DepartmentwiseEmployee />} />
      </Routes>
    </>
  );
}

export default App;
