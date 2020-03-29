import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { navigate, Link } from '@reach/router';
import BigContext from './BigContext';
import LogOut from './LogOut';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
function AddBig() {
    const context = useContext(BigContext) //need to use usecontext inorder to send state form list page
    console.log(context.state)
    const [formState, setFormState] = useState({
        name:"",
        column1: {
            name: "request",
            items: []
        },
        column2: {
            name: "start",
            items: []
        },
        column3: {
            name: "on process",
            items: []
        },
        column4: {
            name: "done",
            items: []
        }
    })
    const [id, setId] = useState(0)
    const onChangeHandler = (e) => {
        setFormState({
            ...formState,
            [e.target.name]:e.target.value
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const temp = {...context.state}
        temp.boards.push(formState)
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
            <h3>Add a board</h3
            >
            <form onSubmit={submitHandler}>
               Board Name: <input type="text" name="name" onChange={onChangeHandler} />
                <p><button className="button" >Add Board</button></p>

            </form>
          
        </div>
        </div>
    )
}

export default AddBig
