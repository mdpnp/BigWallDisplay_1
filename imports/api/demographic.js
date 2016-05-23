

// Auxiliarify function to reuse functionality. 
// returns 'true' if the patient has allergies
// (the parameter patient object has an allergies field and its content is not 'none')
export const patientHasAllergies = function(patient){
	if (patient === undefined || patient.allergies === undefined)
  		return false;
  	if (patient.allergies == null || patient.allergies.trim() === '' || patient.allergies === 'none')
  		return false;

  	return true;
}