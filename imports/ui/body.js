import { Template } from 'meteor/templating';

import { Patients } from '../api/patients.js';
 

import './patient_info.js'; 
import './body.html';

 
// Template.body.helpers({
//    patients() {
//     return Patients.find({});
//   },
// });

Template.body.helpers({
   patients : function() {
    return Patients.find({});
  },
  thispatient : function(skip){
  	return Patients.findOne({},{skip : skip});
  }
});

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('patients_demo');
});