import React from "react";
import {useDispatch } from "react-redux";
import { filterAtack } from "../../redux/store";
import "./FilterAtack.css"

export default ()=> {
    const dispatch = useDispatch()
    function ataque (e) {
        e.preventDefault()
        dispatch(filterAtack()) /*la despacha cuando aprieto el boton*/
    }
    return (
        <div>
            
            <form onSubmit={ataque}>
                <input className="porataque" type="submit" value=" Mayor Ataque" />
            </form>
        </div>
    )
}