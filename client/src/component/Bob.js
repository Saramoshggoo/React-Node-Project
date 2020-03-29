import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios';
import BigContext from './BigContext';
import {navigate ,Link} from '@reach/router';
import './style.css';

function Bob(props) {
  const context = useContext(BigContext) //need to use usecontext inorder to send state form list page
  const drop = e =>{
   e.preventDefault();
   const card_information=JSON.parse(e.dataTransfer.getData('card_id'));
   const temp = {...context.state}
   //add card_information.index(our card) to this culumn
   temp.boards[props.boardIndex][props.column].items.push(temp.boards[props.boardIndex][card_information.column].items[card_information.index])
   //remove the same card form the old column which card was there
   temp.boards[props.boardIndex][card_information.column].items.splice(card_information.index,1)

   axios.put(`http://localhost:2030/api/v3/updateOne/${context.state._id}`, temp, {withCredentials:true})
   .then(response => {
       context.setRefresh(!context.refresh)
   })
   .catch(error => console.log(error))
  //  const card = document.getElementById(card_id);
  //  card.style.display='block';
  //  const tempcard=e.target.appendChild(card);
   
   //up to line 15 is his code 


  //  console.log(tempcard)
  //  const temp={...context.state}
  //  console.log(context.state)
  //  const column=props.id
  //  temp.column.items.push()
   
 
 
 }
 const dargOver= e =>{
  e.preventDefault();
 }

    return (
        <div  
           id={props.id}
           className={props.className}
           onDrop={drop}
           onDragOver={dargOver} >
       
            {props.children}


            
        </div>
    )
}

export default Bob
