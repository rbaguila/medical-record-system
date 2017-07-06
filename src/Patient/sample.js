var date = new Date();
var month = date.getMonth() + 1;
var day = date.getDate();
var year = date.getFullYear();

export var consultValue =

"This is a sample consultation generator for a patient today.\nDate: " +month+ "/" +day+ "/" +year +"\n\nBelow are prescriptions for the patient to take:\n";



export default consultValue;