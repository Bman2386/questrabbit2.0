import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          password: '',
          adventurer: false,
          avg_rating: 0,
          total_ratings: 0,
          elite: false,
          pitch: 'null',
          family_crest: '',
          realm: '',
          star_sign: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
      this.props.clearErrors()
    }
    
    renderErrors() {
      return(
        <ul>
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`} className="error">
              {error}
            </li>
          ))}
        </ul>
      );
    }
    handleInput(type) {
        return (e) => {
          this.setState({ [type]: e.target.value });
        };
      }

      handleSubmit(e) {
        e.preventDefault();
        this.props.createNewUser(this.state)
      }

    render () {
      const logo = window.logo
      const formPhoto = window.formPhoto

        return (
            <div className="session-form">
             <img src={formPhoto} className="form-photo" />
        <form className='inter-form'>
        <Link to='/'>
          <img src={logo} className="logo"/>
        </Link>
        {this.renderErrors()}
            <input
              value={this.state.username}
              onChange={this.handleInput('username')}
              placeholder="Username"
            />
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleInput('password')}
              placeholder="Password"
            />
            <input 
            value={this.state.family_crest}
            onChange={this.handleInput('family_crest')}
            placeholder="Family Crest ex, Smith "
            />
            <input 
            value={this.state.realm}
            onChange={this.handleInput('realm')}
            placeholder="Realm ex, Earth"
            />
            <input 
            value={this.state.star_sign}
            onChange={this.handleInput('star_sign')}
            placeholder="Star Sign ex, Libra"
            />
            <button onClick={this.handleSubmit}>Create Account</button>
        </form>
      </div>
        )
    }
}

export default Signup;