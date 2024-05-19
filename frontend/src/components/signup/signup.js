import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './signup.css';
import { useNavigate } from 'react-router-dom';


export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Username: ',username);
        console.log('Password: ',password);
        const data = {
            username,
            password,
        };
        
        axios.post('http://localhost:5000/signup', data)
        .then(res=> {
            if(res.data === 'Signup Successful') {
                console.log('Signup Successful');
                navigate('/login');
            }
            else {
                alert(res.data.Message);
            }
        })
        .catch(err => console.log(err));
    };
    return(
        <div className='container'>
            <section>
                <div className='signup-box'>
                    <form onSubmit={handleSubmit}>
                        <h2>Signup</h2>
                        <div className='input-box'>
                            <input type = 'text'
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                required/>
                            <label>Username</label>
                        </div>
                        <div className='input-box'>
                            <input type = 'password'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required/>
                            <label>Password</label>
                        </div>
                        <button type = 'submit'>Signup</button>
                        
                    </form>
                </div>
            </section>
        </div>
    )
}

