import {connect} from 'react-redux';
import NavBar from './nav_bar';
import { fetchCategories } from '../../actions/category'

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    categories: Object.keys(state.entities.categories).map(key => state.entities.categories[key])
  }
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()) 
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);