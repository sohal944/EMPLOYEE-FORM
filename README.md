# EMPLOYEE-FORM
JavaScript / Html / CSS

<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html lang="en">
<head>
<title>Student Form</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script
src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script 
src="https://login2explore.com/jpdb/resources/js/0.0.3/jpdb-commons.js"></script>
</head>
<body>
<div class="container">
    <div class="page-header text-center">
<h2>STUDENT ENROLLMENT FORM</h2>
    </div>
<form id="stuForm" method="post">
<div class="form-group">
<label >Roll No.</label>
    <input type="number" class="form-control"  id="roll" onchange ="getEmp()" placeholder="Enter Roll No. " required>
</div>
<div class="form-group">
<label>Full Name:</label>
<input type="text" class="form-control" id="name"
placeholder="Enter Full Name" name="name">
</div>
<div class="form-group">
<label>Class : </label>
<input type="number" class="form-control" id="sclass"
placeholder="Enter your Class" name="sclass">
</div>
<div class="form-group">
<label>Birth-Date</label>
<input type="date" class="form-control" id="bdate"
placeholder="Enter Birth-Date" name="bdate">
</div>
<div class="form-group">
<label>Address :</label>
<input type="text" class="form-control" id="add"
placeholder="Enter Your Address" name="add">
</div>
<div class="form-group">
<label>Enrollment Date :</label>
<input type="date" class="form-control" id="edate"
placeholder="Enter the Enrollment Date" name="edate">
</div>
    <div class="form-group test-center">
        <button type="button" class="btn btn-primary" id="save" onclick="saveData()" disabled>Save</button>
        <button type="button" class="btn btn-primary" id="change" onclick="changeData()" disabled>Change</button>
        <button type="button" class="btn btn-primary" id="reset" onclick="resetForm()" disabled>Reset</button>
    </div>
</form>
</div>
    
  

//<script src="EMPLOYEE FORM/html/newjavascript.js"></script>

<script>
    
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

</script>

</body>
</html>
