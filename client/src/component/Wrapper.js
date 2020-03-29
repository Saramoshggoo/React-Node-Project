import React from 'react'
import Registration from './Registration';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style1.css';

const Wrapper = () => {
    return (
        <div className=" body">
            <div className="row reglog">
             <div className="col-12 col-sm-6 col-lg-6 col-ml-6 ">
            <Registration /></div>
            <div className="col-12 col-sm-6 col-lg-6 col-ml-6 ">
            <Login /></div>
            </div>
        </div>
    )
}

export default Wrapper
