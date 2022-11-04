var express = require('express');
var path = require('path');
var ejs = require('ejs');

var app = express();

var multer=require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      console.log(file);
     cb(null,  file.originalname)
    }
  })
   
var upload = multer({ storage: storage })


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

app.use("/upload",express.static( path.join(__dirname, '/public/uploads')));

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome "});
});

var dbconfig = require('./config/db_config');
require('./app/routes/vehicle')(app);

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})