import React from "react";

export function CheckBox({examine, isChecked, filterElite}){
    if (!examine) {
            if (!isChecked) {
                return (
                    <div className='check-box'>
                        <div className='sort'>Adventurer Type</div>
                        <div className='checkbox'>
                            <button
                                value='elite'
                                className='check'
                                onClick={() => filterElite(true)}></button>
                            <label htmlFor="elite" className='p10'>Elite Only</label>
                        </div>
                    </div>
                );
            }; 
            return (
                    <div className='check-box'>
                        <div className='sort'>Adventurer Type</div>
                        <div className='checkbox'>
                            <button
                                className='check'
                                value='elite'
                                onClick={() => filterElite(false)}>
                                <i id='shrink'>&#x2713;</i>
                            </button>
                            <label htmlFor="elite" className='p10'>Elite Only</label>
                        </div>
                    </div>
                );
        };
        return '';
};