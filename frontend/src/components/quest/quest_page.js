import React from 'react';
import { Link } from 'react-router-dom';


class QuestPage extends React.Component {
    constructor(props){
        super(props)
        this.questShow = this.questShow.bind(this);
        this.categoryShow = this.categoryShow.bind(this);
        this.adShow = this.adShow.bind(this);
        this.show = this.show.bind(this);
        this.timeShow = this.timeShow.bind(this);
    }

    componentDidMount(){
        this.props.fetchAdv();
        this.props.getQuests(this.props.creatorId);
        
    }

    categoryShow(quest) {
        if (quest.extract.category_id === 1){
            return 'Fetch'
        } else if (quest.extract.category_id === 2){
            return 'Craft'
        } else if (quest.extract.category_id === 3){
            return 'Escort'
        } else if (quest.extract.category_id === 4){
            return 'Slay'
        }
    }

    
    adShow(quest){
         const advs = this.props.adventurers;
        if (advs.length === 3 && quest.extract.adventurer_id !== ''){   
        const firstId = advs[0].id;
        const ad = advs[quest.extract.adventurer_id - firstId]
         return ad.username
        } else {
            return 'error'
        }
    }
    questShow(){
        const {quests} = this.props;
       
        
        if (quests && quests.length > 0 && !quests[quests.length -1].extract){
            const last = quests.pop();
            
            const newLast = Object.assign({}, {extract: last});
            
            quests.push(newLast);
        }
            quests.forEach(quest => {
                if(quest && quest.extract && quest.extract.completed === true){
                    let idx = quests.indexOf(quest)
                quests.slice(1, idx);
    
            }
        })

        return this.show(quests);

    }
    
       timeShow(quest){
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
            const fullDate = new Date(quest.extract.start_time);
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
                const questMinutes = fullDate.getMinutes()
                if ( questMinutes === 0 ){
                    return '00'
                } else {
                    return questMinutes;
                } 
             } ;
             const month = months[fullDate.getMonth()];
             const monthDay = fullDate.getDate();
             const year = fullDate.getFullYear();
             const amPm = () => {
                 if (fullDate.getHours() > 11) {
                     return 'pm'
                 } else {
                     return 'am'
                 }
             }
             return `${weekDay} ${month} ${monthDay} ${year} ${hour()}:${min()}${amPm()}`
     
         }
        const startTime = dateDisplay();
        
        return (
            <div className='orders4'>{`${startTime}`}</div>
        )
       }
    show(quests) {
        
            if (quests && quests.length > 0 && quests[0].extract){
                const list = quests.map(quest =>
                    <div key={quest.extract.id} className='quest-name'>
                        <div className='links2'>
                            <div className='p'> Quest Name:</div>
                            <div className='orders4'>
                                {quest.extract.quest_name}
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Retails:</div>
                            <div className='orders4'>
                                "{quest.extract.details}"
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Start Time:</div>
                            <div>
                               {this.timeShow(quest)} 
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Category: </div>
                            <div className='orders4'>
                                {this.categoryShow(quest)}
                            </div>
                        </div>
                        <div className='links2'>
                            <div className='p'>Adventurer:</div>
                            <div className='orders4'>
                                {this.adShow(quest)}  
                            </div>
                        </div>
                        <div className='links2' id='center'>
                          <Link 
                        to={`/edit/${quest.extract.id}`}
                        className="btn-4" 
                        questid={quest.extract.id}
                        >Edit Quest</Link>
                        <Link 
                        to={`/delete/${quest.extract.id}`}
                        className="btn-5" 
                        questid={quest.extract.id}
                        >Cancel Quest</Link>  
                        </div>
                        
                </div>
            )
            return (
                <div className='show-quests' id='background'>
                    <div className='h1' id='background'>Your Quests</div>
                    {list}
                </div>
            ) 
            } else {
               return(
                   <div className="quest-name">
                       <h1 className='h1' id='center'>Have something else on your to-do list?</h1>
                       <p className='p'>Book your next Quest or manage future to-dos  with Quest Rabbit</p>
                       <Link to="/quest"className='button-submit' id='center'>Check It Off Your List</Link>
                   </div>
                   
               ) 
            }
        }
   

    render(){
     
        return(
            <div>
                <div className="form2" id='background'>{this.questShow()}</div>
            </div>
        )
    }
}

export default QuestPage;