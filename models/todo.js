var conn = require('./dao.js');

module.exports = {

	// insert cat to database
	insertCategory: function(dataObject,done){

		// use transaction for insert
		conn.beginTransaction(function(err) {
			if(err){
				done(err, null);
				return;
			}
			conn.query({
				sql : 'insert into `categories` set ?',
				values: [dataObject]
			},function (error, results, fields){
				// error insert
				if(error){
					return conn.rollback(function(){
						done(error,null);
						return;
					})
				}else{
					conn.commit(function(err){
						// error commit
						if(err){
							return conn.rollback(function(){
								done(error,null);
								return;
							})
						}else{
							console.log("---INSERTED CATEGORIES: ");
							console.log("Time: " + Date());
							console.log(dataObject);
							done(null, results.insertId);
						}
					})
				} // end else 
			}) // end query
		}) // end transaction
	},//

	// insert tasks to database
	insertTask: function(dataObject,done){

		// use transaction for insert
		conn.beginTransaction(function(err) {
			if(err){
				done(err, null);
				return;
			}
			conn.query({
				sql : 'insert into `tasks` set ?',
				values: [dataObject]
			},function (error, results, fields){
				// error insert
				if(error){
					return conn.rollback(function(){
						done(error,null);
						return;
					})
				}else{
					conn.commit(function(err){
						// error commit
						if(err){
							return conn.rollback(function(){
								done(error,null);
								return;
							})
						}else{
							console.log("---INSERTED TASK: ");
							console.log("Time: " + Date());
							console.log(dataObject);
							done(null, results.insertId);
						}
					})
				} // end else 
			}) // end query
		}) // end transaction
	},//

	// get all task by id cat with limit
	getTasksByCatId: function(catId,limit,done){
		var lm = (limit == -1) ? "" : "limit " + limit;
		conn.query({
			sql : 'select * from `tasks` where `cat_id` = ? order by `id` desc ' + lm,
			values: [catId]
		},function(error,results, fields){
			if(error){
				done(error,null);
				return;
			}else{
				console.log("---GET ALL TASK: ");
				console.log("Time: " + Date());
				console.log(results);
				done(null, results);
			}
		})
	},

	// get all categories
	getAllCategories: function(limit,done){
		var lm = (limit == -1) ? "" : "limit " + limit;
		conn.query({
			sql : 'select * from `categories` order by `id` desc ' + lm,
		},function(error,results, fields){
			if(error){
				done(error,null);
				return;
			}else{
				console.log("---GET ALL CATEGORIES: ");
				console.log("Time: " + Date());
				console.log(results);
				done(null, results);
			}
		})
	},

	// insert tasks to database
	deleteTaskById: function(idTask,done){
		// use transaction for insert
		conn.beginTransaction(function(err) {
			if(err){
				done(err, null);
				return;
			}
			conn.query({
				sql : 'delete from `tasks` where `id` = ?',
				values: [idTask]
			},function (error, results, fields){
				// error insert
				if(error){
					return conn.rollback(function(){
						done(error,null);
						return;
					})
				}else{
					conn.commit(function(err){
						// error commit
						if(err){
							return conn.rollback(function(){
								done(error,null);
								return;
							})
						}else{
							console.log("---DELETED TASK: ");
							console.log("Time: " + Date());
							console.log(results);
							done(null, results.affectedRows);
						}
					})
				} // end else 
			}) // end query
		}) // end transaction
	},//

	// insert tasks to database
	deleteCatById: function(idCat,done){
		// use transaction for insert
		conn.beginTransaction(function(err) {
			if(err){
				done(err, null);
				return;
			}
			conn.query({
				sql : 'delete from `categories` where id = ?',
				values: [idCat]
			},function (error, results, fields){
				// error insert
				if(error){
					return conn.rollback(function(){
						done(error,null);
						return;
					})
				}else{
					conn.commit(function(err){
						// error commit
						if(err){
							return conn.rollback(function(){
								done(error,null);
								return;
							})
						}else{
							console.log("---DELETED CATEGORIES: ");
							console.log("Time: " + Date());
							console.log(results);
							done(null, results.affectedRows);
						}
					})
				} // end else 
			}) // end query
		}) // end transaction
	},//

	// insert tasks to database
	updateTaskState: function(idTask,state,done){
		// use transaction for insert
		conn.beginTransaction(function(err) {
			if(err){
				done(err, null);
				return;
			}
			conn.query({
				sql : 'UPDATE `tasks` SET `state_id` = ? WHERE `id` = ?',
				values: [state,idTask]
			},function (error, results, fields){
				// error insert
				if(error){
					return conn.rollback(function(){
						done(error,null);
						return;
					})
				}else{
					conn.commit(function(err){
						// error commit
						if(err){
							return conn.rollback(function(){
								done(error,null);
								return;
							})
						}else{
							console.log("---UPDATE TASK STATE: ");
							console.log("Time: " + Date());
							console.log(results);
							done(null, results.affectedRows);
						}
					})
				} // end else 
			}) // end query
		}) // end transaction
	},//


}

