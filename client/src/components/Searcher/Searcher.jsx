import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, searchPokemon } from "../../redux/store/index"; 
import Pagination from "../Pagination/Pagination";
import "./Searcher.css"

export default () => {

    const [stateSearch, setStateSearch] = useState([]); 
    
    const dispatch = useDispatch();
    
    function onSubmit(e) {
        e.preventDefault();
        
        dispatch(searchPokemon(stateSearch)) 
        
    }

    function onChangeInput() {
        const valueInput = document.querySelector(".inputClient").value; 
        setStateSearch(valueInput) 
    }

    function sendForm() {
        const valueInput = document.querySelector(".inputClient").value; 
        console.log(valueInput)
    }
    
    return (
        <div  onSubmit={onSubmit}> 
            
            <form>
                <div className="Searcher-buscador">
                    
                    <input className="inputClient" type="text" onChange={onChangeInput}  />
                    <input className="Searcher-carita" type="submit" value=" :) " onClick={sendForm} />
                </div>
            </form>
        </div>
    )
}