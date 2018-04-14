var jwt = require('jwt-simple');
var crypto = require('crypto');
var algorithm = 'aes-256-ctr', password= 'd1g1tA7';

// Used to Check Professional Email ID
exports.checkEmailIDProfessional = function(req, res) {
try{
	var emailId = req.body.email;
	console.log('checkEmailIDProfessional: email :' + emailId);
	var connection = res.app.get('connection');
			connection.query("select Email from professional_master where Email = ? ", [emailId], function(err, rows, fields) {
				if (err) {
					return connection.rollback(function() {
						throw err;
					});
				}
				if (rows.length > 0) {
					res.json({
						"status": 401,
						"message": "Email Id Already Exists"
					});
					return;
				}else{
					res.json({
						"status": 0,
						"message": "Success"
					});
				}
            });				
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}


// Used to Register Professional
exports.registerProfessionalHelpdesk = function(req, res) {

	var reqObj = req.body;
	var password = 'allowme';
	var professionalKey = '';

	console.log('registerProfessionalHelpdesk: name :' + reqObj.name);
	console.log('registerProfessionalHelpdesk: dob :' + reqObj.dob);
	console.log('registerProfessionalHelpdesk: gender :' + reqObj.gender);
	console.log('registerProfessionalHelpdesk: role :' + reqObj.role);
	console.log('registerProfessionalHelpdesk: phone :' + reqObj.phone);
	console.log('registerProfessionalHelpdesk: email :' + reqObj.email);
	console.log('registerProfessionalHelpdesk: address :' + reqObj.address);
	console.log('registerProfessionalHelpdesk: qualification :' + reqObj.qualification);
	console.log('registerProfessionalHelpdesk: speciality :' + reqObj.speciality);
	console.log('registerProfessionalHelpdesk: consultationFee :' + reqObj.consultationFee);
	console.log('registerProfessionalHelpdesk: chatFee :' + reqObj.chatFee);
	console.log('registerProfessionalHelpdesk: availability :' + reqObj.availability);
	console.log('registerProfessionalHelpdesk: bankName :' + reqObj.bankName);
	console.log('registerProfessionalHelpdesk: bankCode :' + reqObj.bankCode);
	console.log('registerProfessionalHelpdesk: chatId :' + reqObj.chatId);


	var connection = res.app.get('connection');
	try {
		connection.beginTransaction(function(err) {
			if (err) {
				throw err;
			}
			connection.query("select Email from professional_master where Email = ? ", [reqObj.email], function(err, rows, fields) {
				if (err) {
					return connection.rollback(function() {
						throw err;
					});
				}
				if (rows.length > 0) {
					res.status(401);
					res.json({
						"status": 401,
						"message": "Email Id Already Exists"
					});
					return;
				}
				var insertSql = "INSERT INTO professional_master SET ?";
				var insertValues = {
					"Name": reqObj.name,
					"Role": reqObj.role,
					"Phone": reqObj.phone,
					"Email": reqObj.email,
					"Password": encrypt(password),
					"Gender": reqObj.gender,
					"Chat_Id": reqObj.chatId
				};
				connection.query(insertSql, insertValues, function(err, result) {
					if (err) {
						return connection.rollback(function() {
							throw err;
						});
					}
					console.log(result);
					professionalKey = result.insertId;
					var insertSql = "INSERT INTO professional_details SET ?";
					var insertValues = {
						"Professional_Key": professionalKey,
						"Speciality": reqObj.speciality,
						"Qualification": reqObj.qualification,
						"Consultation_Fee": reqObj.consultationFee,
						"Chat_Fee": reqObj.chatFee,
						"Availability": JSON.stringify(reqObj.availability),
						"Address": JSON.stringify(reqObj.address),
						"Bank_Name": reqObj.bankName,
						"Bank_Code": reqObj.bankCode
					};
					connection.query(insertSql, insertValues, function(err, result) {
						if (err) {
							return connection.rollback(function() {
								throw err;
							});
						}
						connection.commit(function(err) {
							if (err) {
								return connection.rollback(function() {
									throw err;
								});
							}
							res.json({"Professional_Key":result.insertId});							
						});
					});
				});
			});
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
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

exports.getAllProfessionalData =  function(req, res) {
try{
	var connection = res.app.get('connection');
			connection.query("select PM.Name, PM.Gender, PM.Role, PM.Professional_Key, PD.Qualification, PD.Speciality from professional_master PM, professional_details PD where PM.Professional_Key = PD.Professional_Key ",null, function(err, rows, fields){
				if(err){
					return connection.rollback(function(){
					throw err;
					});
				}			
				var professionalList = [];					
                for(var proIndex = 0 ; proIndex < rows.length; proIndex++)
                {
                    var proObj = {};				
                    proObj = rows[proIndex];		
                    professionalList.push(proObj);
                }
                res.json(professionalList);		
            });				
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}