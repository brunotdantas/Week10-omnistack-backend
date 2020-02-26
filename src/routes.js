const {Router} = require('express')
const routes = Router();

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.delete('/devs', DevController.destroy);
routes.put('/devs', DevController.update);


routes.get('/search', SearchController.index);

module.exports = routes;






// Métodos HTTP: GET (busca), POST(envio/insert), PUT(edição),DELETE

// Parâmetros usados em requisições:
/*
    Query params :   Filtros, ordenação, paginação)
    // console.log (request.query)

    Router Params:  Identificar um recurso pela rota 
    // app.delete('/users/:id',(req,res)=>{...
        // onde id = nome do parametro 

    Body : Corpo da requisição 
        // request.body
*/