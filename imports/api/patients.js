import { Mongo } from 'meteor/mongo';
 
// patient_demographic is a collection with basic patient info 
export const Patients = new Mongo.Collection('patient_demographic');

// datasample_second is a collection with patient data samples (per second)
export const Datasample_second = new Mongo.Collection('datasample_second');

//assesment is a doctor/user generated assesment (as opposed to a system-generated assesment)
export const Assesment = new Mongo.Collection('assesment');



// Explicitly deny any writes in the patient_demographic collection. 
// This application is a "read only" app to display info, not to modify data
Patients.deny({
	insert : function(userid, doc){
		return true;
	}

	,update : function(userId, doc, fields, modifier){
		return true;
	}

	,remove : function(userId, doc){
		return true;
	}
});

// Explicitly deny any writes in the datasample_second collection. 
// This application is a "read only" app to display info, not to modify data
Datasample_second.deny({
	insert : function(userid, doc){
		return true;
	}

	,update : function(userId, doc, fields, modifier){
		return true;
	}

	,remove : function(userId, doc){
		return true;
	}
});


//The assesment collection can be updated based on user's actions
Assesment.deny({
	remove : function(userId, doc){
		return true;
	}
});


//METEOR METHODS
Meteor.methods({
	"assesment.insert"(patientID){

		Assesment.insert({
			patientID : patientID,
			assement_date : new Date()
		});

	}

});


//SERVER SIDE CODE
if (Meteor.isServer) {

// Publications

  Meteor.publish('patients_demo', function patientsPublication() {
    return Patients.find();
  });

  Meteor.publish('datasample_second', function datasample_secondPublication() {
    return Datasample_second.find();
  });

  Meteor.publish('assesment', function assesment_secondPublication() {
    return assesment.find();
  });
}