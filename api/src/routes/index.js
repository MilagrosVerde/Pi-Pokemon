const { Router } = require('express');
const pokemons =require ("../middlewares/pokemon") 
const types =require ("../middlewares/types")


const router = Router();
router.use('/pokemons', pokemons) 
router.use('/types', types) 



module.exports = router;
