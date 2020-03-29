import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import BigContext from './BigContext';
import LogOut from './LogOut';
import './style.css';
import './style1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
function Add() {
    const context = useContext(BigContext) //need to use usecontext inorder to send state form list page

    const [formState, setFormState] = useState({
        name: "",
        duedate: ""
    })
    const [state, setState] = useState({})

    
    const changeHadeler = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const temp = { ...context.state }
        temp.boards[context.board].column1.items.push(formState)
        axios.put(`http://localhost:2030/api/v3/updateOne/${temp._id}`, temp, {withCredentials:true})
            .then(response => {
                console.log(response)
                if (response.data.errors) {

                    // setErrorState({
                    //     name: response.data.errors.column1.items.name ? response.data.errors.column1.items.name.message : "",
                    // })
                } else {
                    context.setRefresh(!context.refresh)
                    navigate("/list")
                }
            })
            .catch(error => console.log(error))
    }







    return (
        <div className="body">
            <div className="row">
       <div className="col-sm-9 col-ml-9 col-lg-9  lagout"> <LogOut /> </div>
       <div className="col-sm-3 col-ml-3 col-lg-3 dash"><i className="fa fa-home fa-home"></i><Link  style={{color:"rgb(183, 187, 189)"}} to="/dashboard" >DashBoard</Link></div></div>
            <div className="dashBoard">
                {formState.name.length > 0 && formState.name.length < 3 ?
                    <p>the name has to have 3 min char</p> : <p></p>}
              
                <h3>Add a Task</h3>
                <form  className="formtask" onSubmit={submitHandler} >
                    <table>
                        <tbody>
                            <tr>
                                <td>Name Project:</td>
                                <td><input type="text" name="name" onChange={changeHadeler} /></td>
                            </tr>
                            <tr>
                                <td>due date:</td>
                                <td><input type="date" name="duedate" onChange={changeHadeler} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><button className="button" >Add Board</button></td>
                            </tr>

                        </tbody>
                    </table>
                </form>

            </div>
        </div>
    )
}

export default Add
