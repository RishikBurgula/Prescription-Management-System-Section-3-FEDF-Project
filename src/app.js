const drugs={
Paracetamol:{child:250,adult:500},
Ibuprofen:{child:200,adult:400},
Amoxicillin:{child:250,adult:500},
Cetirizine:{child:5,adult:10},
Azithromycin:{child:250,adult:500},
Metformin:{child:250,adult:500},
Atorvastatin:{child:10,adult:20},
Omeprazole:{child:10,adult:20}
};

function toast(msg){

let t=document.getElementById("toast");
t.innerText=msg;
t.style.display="block";

setTimeout(()=>{
t.style.display="none";
},2500);

}

function showRegister(){

loginPage.classList.add("hidden");
registerPage.classList.remove("hidden");

}

function showLogin(){

registerPage.classList.add("hidden");
loginPage.classList.remove("hidden");

}

function register(){

let u=regUser.value;
let p=regPass.value;

if(!u || !p){
toast("Fill all fields");
return;
}

localStorage.setItem("username",u);
localStorage.setItem("password",p);

toast("Registration Successful");
showLogin();

}

function login(){

let u=loginUser.value;
let p=loginPass.value;

if(
u===localStorage.getItem("username") &&
p===localStorage.getItem("password")
){

loginPage.classList.add("hidden");
homePage.classList.remove("hidden");

loadHistory();

}
else{
toast("Invalid Login");
}

}

function logout(){

homePage.classList.add("hidden");
loginPage.classList.remove("hidden");

}

function calculateDosage(){

let age=ageInput();

let drug=drugSelect();

if(age==="" || drug===""){
toast("Enter age and drug");
return;
}

let dose=age<12 ?
drugs[drug].child :
drugs[drug].adult;

document.getElementById("dosage").value=
dose+" mg";

toast("Dosage Calculated");

}

function ageInput(){
return document.getElementById("age").value;
}

function drugSelect(){
return document.getElementById("drug").value;
}

function savePrescription(){

let patient=patientField();
let age=ageInput();
let drug=drugSelect();
let dosage=dosageField();
let days=daysField();

if(!patient||!age||!drug||!dosage||!days){
toast("Fill all fields");
return;
}

let data=JSON.parse(
localStorage.getItem("prescriptions")
)||[];

data.push({
patient,
age,
drug,
dosage,
days,
date:new Date().toLocaleString()
});

localStorage.setItem(
"prescriptions",
JSON.stringify(data)
);

toast("Prescription Saved");

clearFields();
loadHistory();

}

function patientField(){
return document.getElementById("patient").value;
}

function dosageField(){
return document.getElementById("dosage").value;
}

function daysField(){
return document.getElementById("days").value;
}

function loadHistory(){

let list=document.getElementById("historyList");

list.innerHTML="";

let data=JSON.parse(
localStorage.getItem("prescriptions")
)||[];

data.reverse().forEach(item=>{

list.innerHTML+=`
<div class="card">
<div class="patient-name">
👤 ${item.patient}
</div>

<div class="badge">
${item.drug}
</div>

<p><b>Age:</b> ${item.age}</p>
<p><b>Dosage:</b> ${item.dosage}</p>
<p><b>Days:</b> ${item.days}</p>
<p><small>${item.date}</small></p>
</div>
`;

});

document.getElementById("totalPrescriptions")
.innerText=data.length;

document.getElementById("totalPatients")
.innerText=
new Set(data.map(x=>x.patient)).size;

document.getElementById("totalDrugs")
.innerText=
new Set(data.map(x=>x.drug)).size;

}

function clearFields(){

patient.value="";
age.value="";
drug.value="";
dosage.value="";
days.value="";

}

window.login = login;
window.register = register;
window.showRegister = showRegister;
window.showLogin = showLogin;
window.logout = logout;
window.calculateDosage = calculateDosage;
window.savePrescription = savePrescription;
