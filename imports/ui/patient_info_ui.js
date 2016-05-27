//patient_info_ui.js
/*
This class has functionality to improve the layout of the patinet info tile


  //  - color : background color to display in the UI: 
  //		Healthy green : textcolor: '#0f3d0f, backgroundcolor : '#47d147', 
  //		Alert Yellow  : textcolor: #8a6d3b,  backgroundcolor: #ffff00;
  //		Danger Red    : textcolor: #fff, 	 backgroundcolor: #ff0000;
  //		Info blue     : textcolor: #31708f;  backgroundcolor: #d9edf7;

*/
  let	healthy = {
  		backgroundcolor : '#47d147', 
  		textcolor: '#0f3d0f',
  		message : 'Patient OK',
  		status : 'Healthy',
  		dangerLevel : 0
  	}
  let	alert = {
  		backgroundcolor : '#ffff00', 
  		textcolor: '#8a6d3b',
  		message : 'Warning...',
  		status : 'Alert',
  		dangerLevel : 1
  	}
  let	danger = {
  		backgroundcolor : '#ff0000', 
  		textcolor: '#fff',
  		message : 'Patient Alert',
  		status : 'Danger',
  		dangerLevel : 2
  	}
  let	info = {
  		backgroundcolor : '#d9edf7', 
  		textcolor: '#31708f',
  		message : 'Info Message',
  		status : 'Info',
  		dangerLevel : 0
  	}




/**
parameter temperature in Celsius
Returns the css color for the temperature value in the UI
*/
export const temperature_color = function(temperature) {

	if (temperature == undefined || temperature == "-")
		return '';
	temp = Number(temperature)
	if(temp >= 36.1 && temp <= 37.8)
		return  ''; //or healthy green?
	else
		return 'color : #fff;  background: red; border-radius:5px; padding:2px;';

}


/**
receives a JSON object with patient data (demographics, data metrics)
Returns a JSON object to display the patient assesment with a certain layout
*/
export const patient_assesment = function(patientdata){

	let assesment = healthy; //basic assesment
    let message = ''; //message to be displayed with the assesment
    let assesmentDangerLevel = 0; //a degree of severity of the assesment (it is actually )

	if (patientdata === undefined){
		assesment = info;
		assesment.message = "No patient selected";
		return assesment;
	}

	//properties from te patient assesment
	// Default values if the matching  fields are undefined are set to "healthy" values
	let temp_avg = patientdata.temperature === undefined ? 37 : patientdata.temperature.sum / patientdata.temperature.count;
	let bp_sys_avg = patientdata.blood_pressure_sys === undefined ? 0 : patientdata.blood_pressure_sys.sum / patientdata.blood_pressure_sys.count;
    let bp_dias_avg = patientdata.blood_pressure_dias === undefined ? 0 : patientdata.blood_pressure_dias.sum / patientdata.blood_pressure_dias.count;
    let hr_avg = patientdata.heart_rate === undefined ? 80 : patientdata.heart_rate.sum / patientdata.heart_rate.count;
    let spo2_avg = patientdata.spo2 === undefined ? 100 : patientdata.spo2.sum / patientdata.spo2.count;
    let pr_avg = patientdata.pulse_rate === undefined ? 80 : patientdata.pulse_rate.sum / patientdata.pulse_rate.count;



    //BLOOD PRESSURE
    /* 
    Systolic in mmHg    Diastolic in mmHg  Category
    below 120				below 80		Normal blood pressure
    120 - 139				80 - 89			Prehyertension
    140 - 159				90 - 99			Stage 1 hypertension
    160 or higher			100 or higher   Stage 2 Hyperension

    */
  //   if(bp_sys_avg  <= 120  && bp_dias_avg <= 80 ){
		// message += " Normal Blood Pressure ";
  //   }else 
    if( (bp_sys_avg  >= 120 && bp_sys_avg  <= 139) && 
    	(bp_dias_avg >= 80  && bp_dias_avg <= 89 )){
    	//prehypertension
	    // assesment = alert;
	    message += " Prehypertension.";
	} else if( (bp_sys_avg  >= 140 && bp_sys_avg  <= 159) && 
    		   (bp_dias_avg >= 90  && bp_dias_avg <= 99 )){
    	//Stage 1 prehypertension
	    assesment = alert;
	    message += " Stage 1 Hypertension.";
	} else if(bp_sys_avg  >= 160  && bp_dias_avg >= 100 ){
    	//prehypertension
	    assesment = danger;
	    message += " Stage 2 Hypertension.";
	}

	//HEART RATE
	/*
	Normal resting rate for adults is 60 - 100

	Above 100 bpm possible tachycardia
	Below 60 bpm possible bradycardia
	*/

	//default to 80 just to skip the check right below
	if (hr_avg > 100){
		message += " Possible Tachycardia.";
		assesmentDangerLevel = 1;
	} else if (hr_avg < 60) {
		message += " Possible Bradycardia.";
		assesmentDangerLevel = 1;
	}

	//upgrade the danger level if we have to
	if (assesmentDangerLevel > assesment.dangerLevel){
		assesment = alert;
	}

	//Temperature
	//default to 37 just to avoid the check below
	if (temp_avg <= 36.1 || temp_avg >= 37.8){
		dangerLevel = 1;
		message += " Check Temperature.";
	}

	//upgrade the danger level if we have to
	if (assesmentDangerLevel > assesment.dangerLevel){
		assesment = alert;
	}

	// SpO2 % SATURATION
	/*
		Normal reading is in the high 90s. 96%-99% is no cause of alarm
		95% or less could indicate hypoxia (investigate)
		90% or less definitely indicates hypoxia and need to be investigated
	*/
	//default to 100 to have a "healthy" value that skips the check below
	if(spo2_avg >= 90 && spo2_avg <= 95){
		message += " possible Hypoxia.";
		assesmentDangerLevel = 1;//alert
	} else if (spo2_avg < 90){
		message += " Hypoxia.";
		assesmentDangerLevel = 2;//danger
	}

		//upgrade the danger level if we have to
	if (assesmentDangerLevel > assesment.dangerLevel){
		if(assesmentDangerLevel === 1){
			assesment = alert;
		}else{
			assesment = danger;
		}
	}


//return the assesment
	if(message != ''){
		assesment.message = message;
	}
	return assesment;


}