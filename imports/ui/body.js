import { Template } from 'meteor/templating';

import { Patients } from '../api/patients.js';

 import { ReactiveDict } from 'meteor/reactive-dict';

import './patient_info.js'; 
import './body.html';

 
// Template.body.helpers({
//    patients() {
//     return Patients.find({});
//   },
// });

Template.body.helpers({
  //helper funciont to reactively calcualte the tile layout
  getTileLayout : function(){
    //default return tilelayout3x4
    // return 'tilelayout3x4';
    const instance = Template.instance();
    return instance.state.get('tileslayout');
  }
  ,patients : function() {
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

Template.body.events({
  // "click #tilelayout3x4" :function(event, instance){
  //   event.preventDefault();
  //   instance.state.set('tileslayout', event.target.getAttribute("data-templatename"));
  // }
  // ,"click #differentLayout" :function(event, instance){
  //   event.preventDefault();
  //   instance.state.set('tileslayout', event.target.getAttribute("data-templatename"));
  // }
  "click .dropdown-menu li a" :function(event, instance){
    event.preventDefault();
    const templatename = event.target.getAttribute("data-templatename");
    if (null != templatename && undefined != templatename)
      instance.state.set('tileslayout', templatename);
  }
});

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('patients_demo');
  this.state = new ReactiveDict();
  // this.state.setDefault('tileslayout', 'tilelayout3x4');//differentLayout
  this.state.setDefault('tileslayout', 'tilelayout3x4');
});