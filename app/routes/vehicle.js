module.exports = (app) => {
    var vehicle = require('../controllers/vehicleC');
    var multer=require('multer');
    var path=require('path');

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
         // console.log(file);
         // cb(null, file.fieldname + '-' + Date.now())
         cb(null,  file.originalname)
        }
      })
       
    var upload = multer({ storage: storage })

    // Get all employees
   app.get('/vehicle', function(req, res) {
    vehicle.list(req, res);
  });

   app.get('/create', function(req, res) {
     vehicle.create(req, res);
   });

  app.post('/save', upload.single('myImage'),vehicle.save);

  app.get('/searchvehicle/:vehicleid', vehicle.findOne);

  app.post('/updatevehicle', vehicle.update);

  app.get('/deletevehicle/:vehicleid', vehicle.delete);


}