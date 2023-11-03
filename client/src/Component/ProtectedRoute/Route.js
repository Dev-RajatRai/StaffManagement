import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Contexts/authContext";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const authCheck = async () => {
            await axios.get(`/api/auth/user-auth`)
                .then(res => setOk(true));
        };
        if (auth?.token) {
            if (auth.user.role == 1) {
                authCheck();
            }
            else {
                navigate('/');
                localStorage.clear();
            }
        };

    });

    return ok ? <Outlet /> : "Loading...";
}