const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Remedial_Assignment',{
    useNewUrlParser:true
}).then(()=>{
    console.log("successfully connected");
}).catch(err=>{
    console.log("Something went wrong");
    process.exit();
})