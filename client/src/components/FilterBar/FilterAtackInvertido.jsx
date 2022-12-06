import React from "react";
import {useDispatch } from "react-redux";
import { filterAtackInv } from "../../redux/store";
import "./FilterAtackInvertido.css"

export default ()=> {
    const dispatch = useDispatch()
    function ataqueinverso (e) {
        e.preventDefault()
        dispatch(filterAtackInv()) /*la despacha cuando aprieto el boton*/
    }
    return (
        <div>
            
            <form onSubmit={ataqueinverso}>
                <input className="menorataque" type="submit" value="Menor Ataque" />
            </form>
        </div>
    )
}