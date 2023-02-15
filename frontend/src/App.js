import React from "react";
import { Route, Switch} from "react-router-dom";
import NavBar from './components/nav_bar/nav_bar_container';
import Category from './components/category/category_show_container'
import Footer from './components/footer/footer'
import Signup from './components/session/signup_container';
import Login from './components/session/login_container';
import Home from './components/home/home_container';
import Intermediary from './components/session/intermediary';
import Profile from './components/profile/profile_container';
import QuestForm from './components/questForm/create_quest_form_container';
import QuestPage from './components/quest/quest_page_container';
import EditQuest from './components/quest/edit_quest_container';
import CancelQuest from './components/quest/cancel_quest_container';
import Category from "./components/category/category_show";

function App(){
   return(
    <>
        <Switch>
            <Route exact path='/'>
                <NavBar />
                <Home />
                <Footer />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/signup'>
                <Signup />
            </Route>
            <Route path='/intermediary'>
                <Intermediary />
            </Route>
            <Route path='/categories/:categoryId'>
                <NavBar />
                <Category />
                <Footer />
            </Route>
            <Route path='/user'>
                <NavBar />
                <Profile />
                <Footer />
            </Route>
            <Route path='/quest'>
                <QuestForm />
            </Route>
            <Route path='/edit/:questId'>
                <NavBar />
                <EditQuest />
                <Footer />
            </Route>
            <Route path='/delete/:questId'>
                <NavBar />
                <CancelQuest />
                <Footer />
            </Route>
            <Route path='/quests'>
                <NavBar />
                <QuestPage />
                <Footer />
            </Route>
        </Switch>
    </>
   ) 
};

export default App;