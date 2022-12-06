import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/store"; 
import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import "./PokemonCards.css"
import Pagination from "../Pagination/Pagination.jsx";
import {details} from "../../redux/store/";
import MensajePikachu from "./MensajePikachu";
import gifpokemon from "../../img/gifpokemon.gif"


export default () => {

    let estado = useSelector((state) => state.pokemons) 
    const dispatch = useDispatch() 
    
    useEffect(() => {if (estado.length===0){ dispatch(getPokemons()) }}, [])

    useEffect(() => { dispatch(details()) }, [])

    const [currentPage, setCurrentPage] = useState(1);
    const [pokesPerPage, setPokesPerPage] = useState(12);

    let lastPokeIndex = currentPage * pokesPerPage;
    let firstPokeIndex = lastPokeIndex - pokesPerPage;
    let currentPokes = estado.slice(firstPokeIndex, lastPokeIndex);
    
    
    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }
   /*  if (currentPokes.length === 0) {
        currentPokes = [{
            Nombre: "no se encontraron resultados",
            Imagen: gifpokemon
        }]
    } */

    return (
        <div className="PokemonCards-contenedor">
            <div className="PokemonCards-paginado">
            <h3>Páginas</h3>
            <Pagination
                currentPage = {currentPage}
                pokesPerPage = {pokesPerPage}
                pokes = {estado.length}
                paginado = {paginado}
            />
            </div>
            <div className="PokemonCards">
                
                {Array.isArray(currentPokes) ?    
                    currentPokes.map((e, i) => {
                        return (<PokemonCard
                            key={i}
                            name={e.Nombre}
                            img={e.Imagen}
                            types={e.Tipo}
                            
                            
                        />)
                    }) :
                    <MensajePikachu></MensajePikachu>
                    
                }
            </div>
            
        </div>
        
    )
}

