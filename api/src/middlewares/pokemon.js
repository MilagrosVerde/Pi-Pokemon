const express = require("express");
const axios = require("axios");
const { Pokemon, Tipo, middle } = require("../db");  
const { where } = require("sequelize");
const router = express();



/*const express = require("express");
const axios = require("axios");
const { Pokemon, Tipo, middle } = require("../../db");  // Estos son los modelos ó tablas de la DB*/




router.use(express.json());

router.get("/", async (req, res) => {
    const { name } = req.query;

    try {
        if (name) {
            const arrayPoke = [];

            // Buscando en API
            const api = "https://pokeapi.co/api/v2/pokemon?limit=40"
            const prueva = await axios.get(api)

            const arrayPromises = prueva.data.results.map((e) => {
                return (axios.get(e.url))
            })

            await Promise.all(arrayPromises)
                .then((data) => {
                    const dataApi = data.map((e) => { return (e.data) })
                    const found = dataApi.find((e) => e.name === name)
                    if (found) {
                        const obj = {
                            ID: found.id,
                            Nombre: found.name,
                            Tipo: found.types.map(e => e.type.name),
                            Vida: found.stats[0]["base_stat"],
                            Ataque: found.stats[1]["base_stat"],
                            Defensa: found.stats[2]["base_stat"],
                            Velocidad: found.stats[5]["base_stat"],
                            Altura: found.height,
                            Peso: found.weight,
                            Imagen: found.sprites.other["official-artwork"]["front_default"],
                        }
                        arrayPoke.push(obj)
                    }
                }).catch((err) => {
                    console.log(err)
                })

            if (arrayPoke.length > 0) return res.json(arrayPoke)

            // Buscando en DB
            let charactDb = await Pokemon.findOne({
                where: { Nombre: name }
            })

            if (charactDb) {
                charactDb = charactDb.dataValues

                let idPoke = await middle.findAll({
                    where: { pokemonID: charactDb.ID }
                })

                let idTipos = idPoke.map((e) => (e.dataValues.tipoID))
                //console.log(idTipos)
                const tipos = [];
                for (let i = 0; i < idTipos.length; i++) {
                    const nameTipo = await Tipo.findByPk(idTipos[i])
                    tipos.push(nameTipo.dataValues.Nombre)

                }

                const obj = {
                    ID: charactDb.IdFake,
                    Nombre: charactDb.Nombre,
                    Tipo: tipos,
                    Vida: charactDb.Vida,
                    Ataque: charactDb.Ataque,
                    Defensa: charactDb.Defensa,
                    Velocidad: charactDb.Velocidad,
                    Altura: charactDb.Altura,
                    Peso: charactDb.Peso,
                    Imagen: charactDb.Imagen
                }
                arrayPoke.push(obj)
                return res.json(arrayPoke)

            } else {
                return res.send("Not found")
            }
        }

        let pokemons = []

        const api = "https://pokeapi.co/api/v2/pokemon?limit=40"
        const prueva = await axios.get(api)

        const arrayPromises = prueva.data.results.map((e) => {
            return (axios.get(e.url))
        })

        await Promise.all(arrayPromises)
            .then((data) => {
                const dataApi = data.map((e) => { return e.data })
                dataApi.forEach((e) => {
                    const obj = {
                        Imagen: e.sprites.other["official-artwork"]["front_default"],
                        Nombre: e.name,
                        Tipo: e.types.map(e => e.type.name),
                        Ataque: e.stats[1]["base_stat"],
                        Id: e.id,
                    }
                    pokemons.push(obj)
                })
            }).catch((err) => {
                console.log(err)
            })

        let charactsDb = await Pokemon.findAll();

        if (charactsDb.length > 0) {
            charactsDb = charactsDb.map((e) => (e.dataValues))

            for (let i = 0; i < charactsDb.length; i++) {
                const idsPoke = await middle.findAll({
                    where: { pokemonID: charactsDb[i].ID }
                })
                //console.log(i, idsPoke.dataValues.tipoID)
                const tipos = [];
                for (let j = 0; j < idsPoke.length; j++) {
                    const nameTipo = await Tipo.findByPk(idsPoke[j].dataValues.tipoID)
                    tipos.push(nameTipo.dataValues.Nombre)
                }
                
                const obj = {
                    Imagen: charactsDb[i].Imagen,
                    Nombre: charactsDb[i].Nombre,
                    Tipo: tipos,
                    Ataque: charactsDb[i].Ataque,
                    Id: charactsDb[i].ID,
                }

                pokemons.push(obj);
            }
        }
        return res.json(pokemons);

    } catch (error) {
        return res.status(400).send("Ocurrio un error", error)
    }

});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {

        if (id <= 40) {
            const charact = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const poke = charact.data

            const obj = {

                Id: poke.id,
                Nombre: poke.name,
                Vida: poke.stats[0]["base_stat"],
                Ataque: poke.stats[1]["base_stat"],
                Defensa: poke.stats[2]["base_stat"],
                Velocidad: poke.stats[5]["base_stat"],
                Altura: poke.height,
                Peso: poke.weight,
                Imagen: poke.sprites.other["official-artwork"]["front_default"]
            }
            return res.json(obj);
        }


        let charactDb = await Pokemon.findOne({
            where: { ID: id }
        })

        if (charactDb) {

            const obj = {
                Id: charactDb.ID,
                Nombre: charactDb.Nombre,
                Vida: charactDb.Vida,
                Ataque: charactDb.Ataque,
                Defensa: charactDb.Defensa,
                Velocidad: charactDb.Velocidad,
                Altura: charactDb.Altura,
                Peso: charactDb.Peso,
                Imagen: charactDb.Imagen,
            }
            return res.json(obj)
        }

    } catch (error) {
        return res.status(400).send("Ocurrio un error", error)
    }

});

