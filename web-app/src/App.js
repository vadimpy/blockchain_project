import './App.css';
import Investor from "./components/Investor"
import Waitlist from "./components/Waitlist"
import Rental from "./components/Rental"
import Maintenance from "./components/Maintenance"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import HomePage from "./components/HomePage"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return ( 
  <Router>
    <div>
      <Switch>
        <Route exact path="/rental">
          <Rental />
        </Route>
        <Route exact path="/maintenance">
          <Maintenance />
        </Route>
        <Route exact path="/waitlist">
          <Waitlist />
        </Route>
        <Route exact path="/">
          {/* <div className="container-fluid"> */}
           <HomePage/>
          {/* </div> */}
        </Route>
      </Switch>
      <Footer/>
    </div>
  </Router>
  );
}

export default App;
