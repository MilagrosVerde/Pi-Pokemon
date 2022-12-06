import React from "react"
import "./PokemonCard.css"
import { NavLink } from "react-router-dom"

export default (props) => {
    
    
    return (
        <NavLink to= {`/details/${props.name}`} style={{textDecoration: "none" } }>  
            <div className="Card">

                <h3 className="Card-name">{props.name}</h3>
                <img className="Card-img" src={props.img} alt="not found" />
                
                <div className="Card-contenedortipos">
                    

                    
                    <div className="Card-tipos">
                        {Array.isArray(props.types) ?
                            props.types.map((e, i) => { return (<p key={i}>{e}</p>) }) :
                            <h6>{props.types}</h6>
                        }
                    </div>
                   
                </div>
            </div>
        </NavLink>
    )
}









/*import React from "react";
import {Link} from "react-router-dom";
import * as actions from "../../redux/actions/index.js";

const PokemonCard = (props) => {
    return (
        <Link to={`/pokemons/${props.id}`}>
            <div className="card" key={props.id}>
                <h3>{props.name}</h3>
                <img scr={props.image} alt={props.name}/>
                <p>{props.types}</p>
            </div>
        </Link>
    )
}

export default PokemonCard;*/