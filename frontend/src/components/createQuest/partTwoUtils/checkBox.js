import React from "react";

// CheckBox is custom jsx to create our own checkbox and functionality
export function CheckBox({examine, isChecked, filterElite}){
    
    //filterEliteButton is a dynamic button that uses the isChecked value to 
    // determine whether or not to display the check in the box
    // filterEliteButton also gives the user the ability to check and uncheck the box
    //by calling the filterElite function
    const filterEliteButton = () => {
        const changeCheck = isChecked ? false : true;
        return (
            <button
            className='check'
            value='elite'
            onClick={() => filterElite(changeCheck)}>
            {isChecked === true && <i id='shrink'>&#x2713;</i>}
        </button>
        )};
    // if examine is true, do not show the checkbox
    //(examine is the state that is used to determine if a user wants to look at a single adventurer)
    if (!examine) {
        // isChecked is the boolean state determining which type of box to display to user
                return (
                    <div className='check-box'>
                        <div className='sort'>Adventurer Type</div>
                        <div className='checkbox'>
                            {filterEliteButton()}
                            <label htmlFor="elite" className='p10'>Elite Only</label>
                        </div>
                    </div>
                );
            }; 
        return '';
};