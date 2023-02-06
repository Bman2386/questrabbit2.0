import React from 'react';
import { Link } from 'react-router-dom';

class EditQuest extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            id: '',
            quest_name: '',
            category_id: '1',
            details: '',
            creator_id: this.props.creatorId,
            start_time: '',
            completed: 'false',
            adventurer_id: '',
        }
        this.formSetter = this.formSetter.bind(this);
        this.update = this.update.bind(this);
        this.submit = this.submit.bind(this);
        this.categoryShow = this.categoryShow.bind(this);
        this.adShow = this.adShow.bind(this);
        this.dateShow = this.dateShow.bind(this);
        this.changeDate2 = this.changeDate2.bind(this);
    }

    componentDidMount(){
        this.props.fetchQuest(this.props.questId);
        this.props.fetchAdventurers();
    }

    formSetter(){
        const {
            id,
            quest_name,
             category_id,
              details, 
              creator_id, 
              start_time, 
              completed, 
              adventurer_id, 
              } = this.props.quest;

              this.setState({
                  id,
                  quest_name,
                  category_id,
                  details,
                  creator_id,
                  start_time,
                  completed,
                  adventurer_id,
              })

    }

    submit(){
        const startTime = new Date(this.state.start_time)
        const quest = {
            id: this.state.id,
            quest_name: this.state.quest_name,
            category_id: this.state.category_id,
            details: this.state.details,
            creator_id: this.props.creatorId,
            start_time: startTime,
            completed: 'false',
            adventurer_id: this.state.adventurer_id,
        }
        this.props.updateQuest(quest);
    }

    update(type) {
        return (e) => {
          this.setState({ [type]: e.target.value });
        };
      }

      categoryShow() {
        if (this.state.category_id === 1){
            return 'Fetch'
        } else if (this.state.category_id === 2){
            return 'Craft'
        } else if (this.state.category_id === 3){
            return 'Escort'
        } else if (this.state.category_id === 4){
            return 'Slay'
        }
    }

    adShow(){
        const advs = this.props.adventurers;
        if (advs.length > 0 && this.state.adventurer_id !== ''){
            const firstId = advs[0].id;
        const ad = advs[this.state.adventurer_id - firstId]
        return ad.username
        }
    }

    dateShow(){
        const { start_time } = this.state;
        if (start_time !== ''){
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
                const fullDate = new Date(start_time);
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
            const startDate = dateDisplay();
            
            return (
            <div className='p' id='center'>{`${startDate}`}</div>
            )
        } else {
            return ''
        }
    }

    changeDate2(e){
        this.setState({start_time: e})
    }
    render(){
        const {quest_name, details, start_time} = this.state;
             const {quest} = this.props;
             if (quest && (quest_name === '')){
                 this.formSetter()  
             }

        return (
        <div className='quest-form'>
            <div className='edit-quest-container'>
                <h1 className='h1'>Edit Quest</h1>
                <hr className='hr' />
                <div className='edit-user'>
                    <div className='p2'>Quest Name:</div>
                        <input type="text"
                            value={quest_name}
                            onChange={this.update('quest_name')}
                            className='input3'/>
                </div>
                <div className='edit-user'>
                    <div className='p2'>Details:</div>
                    <textarea
                        value={details}
                        onChange={this.update('details')}
                        className='textarea2'/>
                </div>
                <div className='label-container'>
                  <input className='label' type='datetime-local' value={start_time} onChange={e => this.changeDate2(e.target.value)}></input> 
                </div>
                {this.dateShow()}
                <p className= 'p' id='center'>Quest Category: {this.categoryShow()}</p> 
                <p className='p'id='center'>Adventurer: {this.adShow()}</p>
                <div id='center' className='links2'>
                    <Link  className="btn-4" to="/" onClick={() => this.submit()}>Submit</Link> 
                    <Link to='/' className='btn-5'>Cancel</Link>
                </div>
                <span className='margin-bottom'></span>
            </div>
        </div>   
        )
    }
}

export default EditQuest;