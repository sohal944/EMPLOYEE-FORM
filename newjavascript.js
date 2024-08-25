/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

   
    var jpdbbaseURL= "http://api.login2explore.com:5577";
var jpdbIRL= "/api/irl";
var jpdbIML= "/api/iml";
var dbname= "STUDENT_RECORD";
var dbrel= "STU-REL";
var conntoken= "90932089|-31949218880874773|90962020";

$("#roll").focus();


function validateData() {
var roll = $("#roll").val();
if (roll === "") {
alert("Roll No. is Required Value");
$("#roll").focus();
return "";
}
var name = $("#name").val();
if (name === "") {
alert("Student Name is Required Value");
$("#name").focus();
return "";
}
var sclass = $("#sclass").val();
if (sclass === "") {
alert("Student Class is Required Value");
$("#sclass").focus();
return "";
}
var bdate = $("#bdate").val();
if (bdate === "") {
alert("Student Birth-Date is Required Value");
$("#bdate").focus();
return "";
}
var add = $("#add").val();
if (add === "") {
alert("Student Address is Required Value");
$("#add").focus();
return "";
}
var edate = $("#edate").val();
if (edate === "") {
alert("Student Enrollment Date is Required Value");
$("#edate").focus();
return "";
}
var jsonStrObj = {
roll: roll,
name: name,
sclass: sclass, 
bdate: bdate,
add: add,
edate : edate
};
return JSON.stringify(jsonStrObj);
}

 function saveData() {
var jsonStrObj = validateData();
if (jsonStrObj === "") {
return;
}
var putReqStr = createPUTRequest(conntoken,jsonStrObj,dbname, dbrel);
//alert(putReqStr);
jQuery.ajaxSetup({async: false});
var resultObj = executeCommandAtGivenBaseUrl(putReqStr,jpdbbaseURL,jpdbIML);

jQuery.ajaxSetup({async: true});
    
alert(JSON.stringify(resultObj));

resetForm();
$("#roll").focus();
}

function resetForm() {
$("#roll").val("");
$("#name").val("");
$("#sclass").val("");
$("#bdate").val("");
$("#add").val("");
$("#edate").val("");
$("#roll").prop("disabled", false);
$("#save").prop("disabled", true);
$("#change").prop("disabled", true);
$("#reset").prop("disabled", true);
$("#roll").focus();
}

  
 function changeData() {
     $("#change").prop("disabled", true);
     jsonChg= validateData();
     var updateRequest = createUPDATERecordRequest(conntoken,jsonChg,dbname,dbrel,  localStorage.getItem("recno"));
     jQuery.ajaxSetup({async: false});
var resultObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbbaseURL,jpdbIML);

jQuery.ajaxSetup({async: true});
console.log(resultObj);
resetForm();
$("#roll").focus();
 }
 
 function getEmp() {
     var rollJsonObj = getrollAsJsonObj();
     var getRequest= createGET_BY_KEYRequest(conntoken,dbname,dbrel,rollJsonObj);
      jQuery.ajaxSetup({async: false});
var resultObj = executeCommandAtGivenBaseUrl(getRequest,jpdbbaseURL,jpdbIRL);

jQuery.ajaxSetup({async: true});
if(resultObj.status===400){
    $("#save").prop("disabled", false);
    $("#reset").prop("disabled", false);
    $("#roll").focus();
}
else if(resultObj.status === 200){
    $("#roll").prop("disabled", true);
    fillData(resultObj);
        $("#change").prop("disabled", false);
            $("#reset").prop("disabled", false);
             $("#roll").focus();
            
 }
 }

function createGET_BY_KEYRequest(token, dbname, relationName, jsonObjStr) {
 
    var value1 = "{\n"
            + "\"token\" : \""
            + token
            + "\",\n" + "\"cmd\" : \"GET_BY_KEY\",\n"
            + "\"dbName\": \""
            + dbname
            + "\",\n"
            + "\"rel\" : \""
            + relationName
            + "\",\n"
            + "\"jsonStr\":\n"
            + jsonObjStr
            + "\,"
            + "\n"
            + "}";
    return value1;
}



function getrollAsJsonObj(){
    var roll= $("#roll").val();
    var JsonStr ={
        roll:roll
    };
    return JSON.stringify(JsonStr);
    }
    
function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
$("#name").val(record.name);
$("#sclass").val(record.sclass);
$("#bdate").val(record.bdate);
$("#add").val(record.add);
$("#edate").val(record.edate);
}
function  saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
    }
