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
  ,loopCount: function(count){
    const countArr = [];
    const rows = count/2;

    for(let row =0; row<rows; row++){
    	for(let col=0;col<2;col++){
    		let color = '#66ccff';
    		let bkgcolor = '#33bbff';
    		if(row%2 == 0){
    			if (col%2 ==0){
    				color = '#00cc99';
    				bkgcolor = '#00b386';
    			}
    		}else if(col%2 == 1){
    			color = '#00cc99';
    			bkgcolor = '#00b386';
    		}
			countArr.push({'color' : color, 'bkgcolor' : bkgcolor});
    	}
    }
    return countArr;
  }
});

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('patients_demo');
});