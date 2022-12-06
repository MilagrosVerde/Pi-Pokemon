import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";  
import axios from "axios";


const inicialState = {
    pokemons: [],
    items: [],
    detalles: [],
    tipo:[],
};


function reducer(state = inicialState, action) {

    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }
        case SEARCH_POKEMON:
            return {
                ...state,
                pokemons: action.payload
            }
        case DETAILS: 
                return {
                    ...state,
                    detalles: action.payload,
            }
        case FILTER_TIPOS:
            const pokes = state.pokemons
            const pokesTipos = pokes.filter((e) => (
                e.Tipo[0] === action.payload || e.Tipo[1] && e.Tipo[1] === action.payload || typeof(e.Tipo) === "string" && e.Tipo === action.payload
            ))
                return {
                    ...state,
                    pokemons: pokesTipos,
                }
        case FILTER_ALF:
            
            const pokesAlf = ordenar(state.pokemons, "Nombre", false)

            return {
                ...state,
                pokemons: [...pokesAlf]
            }
        case FILTER_ALF_INV:
            const pokesAlfInv = ordenar(state.pokemons, "Nombre", true)
            return {
                ...state,
                pokemons: [...pokesAlfInv]
            }
        case FILTER_ATACK:
            const pokesAtack = ordenar(state.pokemons, "Ataque", true)
            console.log(pokesAtack)
            return {
                ...state,
                pokemons: [...pokesAtack]
            }
        case FILTER_ATACK_INV:
            const pokesAtackInv = ordenar(state.pokemons, "Ataque", false)
            return {
                ...state,
                pokemons: [...pokesAtackInv]
            }
        case FILTER_EXISTE:
            const pokesExisten = state.pokemons.filter((e) => typeof (e.Id) === "number")
            return {
                ...state,
                pokemons: [...pokesExisten]
            }
        case FILTER_CREADO:
            const pokesCreados = state.pokemons.filter((e) => typeof (e.Id) === "string")
            return {
                ...state,
                pokemons: [...pokesCreados]
            }
        case GET_TIPOS:
            return {
                ...state,
                tipo: action.payload
            }
        case POST_POKE:
            return {
                ...state
            }     
        default:
            return state
    }
}


const GET_POKEMONS = "get_pokemons"; 

const url = "http://localhost:3001/pokemons/";

export function getPokemons() {  
    return function (dispatch) { 
        axios.get(url)
            .then((dataPromise) => {
                dispatch({
                    type: GET_POKEMONS,
                    payload: dataPromise.data
                })
            }).catch((err) => {
                console.log(err)
            })
    }
}

const SEARCH_POKEMON = "search_pokemon"; 

export function searchPokemon(nomPoke) {
    return (
        function (dispatch) {
            axios.get("http://localhost:3001/pokemons/?name=" + nomPoke)
                .then((dataPromise) => {
                    dispatch({
                        type: SEARCH_POKEMON,
                        payload: dataPromise.data
                    })
                }).catch((err) => {
                    console.log(err)
                })
        }
    )
}

const DETAILS = "details_poke"

