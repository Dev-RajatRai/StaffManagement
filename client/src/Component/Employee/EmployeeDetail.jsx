import React from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
    const { id } = useParams();
    // Fetch employee details by ID from API and display them
    return (
        <div>
            <h2>Employee Details</h2>
            {/* Display employee details */}
        </div>
    );
}
export default EmployeeDetails;