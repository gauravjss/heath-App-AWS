/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , auth = require('./routes/auth')
  , registration = require('./routes/registration')
  , patientManager = require('./routes/patientManager') 
  , professionalManager = require('./routes/professionalManager') 
  , patientManagerHelpdesk = require('./routes/patientManagerHelpdesk') 
  , professionalManagerHelpdesk = require('./routes/professionalManagerHelpdesk')
  , chatManagerHelpdesk = require('./routes/chatManagerHelpdesk')
  , healthProfile = require('./routes/healthProfile')
  , appointmentManager = require('./routes/scheduleAppointment')
  , adheranceManager = require('./routes/adheranceManager')
  , user = require('./routes/user')
  , hike = require('./routes/hike')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql')
  , async = require('async')
  , cors = require('cors')
  , bodyParser = require('body-parser');

var app = express();


app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"); 
  next();
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cors());
});


app.configure('development', function() {
  console.log('Using development settings.');
  app.set('connection', mysql.createConnection({
    host: 'aa10qbzke1jk3yp.cxgqc3vzpduv.us-east-1.rds.amazonaws.com',
    user: 'connhealthappdb',
    password: 'allowmeebdb',
    port: '3306',
    database:'ebdb'}));
  app.use(express.errorHandler());
});


/*
app.configure('development', function() {
  console.log('Using development settings.');
  app.set('connection', mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: '3306',
    database:'otpoc'}));
  app.use(express.errorHandler());
});*/

