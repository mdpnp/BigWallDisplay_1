import { Mongo } from 'meteor/mongo';
 
// patient_demographic is a collection with basic patient info 
export const Patients = new Mongo.Collection('patient_demographic');

// datasample_second is a collection with patient data samples (per second)
export const Datasample_second = new Mongo.Collection('datasample_second');



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

if (Meteor.isServer) {

// Publication	
  Meteor.publish('patients_demo', function patientsPublication() {
    return Patients.find();
  });

  Meteor.publish('datasample_second', function datasample_secondPublication() {
    return Datasample_second.find();
  });
}