import React from "react";

export function InputField({ item, setItem}){
    return(
        <input
        type='text'
        className='input3'
        placeholder={item}
        onChange={e=> setItem(e.target.value)}
        />
    );
};