import React, {useState} from "react";
import { useDispatch } from "react-redux";
import FilterAlfabetico from "./FilterAlfabetico";
import FilterAlfabeticoInvertido from "./FilterAlfabeticoInvertido";
import FilterAtack from "./FilterAtack";
import FilterAtackInvertido from "./FilterAtackInvertido";
import "./FilterBar.css"
import FilterCreado from "./FilterCreado";
import FilterExistente from "./FilterExistente";
import FilterTipo from "./FilterTipo";
import { getPokemons } from "../../redux/store";




function FilterBar () {
    const dispatch = useDispatch()
    function pokemones (i) {
        i.preventDefault()
        dispatch(getPokemons())

    }


    const RenderContent =() => (
        <div className="FilterBar-fondo" >
            

            <div className="FilterBar-todos">
                  
                 <button className="todospokes" onClick={pokemones}>Todos</button>
            </div>
            <div className="FilterBar-existentes">
                <FilterExistente></FilterExistente>
            </div>
            <div className="FilterBar-creados">
                <FilterCreado></FilterCreado>
            </div>
            <div className="FilterBar-alfabeticamente">
                <FilterAlfabetico></FilterAlfabetico>
            </div>
            <div className="FilterBar-alfabeticamenteinverso">
                <FilterAlfabeticoInvertido></FilterAlfabeticoInvertido>
            </div>
           
            <div className="FilterBar-ataque">
                <FilterAtack></FilterAtack>
            </div>
            <div className="FilterBar-ataqueInvertido">
                <FilterAtackInvertido></FilterAtackInvertido>
            </div>
            <div className="FilterBar-tipo">
                <FilterTipo></FilterTipo>
            </div>
            
            
        </div>
    )
    return (
        RenderContent()
    )
}
export default FilterBar