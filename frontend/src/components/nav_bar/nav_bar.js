import React from 'react';
import { Link } from 'react-router-dom';
import Quests from './quests_item'


class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.categoryDisplay = this.categoryDisplay.bind(this);
  }

  categoryDisplay() {
    const {categories} = this.props;
    if (!!categories) {
      return (
        <Quests
          categories={categories}
        />
      );
    } else {
      return ''
    };
  }
  componentDidMount() {
    this.props.fetchCategories();
  }
  
      render() {
      const { currentUser } = this.props;
      const logo = window.logo;
        const display = currentUser ? (
          <div className="nav-bar">
            <Link to='/'>
              <img src={logo} className="logo"/>
            </Link>
            {this.categoryDisplay()}
            <Link to='/quest'>Book a Quest</Link>
            <Link to='/quests'>My Quests</Link>
            <Link to='/user'>Account</Link>
          </div>
        ) : (
          <div className="nav-bar">
            <Link to='/'>
              <img src={logo} className="logo"/>
            </Link>
            {this.categoryDisplay()}
            <Link className="btn" to="/intermediary">Log in</Link>
          </div>
        );
        return (
    <header >
      <div>
        {display}
      </div>
    </header>
    )
  }  
}


export default NavBar