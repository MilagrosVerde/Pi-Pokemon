import React  from "react";
import Formulario from "../components/Formulario/Formulario";
import Nav from "../components/Nav/Nav";

import "./CreatePokemon.css"

export default () => {
    return (
        <div className="CreatePokemon">
            <Nav></Nav>
            <Formulario></Formulario>
            
        </div>
    )
}