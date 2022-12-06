import React from "react";
import {useDispatch } from "react-redux";
import { filterExiste } from "../../redux/store";
import "./FilterExistente.css"

export default ()=> {
    const dispatch = useDispatch()
    function existente (e) {
        e.preventDefault()
        dispatch(filterExiste()) /*la despacha cuando aprieto el boton*/
    }
    return (
        <div>
            
            <form onSubmit={existente}>
                <input className="pokemonsexistentes"  type="submit" value="Existentes" />
            </form>
        </div>
    )
}