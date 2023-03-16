import React, {lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
// import Category from './components/category';
const Profile = lazy(()=> import('./components/profile'));
const CreateQuest = lazy(()=> import('./components/createQuest'));
const QuestsPage = lazy(()=> import('./components/questsPage'));
const NavBar = lazy(() => import('./components/nav_bar'));
const Category = lazy(() => import('./components/category'));

const Footer = lazy(() => import('./components/footer'));
const Signup = lazy(() => import('./components/signup'));
const Login = lazy(() => import('./components/login'));
const Home = lazy(() => import('./components/home'));
const Intermediary = lazy(() => import('./components/intermediary')); 

function App(){
   return(
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
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
            <Route path='/categories'>
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
            <Route path='/quests'>
               <NavBar /> 
                    <QuestsPage />
                <Footer />  
            </Route>
        </Switch>
    </Suspense>
    </Router>
   ); 
};

export default App;