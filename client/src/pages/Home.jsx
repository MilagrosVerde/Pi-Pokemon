import React from "react";
import Nav from "../components/Nav/Nav";
import PokemonCards from "../components/PokemonCards/PokemonCards";
import SearcherBar from "../components/Searcher/SearcherBar";
import FilterBar from "../components/FilterBar/FilterBar";




export default function Home(){
    return (
        <div className="Home">
            <Nav></Nav>
            <SearcherBar></SearcherBar>
            <FilterBar></FilterBar>
            <PokemonCards></PokemonCards>
          
        </div>
    )
}