import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const token = sessionStorage.getItem('token');

    if (!token){
        return <Navigate to="/"/>
    }
    return children;
}

export default PrivateRoute;