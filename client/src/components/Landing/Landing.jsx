import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import rayos from '../../img/landing-rayos.svg'
import logoPokemon from '../../img/pokemon-logo.svg'
import pricipalFondo from '../../img/imagen-pricipal-fondo.svg'
import pricipalFrente from '../../img/imagen-pricipal-frente.svg'
import burbuja from '../../img/burbuja.svg'
import pokebola from '../../img/pokebola.svg'
import pokebolaGif from '../../img/pokebola-gif.gif'
import logoHenry from '../../img/henry-logo.svg'
import  "./Landing.css"
 


const Landing = () => {
    const [ mensaje, setMensaje ] = useState('¡Presiona la pokebola para comenzar!')
    const [ loading, setLoading ] = useState(false)
    const history = useHistory()

    function pokeClick(){
        setMensaje('¡Pokemon, yo te elijo!')
        setLoading(true)
        setTimeout(() => {
            history.push("/pokemons")
        }, 5000)
    }

    return(
        <div className={`landing`}>
                <div className={`fondo-animado ${loading && 'fondo-animado-activo'}`}></div>
                <div className="landing-rayos "><img className={`landing-rayos  ${loading && 'rayos-expansion'}`} src={rayos} alt="" /></div>
                <img className={`landing-logo-pokemon`} src={logoPokemon} alt="" />
                <div className="landing-pricipal">
                    <div className="landing-pricipal-circulo-rojo"><div></div></div>
                    <div className="landing-pricipal-fondo-blanco">
                        <div></div>
                    </div>
                    <div className="landing-pricipal-portada" onClick={pokeClick} >
                        <div className="landing-pricipal-portada-container" >
                            <img src={pricipalFondo} alt="" />
                            <div className="portada-pokebola"><img src={ loading ? pokebolaGif : pokebola } alt="" /></div>
                            <img className="portada-frente" src={pricipalFrente} alt="" />
                            <div className="portada-burbuja">
                                <img src={burbuja} alt="" />
                                <div><p>{ mensaje }</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="landing-pricipal-info-proyecto">
                        <div className="info-proyecto-container">
                            <img src={logoHenry} alt="" />
                            <p>Proyecto individual</p>
                            <p>Milagros Verde</p>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Landing;