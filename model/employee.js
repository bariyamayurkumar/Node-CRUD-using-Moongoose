var mongoose = require('mongoose');

EmpSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    salary: Number,
    age: Number
});

module.exports = mongoose.model('Employee',EmpSchema);