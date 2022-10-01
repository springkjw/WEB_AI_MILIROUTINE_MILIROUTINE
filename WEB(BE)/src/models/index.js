const db = require('../db/config');

const user =  {
	get :  async(userID)=>{
		return new Promise(function(resolve,reject){
			db.query('SELECT * FROM member WHERE id=?', userID, function(err, rows, fields){
				if(err) {console.log(err);}
				resolve(rows);
			});
		});
	},
	
	add : async(userID, values)=>{
		db.query('INSERT INTO member (id,pw,email,salt,name,unit) VALUES (?, ?, ?, ?, ?, ?)', values , function(err,rows, fields){
				if(err) {
					console.log(err);
				}
			});
	}
}

module.exports = {user};