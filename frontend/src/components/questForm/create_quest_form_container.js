import { connect } from 'react-redux';
import QuestForm from './quest_form';
import { createQuest} from '../../actions/quest';
import {fetchAdventurers} from '../../actions/adventurer';
import {fetchReviews} from '../../actions/review';
import { createNewUser, login, clearErrors } from '../../actions/session';

const organizeData=(data)=> {
    const form = {}
    for (const key in data){
        if (key=== 'id') form['id'] = `${data[key]}`;
        if (key === 'ex_description') form['details'] = data[key];
        if (key === 'name') form['quest_name'] = data[key]
    }
    if (!form.id) form['id'] = '';
    if (!form.details) form['details'] = '';
    if (!form.quest_name) form['quest_name'] = '';
    return form
}

const mSTP = (state, ownProps) => {
    const creatorId =  Boolean(state.session.currentUser) ? state.session.currentUser.id: null;
    const adventurers = Object.keys(state.entities.adventurers).map(key =>state.entities.adventurers[key]);
    const reviews = Object.keys(state.entities.reviews).map(key =>state.entities.reviews[key]);
    const data =  organizeData(state.entities.temp);
    const errors = state.errors.session; 
    return ({
        creatorId,
        adventurers,
        adventurerId: ownProps[ownProps.match.params.id],
        reviews,
        data,
        errors
       
    })
}

const mDTP = dispatch => ({
    action: quest => dispatch(createQuest(quest)),
    fetchAdventurers: () => dispatch(fetchAdventurers()),
    show: () => dispatch(fetchReviews()),
    login: user => dispatch(login(user)),
    signUp: user => dispatch(createNewUser(user)),
    clear: () => dispatch(clearErrors())
})

export default connect(mSTP, mDTP)(QuestForm);
