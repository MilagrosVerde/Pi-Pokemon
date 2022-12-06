import './App.css';
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from "./components/Landing/Landing.jsx";
import CreatePokemon from "./pages/CreatePokemon"
import Home from './pages/Home';
import DetallePokemon from './components/DetallePokemon';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <Switch>
          <Route exact path= '/' render={() => <Landing/>}/>
          <Route  path= '/pokemons' render={() => <Home/>}/>
          <Route  path= '/details/:name' render={() => <DetallePokemon/>}/>
          <Route exact path= '/create' render={() => <CreatePokemon/>}/>
        
         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
