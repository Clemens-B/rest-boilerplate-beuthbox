const mongoose = require('mongoose');

//example Schema
var videoBauchBindenSchema = new mongoose.Schema({
    created: {type: Date, default: Date.now},
    videoId: {type: String, required: true},
    bauchbinden: [{
        img: {type: String}, //relative path to image
        title: {type: String},
        subtitle: {type: String},
        startTime: {type: String}, // start time for fading lower third in (e.g. 04:04)
        endTime: {type: String} 
    }]

});


//put schema into model
module.exports = mongoose.model('Bauchbinde', videoBauchBindenSchema);