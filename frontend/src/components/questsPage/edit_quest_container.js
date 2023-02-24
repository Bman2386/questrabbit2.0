import { connect } from 'react-redux';
import EditQuest from './edit_quest';
import { updateQuest, fetchQuest } from '../../actions/quest'
import {fetchAdventurers} from '../../actions/adventurer'

const mSTP = (state, ownProps) => {
    const creatorId = state.session.currentUser.id;
    const adventurers = Object.keys(state.entities.adventurers).map(key =>state.entities.adventurers[key]);
    const questId = ownProps.match.params.questId;
    const quest = state.entities.quests.extract
    
    return ({
        creatorId,
        adventurers,
        questId,
        quest
        
    })
}

const mDTP = dispatch => ({
    updateQuest: quest => dispatch(updateQuest(quest)),
    fetchQuest: questId => dispatch(fetchQuest(questId)),
    fetchAdventurers: () => dispatch(fetchAdventurers())
})

export default connect(mSTP, mDTP)(EditQuest);
