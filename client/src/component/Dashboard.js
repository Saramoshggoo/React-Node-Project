import React, { useState ,useEffect,useContext} from "react";
import { navigate } from '@reach/router';
import axios from 'axios';
import {Link} from '@reach/router';
import LogOut from './LogOut';
import BigContext from './BigContext';
import './style1.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard=()=> {
  const context = useContext(BigContext)
  useEffect(() => {
    if (localStorage.getItem("userid") === null) {
        navigate("/")
    } else {
        console.log(localStorage.getItem("userid"))
        axios.get(`http://localhost:2030/api/v3/readOne/${localStorage.getItem("userid")}`, { withCredentials: true })
            .then(response => context.setState({ ...response.data }))
            .catch(error => console.log(error))
    }


}, [])








 return(
   <div className="body "> 
      <div className="row">
       <div className="col-sm-9 col-ml-9 col-lg-9  lagout"> <LogOut /></div></div>
     <div className="dashBoard">
     <h3>Welcome to Back  <span style={{color:"rgb(113, 120, 123)"}}>{context.state.firstName}</span>! </h3>
      
     <div class="row">
  <div className="col-sm-6 col-ml-6 col-lg-6"> <button ><Link  className="link" to="/list"> Check your list</Link></button></div>
  <div className="col-sm-6 col-ml-6 col-lg-6"> <button  > <Link className="link" to ="/addboard">add new Board</Link></button></div>
  </div>
      </div>
    </div>

 )

  }
export default Dashboard;
