import React from "react";
import {Link} from "react-router-dom";
import "./Nav.css"

export default function Nav(){
    return (
        <div className="Nav">
            
            <Link to="/pokemons">
                <div className="Nav-texto1">
                    Inicio
                </div>
            </Link> 

            <Link to= "/create"> 
                <div className="Nav-texto3">
                    Creá tu Pokemon
                </div>
            </Link>
        </div>
    )
}
