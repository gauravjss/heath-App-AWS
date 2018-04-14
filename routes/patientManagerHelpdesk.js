
var jwt = require('jwt-simple');
var crypto = require('crypto');
var algorithm = 'aes-256-ctr', password= 'd1g1tA7';

// Used to fetch All Patient Data
exports.getAllPatientData =  function(req, res) {
try{
	var connection = res.app.get('connection');
			connection.query("select PM.Name, PM.Gender, PM.Phone, Date_Format(PM.DOB,'%Y-%m-%d') AS DOB , PM.Patient_Key, PM.Blood_Group, PM.Rh_Factor from patient_master PM",null, function(err, rows, fields){
				if(err){
					return connection.rollback(function(){
					throw err;
					});
				}			
				var patientList = [];					
                for(var patIndex = 0 ; patIndex < rows.length; patIndex++)
                {
                    var patObj = {};				
                    patObj = rows[patIndex];
                    patObj.Age = calcAge(patObj.DOB);				
                    patientList.push(patObj);
                }
                res.json(patientList);		
            });				
		}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}


function calcAge(dateString) {
  var birthday = +new Date(dateString);
  return~~ ((Date.now() - birthday) / (31557600000));
}


// Used to Check Patient Email ID
exports.checkEmailIDPatient = function(req, res) {
try{
	var emailId = req.body.email;
	console.log('checkEmailIDProfessional: email :' + emailId);
	var connection = res.app.get('connection');
			connection.query("select Email from patient_master where Email = ? ", [emailId], function(err, rows, fields) {
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

// Used to Register Patient
exports.registerPatientHelpdesk =  function(req, res) {

    var reqObj = req.body;
    var password = 'allowme';
    console.log('registerPatientHelpdesk: name :' + reqObj.name);
    console.log('registerPatientHelpdesk: dob :' + reqObj.dob);
    console.log('registerPatientHelpdesk: gender :' + reqObj.gender);
    console.log('registerPatientHelpdesk: bloodGroup :' + reqObj.bloodGroup);
    console.log('registerPatientHelpdesk: rhFactor :' + reqObj.rhFactor);
    console.log('registerPatientHelpdesk: phone :' + reqObj.phone);
    console.log('registerPatientHelpdesk: email :' + reqObj.email);
    console.log('registerPatientHelpdesk: address :' + reqObj.address);
    console.log('registerPatientHelpdesk: problems :' + reqObj.problems);
    console.log('registerPatientHelpdesk: chatId :' + reqObj.chatId);

    
var connection = res.app.get('connection');
		var insertSql = "INSERT INTO patient_master SET ?";
		var insertValues = {
		"Name": reqObj.name,		
		"DOB":reqObj.dob,
		"Gender": reqObj.gender,
		"Blood_Group":reqObj.bloodGroup,
		"Rh_Factor":reqObj.rhFactor,
		"Phone":reqObj.phone,
		"Email":reqObj.email,
		"Chat_Id": reqObj.chatId,
		"Password": encrypt(password),
		"Address":JSON.stringify(reqObj.address),
		"Problems":JSON.stringify(reqObj.problems)	
		};
		try{
		var query = connection.query(insertSql, insertValues, function (err, result){
			if(err) throw err;			
			res.json({"Patient_Key":result.insertId});
		});
	}
	catch(err){
		console.log(err);
	}
		console.log(query.sql);		
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

// Used to Update Patient
exports.updatePatientHelpdesk =  function(req, res) {

	var reqObj = req.body;
	console.log('updatePatientHelpdesk: phone :' + reqObj.phone);
	console.log('updatePatientHelpdesk: email :' + reqObj.email);
	console.log('updatePatientHelpdesk: address :' + reqObj.address);
	console.log('updatePatientHelpdesk: problems :' + reqObj.problems); 
    
    var connection = res.app.get('connection');
		var insertSql = "UPDATE patient_master SET ? where Patient_Key= ?";
		var insertValues = {
		"Phone":reqObj.phone,
		"Email":reqObj.email,
		"Address":JSON.stringify(reqObj.address),
		"Problems":JSON.stringify(reqObj.problems)	
		};
		try{
		var query = connection.query(insertSql, [insertValues,reqObj.patientKey], function (err, result){
			if(err) throw err;			
			console.log(result);
			res.json({"_id":result});
		});
	}
	catch(err){
		console.log(err);
	}
		console.log(query.sql);		
}



// View the Details of the Selected Patient
exports.viewSelectedPatientDetail = function(req, res, next) {
    try {
        var patientKey = req.body.patientKey;
        console.log('viewSelectedPatientDetail: patientKey :' + patientKey);
        res.app.get('connection').query("select PM.Name, Date_Format(PM.DOB,'%d-%m-%Y') AS DOB , PM.Gender, PM.Blood_Group, PM.Rh_Factor, PM.Phone, PM.Email, PM.Address, PM.Problems from patient_master PM  where PM.Patient_Key = ? ", [patientKey], function(err, rows, fields) {
            if (err) {
                console.error(err);
            }     
            var patientIndex = 0;
			var patientObj = {};	
			if(rows.length>0){				
				patientObj.Name = rows[patientIndex].Name;
				patientObj.DOB = rows[patientIndex].DOB;					
				patientObj.Gender = rows[patientIndex].Gender;
				patientObj.Blood_Group = rows[patientIndex].Blood_Group;
				patientObj.Rh_Factor = rows[patientIndex].Rh_Factor;
				patientObj.Phone = rows[patientIndex].Phone;	
				patientObj.Email = rows[patientIndex].Email;
				console.log(rows[patientIndex].Address);
				if(rows[patientIndex].Address != '' && rows[patientIndex].Address != 'null' && rows[patientIndex].Address != ' '){
					patientObj.Address = JSON.parse(rows[patientIndex].Address);
				}else{
					patientObj.Address = rows[patientIndex].Address;
				}
				if(rows[patientIndex].Problems != '' && rows[patientIndex].Problems != 'null' && rows[patientIndex].Problems != ' '){
					patientObj.Problems = JSON.parse(rows[patientIndex].Problems);
				}else{
					patientObj.Problems = rows[patientIndex].Problems;
				}								
				res.json(patientObj);	
				}
				else{
				res.json(patientObj);	
				}		
			});     
        
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
}

// Used to Assign Professional to a Patient
exports.assignNurseHelpdesk =  function(req, res) {
var reqObj = req.body;
var connection = res.app.get('connection');

    console.log('assignNurseHelpdesk: patientKey :' + reqObj.patientKey);
    console.log('assignNurseHelpdesk: professionalKey :' + reqObj.professionalKey);
    
		// Inserting New Assignment
		var insertSql = "INSERT INTO patient_professional_mapping SET ?";
		var insertValues = {
		"Patient_Key": reqObj.patientKey,		
		"Professional_Key":reqObj.professionalKey,
		"Approved": 1	
		};
		var query = connection.query(insertSql, insertValues, function (err, result){
			if(err) throw err;			
			console.log(result);
			res.json({"Patient_Professional_Id":result.insertId});
		});
		console.log(query.sql);		
}

// Get List of Assigned Professionals for a PArticular Patient
exports.getAssignedNurse =  function(req, res) {
try{
	var reqObj = req.body;
	var connection = res.app.get('connection');
    console.log('getAssignedNurse: patientKey :' + reqObj.patientKey);    
			connection.query("select PM.Name, PM.Professional_Key from professional_master PM, patient_professional_mapping PPM  where PPM.Patient_Key= ? and PPM.Professional_Key =PM.Professional_Key and PPM.Is_Deleted=0 and PPM.Approved=1 ",reqObj.patientKey, function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				
				var nurseList = [];					
                for(var nurseIndex = 0 ; nurseIndex < rows.length; nurseIndex++)
                {
                    var nurseObj = {};				
                    nurseObj = rows[nurseIndex];				
                    nurseList.push(nurseObj);
                }
                res.json(nurseList);

			});           			
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

// Get List of All Professionals
exports.getAllNurses=  function(req, res) {
try{
	var connection = res.app.get('connection');
			connection.query("select Professional_Key, Name from professional_master where Role='N' OR Role='D' ",null, function(err, rows, fields){
				if(err)
				{
					return connection.rollback(function(){
					throw err;
					});
				}			
				var professionalList = [];					
                for(var patIndex = 0 ; patIndex < rows.length; patIndex++)
                {
                    var patObj = {};				
                    patObj = rows[patIndex];				
                    professionalList.push(patObj);
                }
                res.json(professionalList);		
            });				
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
}

