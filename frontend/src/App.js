import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/shared/Navigation/Navigation';
import Activate from './pages/Activate/Activate';
import Authenticate from './pages/Authenticate/Authenticate';
import Home from './pages/Home/Home';
import Rooms from './pages/Rooms/Rooms';

const isAuth=false;
const user={
  activated:false,
};

function App() {
  return (
    <BrowserRouter>
      <Navigation/> {/*this is shared accross all web pages in the project*/ }
      <Switch>
        <GuestRoute path="/" exact>
          <Home/>
        </GuestRoute>
     
        <GuestRoute path="/authenticate">
          <Authenticate/>
        </GuestRoute>
        <SemiProtectedRoute path="/activate">
          <Activate/>
        </SemiProtectedRoute >
        <ProtectedRoute path="/rooms">
          <Rooms/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

//guest area, semi-protected area, protected area components to restrict
const GuestRoute = ({children,...rest}) =>{
  //check if user is logged in or is active or not?
  return (
    <Route {...rest}
      render={({location})=>{
          return isAuth ? (
            <Redirect 
            to={{
              pathname:'/rooms',
              state:{from:location},
            }}
            />
          ):
          (
            children
          );
      }}>
    </Route>
  );
}

const SemiProtectedRoute = ({children,...rest})=>{
  return(
    <Route {...rest}
    render={({location}) => {
      /* if not authenticated go to home page*/
      return !isAuth ? (
          <Redirect 
            to={{
              pathname:'/',
              state:{from:location},
            }}
          />
        ): isAuth && !user.activated ? ( /* if authenticated but not activated show semi private  pages  */
            children
          ) : (
            <Redirect 
              to={{
                pathname:'/rooms',
                state:{from:location},
              }}
            />
          );      
    }}>
    </Route>
  );
}

const ProtectedRoute = ({children,...rest})=>{
  return(
    <Route {...rest}
    render={({location}) => {
      /* if not authenticated go to home page*/
      return !isAuth ? (
          <Redirect 
            to={{
              pathname:'/',
              state:{from:location},
            }}
          />
        ): isAuth && !user.activated ? ( /* if authenticated but not activated show semi private  pages  */
          <Redirect 
              to={{
                pathname:'/activate',
                state:{from:location},
              }}
            />
          ) : (
            children
          );      
    }}>
    </Route>
  );
}

export default App;
