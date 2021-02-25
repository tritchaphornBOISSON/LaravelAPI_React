import React from "react";
import { 
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Add from "./Add";
import Home from "./Home";
import Eddit from "./eddit";


const App =()=>{
    return (
        <Router className="App__container">
            <Switch>
                <Route exact path="/user" component={Home}/>
                <Route exact path="/user/add" component={Add}/>
                <Route exact path='/user/edit/:id' component={Eddit}/>
            </Switch>
        </Router>
    );
};

export default App;