import React from "react";
import './loading.css';

export function Loading({modal=false}){
   if (!modal) return(
        <div className="spin-container">
            <div className='loader'>
            </div>   
        </div>  
    );
    return(
        <div className="modal-container">
            <div className='loader'>
            </div>
        </div> 
    )
};