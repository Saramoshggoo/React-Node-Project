import React, { useEffect, useState,useContext } from 'react'
import Bob from './Bob';
import Card from './Card';
import axios from 'axios';
import { navigate,Link } from '@reach/router';
import LogOut from './LogOut';
import './style.css'
import BigContext from './BigContext';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'font-awesome/css/font-awesome.min.css';

function List() {

    const context = useContext(BigContext)
   
    useEffect(() => {
        if (localStorage.getItem("userid") === null) {
            navigate("/")
        } else {
           
            axios.get(`http://localhost:2030/api/v3/readOne/${localStorage.getItem("userid")}`, { withCredentials: true })
                .then(response => context.setState({ ...response.data }))
                .catch(error => console.log(error))
        }


    }, [context.refresh])

    const changeBoard = (e, index) => {
        // change board here
        context.setBoard(index)

    }
    const deleteHandler=(e,item,column,boardIndex,index)=>{
        e.preventDefault();
       
        const temp = {...context.state}
        console.log(temp.boards[boardIndex][column])
        temp.boards[boardIndex][column].items.splice(index,1 )
        axios.put(`http://localhost:2030/api/v3/updateOne/${context.state._id}`,temp, {withCredentials:true})
        .then(response => {
            context.setRefresh(!context.refresh)
        })
        .catch(error => console.log(error))
    }
    const deleteBoardHandler=(e,boardIndex,index)=>{
        e.preventDefault();
       
        const temp = {...context.state}
        console.log(temp.boards[boardIndex])
        temp.boards.splice(index,1 )
        axios.put(`http://localhost:2030/api/v3/updateOne/${context.state._id}`,temp, {withCredentials:true})
        .then(response => {
            context.setRefresh(!context.refresh)
        })
        .catch(error => console.log(error))
    }
    

    return (
        <div style={{backgroundColor:"rgb(183, 209, 228)"}}>
           
            {context.state.boards &&
            <div><div className="row">
              
                <div className="col-12 col-md-10 col-sm-10  col-ml-10 col-xs-10 boardlist">
                    <h4>list of your Board:</h4>
                    {context.state.boards !=0 ?
                   
                    <div>
                        {context.state.boards.map((item, index) => (
                            <button  key={index} onClick={(e) =>changeBoard(e,index)}>{item.name}  
                                <li className="fa fa-trash" aria-hidden="true" onClick={(e) => deleteBoardHandler(e,context.board,index)}></li>
                            </button>
                        ))}
                    </div>
                    :<p style={{color:"purple"}}>First add new Board Please  <Link  to ="/addboard">Add</Link></p>
                       
                       }
                    <p>Choose your board  :<Link to ="/addtask">add new task on your board</Link></p>
                </div>

                <div className="col-12 col-md-2  col-sm-2  col-ml-2 col-xs-2">
                    <div className="row " style={{marginTop:"90px" ,marginRight:"12px"}}>
                <div className="col-sm-5 col-ml-5 col-lg-5  lagout" style={{color:"rgb(0, 56, 96)"}}> <LogOut /> </div>
                <div className="col-sm-7 col-ml-7 col-lg-7 dash" ><i className="fa fa-home fa-home" style={{color:"rgb(0, 56, 96)"}}></i><Link  style={{color:"rgb(0, 56, 96)"}} to="/dashboard" >DashBoard</Link></div></div>
    
                  
               </div>
                </div>
                <div style={{marginTop:"20px"}}>
                <main className="flexbox">
                    <Bob boardIndex={context.board} id="column1" className="board" column={"column1"}>
                        <h2>Request</h2>
                        {context.state.boards[context.board] && context.state.boards[context.board].column1 && context.state.boards[context.board] && context.state.boards[context.board].column1.items.map((item, index) => (
                            <div key={index}>
                                <Card column={"column1"} index={index} className="card" draggable="true">
                                    
                                <div className="row">
                                <div className="col-12 col-sm-12 col-ml-12 col-lg-12" style={{textAlign:"right",marginTop:"0px"}}>   <li className="fa fa-trash" aria-hidden="true" onClick={(e) =>deleteHandler(e,item,"column1",context.board,index)}></li></div> 
                                <div className="col-12 col-sm-12 col-ml-12 col-lg-12"><b>Task Name: </b>{item.name}</div> 
                                <div className="col-12 col-sm-12 col-ml-12 col-lg-12"><b>Due Date: </b> <span style={{color: new Date(item.duedate).getTime() - new Date().getTime() < 0 ? 'red' : 'rgb(0, 56, 96)'}}>{item.duedate}</span></div>  
                                  </div>
                                    
                                    
                                    </Card> </div>


                        ))}
                    </Bob>
                    <Bob boardIndex={context.board} id="column2" className="board" column={"column2"}>

                        <h2>Started</h2>
                        {context.state.boards[context.board] && context.state.boards[context.board].column2 && context.state.boards[context.board] && context.state.boards[context.board].column2.items.map((item, index) => (
                            <div key={index}>
                                <Card column={"column2"} index={index} className="card" draggable="true">
                                <div className="row">
                                <div className="col-12 col-sm-12 col-ml-12 col-lg-12" style={{textAlign:"right",marginTop:"0px"}}>   <li className="fa fa-trash" aria-hidden="true" onClick={(e) =>deleteHandler(e,item,"column2",context.board,index)}></li></div> 
                                <div><b>Task Name: </b>{item.name}</div>     
                                  </div>
                                    </Card> </div>


                        ))}
                    </Bob>
                    <Bob boardIndex={context.board} id="column3" className="board" column={"column3"}>
                        <h2>On process</h2>
                        {context.state.boards[context.board] && context.state.boards[context.board].column3 && context.state.boards[context.board] && context.state.boards[context.board].column3.items.map((item, index) => (
                            <div key={index}>
                          
                          
                                <Card column={"column3"} index={index} className="card" draggable="true">
                                    <div className="row">
                                <div className="col-12 col-sm-12 col-ml-12 col-lg-12" style={{textAlign:"right",marginTop:"0px"}}>   <li className="fa fa-trash" aria-hidden="true" onClick={(e) =>deleteHandler(e,item,"column3",context.board,index)}></li></div> 
                                <div><b>Task Name: </b>{item.name}</div>     
                                  </div>
                                
                                </Card> </div>
                                   

                        ))}
                    </Bob>
                    <Bob boardIndex={context.board} id="column4" className="board" column={"column4"}>
                        <h2>Done</h2>
                        {context.state.boards[context.board] && context.state.boards[context.board].column4 && context.state.boards[context.board] && context.state.boards[context.board].column4.items.map((item, index) => (
                            <div key={index}>
                                <Card column={"column4"} index={index} className="card" draggable="true">
                                <div className="row">
                                <div className="col-12 col-sm-12 col-ml-12 col-lg-12" style={{textAlign:"right",marginTop:"0px"}}>   <li className="fa fa-trash" aria-hidden="true" onClick={(e) =>deleteHandler(e,item,"column4",context.board,index)}></li></div> 
                                <div><b>Task Name: </b>{item.name}</div>  
                                  </div>
                                
                                </Card> </div>
                              

                        ))}
                    </Bob>
                </main>
                </div>
            </div>
            }
       

       
        </div>
   
    )
}

export default List
