import react, {useState} from "react";
import { Navigate } from "react-router-dom";

const Signup = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit= async (e) => {
        e.preventDefault();
        const response = await fetch('/Signup',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email,password}),
        });
        if(response.ok){
            Navigate('/login')
        }
    };
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="email"  value={email} onchange={(e)=> setEmail(e.target.value)}/>
            <input type="password" value={password} onchange={(e)=> setPassword(e.target.value)}/>
            <button type="submit"> sign up </button>
        </form>
        </>
    )
}

export default Signup;