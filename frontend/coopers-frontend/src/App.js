import React from "react";
import { Route, Switch} from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import HomePage from "./Views/Home";

import './App.css';

function App() {
  return (
    <div>
      <Nav/>
      <main className='wrapper'>
        <Switch>
        <Route exact path='/' component={HomePage} />
        {/* ROUTES BELOW THIS LINE WILL BE ADMIN ONLY */}
      </Switch>
      </main>
   
  </div>
  );
}

export default App;
