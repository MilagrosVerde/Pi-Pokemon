import React from "react";
import {useDispatch } from "react-redux";
import { filterCreado } from "../../redux/store";
import "./FilterCreado.css"

export default ()=> {
    const dispatch = useDispatch()
    function creado (e) {
        e.preventDefault()
        dispatch(filterCreado()) /*la despacha cuando aprieto el boton*/
    }
    return (
        <div>
            
            <form onSubmit={creado}>
                <input className="pokescreados" type="submit" value=" Creados" />
            </form>
        </div>
    )
}