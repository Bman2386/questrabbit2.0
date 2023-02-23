import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {fetchAdventurers} from '../../store/adventurer';
import {fetchReviews} from '../../store/review';
import QuestRabbit from '../../images/QuestRabbit.jpg';
import star from '../../images/star.png';
import hercules from '../../images/hercules.jpg';
import isaac_newton from '../../images/isaac_newton.jpg';
import goblin_slayer from '../../images/goblin_slayer.jpg';

function PartTwo({step, setStep, adventurerId, setAdventurerId, review, setReview}){
    const dispatch = useDispatch();
    const adventurers = useSelector(state => state.adventurers ? Object.values(state.adventurers) : []);
    // const reviews = useSelector(state => state.reviews ? Object.values[state.reviews] : []); // seed reviews
    const reviews = [];
    const [adv, setAdv] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        dispatch(fetchAdventurers());
        // dispatch(fetchReviews());
    }, [dispatch]);

    if (adventurers.length < 1 ) return <div>Loading...</div>;
    
    setAdv([...adventurers]);

    const sortHelper =(type, arr=adv)=> {
        const first = arr[0];
        if (arr.length < 2) return arr;
        const func = (x,y) => {
            if (x>y) return -1;
            return 1;
        };
        let left = arr.slice(1).filter(el => func(el[type], first[type]) === -1);
        let right = arr.slice(1).filter(el => func(el[type], first[type]) !== -1);
        left = sortHelper(type, left);
        right = sortHelper(type, right);

        return left.concat([first]).concat(right);
    };
    function sortAdv(e){
        e.preventDefault();
        let sorted
        switch (e.target.value) {
            case 'reviews':
                sorted = sortHelper('total_ratings');
                setAdv(sorted)
                setIsChecked(false);
                return;
            case 'high':
                sorted = sortHelper('avg_rating');
                setAdv(sorted)
                setIsChecked(false);
                return;
            case 'recommended':
                sorted = sortHelper('id');
                setAdv(sorted);
                setIsChecked(false);
                return;
            default:
                return;
        };
    };

    const sortBy = () => {
        if (review === 'false') {
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
            );
        };
        return '';
    };

    const checkBox = () => {  
      if (!review) {
            if (!isChecked) {
                return (
                    <div className='check-box'>
                        <div className='sort'>Adventurer Type</div>
                        <div className='checkbox'>
                            <button
                                value='elite'
                                className='check'
                                onClick={() => setIsChecked(true)}></button>
                            <label htmlFor="elite" className='p10'>Elite Only</label>
                        </div>
                    </div>
                );
            } 
            return (
                    <div className='check-box'>
                        <div className='sort'>Adventurer Type</div>
                        <div className='checkbox'>
                            <button
                                className='check'
                                value='elite'
                                onClick={() => setIsChecked(false)}>
                                <i id='shrink'>&#x2713;</i>
                            </button>
                            <label htmlFor="elite" className='p10'>Elite Only</label>
                        </div>
                    </div>
                );
        };
        return '';
    };

    const hero = (name) => {
        switch (name) {
            case 'Hercules':
                return <img src={hercules} className='adv-img' />;
            case 'Goblin Slayer':
                return <img src={goblin_slayer} className='adv-img' />;
            case 'Isaac Newton':
                return <img src={isaac_newton} className='adv-img' />;
            default:
                return '';
        };
    };
    const isElite = (elite) => {
        if (elite === true) {
            return (
                <div className='award'>
                    <i className='fas fa-award' id='blue'></i>
                    <div id='blue'>Elite Adventurer</div>
                </div>
            );
        };
        return'';
    };
    const rating = rating => {
        const num = <img src={star} className='star' />
        const use = Number(rating);
        switch (use) {
            case 1:
                return num;
            case 2:
                return<div className='rating'>{num}{num}</div>
            case 3:
                return (
                    <div className='rating'>
                        {num}{num}{num}
                    </div>
                );
            case 4:
                return (
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
                return '';
        };
    };
    const selectAdv=(input)=> {
        const adventurer = adventurers[input - 1];
        setSelected(adventurer);
        setReview(true);
    };

    const moveToNextStep = (id) => {
        setAdventurerId(id);
        setStep(3);
    };
    const list = () => {
        const names = adv.map(ad =>
            <div className="hero-container" key={ad.id}>
                <div className='top-hero'>
                    {hero(ad.username)}
                    <div className='hero-details'>
                        <p className="hero-name">{ad.username}</p>
                        <div className="p">{isElite(ad.elite)}</div>
                        <div className="rating-container">Rating: {rating(ad.avg_rating)}</div>
                        <p className="p">Total Reviews: {ad.total_ratings}</p>
                        <hr />
                        <p className="p">How I can Help:</p>
                        <p className="p">{ad.pitch}</p>
                    </div>
                </div>
                <button onClick={() => selectAdv(ad.id)}>See Reviews</button>
                <button value={ad.adventurer_id} type="submit" className="select2" onClick={() => moveToNextStep(ad.id)}>Select and Continue</button>
            </div>
        );

        const allReviews = () => {
            const allR = () => {
                if (reviews.length > 0) {
                    const num = reviews.map(rev => { //filter reviews to only selected adventurer
                        const arr = [];
                        if (rev.adventurer_id === selected.id) {
                            arr.push(rev);
                        };
                        return arr;
                    });
                    if (num.length > 0 && selected) {
                        const advReviews = num.map(rev => {
                                return (
                                    <div key={rev.id} className='quest-name'>
                                        <div className='p'>{`${rev.username}`}</div>
                                        <div className='rating-container'>{rating(rev.rating)}</div>
                                        <div className='p'>"{`${rev.body}`}"</div>
                                    </div>
                                );
                        });
                        return advReviews;
                    }
                    return <div className='quest-name'>No Reviews Yet</div>;
                };
            };
            if (reviews.length > 0 && selected) {
                return allR();
            }; 
            return <div className='quest-name'>No Reviews Yet</div>;
            };
        const adReviews = () => {
            return (
                <div className='adv-info'>
                    Adventurer info:
                    <div className='hero-box'>
                        <div>{hero(selected.username)}</div>
                        <div className='p' id='margin'>{`${selected.username}`}</div>
                        <div className="p">{isElite(selected.elite)}</div>
                        <div className='p' id='margin'>{`${selected.pitch}`}</div>
                        <button className="select2" onClick={() => moveToNextStep(selected.id)}>Select and Continue</button>
                        <button onClick={()=> setSelected('')}>Close Reviews</button>
                    </div>
                    <div className='reviews'>Reviews:</div>
                    {allReviews()}
                </div>
            );
        };
        return review ? adReviews() : names
    };

    return(
        <div className="quest-container">
            <div className='top-bar'>
                <Link to='/' >
                    <img src={QuestRabbit} className="logo2" />
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
            <hr />
            <div className='back'>
                <button onClick={()=> setStep(1)}>Back</button>
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
    );
};

export default PartTwo;