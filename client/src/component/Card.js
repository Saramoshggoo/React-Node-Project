import React from 'react'
import BigContext from './BigContext';
function Card(props) {
    const dragStart=e=>{
        const target=e.target;
        e.dataTransfer.setData('card_id',JSON.stringify({column:props.column, index:props.index}));
        // setTimeout(() => {
        //   target.style.display="none"  ;
        // }, 0);
    }
    const dragOver=e=>{
        e.stopPropagation();
    }
    return (
        <div
           id={props.index}
           className={props.className}
           onDragStart={dragStart}
           onDragOver={dragOver}
           draggable={props.draggable}
        
        >
            {props.children}
        </div>
    )
}

export default Card
