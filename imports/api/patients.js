import { Mongo } from 'meteor/mongo';
 
export const Patients = new Mongo.Collection('patient_demographic');

if (Meteor.isServer) {
  Meteor.publish('patients_demo', function patientsPublication() {
    return Patients.find();
  });
}