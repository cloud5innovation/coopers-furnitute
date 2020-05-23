import React from "react";
import { Route, Switch} from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import HomePage from "./Views/HomePage/Home";
import AddProductPage from "./Views/AddProductPage/AddProduct";
import './App.css';

function App() {
  return (
    <div>
      <Nav/>
      <main className='wrapper'>
        <Switch>
        <Route exact path='/' component={HomePage} />
        {/* ROUTES BELOW THIS LINE WILL BE ADMIN ONLY */}
        <Route exact path='/admin/addproduct' component={AddProductPage}/>
      </Switch>
      </main>
   
  </div>
  );
}

export default App;
