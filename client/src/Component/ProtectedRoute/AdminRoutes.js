import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Contexts/authContext";

export default function AdminRoutes() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            await axios.get(`/api/auth/admin-auth`)
                .then(res => setOk(true));
        };
        if (auth?.token) { authCheck() };
    });

    return ok ? <Outlet /> : "Loading...";
}