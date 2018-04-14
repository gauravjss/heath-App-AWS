var jwt = require('jwt-simple');
var crypto = require('crypto');
var algorithm = 'aes-256-ctr', password= 'd1g1tA7';

/*
 * GET Home Page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Innovation Labs' });
};

// Used for New Patient Registration
exports.registerPatient =  function(req, res) {
try{
var reqObj = req.body;  	 
var connection = res.app.get('connection');

	  	connection.beginTransaction(function(err){
			if(err) {throw err;}
			connection.query("select Email from patient_master where Email = ? ",
			 [reqObj.email], function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				if(rows.length > 0)
				{
					res.status(401);
					res.json({
					"status": 401,
					"message" : "Email Id Already Exists"
					});
					return;
				}			
				var insertSql = "INSERT INTO patient_master SET ?";
				var insertValues = {
			    "Patient_Id": reqObj.patientId,
				"Name": reqObj.name,
				"Phone":reqObj.phone,
				"Email":reqObj.email,
				"Password": encrypt(reqObj.password)
				};
			    connection.query(insertSql, insertValues, function (err, result){
				if(err) {
					return connection.rollback(function(){
					throw err;
					});
				}				
				connection.commit(function(err){
					if(err){
						return connection.rollback(function(){
					throw err;
					});
					}		
				res.json({"affectedRows":result});
				});
				});			
			});
			});	
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

// Used for New Patient Registration
exports.registerProfessional =  function(req, res) {
try{
var reqObj = req.body;
var profId = reqObj.professionalId;
if(profId == ''){	
	profId = 'DO NOT COMPARE';
}  	 
console.log(profId);
var connection = res.app.get('connection');
	  	connection.beginTransaction(function(err){
			if(err) {throw err;}
			connection.query("select Email from professional_master where Email = ? ",
			 [reqObj.email], function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				if(rows.length > 0)
				{
					res.status(401);
					res.json({
					"status": 401,
					"message" : "Email Id Already Exists"
					});
					return;
				}
			    connection.query("select Professional_Id from professional_master where Professional_Id = ? ",
			    [profId], function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				if(rows.length > 0)
				{
					res.status(402);
					res.json({
					"status": 402,
					"message" : "Professional Id Already Exists"
					});
					return;
				}
				var insertSql = "INSERT INTO professional_master SET ?";
				var insertValues = {
			    "Professional_Id": reqObj.professionalId,
				"Name": reqObj.name,
				"Phone":reqObj.phone,
				"Email":reqObj.email,
				"Role":reqObj.role,	
				"Clinic_Id":reqObj.clinicId,			
				"Password": encrypt(reqObj.password)
				};
			    connection.query(insertSql, insertValues, function (err, result){
				if(err) {
					return connection.rollback(function(){
					throw err;
					});
				}				
				connection.commit(function(err){
					if(err){
						return connection.rollback(function(){
					throw err;
					});
					}		
				res.json({"affectedRows":result});
				});
				});
			});
			});
			});	
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}


function encrypt(text){
	var cipher = crypto.createCipher(algorithm, password);
	var crypted = cipher.update(text, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}

function decrypt(text){
	var decipher = crypto.createDecipher(algorithm, password);
	var dec = decipher.update(text, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
}