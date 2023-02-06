import React from 'react';
import { Link } from 'react-router-dom';

class CancelQuest extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            id: '',
            quest_name: '',
            category_id: '',
            details: '',
            creator_id: this.props.creatorId,
            start_time: '',
            completed: 'true',
            adventurer_id: '',
            status: 1,
            body: '',
            rating: 0,
            username: this.props.username
        }
        this.formSetter = this.formSetter.bind(this);
        this.submit = this.submit.bind(this);
        this.yourQuest = this.yourQuest.bind(this);
        this.next = this.next.bind(this);
        this.writeReview = this.writeReview.bind(this);
        this.submitReview = this.submitReview.bind(this);
        this.avgCalc = this.avgCalc.bind(this);
        this.categoryShow = this.categoryShow.bind(this);
        this.advName = this.advName.bind(this);
        this.rating = this.rating.bind(this);
        this.cancel = this.cancel.bind(this);
        this.dateDisplay = this.dateDisplay.bind(this);
    }

    componentDidMount(){
        this.props.fetchQuest(this.props.questId);
        this.props.fetchAdventurer(this.state.adventurer_id);
        this.props.fetchReviews();
    }

    formSetter(){
        const {
            id,
            quest_name,
            category_id,
            details, 
            creator_id, 
            start_time, 
            adventurer_id, 
            } = this.props.quest;

        this.setState({
                  id,
                  quest_name,
                  category_id,
                  details,
                  creator_id,
                  start_time,
                  adventurer_id,
              })
    }

    submit(){
        const {
            id,
            quest_name,
            category_id,
            details, 
            creator_id, 
            start_time, 
            adventurer_id, 
            completed
              } = this.state;
        const quest = {
            id,
            quest_name,
            category_id,
            details, 
            creator_id, 
            start_time, 
            adventurer_id,
            completed
        }
        this.props.updateQuest(quest);
        this.next();
    }

    update(type) {
      
        return (e) => {
          this.setState({ [type]: e.target.value });
        };
      }

      cancel(){
          return this.setState({status: 1});
      }
      
      finalPart(){
          return(
              <div className='quest-form'>
                  <div className='quest-name'>
                     <div className='red'>
                      By clicking Confirm you are cancelling your Quest.
                    </div> 
                    <div className='red'>
                        Are you sure you want to cancel your Quest?
                    </div>
                    <div id='center'>
                        <div className='orders'>
                        If you just need to change the start-time you can edit 
                        that <Link to={`/edit/${this.state.id}`} className='btn-6'>here.</Link>
                        </div>
                    </div>
                  <div className='red' >(This can't be undone)</div>
                  <div id='center'>
                    <button id='margin' className='btn-5' onClick={() => this.cancel()}>Cancel</button>
                    <button id='margin' className='btn-6' onClick={() => this.submit()}>Confirm</button>    
                  </div>
                </div>
              </div>
          )
        
      }

      next(){
          this.setState({status: (this.state.status += 1)})
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
     advName(){
               if (this.props.adventurers.length > 0 && this.state.adventurer_id){
                const firstId = this.props.adventurers[0].id;
                const adv = this.props.adventurers[this.state.adventurer_id - firstId];
                return adv.username
             } else {
                 return ''
             }
            }

   
    dateDisplay(){
           const {start_time} = this.state
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
    
      yourQuest(){
        const {quest_name, category_id, details} = this.state;
        const time = this.dateDisplay();
        const quest = this.props.quest;

        if (quest && (this.state.quest_name === '')){
                 this.formSetter()  
            } 
           
             return(
                 <div className='width2'>
                     <div className='hero-container'>
                        <div className='h1'>Your Quest</div> 
                        <hr className='hr'/>
                        <p className='p'>Quest Name: {`${quest_name}`}</p>
                        <p className='p'>Details: {`${details}`}</p>
                        <p className='p'>Category: {this.categoryShow(category_id)}</p>
                        <p className='p'>Start Time: {`${time}`}</p>
                        <p className='p'>Adventurer: {`${this.advName()}`}</p> 
                        <button onClick={() => this.next()} id='margin'>Cancel Quest</button>
                    </div>
                 </div>
                 
             )
      }

     
      avgCalc(){
          
        const {rating, body, creator_id, adventurer_id} = this.state;
        const review = {rating, body, user_id: creator_id, adventurer_id};
        const firstId = this.props.adventurers[0].id
        const adv = this.props.adventurers[this.state.adventurer_id - firstId];
        const ratings = (adv.total_ratings + 1);
        const currentRating = Number(review.rating);
        const reviews = this.props.reviews;
        let totalReviews = 0;
        reviews.forEach(review =>{
            if (review.extract.adventurer_id === this.state.adventurer_id){
                let singleRating = Number(review.extract.rating)
                totalReviews += singleRating;
            }
                return totalReviews;
            })
            const avg = () => {
                return ((totalReviews + currentRating)/ratings)
            }
            return avg()
      }
      submitReview(){
            const {rating, body, creator_id, adventurer_id, username} = this.state;
            const review = {rating, body, user_id: creator_id, adventurer_id, username};
            const firstId = this.props.adventurers[0].id
            const adv = this.props.adventurers[this.state.adventurer_id - firstId];
            if (adv.total_ratings > 0){
               const ratings = (adv.total_ratings + 1);
               const avg = this.avgCalc()
               const updateRating = {avg_rating: avg, total_ratings: ratings, id: adv.id}
               this.props.updateAdventurer(updateRating);
            } else {
                const newRating = {
                    avg_rating: rating,
                    total_ratings: 1,
                    id: adv.id
                    }
                
               this.props.updateAdventurer(newRating);
            }
            this.props.createReview(review);
      }
      rating() {
        const star = window.star
        const num = <img src={star} className='star'/>
        const use = Number(this.state.rating);
       
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
            return '0'
        }
    }

      writeReview(){
        const firstId = this.props.adventurers[0].id
        const adv = this.props.adventurers[this.state.adventurer_id - firstId];
        return(
            <div className='cancel-form'>
                <label className='h1'>Review for: {`${adv.username}`}</label>
                <div className='quest-name'>
                <div className='orders' id='margin'>Rating:</div>
                <div className='inputs'>
                    <input 
                      type="radio"
                      value={1}
                      name="1 Star"
                      checked={this.state.rating === "1"}
                      onChange={this.update("rating")}/>  
                           <input 
                      type="radio"  
                      value={2}
                      name="2 Stars"
                      checked={this.state.rating === "2"}
                      onChange={this.update("rating")}/>
                           <input 
                      type="radio"  
                      value={3}
                      name="3 Stars"
                      checked={this.state.rating === "3"}
                      onChange={this.update("rating")}/>
                           <input 
                      type="radio"  
                      value={4}
                      name="4 Stars"
                      checked={this.state.rating === "4"}
                      onChange={this.update("rating")}/>
                           <input 
                      type="radio"  
                      value={5}
                      name="5 Stars"
                      checked={this.state.rating === "5"}
                      onChange={this.update("rating")}/>
                </div>
                <div className='inputs'>{this.rating()}</div>
                <div className='inputs'>{`${this.state.rating}`} Stars</div>
                </div>
                <div className='div'>
                   <textarea
                   value={this.state.body}
                   className='textarea3'
                   placeholder={`${adv.username} did a great job at...`}
                   onChange={this.update("body")}/> 
                </div>
                <Link onClick={() => this.submitReview()} to="/" id="margin" className='btn-4'>Submit Review</Link>
            </div>
        )
      }
      pageSetter(){

        if (this.state.status === 1){
           return this.yourQuest();
        } else if (this.state.status === 3){
           return this.writeReview();
        } else if (this.state.status === 2){
            return this.finalPart();
        }
      }
    render(){
        return (
            <div>
       {this.pageSetter()}
            </div> 
        )
    }
}

export default CancelQuest;