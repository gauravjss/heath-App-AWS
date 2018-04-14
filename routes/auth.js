var crypto = require('crypto');
var algorithm = 'aes-256-ctr',
    password = 'd1g1tA7';


function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

// This Method Facilitates Login for Patient
exports.loginPatient = function(req, res, next) {
    try {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }
        res.app.get('connection').query("select PM.Name, PM.Patient_Id ,PM.Patient_Key, PM.Email from patient_master PM  where PM.Email = ? and PM.Password = ? ", [username, encrypt(password)], function(err, rows, fields) {
            if (err) {
                console.error(err);
            }
            if (rows.length == 0) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid credentials"
                });
                return;
            } else {                
                res.json(rows[0]);
                return;
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
};

// This Method Facilitates Login for Patient
exports.loginProfessional = function(req, res, next) {
    try {

        var username = req.body.username || '';
        var password = req.body.password || '';
        
        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }

        var connection = res.app.get('connection');
        connection.beginTransaction(function(err) {
            if (err) {
                throw err;
            }

            // Checking Credentials
            connection.query("select * from professional_master PM  where PM.Email = ?", [username], function(err, rows, fields) {
                if (err) {
                    console.error(err);
                }
                if (rows.length == 0) {
                    res.status(401);
                    res.json({
                        "status": 401,
                        "message": "Invalid credentials"
                    });
                    return;
                }
                // Check for Account Locked
                connection.query("select PM.Is_Locked from professional_master PM  where PM.Email = ?", [username], function(err, result) {
                    if (err) {
                        return connection.rollback(function() {
                            throw err;
                        });
                    }
                   
                    if (result[0].Is_Locked == true) {
                        res.status(404);
                        res.json({
                            "status": 404,
                            "message": "Account is Locked"
                        });
                        return;
                    }

                    connection.query("select PM.Name, PM.Professional_Id, PM.Professional_Key , PM.Email , PM.Role from professional_master PM  where PM.Email = ? and PM.Password = ? ", [username, encrypt(password)], function(err, rows, fields) {
                        if (err) {
                            console.error(err);
                        }
                        if (rows.length == 0) {
                            checkLockProfessional(req, res, next);
                            res.status(401);
                            res.json({
                                "status": 401,
                                "message": "Invalid credentials"
                            });
                            return;
                        } else {
                           
                            res.json(rows[0]);
                            return;
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
};

// Check for Attempts
function checkLockProfessional(req, res, next) {
    try {
        var connection = res.app.get('connection');
        var username = req.body.username || '';
        var password = req.body.password || '';
       
        // Check for Attemps
        connection.query("select Password_Attempt from professional_master where Email = ?", [username], function(err, result) {
            if (err) {
                return connection.rollback(function() {
                    throw err;
                });
            }
            if (result[0].Password_Attempt > 2) {
                // Lock Account for 3 Wrong Attempts
                lockProfessional(req, res, next);
            }
            return;
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
}

// Lock the Professional Account.
function lockProfessional(req, res, next) {
    try {
        var connection = res.app.get('connection');
        var username = req.body.username || '';
       
        // Check for Account Locked
        connection.query("UPDATE professional_master SET Is_Locked = true where Email= ?", [username], function(err, result) {
            if (err) {
                return connection.rollback(function() {
                    throw err;
                });
            }
            connection.commit();
            return;
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
}

// Reset Attempts to 0.
exports.resetAttemptsProfessional = function(req, res, next) {

    try {

        var connection = res.app.get('connection');
        var username = req.body.username || '';
        
        // Reset Wrong Attempts
        connection.query("UPDATE professional_master SET Password_Attempt = 0 where Email= ?", [username], function(err, result) {
            if (err) {
                return connection.rollback(function() {
                    throw err;
                });
            }
            connection.commit();
            res.json({
                "status": 000,
                "message": "Success"
            });
            return;
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }

}

// Increase Attempts by 1.
exports.updateAttemptsProfessional = function(req, res, next) {

    try {
        var connection = res.app.get('connection');
        var username = req.body.username || '';
       
        connection.query("UPDATE professional_master SET Password_Attempt = Password_Attempt+1 where Email= ?", [username], function(err, result) {
            if (err) {
                return connection.rollback(function() {
                    throw err;
                });
            }
            connection.commit();
            res.json({
                "status": 000,
                "message": "Success"
            });
            return;
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
}