const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    type: {
        //coluna
        type:       String,
        enum:       ['Point'],
        required:   true
    },
    coordinates: {
        type:       [Number], // lat, long 
        required:   true
    }
});


module.exports = PointSchema;