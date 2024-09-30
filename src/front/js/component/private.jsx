import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
;
const Private = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login')
    }
    useEffect(()=>{
        const token = sessionStorage.getItem('token');
        if (!token){
            navigate('/login');
        }
    },[navigate]);

    return(
        <>
            <div className="container my-5">
                <div className="card p-5 shadow text-center">
                    <h1 className="mb-4">Welcome to the Private View</h1>
                    <button 
                        type="button" 
                        className="btn btn-danger mt-4" 
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </>
    )
}

export default Private;