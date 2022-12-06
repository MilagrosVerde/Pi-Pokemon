import React from "react";
import {useDispatch } from "react-redux";
import { filterAlf } from "../../redux/store";
import "./FilterAlfabetico.css"

export default ()=> {
    const dispatch = useDispatch()
    function submitAlf (e) {
        e.preventDefault()
        dispatch(filterAlf()) /*la despacha cuando aprieto el boton*/
    }
    return (
        <div>
            
            <form onSubmit={submitAlf}>
                <input className="alfabeticamente" type="submit" value=" A-Z" />
            </form>
        </div>
    )
}