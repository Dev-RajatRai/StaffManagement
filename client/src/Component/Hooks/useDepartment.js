import axios from "axios";
import { useEffect, useState } from "react";

export default function useDepartment() {
    const [department, setDepartment] = useState();
    const getDepartment = async () => {
        try {
            const { data } = await axios.get("/api/department/get-all-department");
            if (data?.success) {
                setDepartment(data?.department)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getDepartment();
    }, [])
    return department;
}