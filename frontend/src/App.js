import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/shared/Navigation/Navigation';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
function App() {
  return (
    <BrowserRouter>
      <Navigation/> {/*this is shared accross all web pages in the project*/ }
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
