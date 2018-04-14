var jwt = require('jwt-simple');
var crypto = require('crypto');
var algorithm = 'aes-256-ctr', password= 'd1g1tA7';

// Webservice to Generate OTP and send to Customer's Mobile Number
exports.generateOTP = function(req, res) {
 try {
  var mobileNumber = req.body.mobileNumber;
  console.log('generateOTP: mobileNumber :' + mobileNumber);
  var otpGenerated = Math.floor(Math.random() * 9000) + 1000;
  var now = new Date;
  var utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
  var connection = res.app.get('connection');
  connection.query("select * from otp_logger where Phone_Encrypted = ? ", [encrypt(mobileNumber.toString())], function(err, rows, fields) {
   if (err) {
    return connection.rollback(function() {
     throw err;
    });
   }
   if (rows.length > 0) {
    var updateSql = "UPDATE otp_logger SET ? where Phone_Encrypted = ?";
    var updateValues = {
     "Phone_Encrypted": encrypt(mobileNumber.toString()),
     "Otp_Encrypted": encrypt(otpGenerated.toString()),
     "Timestamp": utc_timestamp
    };
    var query = connection.query(updateSql, [updateValues, encrypt(mobileNumber.toString())], function(err, result) {
     if (err) throw err;
     res.json({
      "OTP_Generated": otpGenerated
     });
    });
   } else {
    var insertSql = "INSERT INTO otp_logger SET ?";
    var insertValues = {
     "Phone_Encrypted": encrypt(mobileNumber.toString()),
     "Otp_Encrypted": encrypt(otpGenerated.toString()),
     "Timestamp": utc_timestamp
    };
    var query = connection.query(insertSql, insertValues, function(err, result) {
     if (err) throw err;
     res.json({
      "OTP_Generated": otpGenerated
     });
    });
   }
  });
 } catch (ex) {
  console.error("Internal error:" + ex);
 }
}

// Webservice to Verify OTP and send the response codes accordingly
exports.verifyOTP = function(req, res, next) {
 try {
  var mobileNumber = req.body.mobileNumber;
  var otp = req.body.otp;
  console.log('verifyOTP: mobileNumber :' + mobileNumber);
  console.log('verifyOTP: otp :' + encrypt(otp.toString()));
  var connection = res.app.get('connection');
  connection.query("select * from otp_logger where Phone_Encrypted = ? ", [encrypt(mobileNumber.toString())], function(err, result) {
   if (err) {
    console.error(err);
   }
   var dbTimestamp = Number(result[0].Timestamp);
   var now = new Date;
   var utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
   var minutesGap = (utc_timestamp - dbTimestamp) / 60000;

   console.log('verifyOTP: minutesGap :' + minutesGap);
   /*console.log(encrypt(otp.toString()));
   console.log(result[0].Otp_Encrypted);*/
   if ((encrypt(otp.toString()) == (result[0].Otp_Encrypted)) && minutesGap > 10) {
    res.status(401);
    res.json({
     "status": 401,
     "message": "OTP Expired in 10 minutes"
    });
    return;
   } else if (!(encrypt(otp.toString()) == (result[0].Otp_Encrypted))) {
    res.status(404);
    res.json({
     "status": 404,
     "message": "OTP Invalid"
    });
    return;
   } else {
    res.json({
     "OTP": "Success"
    });
   }
  });
 } catch (ex) {
  console.error("Internal error:" + ex);
  return next(ex);
 }
};

// Used for New Patient Registration
exports.registerPatient = function(req, res) {
 try {
  var reqObj = req.body;
  var connection = res.app.get('connection');
  connection.beginTransaction(function(err) {
   if (err) {
    throw err;
   }
   connection.query("select Email from patient_master where Email = ? ", [reqObj.email], function(err, rows, fields) {
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
    var insertSql = "INSERT INTO patient_master SET ?";
    var insertValues = {
     "Patient_Id": reqObj.patientId,
     "Name": reqObj.name,
     "Phone": reqObj.phone,
     "Email": reqObj.email,
     "Password": encrypt(reqObj.password),
     "Chat_Id": reqObj.chatId
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
      res.json({
       "Patient_Key": result.insertId
      });
     });
    });
   });
  });
 } catch (ex) {
  console.error("Internal error:" + ex);

 }
}

// Used for New Patient Registration
exports.registerProfessional = function(req, res) {
 try {
  var reqObj = req.body;
  var profId = reqObj.professionalId;
  if (profId == '') {
   profId = 'DO NOT COMPARE';
  }
  console.log(profId);
  var connection = res.app.get('connection');
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
    connection.query("select Professional_Id from professional_master where Professional_Id = ? ", [profId], function(err, rows, fields) {
     if (err) {
      return connection.rollback(function() {
       throw err;
      });
     }
     if (rows.length > 0) {
      res.status(402);
      res.json({
       "status": 402,
       "message": "Professional Id Already Exists"
      });
      return;
     }
     var insertSql = "INSERT INTO professional_master SET ?";
     var insertValues = {
      "Professional_Id": reqObj.professionalId,
      "Name": reqObj.name,
      "Phone": reqObj.phone,
      "Email": reqObj.email,
      "Role": reqObj.role,
      "Clinic_Id": reqObj.clinicId,
      "Password": encrypt(reqObj.password),
      "Chat_Id": reqObj.chatId
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
       res.json({
        "affectedRows": result
       });
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