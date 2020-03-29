import React, {useState} from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';

const Login = (props) => {
    const [fState, setFState] = useState({
        email:"",
        password:""
    })
    const [errorState, setErrorState] = useState("")
    const onSH = (e) => {
        e.preventDefault();
        // all axios calls should submit withCredentials:true if you want to use authenticate from backend
        axios.post('http://localhost:2030/api/v3/login', fState, {withCredentials:true})
        .then(response => {
            if(response.data.errors){
                setErrorState(response.data.errors)
            } else {
                localStorage.setItem("userid", response.data._id)
                navigate('/dashboard')
            }
            
        })
        .catch(error => console.log(error))
    }
    const onCH = (e) => {
        setFState({
            ...fState,
            [e.target.name]:e.target.value
        })
    }
    return (
        <div>
            <h1>Login</h1>
            {errorState}
            <form onSubmit={onSH}>
                <p>Email</p>
                <input type="email" name="email" onChange={onCH}/>
                <p>Password</p>
                <input type="password" name="password" onChange={onCH}/>
               <p> <button type="submit">Login</button></p>
            </form>
        </div>
    )
}

export default Login
