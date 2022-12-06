import React from "react";
import "./SearcherBar.css"
import fondo from '../../img/fondo.jpeg'
import Searcher from "../Searcher/Searcher"


function SearcherBar () {
    const RenderContent =() => (
        <div className="SearcherBar">
            <img className="SearcherBar-fondo" src={fondo} alt="" />
            <div className="SearcherBar-contenido">
                <div className="SearcherBar-texto">
                ¡Usá la busqueda avanzada para encontrar Pokemon por su nombre!
                </div>

                <div className="SearcherBar-contenedorbuscador">
                    <Searcher></Searcher>
                </div>
            </div>
            
            
        </div>
    )
    return (
        RenderContent()
    )
}
export default SearcherBar




