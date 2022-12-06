import React from "react";
import {useDispatch } from "react-redux";
import { filterAlfInv } from "../../redux/store";
import "./FilterAlfabeticoInvertido.css"

export default ()=> {
    const dispatch = useDispatch()
    function submitAlfInv (e) {
        e.preventDefault()
        dispatch(filterAlfInv()) /*la despacha cuando aprieto el boton*/
    }
    return (
        <div>
            
            <form onSubmit={submitAlfInv}>
                <input className="alfinvert" type="submit" value=" Z-A" />
            </form>
        </div>
    )
}