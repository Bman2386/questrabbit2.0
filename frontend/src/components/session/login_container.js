import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session';
import Login from './login';



const mSTP = ({entities, errors}) => {
  const data = entities && (Object.keys(entities.temp).length > 0 )? entities.temp : null;
  return {
    errors: errors.session,
    data
  }
}
const mapDispatchToProps = dispatch => ({
  login: formUser => dispatch(login(formUser)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(mSTP, mapDispatchToProps)(Login);
