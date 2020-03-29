import React from 'react'
import axios from 'axios'
import { navigate } from '@reach/router';
import './style.css'
function LogOut() {
    const logout = () => {
        axios.get(`http://localhost:2030/api/v3/logout`, { withCredentials: true })
        .then(response => {
            localStorage.clear()
            navigate("/")
        })
        .catch(error => console.log(error))
    }
    return (
        <div>
             <a className="logout" onClick={logout}>Log out</a>
        </div>
    )
}

export default LogOut
