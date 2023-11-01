import React from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Login from './Component/Auth/Login';
import Signup from './Component/Auth/Signup';
import DepartmentForm from './Component/Department/DepartmentForm';
import DepartmentList from './Component/Department/DepartmentList';
import EmployeeList from './Component/Employee/EmployeeList';
import EmployeeDetails from './Component/Employee/EmployeeDetail';
import EmployeeFilter from './Component/Employee/EmployeeFiter';

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
        <Route path="/filter" element={<EmployeeFilter />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/create-department" element={<DepartmentForm />} />
        <Route path="/edit-department/:id" element={<DepartmentForm />} />
      </Routes>
    </div>

  );
}

export default App;
