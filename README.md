# README
This app is a clone of [taskrabbit](https://www.taskrabbit.com/) and is a revised version of the old [app](https://github.com/Bman2386/Quest_Rabbit).
The previous version was built with Rails 5.2, and Node v12. This version has been updated to rails 7.0.4.2 and node v16.10.

In addition to updating versions new features have been added like lazy loading:
```
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
        <Suspense fallback={<Loading />}>
        <Switch>
            <Route exact path='/'>
                <NavBar />
                <Home />
                <Footer />
            </Route>
```
And a loading animation when the app is loading information
```
export function Loading({modal=false}){
   if (!modal) return(
        <div className="spin-container">
            <div className='loader'>
            </div>   
        </div>  
    );
    return(
        <div className="modal-container">
            <div className='loader'>
            </div>
        </div> 
    )
};
```
```
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
```

* Ruby version
    - 3.1.1

* System dependencies
    - node v16.10 or later
    - rails v7 or later
* Configuration

* Database creation
    - rails db:create

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions
    - clone repo
    - ```$bundle install```
    - ```$rails db:create```
    - ```$rails db:migrate```
    - ```$cd frontend```
    - ```$ npm install ``` (installs frontend only packages but must be in frontend folder 1st)
    - from root folder run ```$bin/rails s``` ("s" stands for server)
    - in new terminal run ```$npm start``` (frontend and backend can't be run from same terminal)
* ...