export function details(namePoke) {
    if (namePoke) {
        return (
            function (dispatch) {
                axios.get("http://localhost:3001/pokemons/?name=" + namePoke)
                    .then((dataPromise) => {
                        dispatch({
                            type: DETAILS,
                            payload: dataPromise.data
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        )
    }else {
        return (
            function (dispacha) {
                dispacha({
                    type: DETAILS,
                    payload: []
                })
            }
        )
    }
}

const FILTER_TIPOS = "filter_tipos"
export function filterTipo(tipoPoke) {
    return ({
        type:FILTER_TIPOS,
        payload: tipoPoke
    }
        /*function(dispatch) {
            axios.get(url)
                .then((dataPromise) => {
                    const pokes = dataPromise.data;
                    const pokesTipos = pokes.filter((e) => (
                        e.Tipo[0] === tipoPoke || e.Tipo[1] && e.Tipo[1] === tipoPoke || typeof(e.Tipo) === "string" && e.Tipo === tipoPoke
                    ))
                    dispatch({
                        type: FILTER_TIPOS,
                        payload: pokesTipos
                    })
                }).catch((err) => {
                    console.log(err)
                })
        }*/
    )
}




const FILTER_ALF = "filter_alf"

export function filterAlf() {
    return (
        
        function (dispatch) {
            axios.get(url)
                .then((dataPromise) => {

                    const pokes = dataPromise.data;

                    function comparador(a, b) {
                        if (a.Nombre.toLowerCase() < b.Nombre.toLowerCase()) {
                            return -1;
                        }
                        if (a.Nombre.toLowerCase() > b.Nombre.toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    }

                    pokes.sort(comparador);

                    dispatch({
                        type: FILTER_ALF,
                        payload: pokes
                    })
                }).catch((err) => {
                    console.log(err)
                })
        }
    )
}
//funcion MAGICAA


function ordenar(lista, atributo, reversa) {
    function comparador(a,b) {

        let valorA = typeof(a) === "string" ? a[atributo].toLowerCase() : a[atributo]
        let valorB = typeof(b) === "string" ? b[atributo].toLowerCase() : b[atributo]

        if (valorA < valorB) {
            if (reversa){ return 1 }
            return -1
        }
        if (valorA > valorB) {
            if (reversa){ return -1 }
            return 1
        }
        return 0;
    }
    return lista.sort(comparador)
}



const FILTER_ALF_INV = "filter_alf_inv"

export function filterAlfInv() {
    return (
        function (dispatch) {
            axios.get(url)
                .then((dataPromise) => {

                    const pokes = dataPromise.data;

                    function comparador(a, b) {
                        if (a.Nombre.toLowerCase() < b.Nombre.toLowerCase()) {
                            return 1;
                        }
                        if (a.Nombre.toLowerCase() > b.Nombre.toLowerCase()) {
                            return -1;
                        }
                        return 0;
                    }

                    pokes.sort(comparador);

                    dispatch({
                        type: FILTER_ALF_INV,
                        payload: pokes
                    })
                }).catch((err) => {
                    console.log(err)
                })
        }
    )
}

const FILTER_ATACK = "filter_atack"

export function filterAtack() {
    return (
        function (dispatch) {
            axios.get(url)
                .then((dataPromise) => {
                    const pokes = dataPromise.data;
                    pokes.sort((a, b) => {
                        return (b.Ataque - a.Ataque)
                    })
                    dispatch({
                        type: FILTER_ATACK,
                        payload: pokes
                    })
                }).catch((err) => {
                    console.log(err)
                })
        })
}



const FILTER_ATACK_INV = "filter_atack_inv"

export function filterAtackInv() {
    return (
        function (dispatch) {
            axios.get(url)
                .then((dataPromise) => {
                    const pokes = dataPromise.data;
                    pokes.sort((a, b) => {
                        return (a.Ataque - b.Ataque)
                    })
                    dispatch({
                        type: FILTER_ATACK_INV,
                        payload: pokes
                    })
                }).catch((err) => {
                    console.log(err)
                })
        })
}





const FILTER_EXISTE = "filter_existe"

export function filterExiste() {
    return (
        function (dispatch) {
            axios.get(url)
                .then((dataPromise) => {
                    const pokes = dataPromise.data;
                    const pokesExisten = pokes.filter((e) => typeof (e.Id) !== "string")
                    dispatch({
                        type: FILTER_EXISTE,
                        payload: pokesExisten
                    })
                }).catch((err) => {
                    console.log(err)
                })
        }
    )
}

const FILTER_CREADO = "filter_creado"

export function filterCreado() {
    return (
        function (dispatch) {
            axios.get(url)
                .then((dataPromise) => {
                    const pokes = dataPromise.data;
                    const pokesExisten = pokes.filter((e) => typeof (e.Id) === "string")
                    dispatch({
                        type: FILTER_CREADO,
                        payload: pokesExisten
                    })
                }).catch((err) => {
                    console.log(err)
                })
        }
    )
}

const GET_TIPOS = "get_tipos"

export function getTipos() {
    return (
        function (dispatch) {
            axios.get("http://localhost:3001/types")
                .then((dataPromise) => {
                    dispatch({
                        type: GET_TIPOS,
                        payload: dataPromise.data
                    })
                }).catch((err) => {
                    console.log(err)
                })
        }
    )
}

const POST_POKE = "post_poke";

export function postPoke(newPoke) {
    return (
        function () {
            axios.post("http://localhost:3001/pokemons/", newPoke)
            .then((dataPromise) => {
                console.log(dataPromise.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    )
}

const store = createStore(reducer, applyMiddleware(thunk))
export default store;