function init() {
  app.get('/', routes.index);
  app.post('/healthApp/v1/loginPatient',bodyParser.json(), auth.loginPatient);
  app.post('/healthApp/v1/generateOTP',bodyParser.json(), registration.generateOTP); 
  app.post('/healthApp/v1/verifyOTP',bodyParser.json(), registration.verifyOTP);  

  app.post('/healthApp/v1/loginProfessional',bodyParser.json(), auth.loginProfessional);
  app.post('/healthApp/v1/resetAttemptsProfessional',bodyParser.json(), auth.resetAttemptsProfessional);
  app.post('/healthApp/v1/updateAttemptsProfessional',bodyParser.json(), auth.updateAttemptsProfessional);
  
  // Obselete 

  app.post('/healthApp/v1/getPatientData',bodyParser.json(), patientManager.getPatientData);
  app.post('/healthApp/v1/getBPAverageData',bodyParser.json(), patientManager.getBPAverageData);  
  app.post('/healthApp/v1/getAllBPData',bodyParser.json(), patientManager.getAllBPData);  
  app.post('/healthApp/v1/getAverageGlucoseData',bodyParser.json(), patientManager.getAverageGlucoseData);
  app.post('/healthApp/v1/getAllGlucoseData',bodyParser.json(), patientManager.getAllGlucoseData);  

  // Reports in myPatientsApp.
  app.post('/healthApp/v1/getBPMData',bodyParser.json(), patientManager.getBPMData);  
  app.post('/healthApp/v1/getBloodGlucoseData',bodyParser.json(), patientManager.getBloodGlucoseData); 
  app.post('/healthApp/v1/getWeightData',bodyParser.json(), patientManager.getWeightData);
  app.post('/healthApp/v1/getHeightData',bodyParser.json(), patientManager.getHeightData); 
  app.post('/healthApp/v1/getProfessionalData',bodyParser.json(), patientManager.getProfessionalData); 
  app.post('/healthApp/v1/getSelectedPatientData',bodyParser.json(), patientManager.getSelectedPatientData);
  app.post('/healthApp/v1/addCreditCard',bodyParser.json(), patientManager.addCreditCard);

  app.post('/healthApp/v1/getProfessionalList',bodyParser.json(), professionalManager.getProfessionalList);
  app.post('/healthApp/v1/getSelectedProfessionalData',bodyParser.json(), professionalManager.getSelectedProfessionalData);

  // Helpdesk Chat Manager
  app.post('/healthApp/v1/createAssignRequest',bodyParser.json(), chatManagerHelpdesk.createAssignRequest);  
  app.post('/healthApp/v1/approveAssignRequest',bodyParser.json(), chatManagerHelpdesk.approveAssignRequest);
  app.post('/healthApp/v1/getPendingAssignments',bodyParser.json(), chatManagerHelpdesk.getPendingAssignments);
  app.post('/healthApp/v1/getAllProfessionals',bodyParser.json(), chatManagerHelpdesk.getAllProfessionals);
  app.post('/healthApp/v1/getAllPatients',bodyParser.json(), chatManagerHelpdesk.getAllPatients);
  
  // Helpdesk Patient Manager
  app.post('/healthApp/v1/getAllPatientData',bodyParser.json(), patientManagerHelpdesk.getAllPatientData);  
  app.post('/healthApp/v1/registerPatientHelpdesk',bodyParser.json(), patientManagerHelpdesk.registerPatientHelpdesk);
  app.post('/healthApp/v1/updatePatientHelpdesk',bodyParser.json(), patientManagerHelpdesk.updatePatientHelpdesk);  
  app.post('/healthApp/v1/assignNurseHelpdesk',bodyParser.json(), patientManagerHelpdesk.assignNurseHelpdesk);  
  app.post('/healthApp/v1/getAllNurses',bodyParser.json(), patientManagerHelpdesk.getAllNurses); 
  app.post('/healthApp/v1/viewSelectedPatientDetail',bodyParser.json(), patientManagerHelpdesk.viewSelectedPatientDetail); 
  app.post('/healthApp/v1/getAssignedNurse',bodyParser.json(), patientManagerHelpdesk.getAssignedNurse); 
  app.post('/healthApp/v1/checkEmailIDPatient',bodyParser.json(), patientManagerHelpdesk.checkEmailIDPatient); 
  
  // Helpdesk Professional Manager
  app.post('/healthApp/v1/registerProfessionalHelpdesk',bodyParser.json(), professionalManagerHelpdesk.registerProfessionalHelpdesk);
  app.post('/healthApp/v1/getAllProfessionalData',bodyParser.json(), professionalManagerHelpdesk.getAllProfessionalData);
  app.post('/healthApp/v1/checkEmailIDProfessional',bodyParser.json(), professionalManagerHelpdesk.checkEmailIDProfessional);

  // Helpdesk Health Data Entry for Patients
  app.post('/healthApp/v1/insertHeightWeight',bodyParser.json(), healthProfile.insertHeightWeight); 
  app.post('/healthApp/v1/insertWeightRecord',bodyParser.json(), healthProfile.insertWeightRecord); 
  app.post('/healthApp/v1/insertHeartRate',bodyParser.json(), healthProfile.insertHeartRate); 
  app.post('/healthApp/v1/insertBloodGlucose',bodyParser.json(), healthProfile.insertBloodGlucose); 
  app.post('/healthApp/v1/insertBloodPressure',bodyParser.json(), healthProfile.insertBloodPressure); 

  // Helpdesk Health Data Fetching for Patients
  app.post('/healthApp/v1/getHeightAdmin',bodyParser.json(), healthProfile.getHeightAdmin); 
  app.post('/healthApp/v1/getWeightAdmin',bodyParser.json(), healthProfile.getWeightAdmin); 
  app.post('/healthApp/v1/getBPAdmin',bodyParser.json(), healthProfile.getBPAdmin);
  app.post('/healthApp/v1/getGlucoseAdmin',bodyParser.json(), healthProfile.getGlucoseAdmin);  
  app.post('/healthApp/v1/getBPMAdmin',bodyParser.json(), healthProfile.getBPMAdmin); 

  app.post('/healthApp/v1/scheduleAppointment',bodyParser.json(), appointmentManager.scheduleAppointment); 
  app.post('/healthApp/v1/cancelAppointment',bodyParser.json(), appointmentManager.cancelAppointment); 
  app.post('/healthApp/v1/getAppointments',bodyParser.json(), appointmentManager.getAppointments);
  app.post('/healthApp/v1/getAppointmentDetails',bodyParser.json(), appointmentManager.getAppointmentDetails);     
  app.post('/healthApp/v1/getPatientAppointments',bodyParser.json(), appointmentManager.getPatientAppointments);
  app.post('/healthApp/v1/getPatientAppAppointments',bodyParser.json(), appointmentManager.getPatientAppAppointments);
  app.post('/healthApp/v1/getProfessionalAppointmentDetails',bodyParser.json(), appointmentManager.getProfessionalAppointmentDetails); 

  app.post('/healthApp/v1/getAllDrugDetails',bodyParser.json(), adheranceManager.getAllDrugDetails);
  app.post('/healthApp/v1/createReminder',bodyParser.json(), adheranceManager.createReminder);  
  app.post('/healthApp/v1/getUpcomingReminders',bodyParser.json(), adheranceManager.getUpcomingReminders);
  app.post('/healthApp/v1/deleteReminder',bodyParser.json(), adheranceManager.deleteReminder); 
  app.post('/healthApp/v1/updateReminder',bodyParser.json(), adheranceManager.updateReminder); 
  app.post('/healthApp/v1/putAdherance',bodyParser.json(), adheranceManager.putAdherance); 
  app.post('/healthApp/v1/getAdheranceStatus',bodyParser.json(), adheranceManager.getAdheranceStatus); 

  app.get('/users', user.list);
  app.get('/hikes', hike.index);
  app.post('/add_hike', hike.add_hike);

  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
  
}

var client = app.get('connection');
async.series([
  function connect(callback) {
    client.connect(callback);
  },
  function use_db(callback) {
    client.query('USE ebdb', callback);
  }
], function (err, results) {
  if (err) {
    console.log('Exception initializing database.');
    throw err;
  } else {
    console.log('Database initialization complete.');
    init();
  }
});