import React,{ useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchQuests } from '../../store/quest';

function QuestsPage (){
    const dispatch = useDispatch();
    const quests = useSelector(state => state.quests ? Object.values(state.quests):[]);
    const currentUser = useSelector(state=> state.session.user ? state.session.user : '');

    useEffect(() => {
            dispatch(fetchQuests())
    }, [dispatch]);

    if (!currentUser) return <Redirect to='/'/>;

    if (!quests) return <div>Loading...</div>;
   
    const categoryShow=(quest)=> {
        if (quest.categoryId === 1){
            return 'Fetch';
        } else if (quest.categoryId === 2){
            return 'Craft';
        } else if (quest.categoryId === 3){
            return 'Escort';
        } else if (quest.categoryId === 4){
            return 'Slay';
        };
    };

    
   function adShow(quest){
        const id = parseInt(quest.adventurerId);
        switch (id) {
            case 2:
                return 'Hercules';
            case 3:
                return 'Goblin Slayer';
            case 4:
                return 'Isaac Newton'
            default:
                return 'error'
        };
    };
     function timeShow(quest){
        const dateDisplay = () => {
            const days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Firday",
                "Saturday"
            ]
            const months = [
                "January",
                "Febuary",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];
            const fullDate = new Date(quest.startTime);
            const weekDay = days[fullDate.getDay()];
            const hour = () => {
                const hours = fullDate.getHours();
               if ( hours > 12){
                   return (hours - 12)
               } else {
                   return hours
               }
            } 
            const min = () => {
                const questMinutes = fullDate.getMinutes();
                if ( questMinutes === 0 ){
                    return '00';
                } else {
                    return questMinutes;
                }; 
             };
             const month = months[fullDate.getMonth()];
             const monthDay = fullDate.getDate();
             const year = fullDate.getFullYear();
             const amPm = () => {
                 if (fullDate.getHours() > 11) {
                     return 'pm';
                 } else {
                     return 'am';
                 };
             };
             return `${weekDay} ${month} ${monthDay} ${year} ${hour()}:${min()}${amPm()}`;
         };
        const startTime = dateDisplay();
        return <div className='orders4'>{`${startTime}`}</div>;
       };
    function questShow() {
            if (quests.length > 0){
                const list = quests.map(quest =>
                    <div key={quest.id} className='quest-name'>
                        <div className='links2'>
                            <div className='p'> Quest Name:</div>
                            <div className='orders4'>
                                {quest.questName}
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Retails:</div>
                            <div className='orders4'>
                                "{quest.details}"
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Start Time:</div>
                            <div>
                               {timeShow(quest)} 
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Category: </div>
                            <div className='orders4'>
                                {categoryShow(quest)}
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Adventurer:</div>
                            <div className='orders4'>
                                {adShow(quest)}  
                            </div>
                        </div>
                        <div className='links2' id='center'>
                          <Link 
                        to={`/edit/${quest.id}`}
                        className="btn-4" 
                        questid={quest.id}
                        >Edit Quest</Link>
                        <Link 
                        to={`/delete/${quest.id}`}
                        className="btn-5" 
                        questid={quest.id}
                        >Cancel Quest</Link>  
                        </div>
                        
                </div>
            );
            return (
                <div className='show-quests' id='background'>
                    <div className='h1' id='background'>Your Quests</div>
                    {list}
                </div>
                );
            }; 
               return(
                   <div className="quest-name">
                       <h1 className='h1' id='center'>Have something else on your to-do list?</h1>
                       <p className='p'>Book your next Quest or manage future to-dos  with Quest Rabbit</p>
                       <Link to="/quest"className='button-submit' id='center'>Check It Off Your List</Link>
                   </div>
                   
               );
        };
        return(
            <div>
                <div className="form2" id='background'>{questShow()}</div>
            </div>
        );
};

export default QuestsPage;