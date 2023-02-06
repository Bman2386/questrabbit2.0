import { connect } from 'react-redux';
import ProfileComponent from './profile';
import { logout } from '../../actions/session';
import {fetchAdventurer, updateAdventurer} from '../../actions/adventurer'

const mSTP = (state) => {
    const user= state.session.currentUser 
    const ad = state.entities.adventurers
    const details = ad ? ad : user
    return ({
        username: user.username,
        family_crest: details.family_crest,
        realm: details.realm,
        star_sign: details.star_sign,
        id: user.id,
        details: details.id
    })
    
}

const mDTP = dispatch => ({
    logout: () => dispatch(logout()),
    getUser: (userId) => dispatch(fetchAdventurer(userId)),
    update: user => dispatch(updateAdventurer(user))
})

export default connect(mSTP, mDTP)(ProfileComponent)