var mongoose = require('mongoose');

var vehiclecategoryschema = new mongoose.Schema({
    categoryid: Number,
    categoryname: String
})

module.exports = mongoose.model('vehicle_category', vehiclecategoryschema);