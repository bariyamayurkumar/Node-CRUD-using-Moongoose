var express = require('express');
var mongoose = require('mongoose');
var app = new express();
var database = require('./config/database');
var bodyparser = require('body-parser'); // pull information from HTML post

var port = process.env.PORT || 8888;

//app.use(bodyparser.urlencoded({'extended':'true'}));
app.use(bodyparser.json());
var Employee = require('./model/employee');
mongoose.connect(database.url);
console.log('App listning on port:'+ port);

//save
app.post('/api/employees/save',(req,res) => {
    var newemp = new Employee({
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    });
    newemp.save().then((data)=>{
            res.send(data);
        })
        .catch((err)=>{
        console.log("catch");
        res.status(404).send(err);
    })
});

//find all
/*
app.get('/api/employees', (req,res) => {
    Employee.find().then((data)=>{
        res.send(data);
    }).catch((err) =>{
        res.status(400).send(err);
    })
});*/

/*
 //find specifc simple
app.get('/api/employees', (req,res) => {

    Employee.find({name:'ramjs'}).then((data)=>{
        res.send(data);
    }).catch((err) =>{
        res.status(400).send(err);
    })
});
*/
// find complex

//find specifc simple
app.get('/api/employees', (req,res) => {

    var query = {
        //1 $or: [{name: 'mayur'},{salary:108}]
        //2  $and: [{name: 'yadav'},{salary:500}]
        //3  {name: 'mayur'}
        //  name:'ramjs'
        //5  salary: {$in:[500,105] }
        //6 salary: {$gt: 450}
        //7 salary: {$not: {$gt:450}}

    }
    Employee.find(query).then((data)=>{
        res.send(data);
    }).catch((err) =>{
        res.status(400).send(err);
    })

});

//find by id
app.get('/api/employees/:empid', (req,res)=> {
    var id= req.params.empid;
    Employee.findById(id).then((data) =>  {
        res.send(data);
    }).catch((err)=> {
        console.log('my');
        res.status(400).send(err);
    });
});

//update
app.put('/api/employees/update', (req,res) => {
    //var id= req.params.empid;
    var query = {
       //1 $or: [{name: 'mayur'},{salary:108}]
       //2  $and: [{name: 'yadav'},{salary:500}]
       //3  {name: 'mayur'}
          name:'priya'
       //5  salary: {$in:[500,105] }
        //6 salary: {$gt: 450}
        //7 salary: {$not: {$gt:450}}
    }
    var newdata = {
        name: 'ramjs',
        salary: 500,
        age:32
    }
    // update first match record
   /* Employee.findOneAndUpdate(query,{ $set: newdata}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    }) */

   Employee.findByIdAndUpdate('5aa2719404d6392ce4ed01b9',newdata).then((data) => {
            res.send(data);
   }).catch((err)=> {
       res.send(err);
   })


    // update many record
   /* Employee.update(query,{ $set: newdata },{multi :true}).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    }) */
});

//remove
app.delete('/api/employees/delete',(req,res)=> {
    console.log('delete')
    // remove specific
   /* Employee.remove({age:32}).then((data) => {
       res.send(data);
    }).catch((err)=>{
       res.send(err);
    }); */
    // remove only first one
   /* Employee.findOneAndRemove({salary:500}).then((data) => {
        res.send(data);
    }).catch((err)=>{
        res.send(err);
    }); */

    Employee.findByIdAndRemove('5aa74fe7afc5532120129fb9').then((data)=>{
       res.send(data);
    }).catch((err)=>{
        res.send(err);
    })
});

app.listen(port);

