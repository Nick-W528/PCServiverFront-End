import { useState } from 'react';
import axios from "axios";
import { useUser } from '../Utils/UserContext';

const client = axios.create({baseURL: "http://localhost:8800/"})

export default function Login( { setToken } ) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();    
    const { fetchUserData } = useUser();    

    const handleSubmit = async (e) => {
        e.preventDefault();        
        client.post("users/login", 
        {
            email: email,
            password: password
        },
        {
            withCredentials: true
        }).then((res) => {
            const token = res.data.token; 
            sessionStorage.setItem('token', token);
            fetchUserData(token);                     
        })
    }     

    return (
        <div className="login-wrapper">
            <h2>Please Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Email:</p>
                    <input type="text" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password:</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}