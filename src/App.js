import './App.scss'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './utils/PrivateRoute';

toast.configure({ position: toast.POSITION.BOTTOM_CENTER, limit: 3 })
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
