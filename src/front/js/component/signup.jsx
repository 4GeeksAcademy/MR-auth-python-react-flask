import React, {useContext, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";


const Signup = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();



    const handleSubmit= async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.BACKEND_URL}/api/signup`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password}),
        });
        if(response.ok){
            navigate('/login')
        }
    };
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="email"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit btn btn-primary" className="btn btn-primary"> sign up </button>
        </form>
        </>
    )
}

export default Signup;