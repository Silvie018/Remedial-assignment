var mongoose = require('mongoose');

var vehicle = require('../models/vehicle');
var vehiclecategory = require('../models/vehiclecategory');

exports.list = (req,res) => {
    vehicle.find({}).exec(function(err, vehicles){
        if(err)
            throw err;
        vehiclecategory.find({}).exec(function(err, vehiclecategorys){
            if(err)
                throw err;
            else
                console.log(vehicles);
                res.render("../views/index", {data : vehicles, cate : vehiclecategorys});
        });
    });
};   

exports.create = function(req,res){
	vehiclecategory.find({}).exec(function(err,vehiclecategorys){
		if(err)
			throw err;
		else
			res.render("../views/create",{cate : vehiclecategorys});
	});
};

exports.save = function(req,res){
	var upfilename=req.file.originalname;
    if(!req.body.vehicleid) {
        return res.status(400).send({
            message: "Vehicle ID can not be empty"
        });   }
    var file = req.file
      if (!file) {
      var error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    var v1 = new vehicle({
        vehicleId: req.body.vehicleid ,
        vehiclebrand: req.body.vehiclebrand, 
        categoryid:req.body.categoryid, 
        vehiclepicture:upfilename,
        price:req.body.price,
        deperciation:req.body.deperciation,
        numberofyears:req.body.numberofyears,
        totalprice:req.body.totalprice
    });

	console.log(v1);

    //Save student in the database
    v1.save()
    .then(data => {
      //  res.send(data);
        res.redirect("/vehicle");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Vehicle."
        });
    });
};

exports.findOne = (req, res) => {
    vehicle.findById(req.params.vehicleid)
    .then(vehicle => {
        if(!vehicle) {
            return res.status(404).send({
                message: "Vehicle not found with id " + req.params.vehicle
            });            
        }
		else
		res.render('EditVehicle.ejs', { result : vehicle })
        
        //res.send(stud);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params.vehicle
            });                
        }
        return res.status(500).send({
            message: "Error retrieving vehicle with id " + req.params.vehicle
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.vehiclebrand) {
        return res.status(400).send({
            message: "vehiclebrand cannot can not be empty"
        });
    }

    // Find a student identified by the rno(_id) in the request
    vehicle.findByIdAndUpdate(req.body.vehicleId, {
        
        vehicleId: req.body.vehicleId ,
        vehiclebrand: req.body.vehiclebrand,  
        price:req.body.price,
        deperciation:req.body.deperciation,
        numberofyears:req.body.numberofyears,
        totalprice:req.body.totalprice
    }, {new: true})
    .then(v1 => {
        if(!v1) {
            return res.status(404).send({
                message: "vehicle not found with id " + req.body.vehicleId
            });
        }
        res.redirect("/vehicle");
        //res.send(s1);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "vehicle not found with id " + req.body.vehicleId
            });                
        }
        return res.status(500).send({
            message: "Error updating vehicle with id " + req.params.vehicleId
        });
    });
};

exports.delete = (req, res) => {
    vehicle.findByIdAndRemove(req.params.vehicleid)
    .then(vehicle => {
        if(!vehicle) {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params.vehicleid
            });
        }
        res.redirect("/vehicle");
        //res.send({message: "student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "vehicle not found with id " + req.params.vehicleid
            });                
        }
        return res.status(500).send({
            message: "Could not delete vehicle with id " + req.params.vehicleid
        });
    });
};