import React, { useState }  from 'react';
import './login.css';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Username: ',username);
        console.log('Password: ',password);
        const data = {
            username,
            password,
        };
        
        axios.post('http://localhost:5000/login', data)
        .then(res => {
            console.log("inside post req")
            if(res.data === 'Login successful') {
                console.log('login success');
                navigate("/dashboard");
            }
            else {
                alert(res.data.Message);
            }
        })
        .catch(err => console.log(err));
    };

    function redirect()
    {
        navigate('/signup');
    }

    return (
        <div className='container'>
            <section>
                <div className='login-box'>
                        <form onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            <div className='input-box'>
                                <input 
                                type = "text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required/>
                                <label>Username</label>
                            </div>
                            <div className='input-box'>
                                <input 
                                type = "password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required/>
                                <label>Password</label>
                            </div>
                            <button type = 'submit'>Login</button><br/><br/>
                            <button onClick={redirect}>Signup</button>
                        </form>
                </div>
            </section>
        </div>
    );
}

