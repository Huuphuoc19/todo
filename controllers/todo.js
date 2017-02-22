var express = require('express');
var router = express.Router();
var domain = "http://localhost:3000/";


// shorten model from models dir
var todoModel = require('../models/todo.js');

// get all task by cat id
// {"cat_id":1,"limit":-1}
// return array of data
router.post('/getalltask',function(req,res){
	var catId = req.body.cat_id;
	var limit = req.body.limit;
	// params 
	catId = parseInt(catId);
	limit = parseInt(limit);
	todoModel.getTasksByCatId(catId,limit,function(err,data){
		// error
		var resData = {
			result: -1,
			data: null
		}
		if(err){
			console.log("---GET TASK ERROR: ");
			console.log(err);	
		}else{
			resData.data = data;
			resData.result = 1;
		}
		res.send(JSON.stringify(resData));
	})
})

// get all task by cat id
// {"limit":-1}
// return array data
router.post('/getallcategories',function(req,res){
	var limit = req.body.limit;
	// params 
	limit = parseInt(limit);
	todoModel.getAllCategories(limit,function(err,data){
		// error
		var resData = {
			result: -1,
			data: null
		}
		if(err){
			console.log("---GET CATEGORIES ERROR: ");
			console.log(err);		
		}else{
			resData.data = data;
			resData.result = 1;
		}
		res.send(JSON.stringify(resData));
	})
})

// create cat 
// {"title":"test"}
// return id of new rows
router.post('/createcat',function(req,res){
	var cat = req.body;
	// insert model
	todoModel.insertCategory(cat,function(err,data){
		// error
		var resData = {
			result: -1,
			data: null
		}
		if(err){
			console.log("---INSERT CAT ERROR: ")
			console.log(err);
		}else{
			resData.result = 1;
			resData.data = data;
		}
		res.send(JSON.stringify(resData));
	})
})

// create cat
// {"title":"test","description":"test","cat_id":1}
// return id of new row
router.post('/createtask',function(req,res){
	var task = req.body;
	task.state_id = 1; // default initial is todo
	// insert model
	todoModel.insertTask(task,function(err,data){	
		// error
		var resData = {
			result: -1,
			data: null
		}
		if(err){
			console.log("---INSERT TASK ERROR: ");
			console.log(err);
		}else{
			resData.result = 1;
			resData.data = data;
		}
		res.send(JSON.stringify(resData));
	})
})

// delete task by id
// {"task_id":1}
// return rows effect
router.post('/deletetaskbyid',function(req,res){
	var idTask = req.body.task_id;
	idTask = parseInt(idTask);
	// insert model
	todoModel.deleteTaskById(idTask,function(err,data){
		
		// error
		var resData = {
			result: -1,
			data: null
		}
		if(err){
			console.log("---DELETE TASK ERROR: ");
			console.log(err);
		}else{
			resData.result = 1;
			resData.data = data;
		}
		res.send(JSON.stringify(resData));
	})
})

// delete cat by id 
// {"cat_id":1}
// return row effect
router.post('/deletecatbyid',function(req,res){
	var idCat = req.body.cat_id;
	idCat = parseInt(idCat);
	// insert model
	// check if cat has task
	todoModel.getTasksByCatId(idCat,1,function(err,dataTask){
		// error
		var resData = {
			result: -1,
			data: null
		}
		if(err){
			console.log("---GET TASK ERROR: ");
			console.log(err);	
		}else{
			// don't have task in this category
			if(dataTask.length ==  0){
				console.log(1);
				todoModel.deleteCatById(idCat,function(err,data){		
					if(err){
						console.log("---DELETE CATEGORIES ERROR: ");
						console.log(err);
					}else{
						// 
						resData.result = 1;
						resData.data = data;
					}
					res.send(JSON.stringify(resData));
					return;
				})
			}else{
				res.send(JSON.stringify(resData));
			}			
		}
	})
})

// delete cat by id 
// {"task_id":1,"state":2}
// return row effect
router.post('/updatetaskstate',function(req,res){
	var idCat = req.body.task_id;
	var state = req.body.state;
	idCat = parseInt(idCat);
	state = parseInt(state);
	todoModel.updateTaskState(idCat,state,function(err,data){
		// error
		var resData = {
			result: -1,
			data: null
		}
		if(err){
			console.log("---UPDATE TASK STATE ERROR: ");
			console.log(err);	
		}else{
			
			resData.result = 1; // for can't delete
			resData.data = data;
		}
		res.send(JSON.stringify(resData));
	})
})

module.exports = router;