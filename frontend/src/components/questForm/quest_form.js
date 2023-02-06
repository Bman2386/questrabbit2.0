import React from 'react';
import PartOne from './part_one';
import PartTwo from './part_two';
import PartThree from './part_three';
import Session from './quick_session/session'

class QuestForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            quest_name: this.props.data['quest_name'],
            category_id: this.props.data['id'],
            details: this.props.data.details,
            creator_id: this.props.creatorId,
            start_time: '',
            completed: 'false',
            adventurer_id: '',
            status: 1,
            date: new Date(),
            review: "false",
            selected: {},
            sorted: [],
            checked: '',
            mini: 0,
            username: '',
            password: '',
            realm: '',
            starSign: '',
            familyCrest: '',
            formType: null
        }  

        this.date = this.state.date

       

       this.next = this.next.bind(this);
       this.back = this.back.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       this.select = this.select.bind(this);       
       this.subCurrentMonth = this.subCurrentMonth.bind(this);
       this.addCurrentMonth = this.addCurrentMonth.bind(this); 
       this.handleDay = this.handleDay.bind(this); 
       this.handleHour = this.handleHour.bind(this);
       this.selectAdv = this.selectAdv.bind(this);
       this.changeDate = this.changeDate.bind(this);
       this.sortAdv = this.sortAdv.bind(this);
       this.checkChange = this.checkChange.bind(this);
       this.pageHandle = this.pageHandle.bind(this);
       this.setForm = this.setForm.bind(this);
       this.loginGuest = this.loginGuest.bind(this);
       this.loginUser = this.loginUser.bind(this);
       this.signUpUser = this.signUpUser.bind(this);
       this.submitQuest = this.submitQuest.bind(this);
    }

     next() {
         this.setState({status: (this.state.status += 1)});
         this.props.fetchAdventurers();
        }
        
    back() {
      if (this.state.status === 2 && this.state.review === true){
        return this.setState({review: 'false', selected: {}})
      } else if(this.state.status === 4){
        const stateFunc = () => {
          const state = this.state;
          const newState = { ...state, status: state.status -= 1, review: 'false',mini: state.mini -= 1 };
          return newState
        };
        this.setState(stateFunc)
      } else {
        const stateFunc = () => {
          const state = this.state;
          const newState = {...state, status: state.status -= 1, review: 'false'};
          return newState
        };
        this.setState(stateFunc)
        }
      }
    
      pageHandle(action, num){
        if (action === 'continue'){
         return this.setState({mini: this.state.mini += 1}) 
        } else if (action === 'edit'){
          return this.setState({mini: num})
        }
      }
   
    subCurrentMonth() {
      const date1 = new Date(this.state.date);
      const month = date1.getMonth();
      date1.setMonth(month - 1);
       this.setState({date: date1});
  }

   addCurrentMonth() {
    const date1 = new Date(this.state.date);
    const month = date1.getMonth();
    date1.setMonth(month + 1);
    this.setState({date: date1});
  }


  sortAdv(e){
    e.preventDefault();
    const adv = this.props.adventurers
    switch (e.target.value) {

      case 'reviews':
        const adSort1 = adv => {
          if (adv.length < 2) return adv;
          const func = (x, y) => {
            if (x > y) return -1; 
            return 1;
          };
          const first = adv[0];
          let left = adv.slice(1).filter(el => func(el.total_ratings, first.total_ratings) === -1);
          let right = adv.slice(1).filter(el => func(el.total_ratings, first.total_ratings) !== -1);
          left = adSort1(left);
          right = adSort1(right);
  
        return left.concat([first]).concat(right)
        }
        const sort1 = adSort1(adv);
        this.state.checked = '';
        return this.setState({sorted: sort1});
      case 'high':
        const adSort2 = adv => {
          if (adv.length < 2) return adv;
          const func = (x, y) => {
            if (x > y) return -1;
            return 1;
          };
          const first = adv[0];
          let left = adv.slice(1).filter(el => func(el.avg_rating, first.avg_rating) === -1);
          let right = adv.slice(1).filter(el => func(el.avg_rating, first.avg_rating) !== -1);
          left = adSort2(left);
          right = adSort2(right);

        return left.concat([first]).concat(right)
        }
        const sorted2 = adSort2(adv);
        this.state.checked = '';
        return this.setState({sorted: sorted2});
      case 'recommended':
      const adSort = adv => {
        if (adv.length < 2) return adv;
        const func = (x, y) => {
          if (x < y) return -1;
          return 1;
        };
        const first = adv[0];
        let left = adv.slice(1).filter(el => func(el.id, first.id) === -1);
        let right = adv.slice(1).filter(el => func(el.id, first.id) !== -1);
        left = adSort(left);
        right = adSort(right);
      return left.concat([first]).concat(right)
      }
      const sort = adSort(adv);
      this.state.checked = '';
      return this.setState({sorted: sort});
      default:
        return this.setState({sorted: adv});
    }
  }

  checkChange(e){
    e.preventDefault();
    const adv = this.props.adventurers
    if (this.state.checked === ''){
      let arr = [];
        adv.forEach(ad => {
          ad.elite === true ? arr.push(ad) : ''
        })
        return this.setState({sorted: arr, checked: 'elite'})
    } else {
      return this.setState({sorted: adv, checked: ''})
    }
  }

    select(input){
        this.setState({adventurer_id: input});
        this.next();
    }

    selectAdv(input){
    const firstId = this.props.adventurers[0].id;
    const num = this.props.adventurers[input - firstId];
      this.props.show();
      return this.setState({selected: num, review: true})
    }

    handleDay(day){
      const day1 = new Date(this.state.date);
      const selected = new Date(day1.setDate(day));
      this.setState({start_time: selected, mini: this.state.mini += 1});
    }

    handleHour(e){
     const {start_time} =this.state;
     const startTime = new Date(start_time);
     const startHour = startTime.setHours(e.target.value);
     return this.setState({start_time: startHour})
      
    }
    handleChange(input) {
        if (input !== "undefined"){
          return e => {
           this.setState({ [input]: e.target.value}) 
            }  
        }
        
      }

      changeDate(event, change){
        const {start_time} = this.state;
        const startTime = new Date(start_time);
        switch (change) {
            case 'minute':
                const startMinute = startTime.setMinutes(event.target.value);
            return this.setState({start_time: startMinute});
            case 'convert':
                let hour = startTime.getHours();
                
                if (event.target.value === 'AM'){
                    
                    if (hour >= 12){
                        hour -= 12
                    }
                } else {
                    
                    if (hour <= 12){
                        hour += 12
                    }
                }
                const startHour = startTime.setHours(hour);
            return this.setState({start_time: startHour});
            default:
                break;
        }
    }
    handleSubmit(e) {
        if (e) {e.preventDefault()} 
        const startTime = new Date(this.state.start_time);
        const questForm = {
            quest_name: this.state.quest_name,
            category_id: this.state.category_id,
            details: this.state.details,
            creator_id: this.props.creatorId, 
            start_time: startTime,
            completed: 'false',
            adventurer_id: this.state.adventurer_id
        };
        this.props.action(questForm);
    }

    setForm(type, e){
     if (e) e.preventDefault();
      this.props.clear();
      this.setState({formType: type});
    }

    loginGuest(e){
     e.preventDefault();
      this.props.login({ username: 'Guest', password: 'hunter12' })
    }
  loginUser(e){
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.login(user);
  }

  signUpUser(e){
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password,
      adventurer: false,
      avg_rating: 0,
      total_ratings: 0,
      elite: false,
      pitch: 'null',
      family_crest: this.state.familyCrest,
      realm: this.state.realm,
      star_sign: this.state.starSign
    }
    this.props.signUp(user);
  }
  submitQuest(){
    this.props.clear();
    this.handleSubmit();
  }
    render(){
        const { quest_name, category_id, details, start_time, adventurer_id, date, status, review, selected, sorted, checked, mini, creator_id } = this.state;
        const values = { quest_name, category_id, details, start_time, adventurer_id, date, review, selected, sorted, checked, mini, creator_id };
        const {username, password, realm, starSign, familyCrest, formType} = this.state;
        const session = { username, password, realm, starSign, familyCrest, formType}
        const {adventurers} = this.props;
        const {reviews} =this.props;

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
    const today = {
          month: months[this.state.date.getMonth()],
          date: this.date.toDateString()
     }
  
     const lastDay = new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1, 0).getDate();
     const firstDayIndex = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), 1).getDay();
     const prevLastDay = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), 0).getDate();
     const lastDayIndex = new Date(this.state.date.getFullYear(), this.state.date.getMonth() + 1, 0).getDay();
  
     const nextDays = 7 - lastDayIndex - 1;
      
     const tally = () => {
         let days = [];
         if (firstDayIndex > 1) {
             for(let x = firstDayIndex; x > 0; x--){
         let num = `${prevLastDay - x + 1}`;
            days.push(num) 
         }
      }
          
         for(let i = 1; i <= lastDay; i++){
             days.push(i)
         }
  
         for(let j=1; j<=nextDays; j++){
             let num2 = `${j}`;
             days.push(num2)
         }
         
         return days
     }
  
      const monthDays = () => {
         const days = tally();
         const today = this.date.getDate();
         const current = function(day) {
             if (day=== today){
                 return 'today';
             } else if (typeof day === 'string'){
                  return 'prev-month'
             } else {
                 return "";
             }
         }
       
         const month = days.map(day => 
              <button 
              
              className={current(day)}
              id={current(day)}
              type='submit'
              value={this.state.start_time}
              onClick={() => this.handleDay(day) }>{day}</button>)
      
              return month;
     }

        switch (status) {
            case 1:
              return (
                <PartOne 
                values = {values} 
                handleChange = {this.handleChange}
                next = {this.next}
                pageHandle = {this.pageHandle}
                />
              )
            case 2:
              return (
                <PartTwo 
                values = {values} 
                select = {this.select}
                back = {this.back}
                adv = {adventurers}
                sortAdv = {this.sortAdv}
                selectAdv={this.selectAdv}
                reviews={reviews}
                checkChange = {this.checkChange}
                />
              )
            
            case 3:
              return (
                <PartThree
                values={values}
                handleChange={this.handleChange}
                addCurrentMonth={this.addCurrentMonth}
                subCurrentMonth={this.subCurrentMonth}
                handleHour={this.handleHour}
                today={today}
                monthDays = {monthDays}
                back={this.back}
                submit={this.handleSubmit}
                adv={adventurers}
                changeDate={this.changeDate}
                pageHandle={this.pageHandle}
                next={this.next}
                />
              )
            case 4:
              return (
                <Session 
                loginUser={this.loginUser}
                loginGuest={this.loginGuest}
                signUpUser={this.signUpUser}
                submitQuest={this.submitQuest}
                error={this.props.errors}
                values={values}
                session= {session}
                back={this.back}
                adv={adventurers}
                id={this.props.creatorId}
                handleChange={this.handleChange}
                setFormType={this.setForm}
                />
              )
          }
        } 
    }

export default QuestForm;
    


