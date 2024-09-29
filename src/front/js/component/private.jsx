import react, {useEffect} from "react";
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
        <div>
            <h1>this is the private view</h1>
        </div>

        <button onClick={handleLogout}>Log out</button>
        </>
    )
}

export default Private;