router.post("/", async (req, res) => {
    const { Nombre, Tipos, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Imagen } = req.body;

    try {
        if (!Nombre || !Tipos) return res.status(203).send("Faltan datos");
        const cantidad = await Pokemon.findAll() //aca obtenem,os la cantidad que hay enla base de datos

        if (!Imagen) {
            var newPoke = await Pokemon.create({
                Nombre, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Imagen: "https://www.tupacity.com/img/2018/07/26/fileg_386550.jpg", IdFake: (40 + cantidad.length + 1)
            })
        } else {
            var newPoke = await Pokemon.create({
                Nombre, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Imagen, IdFake: (40 + cantidad.length + 1)
            })
        }

        for (let i = 0; i < Tipos.length; i++) {
            const instance = await Tipo.findOne({ // relation recibe la instancia de la tabla Tipo donde Nombre = Tipo
                where: { Nombre: Tipos[i] }
            })
            await newPoke.addTipo(instance) // Se crea una instancia en la tabla middle con ID tipo y ID del pokemon

        }

        return res.json(newPoke)

    } catch (error) {
        return res.status(400).send("Ocurrio un error: ", error)
    }
});

module.exports = router;









/*router.use(express.json());

router.get("/", async (req, res) => { 
    const { name } = req.query;

    try {
        if (name) {
            const arrayPoke = [];
            const api = "https://pokeapi.co/api/v2/pokemon?limit=40"
            const prueva = await axios.get(api) 
            const arrayPromises = prueva.data.results.map((e) => {
                return (axios.get(e.url))
            })

            await Promise.all(arrayPromises) 
                .then((data) => {
                    const dataApi = data.map((e) => { return (e.data) })
                    const found = dataApi.find((e) => e.name === name)
                    if (found) { 
                        const obj = {
                            ID: found.id,
                            Nombre: found.name,
                            Tipo: found.types.map(e => e.type.name),
                            Vida: found.stats[0]["base_stat"], 
                            Ataque: found.stats[1]["base_stat"],
                            Defensa: found.stats[2]["base_stat"],
                            Velocidad: found.stats[5]["base_stat"],
                            Altura: found.height,
                            Peso: found.weight,
                            Imagen: found.sprites.other["official-artwork"]["front_default"],
                        }
                        arrayPoke.push(obj) 
                    }
                }).catch((err) => { 
                    console.log(err)
                })

            if (arrayPoke.length > 0) return res.json(arrayPoke) 

            
            let charactDb = await Pokemon.findOne({ 
                where: { Nombre: name } 
            })

            if (charactDb) { 
                let idType = await middle.findOne({
                    where: { pokemonID: charactDb.toJSON().ID }
                })
                const id = idType.toJSON().tipoID

                let type = await Tipo.findByPk(id) 
                 

                const obj = {
                    Id: charactDb.ID,
                    Nombre: charactDb.Nombre,
                    Tipo: type.Nombre,
                    Vida: charactDb.Vida,
                    Ataque: charactDb.Ataque,
                    Defensa: charactDb.Defensa,
                    Velocidad: charactDb.Velocidad,
                    Altura: charactDb.Altura,
                    Peso: charactDb.Peso,
                    Imagen: charactDb.Imagen
                }
                arrayPoke.push(obj)

                return res.json(arrayPoke)
            } else { 
                return res.send("not found")
            }
        } 

        
       
        
        
        let pokemons = [] 

        const api = "https://pokeapi.co/api/v2/pokemon?limit=40"
        const prueva = await axios.get(api)

        const arrayPromises = prueva.data.results.map((e) => {
            return (axios.get(e.url))
        })

        await Promise.all(arrayPromises)
            .then((data) => {
                const dataApi = data.map((e) => { return e.data })
                dataApi.forEach((e) => {
                    const obj = {
                        Imagen: e.sprites.other["official-artwork"]["front_default"], 
                        Nombre: e.name,
                        Tipo: e.types.map(e => e.type.name),
                        Ataque: e.stats[1]["base_stat"],
                        Altura: e.height
                    }
                    pokemons.push(obj)
                })
            }).catch((err) => {
                console.log(err)
            })  




             

        const charactsDb = await Pokemon.findAll();

        if (charactsDb.length > 0) {
            const dbArray = charactsDb.map((element) => element.dataValues)

            for (let i = 0; i < dbArray.length; i++) {

                const idType = await middle.findOne({
                    where: { pokemonID: dbArray[i].ID }
                });

                const id = idType.toJSON().tipoID;

                const type = await Tipo.findByPk(id); 
                const typedb = type.toJSON().Nombre

                const obj = {
                    Imagen: dbArray[i].Imagen,
                    Nombre: dbArray[i].Nombre,
                    Tipo: typedb,
                    Ataque: dbArray[i].Ataque
                }

                pokemons.push(obj);
            }
        }

        return res.json(pokemons);

    } catch (error) {
        return res.status(400).send("Ocurrio un error", error)
    }

});



router.get("/:id", async (req, res) => {
    const { id } = req.params; 
    
    try { 

        if (id <= 40) {  
            const charact = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`) 
            const poke = charact.data

            const obj = { 

                Id: poke.id,
                Nombre: poke.name,
                Tipo: poke.types.map(e => e.type.name),
                Vida: poke.stats[0]["base_stat"],
                Ataque: poke.stats[1]["base_stat"],
                Defensa: poke.stats[2]["base_stat"],
                Velocidad: poke.stats[5]["base_stat"],
                Altura: poke.height,
                Peso: poke.weight,
                Imagen: poke.sprites.other["official-artwork"]["front_default"]
            }
            return res.json(obj);
        }

        
        let charactDb = await Pokemon.findOne({
            where: { ID: id }
        })

        if (charactDb) { 
            let idType = await middle.findOne({
                where: { pokemonID: charactDb.toJSON().ID }
            })
            const id = idType.toJSON().tipoID

            let type = await Tipo.findByPk(id)

            const obj = {
                Id: charactDb.ID,
                Nombre: charactDb.Nombre,
                Tipo: type.Nombre,
                Vida: charactDb.Vida,
                Ataque: charactDb.Ataque,
                Defensa: charactDb.Defensa,
                Velocidad: charactDb.Velocidad,
                Altura: charactDb.Altura,
                Peso: charactDb.Peso,
                Imagen: charactDb.Imagen,
            }
            return res.json(obj)
        }

    } catch (error) {
        return res.status(400).send("Ocurrio un error", error)
    }

});





router.post("/", async (req, res) => {
    const { Nombre, Tipos, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Imagen } = req.body;

    try {
        if (!Nombre || !Tipos) return res.send("Faltan datos"); 

        const newPoke = await Pokemon.create({ 
            Nombre, Vida, Ataque, Defensa, Velocidad, Altura, Peso, Imagen, 
        })

        const relation = await Tipo.findOne({ 
            where: { Nombre: Tipos } 
        })
        await newPoke.addTipo(relation); 

        return res.json(newPoke)

    } catch (error) {
        return res.status(400).send("Ocurrio un error: ", error)
    }
});

module.exports = router;*/