import React from 'react';
import { Link } from 'react-router-dom';

const PartTwo = props => {
    const { values, select, back, selectAdv, reviews, adv, sortAdv, checkChange} = props;
    const logo = window.logo;
    const star = window.star;
    const hercules = window.hercules;
    const isaac_newton = window.isaac_newton;
    const goblin_slayer = window.goblin_slayer;
    
    const isElite = (elite) =>{
        if (elite === true){
            return (
                <div className='award'>
                    <i className='fas fa-award' id='blue'></i>
                    <div id='blue'>Elite Adventurer</div>
                    
                </div>
                
            )
        } else {
            return ''
        }
    }

    const rating = rating => {
        const num = <img src={star} className='star'/>
        const use = Number(rating);
       
        switch (use) {
            case 1:
            return num;
            case 2:
            return (
                <div className='rating'>
                    {num}{num}
                </div>
                );
            case 3:
            return (
                <div className='rating'>
                    {num}{num}{num}
                </div>
                );
            case 4:
            return(
                <div className='rating'>
                    {num}{num}{num}{num}
                </div>
                );
            case 5:
            return (
                <div className='rating'>
                    {num}{num}{num}{num}{num}
                </div>
                );                
            default:
            return ''
        }
    }

    const hero = (name) => {
        switch (name) {
            case 'Hercules':
                return (
                    <img src={hercules} className='adv-img'/>
                )
            case 'Goblin Slayer':
            return <img src={goblin_slayer} className='adv-img'/>
            case 'Isaac Newton':
            return <img src={isaac_newton} className='adv-img' />
            default:
            return '';
        }
    }

    const sortBy = () => {
        if (values.review === 'false'){
            return (
                <div className='sorting'>
                    <div className='sort'>Sort By:</div>
                    <select onChange={(e) => sortAdv(e)} value='cat'>
                        <option value="">-</option>
                       <option value='recommended'>Best Value</option>
                       <option value="reviews">Most Reviewed</option>
                       <option value="high">Highest Rating</option>
                    </select>
                </div>
            )
        }
    }

    const checkBox = () => {
        const isChecked= !!values.checked;
       
        if (values.review === 'false'){
            if(!isChecked){
              return (
                <div className='check-box'>
                    <div className='sort'>Adventurer Type</div>
                    <div className='checkbox'>
                        <button
                    value='elite'
                    className='check'
                    onClick={(e) => checkChange(e)}></button>                   
                    <label htmlFor="elite" className='p10'>Elite Only</label>
                    </div>
                    
                </div>
            )  
            } else {
                return (
                    <div className='check-box'>
                        <div className='sort'>Adventurer Type</div>
                        <div className='checkbox'>
                           <button
                        className='check'
                    value='elite'
                    onClick={(e) => checkChange(e)}>
                        <i id='shrink'>&#x2713;</i>
                        </button> 
                        <label htmlFor="elite" className='p10'>Elite Only</label> 
                        </div>
                        
                    </div>
                ) 
            }
            
        }
    }

    const list = () => {
        const sorted = values.sorted.length > 0 ? values.sorted : adv;
        const names = sorted.map(ad => 
            <div className="hero-container" key={ad.id}>
                <div className='top-hero'>
                    {hero(ad.username)}
              <div className='hero-details'>
                   <p  className="hero-name">{ad.username}</p>
                  <div className="p">{isElite(ad.elite)}</div>
            <div className="rating-container">Rating: {rating(ad.avg_rating)}</div> 
            <p className="p">Total Reviews: {ad.total_ratings}</p>
            <hr/>
            <p className="p">How I can Help:</p>
            <p className="p">{ad.pitch}</p> 
              </div>
                </div>
            <button onClick={() => selectAdv(ad.id)}>See Reviews</button>
              <button value={values.adventurer_id} type="submit" className="select2" onClick={() => select(ad.id)}>Select and Continue</button>
           </div>
        
        ) 

        const allReviews = () => {
        
           const allR = ()=>{
              
               if(reviews.length > 0){
                const num = reviews.map(review =>{
                    const arr = [];
                    if (review.extract.adventurer_id === values.selected.id){
                        arr.push(review)
                       
                    }
                   return arr;
                    
                });
                const reviewsArr = num.map(el => {
                    
                    if (el.length < 0){
                        num.pop(el)
                    }
                    return num
                })
                if (reviewsArr.length > 0 && values.selected){
                   
                    const advReviews = num.map(review => {
                        if (review[0]){
                            return (
                               <div key={review[0].extract.id} className='quest-name'>
                    <div className='p'>{`${review[0].extract.username}`}</div>
                    <div className='rating-container'>{rating(review[0].extract.rating)}</div>
                    <div className='p'>"{`${review[0].extract.body}`}"</div>  
                  </div> 
                            )
                        }
                    }
                  
            )
        
            return advReviews
        } else {
            return (
                <div className='quest-name'>No Reviews Yet</div>
            )
        }}} 
            if (reviews.length > 0 && values.selected){
             
            return allR();
            } else {
                return (
                    <div className='quest-name'>No Reviews Yet</div>
                )
            }
            
            
        } 
        const adReviews = () =>{
            return (
                <div className='adv-info'>
                    Adventurer info:
                    <div className='hero-box'>
                        <div>{hero(values.selected.username)}</div>
                        <div className='p' id='margin'>{`${values.selected.username}`}</div>
                        <div className="p">{isElite(values.selected.elite)}</div>
                        <div className='p' id='margin'>{`${values.selected.pitch}`}</div>
                        <button value={values.adventurer_id} type="submit" className="select2" onClick={() => select(values.selected.id)}>Select and Continue</button>
                    </div>
                    
                    <div className='reviews'>Reviews:</div>
                    {allReviews()}
                </div>
            )
                
        }
        return values.review === true ? adReviews() : names
    }

    return (
        <div className="quest-container">
             <div className='top-bar'>
                <Link to='/' >
                    <img src={logo} className="logo2"/>
                </Link>
                <div className='bars'>
                    <ul className='bar1'>
                        <li className='grey-out'>1</li>
                        <div className='lineN'></div>
                        <li className='currentN'>2</li>
                        <div className='lineN'></div>
                        <li className='grey-out'>3</li>
                </ul>
                <ul className='bar2'>
                    <li className='line'>Describe your Quest</li>
                    <li className='current'>Browse Adventurers</li>
                    <li className='line'>Choose date {'&'} Time</li>
                </ul>
                </div> 
             </div>
            <hr/>
            <div className='back'>
                   <button onClick={back}>Back</button> 
                   {sortBy()}
                </div>
                
            <div className='quest-form2'>
                
                <div className='top-form'>
                {checkBox()}  
                <div className='heros-container'>
                   {list()} 
                </div>
                
                </div>
             
            </div>
            
            
        </div>
    )
}

export default PartTwo;