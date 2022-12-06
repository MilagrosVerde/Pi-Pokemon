import React from "react";
import {useDispatch } from "react-redux";
import { filterTipo } from "../../redux/store";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTipos } from "../../redux/store";
import "./FilterTipo.css"


export default () => {
    const [estadoFiltro, setEstadoFiltro] = useState([]);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(filterTipo(estadoFiltro))
    }

    function onChangeInput() {
        const valueInput = document.querySelector (".inputFiltro").value;
        setEstadoFiltro(valueInput)
    }

    const tipo = useSelector((state) => state.tipo)

    useEffect(() => { dispatch(getTipos()) }, [])


    return <div className="filtrotipotodo">
        
        <form  onSubmit={onSubmit}>
            <p className="portipo"> Por Tipos</p>
            
           <select className="inputFiltro" onChange={onChangeInput}>{tipo.map((e, i) => {
                        return <option key={i} value={e}>{e}</option>
                    })}
            </select>
            <input className="botonenviar" type="submit" ></input>
        </form>
    </div>
}