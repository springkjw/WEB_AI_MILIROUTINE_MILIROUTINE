const data = require('../models/index');
const jwt = require('../token/jwt');

const maxStep = 5;

const user = {
	isToken : (req, res) => {
		try{
			if(req.headers.authorization && req.headers.authorization.split(' ')[1]){
				return true;
			}

			else{
				return false;
			}
		}
		
		catch(err){
			console.log(err);
			return false;
		}
		
	}
}

const routine = {
	outputPopular : (req, res) => {
		
	} 
}

module.exports = {
	routine
}