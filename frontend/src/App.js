import React from "react";
import { Route, Switch} from "react-router-dom";
import NavBar from './components/nav_bar';
import Category from './components/category'
import Footer from './components/footer'
import Signup from './components/signup';
import Login from './components/login';
import Home from './components/home';
import Intermediary from './components/intermediary';
import Profile from './components/profile';
import CreateQuest from './components/createQuest';
// import QuestPage from './components/page';
// import EditQuest from './components/edit';
// import CancelQuest from './components/cancel';


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
                <CreateQuest />
            </Route>
            {/* <Route path='/edit/:questId'>
                <NavBar />
                <EditQuest />
                <Footer />
            </Route> */}
            {/* <Route path='/delete/:questId'>
                <NavBar />
                <CancelQuest />
                <Footer />
            </Route> */}
            {/* <Route path='/quests'>
                <NavBar />
                <QuestPage />
                <Footer />
            </Route> */}
        </Switch>
    </>
   ) 
};

export default App;