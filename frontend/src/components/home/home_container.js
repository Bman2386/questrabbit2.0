import { connect } from 'react-redux';
import { saveData } from '../../actions/temp';
import Home from './home';

const mDTP = dispatch => ({
    saveData: data => dispatch(saveData(data))
})

export default connect(null, mDTP)(Home)