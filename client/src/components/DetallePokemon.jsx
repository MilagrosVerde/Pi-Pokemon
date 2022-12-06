import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { details } from "../redux/store";
import Nav from "../components/Nav/Nav"
import pikachumensaje from "../img/pikachumensaje.png"
import "./DetallePokemon.css"


export default () => {

    
    let { name } = useParams();


    const dispatch = useDispatch();

    useEffect(() => { dispatch(details(name))}, [dispatch] )

    const poke = useSelector((state) => state.detalles)


    return (
        <div Pokemondetalle-gral>
            <Nav></Nav>
            
            
            {
                poke[0] ? 
                <div className="Pokemondetalle">
                    <h2 className="nombre">{poke[0].Nombre}</h2>
                    <div className="Pokemondetallecontenedor">
                        
                        <div className="tarjetap"> 
                            <h3 className="id"> ID: {poke[0].ID}</h3>
                            <img className="imagendetalle" src={poke[0].Imagen} alt="" />
                        
                        </div>
                        <div className="estadisticaspokes">
                            <p>Vida: <p >{poke[0].Vida}</p></p>
                            <p>Ataque: <p>{poke[0].Ataque}</p></p>
                            <p>Defensa:<p>{poke[0].Defensa}</p></p>
                            <p>Altura:<p> {poke[0].Altura}</p></p>
                            <p>Peso:<p> {poke[0].Peso}</p></p>
                            <p>Tipo:
                                <p> 
                                {Array.isArray(poke[0].Tipo) ?
                                poke[0].Tipo.map((e, i) => { return (<p key={i}>{e}</p>) }) :
                                <p>{poke[0].Tipo}</p>}
                                </p>
                                
                            </p>
                        </div>
                    </div>                  
                </div> :
                <h2>Loading</h2>
            }
             <img className="pikachumensaje" src={pikachumensaje} alt="" />      

        </div>
    )
}
