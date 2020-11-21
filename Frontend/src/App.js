import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateAccount from './components/CreateAccount';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/:operation/account/:id?" component={CreateAccount} />
      </Switch>
    </Router>
  );
};

export default App;
