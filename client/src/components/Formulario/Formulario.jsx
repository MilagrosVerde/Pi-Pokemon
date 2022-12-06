import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { getTipos, postPoke } from "../../redux/store"
import { Link, useHistory } from "react-router-dom";
import "./Formulario.css"
import pikachumensajedos from "../../img/pikachumensajedos.png";



export default () => {

    const dispatch = useDispatch(); 
    const History = useHistory();

    
    const [err, setErr] = useState({}) 
    function validator(input) {
        let error = {}
        if (!input.Nombre) { error.Nombre = "se requiere nombre" } 
        if (input.Ataque && input.Ataque > 120) { error.Ataque = "Maximo ataque permitido de 120" }
        if (input.Vida && Number(input.Vida) === "NAN") { error.Vida = "Valor invalido" }
        if (input.Like > 5 || input.Like < 1) { error.Like = "supero el limite" }
        return error
    }

    const tipos = useSelector((state) => state.tipo); 
    useEffect(() => { if (tipos.length === 0) { dispatch(getTipos()) } }, []) 

    const [newPoke, setNewPoke] = useState({}) 
    const [tiposPoke, setTiposPoke] = useState([])


    function handleChange(e) {  
        e.preventDefault()
        setNewPoke({ 
            ...newPoke, 
            [e.target.name]: e.target.value 
        })
        setErr(validator({
            ...newPoke,
            [e.target.name]: e.target.value  
        }))
    }

    function handleTipo(e) { 
        e.preventDefault()
        setTiposPoke(() => {
            return [...tiposPoke, e.target.value]
        })
    }

    function handleChangeTipo(e) { 
        e.preventDefault()
        setNewPoke({
            ...newPoke,
            ["Tipos"]: tiposPoke
        })
        alert("se asignaron los tipos ")
    }

    function handleReset(e) { 
        e.preventDefault()
        setTiposPoke([])
        setNewPoke({
            ...newPoke,
            ["Tipos"]: undefined
        })
    }

    const onSubmitCreate = async (e) => { 
        e.preventDefault();
        dispatch(postPoke(newPoke))  
        alert("Pokemon Creado")
        window.open("http://localhost:3000/pokemons", "_self")
    }

    return (
         
        <div className="paginaformulario">
            <Link to="/pokemons"><button >home</button></Link>
            <img src={pikachumensajedos} className="pikachumensajedos" alt="" />


            <div className="formulariotodo">
                    <h3 className="tituloform">Formulario de creación</h3>

                
                    <form onSubmit={onSubmitCreate} className="grilla">

                        
                        <div className="nombreformulario">
                            <label>Nombre</label> 
                            <input type="text" value={newPoke.Nombre} name="Nombre" onChange={handleChange} />
                            {err.Nombre && alert(err.Nombre)} 
                        </div>
                        

                        <div className="grillageneral">
                            <div>
                                <label>Vida</label>
                                <input type="number" value={newPoke.Vida} name="Vida" onChange={handleChange} />
                            </div>

                            <div>
                                <label>Ataque</label>
                                <input type="number" value={newPoke.Ataque} name="Ataque" onChange={handleChange} />
                                {err.Ataque && alert(err.Ataque)}
                            </div>

                            <div>
                                <label>Defensa</label>
                                <input type="number" value={newPoke.Defensa} name="Defensa" onChange={handleChange} />
                            </div>

                            <div>
                                <label>Velocidad</label>
                                <input type="number" value={newPoke.Velocidad} name="Velocidad" onChange={handleChange} />
                            </div>

                            <div>
                                <label>Altura</label>
                                <input type="number" value={newPoke.Altura} name="Altura" onChange={handleChange} />
                            </div>

                            <div>
                                <label>Peso</label>
                                <input type="number" value={newPoke.Peso} name="Peso" onChange={handleChange} />
                            </div>

                            <div>
                                <label>Imagen</label>
                                <input type="text" value={newPoke.Imagen} name="Imagen" onChange={handleChange} />
                            </div> 

                            <div className="tiposformulario">
                                <label>Tipo</label>
                                <select onChange={handleTipo} className="inputTipo">{
                                    tipos.map((e, i) => (<option key={i} value={e}>{e}</option>) 
                                )}</select>
                                

                                
                                    <div className="nombretipoformulario">  
                                        { tiposPoke.length > 0 ? 
                                            tiposPoke.map((e, i) => { return <p key={i}>{e}</p> }) :
                                            <p className="sintipo">Sin tipos</p>
                                        }
                                        <input type="button" value="select" onClick={handleChangeTipo} />
                                        <div>
                                            <input type="button" value="reset tipos" onClick={handleReset} />
                                        </div>
                                    </div>
                                    
                                
                                    
                            </div>
                      
                            {
                                newPoke.Tipos ? <button type="submit" className="crear">¡CREAR!</button> : <p className="mensajesperando">Esperando datos para crear tu pokemon</p>
                            } 

                        </div>

                    
                    </form>
                    
                </div>

        </div>
        
    )

}

