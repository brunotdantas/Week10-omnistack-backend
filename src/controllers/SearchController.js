const Dev = require ('../models/Dev')
const parseStringAsArray = require ('../utils/parseStringAsArray');

module.exports = {
    async index(request,response){
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs:{
                $in: techsArray // operator IN igual do SQL server
            },
            location: {
                $near: {
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude,latitude]
                    },
                    $maxDistance: 10000 // em metros
                    // $minDistance: <distance in meters>
                }
            }
        });

        return response.json({devs})
    }
}