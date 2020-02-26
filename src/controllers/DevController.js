const Dev = require('../models/Dev');
const axios = require('axios');
const parseStringAsArray = require ('../utils/parseStringAsArray');

module.exports = {
// async await quando é necessário esperar o retorno 

    // pesquisar DEV 
    async index(request, response){
        const devs = await Dev.find();
        response.json(devs);
    },

    // pesquisar DEV e se houver fazer update (pesquisar sobre Upsert no mongo)
    async update(request, response){
        const { github_username , bio } = request.body;
        
        // tenta achar usuário para o update 
        let dev = await Dev.findOne({github_username}); // retorna null quando não encontra

        if (dev){
            const dev_udpated = await Dev.updateOne(
                {_id: dev._id},
                
                {$set: 
                    {
                        // campos para atualizar
                        bio
                    }
                }, 
            );         
            response.json(`A bio do usuário ${dev.github_username} foi atualizada com sucesso`) ;
        }else{
            response.json(`Usuário ${github_username} não encontrado`) ;
        }       
    },


    // pesquisar DEV 
    async destroy(request, response){
        const { github_username } = request.body;
        
        // tenta achar usuário para o update 
        let dev = await Dev.findOne({github_username}); // retorna null quando não encontra

        if (dev){
            const result = await Dev.deleteOne(
                {_id: dev._id}       
            );         
            response.json(`Usuário ${github_username} deletado com sucesso`); 
        }else{
            response.json(`Usuário ${github_username} não encontrado`) ;
        }       
    },

    // salvar DEV
    async store(request,response){
        const { github_username, techs , latitude , longitude } = request.body;
    
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

        // Impede inserção de usuário duplicado, procurando no mongo 
        let dev = await Dev.findOne({github_username}); // retorna null quando não encontra

        if (!dev){
            // tenta pegar atributo passado name, caso não exista, pega login
            const { name = login, avatar_url,bio } = apiResponse.data;
        
            // Pega as tecnologias (que foram enviadas via string array no corpo da req)
            const techsArray = parseStringAsArray(techs,','); 
        
            // Pega posição lat e long 
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude] // mongo espera ordem invertida
            }
        
            // Usa modelo e insere no banco de dados ()
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }
    
        return response.json(dev);
    }
}