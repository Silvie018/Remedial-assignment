var mongoose = require('mongoose');

var vehicleschema = new mongoose.Schema({
    vehicleId: Number,
    vehiclebrand: String,
    categoryid: Number,
    vehiclepicture: String,
    price: Number,
    deperciation: Number,
    numberofyears: Number,
    totalprice:Number
})

module.exports = mongoose.model('vehicle_data', vehicleschema);