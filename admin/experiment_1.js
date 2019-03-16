//topmenu attributes
var user = {
  userstatus: "user",
  username: "Enter Your Name",
  login:"Enter Login",
  password: "Enter password",
  email: "Enter e-mail",
  registered: Date.now()
}
var allinputIDs=[];
var allinputRememberIDs=[];
var inputDocument={} // data from one input row object
var allUsersTableId = "users_tbl_id";
// Functions from loginadmin.js  *************************************************
// login / sign Up / Menu containers
var loginDiv_id = "loginDivID";
var signUpDiv_id= "signUpDivID";
//var menuDiv_id = "menuDivID";
var EditUserDiv_id = "editUserDivID";

// login / sign Up / Menu CSS classes
var loginDivClass = "div_login";
var signUpDivClass = "div_signup";
//var menuDivClass = "div_menu";
var EditUserDivClass = "div_edit_user";
//
var newUserOptionValues=["user","admin","director"];
//
var active_menu = 0;
var expireMinutes = 1;
var InputRowObject={};  // object of arrays : Input
let inpuKeyWord ="";  // park, kap,...
let aInputTypes=[];     // 
let aInputRowData={}; // object of input entries as objects
let inputTitle=""
let inputRemember=false;
let inputDataType="number";
let aInputValues=[];
aInputRowData.title=inputTitle;
aInputRowData.values=aInputValues;
aInputRowData.remember = inputRemember;
InputRowObject.keyword = inpuKeyWord;
InputRowObject.data = aInputRowData;
console.log(InputRowObject);
//
//default template
/*
var darchTemplate={
  sackful:"ՊԱՐԿ N",
  bag: "ԿԱՊ N",
  portfoilo: "Թղթապանակ",
  docNumber: "Փաստաթուղթ N",
  address_street: "հասցե, փողոց",
  district: "թաղամաս.",
  theme_event: "Փ.-իթեմանկամիրադարձությունը, թվ.-ըկարևորիմաստով",
  id: "Հերթական համար.",
  title: "Վերնագիր.",
  address: "Հասցե.",
  owner: "Սեփականատեր.",
  buyer: "Գնորդ.",
  seller: "Վաճառող.",
  type: "Տեսակ.",
  source: "Աղբյուր.",
  docScanned: "Էջը թվայնացված.",
  bigFile: "Մեծ ֆայլ. pdf, doc, mpeg.",
  searchWords: "Որոնման բառեր.",
  language: "Լեզու.",
  preliminary_analysis: "Նախնական վերլուծություն.",
  feedback: "Կարծիքներ համացանցից.",
  description: "Նկարագրություն."
}
*/
// date functions
function toTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
}
// alert(toTimestamp(new Date));
//function to show (flag=true) or hide (flag = false)  container (objDiv)
/*
const showHideDiv = (objDiv, flag=true)=>{
  if(flag){
    objDiv.style.display="block";
  }
  else{
    objDiv.style.display="none";
  }
}
*/
//function to convert to milliseconds
// hms = "hour" | "min" | "sec" | "day"
function convertToMS(hms, isFormat="min"){
  hms=Number(hms);
  if(isFormat == "min"){
    return 60000*hms;
  }
  else if(isFormat == "hour"){
    return 3600000*hms;
  }
  else if(isFormat == "sec"){
    return 1000*hms;
  }
  else if(isFormat=="day"){
    return 3600000*24*hms;
  }
}
//
function timeConverter(UNIX_timestamp){
   var a = new Date(UNIX_timestamp);
   var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   var year = a.getFullYear();
   var month = months[a.getMonth()];
   var date = a.getDate();
   var hour = a.getHours();
   var min = a.getMinutes();
   var sec = a.getSeconds();
   var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
   return time;
}
// alert(timeConverter(toTimestamp(new Date)));
// remembering TimeStamp + 30 minutes when document is being clised
document.body.onunload  = saveTimeStamp(expireMinutes); // expireMinutes=30;
//
function saveTimeStamp(deltaminutes){
 let d1 = new Date (), d2 = new Date ( d1 );
  d2.setMinutes ( d1.getMinutes() + deltaminutes);
  //alert("onUnload  = "+d2.getTime());
  localStorage.setItem("tstamp_last",d2.getTime());
  console.info("SaveTimeStamp into local storage: d2 = "+d2.getTime()+", d1 = "+d1.getTime());
  console.info(" added "+expireMinutes+ "min  with deltadate = "+d1.getMinutes() +" + "+ deltaminutes);
}
//

//
document.body.onload = ()=>{
  let asavedData = getSavedData();
  checkUserData(asavedData);
  getAllUsers();

} 
// getting saved data from local storage and checking validity function:
function getSavedData(){
  let savedTimeStampp = localStorage.getItem('tstamp_last');
  let zap_password = localStorage.getItem('zappassw');
  let zap_login = localStorage.getItem('zaplogin');
  let savedData = [savedTimeStampp,zap_password,zap_login]; // array af saved data
  console.info("saved Data from local storage:");
  console.info(savedData);
  return savedData;
}
// editing user information (saving changes)
async function saveChangedUser(user_id, usr) {
  console.info(usr);
  let log_in = usr.login;
  let passw = usr.password;
  let eml = usr.email;
  let uname = usr.username;
  if(!usr.registered){
    usr.registered = Date.now();
  }
  let id = user_id;
  if(uname =="" || uname == undefined ||
      log_in =="" || log_in == undefined ||
      passw == "" || passw == undefined ||
      eml == "" || eml == undefined ||
      id == undefined || id == 0 || id == ""){
          alert("At least one of the user fields is empty");
          return;
  }
  console.info("120. user id == : "+id);
  // checking if any user with the same login and password allready registered
  const resp_check = await fetch("http://elastic/users/_doc/_search", {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
      method: "POST",
      body: JSON.stringify({
        query: { 
          constant_score:{
              filter:{
                bool: {
                  must: [
                    {
                      term:{
                        login:log_in
                      }
                    },
                    {
                      term:{
                        password:passw
                      }
                    }
                  ]
                } 
              }
            }
          }
      })
  });
  const json_check = await resp_check.json();
  console.log("json_check");
  console.log(json_check);
  const json_check_length = json_check.hits.hits.length;
  if(json_check_length === 0 || (json_check_length === 1 && json_check.hits.hits[0]._id == id)
    ){
    // updating user
    let user_id = ++max_id;
    console.log("inserting");
    const response1 = await fetch("http://elastic/users/_doc/"+id, 
    {
        body: JSON.stringify(usr),
        // must match 'Content-Type' header
        cache: 'no-cache',
        mode: 'cors',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    const json = await response1.json();    
    //user.userstatus="user";
    //user.username="Enter Your Name";
    //user.login="Enter Login";
    //user.password="Enter password";
    //user.email="Enter e-mail";
    EditUserContainer.hidediv();  
  }
  else{
    alert("Canno t Update the The User with the same login and password alleready registered");
  }
  //
  console.info(json);
  
  //this.getContainer().hidediv();
}


// ********************************
// saving new user function
async function saveUser(usr) {
  console.info(usr);
  let log_in = usr.login;
  let passw = usr.password;
  let eml = usr.email;
  let uname = usr.username;
  if(!usr.registered){
    usr.registered = Date.now();
  }

  if(uname == "Enter Your Name" || 
      log_in =="Enter Login" || 
      passw == "Enter password" || 
      eml == "Enter e-mail"){
          alert("all fields must be filled in");
          return;
  }
  if(uname =="" || 
      log_in =="" || 
      passw == "" || 
      eml == ""){
          alert("At least one of the user fields is empty");
          return;
  }
  // getting last user id
  const response = await fetch("http://elastic/users/_doc/_search", 
  {
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
      },  
    method: 'POST',
    body: JSON.stringify({
      size: 0,
      aggs:{
        doc_with_max_id: {
          top_hits: {
                sort: [
                    {
                    _id: {
                            order: "desc"
                        }
                    }
              ],
              size:1
            }
          }
        }  
        })
      }
  )
  const json = await response.json();
  let max_id = 0;
  if(json.aggregations.doc_with_max_id.hits.hits.length>0){
    max_id = json.aggregations.doc_with_max_id.hits.hits[0]._id;
  }
  //user.id = max_id;
  //console.info(json);
  console.info("161. max _id == : "+max_id);
  // checking if any user with the same login and password allready registered
  const resp_check = await fetch("http://elastic/users/_doc/_search", {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
      method: "POST",
      body: JSON.stringify({
        query: { 
          constant_score:{
              filter:{
                bool: {
                  must: [
                    {
                      term:{
                        login:log_in
                      }
                    },
                    {
                      term:{
                        password:passw
                      }
                    }
                  ]
                } 
              }
            }
          }
      })
  });
  const json_check = await resp_check.json();
  console.log("json_check");
  console.log(json_check);
  const json_check_length = json_check.hits.hits.length;
  if(json_check_length === 0){
    // inserting new user
    let user_id = ++max_id;
    console.log("inserting");
    const response1 = await fetch("http://elastic/users/_doc/"+user_id, 
    {
        body: JSON.stringify(usr),
        // must match 'Content-Type' header
        cache: 'no-cache',
        mode: 'cors',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    })
    const json = await response1.json();    
    //user.userstatus="user";
    //user.username="Enter Your Name";
    //user.login="Enter Login";
    //user.password="Enter password";
    //user.email="Enter e-mail";
    SignUpContainer.hidediv();  
  }
  else{
    alert("The User with the same login and password alleready registered");
  }
  //
  //setTimeout(getAllUsers(), 2000);
  console.info(json);
  
  //this.getContainer().hidediv();
}
//
//saveUser(user5)

//
async function getAllUsers(){
  let res = await fetch("http://elastic/users/_doc/_search", {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    method: "POST",
    body: JSON.stringify({
    query: { 
      match_all: {} 
      },
    from: 0,
    size: 20
      })
  });
  let json = await res.json()
  alert("total hits: "+json.hits.total);
  console.info(json.hits.total)
  console.info(json)
  let totalhits = json.hits.total;
  if(totalhits===0){
    console.log("here inserting codeinserting");
    await saveUser(user);
  }
  //
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.setAttribute('border', '1');
  tbl.setAttribute("id", allUsersTableId);  // global variable
  var tbdy = document.createElement('tbody');
  var thead = document.createElement('thead');
  thead.innerText = "All Users";
  //
  let deleteUserBtn = [];
  let td7=[];
  let aDivDel=[];
  //
  let editUserBtn = [];
  let td6=[];
  let aDivEdit=[];
  //
  for (let i = 0; i < totalhits; i++) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    td6[i] = document.createElement('td');
    td7[i] = document.createElement('td');
    aDivDel[i]=document.createElement('div');
    aDivEdit[i]=document.createElement('div');

    td.innerText=json.hits.hits[i]._source.username
    td1.innerText=json.hits.hits[i]._source.login
    td2.innerText=json.hits.hits[i]._source.email
    td3.innerText=json.hits.hits[i]._source.password
    let dd = json.hits.hits[i]._source.registered;
    td4.innerText=timeConverter(dd)
    let status = json.hits.hits[i]._source.userstatus;
    let id = json.hits.hits[i]._id;
    td5.innerText=`${status} (${id})`;
    
    editUserBtn[i] = new Button(aDivEdit[i], "button", editUserAttributes); // "Edit User" buttons
    editUserBtn[i].setUserID(json.hits.hits[i]._id);
    td6[i].appendChild(aDivEdit[i]);
    //td6.innerText=" edit "
    //td7.innerText=" delete "
    //btnEmptyDiv.innerHTML = saveNewUserBtn;
    deleteUserBtn[i] = new Button(aDivDel[i], "button", deleteUserAttributes); // "Delete User" buttons
    deleteUserBtn[i].setUserID(json.hits.hits[i]._id);
   // alert(json.hits.hits[i]._id);
    console.log(deleteUserBtn[i]);
    td7[i].appendChild(aDivDel[i]);

    tr.appendChild(td); 
    tr.appendChild(td1); 
    tr.appendChild(td2); 
    tr.appendChild(td3); 
    tr.appendChild(td4); 
    tr.appendChild(td5); 
    tr.appendChild(td6[i]); 
    tr.appendChild(td7[i]); 
    tbdy.appendChild(tr);
  }
  tbl.appendChild(thead);
  tbl.appendChild(tbdy);
  body.appendChild(tbl);
  //
  tbl.style.display="none";
  console.info(tbl);
  // return tbl;
}

//
//checking if data belongs to the same record/document
async function checkUserData(aSavedData){
  console.info("Before checking: Array of onLoad data:  = " + aSavedData);
  const dnow = new Date ();
  if(Array.isArray(aSavedData) && aSavedData.length == 3){
    var tmStmp = Number(aSavedData[0]); // timestamp  -- last time saved in localstorage
    var psw = aSavedData[1];    // paasword
    var lgn = aSavedData[2];    // login
  }
  else{
    alert("checkUserData(aSavedData) function parameter error");
    return;
  }
  const response = await fetch("http://elastic/users/_doc/_search?q=login:"+lgn, 
  {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'content-type': 'application/json'
          }
      }
  )
  const json = await response.json();
  let totalhits = json.hits.hits.length;
  console.info("json from async function checkUserData");
  console.info(json);
  console.info("in checkUserData() found: "+totalhits); // ok
  if(totalhits == 1 && json.hits.hits[0]._source.password == psw){
      const uname = json.hits.hits[0]._source.username;         // user.username
      const umail = json.hits.hits[0]._source.email;            // user.email
      user.username = uname;
      user.email = umail;
      user.password=psw;
      user.id=json.hits.hits[0]._id;
      // checking timestamp validity
      if(tmStmp - Number(dnow.getTime()) > 0){
        const d_tmp = new Date(Number(tmStmp));
        console.info("when loading - timeStamp: " + tmStmp + ", and NEW DATE == "+ dnow.getTime()+"  is valid.");
        console.info("when loading - Saved Date time is: " + d_tmp + ", and NEW DATE == "+ dnow+"  is valid.");
        console.info("valid user: show main menu");
        LoginContainer.hidediv();
        makeMenu.updateMenu();  // to set te dafault active menu title and logged in user name
      //  aDiv.showdiv();
        //showHideDiv(LoginContainer, false);
        return true;
      }
      else{
        // go to user registration (login) page
        alert("User registration time expired! Go to user registration (login) page");
        LoginContainer.showdiv();
        makeMenu.elm.style.display="none";
        for (let i=0; i<aContent.length; i++){
          aContent[i].hideContent();
        }
        //showHideDiv(LoginContainer, true)
        return false;
      }
  }
  else{
    LoginContainer.showdiv();
    makeMenu.elm.style.display="none";
    
    for (let i=0; i<aContent.length; i++){
      aContent[i].hideContent();
    }
    //showHideDiv(LoginContainer, true)
    return false;
  }
}
//
// searching user by login/password
async function searchUser(userLogin, userPassw) {
  if(!userLogin || !userPassw){
      alert("searchUser(userLogin. userPassw) function parameter error");
      return;
  }
  const response = await fetch("http://elastic/users/_doc/_search?q=login:"+userLogin, 
  {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'content-type': 'application/json'
          }
      }
  )
  const json = await response.json();
  let totalhits = json.hits.total;
  console.info(json);
  console.info("found: "+totalhits);
  if(totalhits==1 && json.hits.hits[0]._source.password==userPassw){
      user.username = json.hits.hits[0]._source.username;
      alert("382: user.username  ===  "+user.username)
      user.password = json.hits.hits[0]._source.password;
      user.login = json.hits.hits[0]._source.login;
      user.email = json.hits.hits[0]._source.email;
      console.info("the user object is: ");
      console.info(user);
      localStorage.setItem("zappassw",user.password);   // zappassw
      localStorage.setItem("zaplogin",user.login);      // zaplogin
      // localStorage.setItem("tstamp_last",user.password);
      saveTimeStamp(expireMinutes);                     // tstamp_last

      return true;
  }
  else{
      return false;
  }
}
//
async function searchUserMaxId() {
  const response = await fetch("http://elastic/users/_doc/_search", 
  {
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
      },  
    method: 'POST',
    body: JSON.stringify({
      size: 0,
      aggs:{
        doc_with_max_id: {
          top_hits: {
                sort: [
                    {
                    _id: {
                            order: "desc"
                        }
                    }
              ],
              size:1
            }
          }
        }  
        })
      }
  )
  const json = await response.json();
  let max_id = json.aggregations.doc_with_max_id.hits.hits[0]._id;
  user.id = max_id;
  console.info(json);
  console.info("max _id == : "+max_id);
  console.info("user.user_id == : "+user.id);
}
// dropDown class
let dropDown = function(ContainerID, ID, Class="", Label="Select field label", selectedValue = "0",  OptionValues=[]){
  this.id = ID;
  this.className = Class;
  this.Option_Values = OptionValues;
  this.Value = this.Option_Values[0];
  this.selectedValue = selectedValue;
  this.labelText = document.createTextNode(Label);
  this.parentid = ContainerID;
  this.Container = document.createElement("div");
  this.Container.setAttribute("id", this.parentid);
  this.Container.setAttribute("class", this.className);
  this.Label = document.createElement("label");
  this.Label.setAttribute("for", this.id);
	this.Label.appendChild(this.labelText);
  this.sel = document.createElement("SELECT");
  this.selectedIndex = this.sel.selectedIndex;
  this.sel.setAttribute("id", this.id );
  this.options = [];
  for(let i=0; i<this.Option_Values.length; i++){
    this.options[i]=document.createElement("option");
    this.options[i].value=this.Option_Values[i];
    if(this.Option_Values[i] == selectedValue && this.Option_Values[i] != "0"){
      this.options[i].selected=true;
    }
    this.options[i].text=this.Option_Values[i];
    this.sel.add(this.options[i]);
  }
  this.sel.onchange=()=>{
    this.Value = this.sel.value;
    console.log(this.Value);
  }
  this.Container.appendChild(this.Label);
  this.Container.appendChild(this.sel);
  //document.body.appendChild(this.Container);
  this.getForm = this.getForm.bind(this);
  this.getText = this.getText.bind(this);
  this.updateSelected = this.updateSelected.bind(this);
}
//
dropDown.prototype.getForm=function(){
	return this.Container;
}
// 
dropDown.prototype.getText = function(){
  return this.Value;
}
//
dropDown.prototype.updateSelected = function(val){
  for(let i=0; i<this.Option_Values.length; i++){
    if(this.Option_Values[i] == val){
      this.options[i].selected=true;
    }
  }
}
//
// textarea class
let textArea = function(ContainerID, ID, Class="", Label="input field label",  Attributes={}){
	this.id = ID;
  this.className = Class;
  this.labelText = document.createTextNode(Label);
  this.parentid = ContainerID;
  this.attributes = Attributes;
  this.Container = document.createElement("div");
  this.Container.setAttribute("id", this.parentid);
  this.Container.setAttribute("class", this.className);
  this.Label = document.createElement("label");
  this.Label.setAttribute("for", this.id);
  this.Label.appendChild(this.labelText);
  this.tarea = document.createElement("TEXTAREA");
  if (this.attributes.rows){
      this.rows=this.attributes.rows;
      this.tarea.setAttribute("rows", this.rows );
  }
  if (this.attributes.cols){
    this.cols=this.attributes.cols;
    this.tarea.setAttribute("cols", this.cols );
  }
  if (this.attributes.keyword){
    this.kw=this.attributes.keyword;
    this.id = this.id + "_" + this.attributes.keyword;
  }  
  if(this.attributes.index && this.attributes.index > 0){
    this.index = this.attributes.index ;
  }
  else {
    this.index = 0;
  }
  this.id = this.id + "_" + this.index
  this.tarea.setAttribute("id", this.id);
  // atributes object

  this.tarea.onchange=()=>{
    this.Value = this.tarea.value;
    allinputIDs.push(this.id) ;
    console.log(this.id+" ---- "+this.Value);
    //console.log(inputDocument);
  }
  this.Container.appendChild(this.Label);
  this.Container.appendChild(this.tarea);
  //document.body.appendChild(this.Container);
  this.getForm = this.getForm.bind(this);
  this.getText = this.getText.bind(this);
}
//
textArea.prototype.getForm=function(){
	return this.Container
}
// textArea class functions ********************
textArea.prototype.getText=function(){
    return this.Value;
}
//
//
// textfield class
let textField = function(ContainerID, ID, Class="", Label="input field label",  Attributes={}){
	this.id = ID;
  this.className = Class;
  this.isChecked = false;
  this.labelText = document.createTextNode(Label);
  this.parentid = ContainerID;
  this.attributes = Attributes;
  this.Container = document.createElement("div");
  this.Container.setAttribute("id", this.parentid);
  this.Container.setAttribute("class", this.className);
  this.Label = document.createElement("label");
  this.Label.setAttribute("for", this.id);
	this.Label.appendChild(this.labelText);
  this.tf = document.createElement("INPUT");
  switch(this.attributes.type){
    case "password":
    this.tf.setAttribute("type", "password");
    this.type="password";
    break;
    case "email":
    this.tf.setAttribute("type", "email");
    this.type="email";
    break;
    case "checkbox":
    this.tf.setAttribute("type", "checkbox");
    this.tf.setAttribute("value", "1");
    this.type="checkbox";
    break;
    case "text":
    this.tf.setAttribute("type", "text");
    this.type="text";
    break;
    default:
    this.tf.setAttribute("type", "text");
    this.type="text";
  }
  // atributes object
  if(this.attributes.placeholder){
    this.tf.setAttribute("placeholder", this.attributes.placeholder);
  }
  if(this.attributes.required){
    this.tf.required = true;
  }
  if(this.attributes.value){
    this.tf.setAttribute("value", this.attributes.value);
    //this.tf.value = this.attributes.value;
  }
  if(this.attributes.tf_class){
    this.tf.setAttribute("class", this.attributes.tf_class);
    //this.tf.value = this.attributes.value;
  }
  if (this.attributes.keyword){
    this.kw=this.attributes.keyword;
     this.id = this.id + "_" + this.attributes.keyword;
  } 
  
  if(this.attributes.index && this.attributes.index > 0){
    this.index = this.attributes.index ;
  }
  else {
    this.index = 0;
  }
  this.id = this.id + "_" + this.index
  this.tf.setAttribute("id", this.id );
  this.tf.onchange=()=>{
    this.Value = this.tf.value;
    if(this.type === "checkbox"){
      if(this.tf.checked){
        this.isChecked = true;
      }
      else{
        this.isChecked = false;
      }
    }
    allinputIDs.push(this.id) ;
   
    console.log(this.id+" ---- "+this.Value);
    console.log(inputDocument);
  }
  this.Container.appendChild(this.Label);
  this.Container.appendChild(this.tf);
  //document.body.appendChild(this.Container);
  this.getForm = this.getForm.bind(this);
  this.getChecked = this.getChecked.bind(this);
  this.getText = this.getText.bind(this);
  this.setText = this.setText.bind(this);
}
//
textField.prototype.setText  = function(txt){
	if(txt && this.type !== "checkbox"){
    this.tf.setAttribute("value", txt);
  }
}
//
textField.prototype.getForm=function(){
	return this.Container
}
// textField class functions ********************
textField.prototype.getText=function(){
  if(this.type == "checkbox"){
    return this.isChecked;
  }
  else{
    return this.Value;
  }
}
//
textField.prototype.getChecked = function(){
  if(this.type=="checkbox"){
    console.info("textField class function getChecked: "+this.tf.checked);
    return this.tf.checked;
  }
  else{
    console.info("This function is actual only for checkBoxes");
    //return;
  }
}
// ************************************************* Container class
let Container = function(ID, Class, SubTitle="SubTitle", Visible=false){
	this.id = ID;
  this.className = Class;
  this.Title = SubTitle;
	this.visibility = Visible;
	this.elm = document.createElement("div");
  this.elm.setAttribute("id", this.id);
  this.elm.setAttribute("class", this.className);
  this.titleTag = document.createElement("DIV");
  this.titleTag.setAttribute("class", "subtitle");
  this.tt = document.createTextNode(this.Title);
  this.titleTag.appendChild(this.tt);
  this.elm.appendChild(this.titleTag);
  if(this.visibility==false){
  	this.elm.style.display = "none";
  } 
  else{
  	this.elm.style.display = "block";
  }
  document.body.appendChild(this.elm);
  this.showdiv = this.showdiv.bind(this);
	this.hidediv = this.hidediv.bind(this);
  //this.addChild= this.addChild.bind(this);
	this.addChild = this.addChild.bind(this);
}
//
Container.prototype.showdiv = function(){
	this.visibility = true;
  this.elm.style.display = "block";
  console.log("container with id: " + this.id + " is Visible");
}
Container.prototype.hidediv = function(){
	this.visibility = false;
  this.elm.style.display = "none";
  console.log("container with id: " + this.id + " is hidden");
}
Container.prototype.addChild = function(obj){
	this.elm.appendChild(obj); 
}
//**********************************************************
let currentRowData={
  kw:"",
  index:0,
  parentID:0,
  parentObj:{}
}
// Button class
let Button = function(container, btntype = "button", Attributes={}){
  this.Container = container;
  this.Type = btntype;  // submit, button, reset
  this.attributes = Attributes;
  this.elem = document.createElement("button");
  switch(this.Type){
    case "submt":
    this.elem.type = "submit";
    this.def_title="SUBMIT";
    break;
    case "button":
    this.elem.type = "button";
    this.def_title="UNNAMED BUTTON";
    break;
    case "reset":
    this.elem.type = "reset";
    this.def_title="RESET";
    break;
    default:
    this.elem.type = "button";
    this.def_title="DEFAULT BUTTON";
  }
  // title
  if(this.attributes.title){
    this.tt = document.createTextNode(this.attributes.title);
  }
  else{
    this.tt = document.createTextNode(this.def_title);
  }
  this.elem.appendChild(this.tt);
  this.Container.appendChild(this.elem);
  // click
  if(this.attributes.action=="LogIn"){
    this.elem.onclick=()=>{
      //alert("login clicked !");
      this.UserLoginFunction(this.Container);
    }
  }
  else if(this.attributes.action=="SignUp"){
    this.user_table=this.attributes.userTable;
    this.maximumId = user.id;
    //this.last_user_id =  user.user_id;
    this.elem.onclick=()=>{
      //alert("Sign Up clicked !");
      console.log("user.user_id == "+this.maximumId)
      console.log("table == "+this.user_table);
      //console.log("last id == "+this.maximumId);
      this.SignUpFunction();
    }
  }
  else if(this.attributes.action==showSignUpAttributes){
    try{
      SignUpContainer.showdiv();
    }
    catch(err){
      alert(err.text);
    }
  }
  else if(this.attributes.action=="getSavedData"){
    this.elem.onclick=()=>{
      this.readSavedData();
    }
  }
  else if(this.attributes.action=="getNowDate"){
    this.elem.onclick=()=>{
      this.getNowDate();
    }
  }
  else if(this.attributes.action=="showSignUp"){
    this.elem.onclick=()=>{
      //alert("Sign Up clicked !");
      this.showSignUpBlock();
    }
  }
  //showLogin
  else if(this.attributes.action=="showLogin"){
    this.elem.onclick=()=>{
      this.showLoginBlock();
    }
  }
  else if(this.attributes.action=="SignOut"){
    this.elem.onclick=()=>{
      this.signOut();
    }
  }
  else if(this.attributes.action=="delUser"){
    this.elem.onclick=()=>{
     alert("clicked delete btn");
      this.deleteUserFunc();
    }
  }
  else if(this.attributes.action=="editUser"){
    this.elem.onclick=()=>{
     // alert("clicked edit btn: with user id = "+ this.deletableUserID); // ok
      this.editUserFunc();
    }
  }
  else if(this.attributes.action=="saveInput"){
    this.elem.onclick=()=>{
      alert("clicked saveInput Button "+ user); //
      console.log(user);
      this.loadContent(pageContent); // pageContent is instance of pageContent CLASS
      this.saveInputFunc(darchTemplate);
    }
  }
  else if(this.attributes.action=="addField"){
    this.elem.onclick=()=>{
      alert("clicked addField Button "+ user); //
      this.addField(); // 
    }
  }
  // editUser

  this.UserLoginFunction = this.UserLoginFunction.bind(this);
  this.SignUpFunction = this.SignUpFunction.bind(this);
 // this.createMenu=this.createMenu.bind(this);
  this.readSavedData = this.readSavedData.bind(this);
  this.getNowDate = this.getNowDate.bind(this);
  //this.signOut=this.signOut.bind(this);
  this.getContainer = this.getContainer.bind(this);
  this.showSignUpBlock = this.showSignUpBlock.bind(this);
  this.showLoginBlock = this.showLoginBlock.bind(this);
  this.deleteUserFunc = this.deleteUserFunc.bind(this);
  this.editUserFunc = this.editUserFunc.bind(this);
  //this.getMaxId = this.getMaxId.bind(this);
  this.setUserID = this.setUserID.bind(this);
  this.saveChangedUser = this.saveChangedUser.bind(this);
  this.saveInputFunc = this.saveInputFunc.bind(this);
  this.loadContent=this.loadContent.bind(this);
  this.addField = this.addField.bind(this);
}
//
Button.prototype.addField = function(parentID, index, keyword){
  let inputfield = new textField(parentID, "tf", "", this.phrase, {type:"text", 
                                                                 tf_class:"inputs",  
                                                                 keyword:keyword,
                                                                 index:index});
}
//
Button.prototype.loadContent =  function(pageCont){
  this.inputConent = pageCont
}
//
Button.prototype.saveInputFunc =  function(tmplt){
  /*
  let darchTemplate = {
  akw: {...akeywords},
  akwTitles: {...aKwTitles},
  akwtTypes: {...akeywordTypes},
  akwRemember: {...akeywordRemember}
} 
Object.keys(tmplt).forEach(e=>{
    if(e=="akw"){
      console.log("akewords");
      anum_kwd = Object.keys(tmplt[e]);
      console.log(anum_kwd);
      akeywords = Object.values(tmplt[e]);
      console.log(akeywords);
    }
  }
) */
let objdoc={};
let loop=[];
  let name_kw=[];
  let name_val=[];
  let notEmptyTFvalues=[];
  let notEmptyTFids=[];
  Object.keys(tmplt).forEach(e=>{
      if(e=="akw"){
        console.log("akewords");
        name_kw = Object.keys(tmplt[e]);
        console.log(name_kw);
        name_val = Object.values(tmplt[e]);
        console.log(name_val);
      }
    }
  )
  let i=0;
  let j=0;
  let k=0;
  let m=0;
  for(i = 0; i < name_kw.length; i++){
    for(k=0; k<allinputIDs.length; k++){
      if(allinputIDs[k].includes(name_kw[i])){
        //aTmp[m]=document.getElementById(allinputIDs[k]).value;
        notEmptyTFids[j]=allinputIDs[k];
        notEmptyTFvalues[j] = document.getElementById(allinputIDs[k]).value;
        j++;
      }
      
    }
  }
  /*
  for(i=0; i<notEmptyTFids.length; i++){
    if(notEmptyTFids[i] != undefined){
      objdoc.notEmptyTFids[i]=notEmptyTFvalues[i];
    }
  }
  */
  console.log(notEmptyTFids);
  console.log(notEmptyTFvalues);
  console.log(allinputIDs);
  console.log(objdoc);
  //console.log(this.inputConent);
  console.log("Button.prototype.saveInputFunc");
  //console.log(inputDocument);
}
//
Button.prototype.saveChangedUser = async function(usserr){

}
//
Button.prototype.setUserID = function(id){
  this.deletableUserID = id
}
//
Button.prototype.editUserFunc = async function(){
  // 1. getting old data by id
  if(this.deletableUserID){
    alert(this.deletableUserID);  // OK
    const response = await fetch("http://elastic/users/_doc/"+this.deletableUserID);
    const jsonedit = await response.json();
    //const json = response.json();
    let editObj = await {
      email: jsonedit._source.email,
      login: jsonedit._source.login,
      password: jsonedit._source.password,
      username:  jsonedit._source.username,
      userstatus: jsonedit._source.userstatus,
      registered: timeConverter(jsonedit._source.registered) 
    }
    console.log(editObj);
    console.log(jsonedit); // ok
    // hiding container
    if(SignUpContainer != undefined){
      await SignUpContainer.hidediv();
    }
    let editforms = document.getElementsByClassName(EditUserDivClass);
    if(editforms.length>0){
      for(let i=0; i<editforms.length; i++){
        await editforms[i].remove();
      }
    }
    let frmUserEdit = await makeUserEditForm(this.deletableUserID, EditUserDiv_id, EditUserDivClass);
  }
  // hiding container // hidediv()
  // 2. filling te second copy of New User Registration form and displaying
  // making "Save Changes" Button with saveCangedUserAttributes
  
}



//
Button.prototype.deleteUserFunc = async function(){
  if(this.deletableUserID){
    alert(this.deletableUserID);
  }
  else{
    alert("No ID TO DELETE");
    return;
  }
  const response = await fetch("http://elastic/users/_doc/_delete_by_query", 
    {
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
      },  
    method: "POST",
    body:JSON.stringify(
      {
        "query":{
          "terms": {
            "_id": [
              this.deletableUserID
            ]
          }
        }
      }
    )
    }
  )
  const jsonn = await response.json()
  //const json = response.json();
  console.log(jsonn);
  alert(jsonn["deleted"]);
}
//
Button.prototype.getContainer = function(){
  return this.Container;
}
//
// Searching MAX id from argument table(type)
/*
Button.prototype.getMaxId = function(){
  searchUserMaxId();
}
*/
Button.prototype.showLoginBlock = function(){
  let tblUser = document.getElementById(allUsersTableId); // allUsersTableId is global
  tblUser.style.display="none";
  SignUpContainer.hidediv();
  LoginContainer.showdiv();

}
//
Button.prototype.showSignUpBlock = function(){
  let tblUser = document.getElementById(allUsersTableId); // allUsersTableId is global
  tblUser.style.display="block";
  SignUpContainer.showdiv();
  LoginContainer.hidediv();

}
//
Button.prototype.UserLoginFunction = function(){
    console.info("user Login is: "+ tfLogin.getText() + ", and user Password is: "+  
        tfPassw.getText()+" Checkbox: getChecked() "+  chPassw.getChecked() + ", Checkbox: getText(): " + chPassw.getText());
    // user.username=tfLogin.getText();
    let logged = searchUser(tfLogin.getText(), tfPassw.getText()) ;
    if(logged){
      //this.getContainer();
      
      LoginContainer.hidediv();
      SignUpContainer.hidediv();
      let tblUser = document.getElementById(allUsersTableId); // allUsersTableId is global
      tblUser.style.display="none";
        // aContent - array of containers of cantent
      //aContent[active_menu].showContent();
      aContent[active_menu].showContent();
      makeMenu.updateMenu(user.username);
     //makeMenu.updateMenu(user.username);
      makeMenu.elm.style.display="block"; // instance of topMenu class
     // aDiv.showdiv();
     //alert("logged");
     makeMenu.updateMenu(user.username);
     //setTimeout(alert(user.username), 5000);
     // makeMenu.updateMenu(user.username);
    }
}
Button.prototype.getNowDate = function(){
  let dd = new Date();
  console.info("Button.getNowDate(): Current timestamp is :"+dd.getTime());
  console.info("Button.getNowDate(): Current date is :"+dd);
  let savedTimeStamp = Number(localStorage.getItem('tstamp_last'));
  //let savedTmStmp = new Date(Number(savedTimeStamp));
  console.info("Te diference between saved and now date is :");
  console.info(savedTimeStamp - Number(dd.getTime()));
  return savedTimeStamp - Number(dd.getTime());
}
//
Button.prototype.readSavedData = function(){
  let savedTimeStampp = localStorage.getItem('tstamp_last');
  let zap_password = localStorage.getItem('zappassw');
  let zap_login = localStorage.getItem('zaplogin');
  let savedData = [savedTimeStampp,zap_password,zap_login]; // array af saved data
  console.info("saved Data from local storage using new Button.readSavedData:");
  console.info(savedData);
  //return savedData;
}
//
Button.prototype.SignUpFunction = function(){
  console.info("Beginning New User Registration ....");
  let newUserStatus =  selUserStatus.getText();
  let newUserName = tfuserName.getText();
  let newUserLogin = tfuserLogin.getText();
  let newUserEmail = tfuserEmail.getText();
  let newUserPassw = tfnNewUserPassw.getText();
  let newUserConfirm = tfnNewUserPasswConfirm.getText();
  //user.userstatus = newUserStatus;
 let usernew = {
  userstatus:newUserStatus,
  username:newUserName,
  password:newUserPassw,
  login:newUserLogin,
  email:newUserEmail,
  registerd:Date.now
 }
  if(newUserPassw !== newUserConfirm){
    alert("User Password Confirmation is wrong");
    return;
  }
  else{
    user.password = newUserPassw;
  }
  //
  if(newUserStatus){
    user.userstatus = newUserStatus;
  }
  if(newUserName){
    user.username = newUserName;
  }
  if(newUserLogin){
    user.login = newUserLogin;
  }
  if(newUserEmail){
    user.email = newUserEmail;
  }
  console.log(user); 
  console.log(usernew); 
  console.info(newUserStatus + "  " + newUserName + "  " + newUserLogin + "  " + newUserEmail + "  " + newUserPassw );
  //saveUser(user);
  saveUser(usernew);
  //delete usernew;
  console.info("... end of New User Registration");
}
// ************************************************* attributes *****
// Attributes for Button object
let LoginAttributes = {
  title:"Log In",
  action:"LogIn"
}
// Sign Up Attributes
let signUpAttributes = {
  title:"Sign Up",
  action:"SignUp",
  userTable:"users"
}
// 
let showSignUpAttributes = {
  title:"Show Sign Up",
  action:"showSignUp"
}
//
let checkAttrubutes = {
  title:"Check Saved Data",
  action:"getSavedData"
}
let nowDateAttrubutes = {
  title:"Get Date NOW",
  action:"getNowDate"
}
let signOutAttributes = {
  title:"Sign Out",
  action:"SignOut"
}
let showLoginAttributes = {
  title:"sow Login Panel",
  action:"showLogin"
}
let deleteUserAttributes = {
  title:"Delete User",
  action:"delUser"
}
let editUserAttributes = {
  title:"Edit User",
  action:"editUser"
}
let saveInputAttributes = {
  title:"Save Input Data",
  action:"saveInput"
}
//
var LoginContainer = new Container(loginDiv_id, loginDivClass, "User Login Form", true);  // log in
// function(ContainerID, ID, Class="", Label="input field label",  Attributes={}) // text field 
// login text field 
let tfLogin = new textField("id_userlogin", "id_tf_user_login", "tf_panel", "User Login", {placeholder: "enter login"});
let userLoginDiv = tfLogin.getForm(); // login box
LoginContainer.addChild(userLoginDiv);          // login text field is inside log in div
// password text field
let tfPassw = new textField("id_userPassw", "id_tf_user_passw", "tf_panel", "User Password", 
                                                                      {placeholder: "enter password", type:"password"});
let userPasswDiv = tfPassw.getForm(); // password box
LoginContainer.addChild(userPasswDiv);          // password box is inside  log in div
// checkbox to remember login/password
let chPassw = new textField("id_userSubmit", "id_tf_user_submit", "tf_panel", "Remember Password", 
                                                                      {type:"checkbox", value: "2"});
let chPasswDiv = chPassw.getForm();   // checkbox container (box)
LoginContainer.addChild(chPasswDiv);            // checkbox containeris inside  log in div

// login and sign up  buttons
let loginBtn = new Button(chPasswDiv, "button", LoginAttributes);     // "Login" button inside checkbox container (box)
let signUpBtn = new Button(chPasswDiv, "button", showSignUpAttributes);   // "Sign Up" button inside checkbox container (box)
// End of  Functions from loginadmin.js  ************************************
//
// 
// Making Sign up Container ************************************************  Making Sign up Container 
var SignUpContainer = new Container(signUpDiv_id, signUpDivClass, "New User Registration Form", true);  
// new user Status text field 
let selUserStatus = new dropDown("id_userStatus", "id_sel_user_Status", "tf_panel", "choose Status", "user", newUserOptionValues);
let userStatusDiv = selUserStatus.getForm(); // new user Status box
SignUpContainer.addChild(userStatusDiv);          // Status dropDown is inside sign up div
// new user Name text field 
let tfuserName = new textField("id_userName", "id_tf_user_Name", "tf_panel", "new User Name", {placeholder: "enter new User Name"});
let userNameDiv = tfuserName.getForm(); // new user name box
SignUpContainer.addChild(userNameDiv);          // name text field is inside sign up div
// new user Login field
let tfuserLogin = new textField("id_userLogin", "id_tf_user_LogIn", "tf_panel", "new User Login", {placeholder: "enter new User Login"});
let newUserLoginDiv = tfuserLogin.getForm(); // new user Login box
SignUpContainer.addChild(newUserLoginDiv);          // new user login text field is inside sign up div
// new user email field
let tfuserEmail = new textField("id_userEmail", "id_tf_user_email", "tf_panel", "new User Email", {placeholder: "enter new User Email",
                                                                                              type:"email"});
let newUserEmailDiv = tfuserEmail.getForm(); // new user Login box
SignUpContainer.addChild(newUserEmailDiv);          // new user email text field is inside sign up div
// new user password text field
let tfnNewUserPassw = new textField("id_NewUserPassw", "id_tf_new_user_passw", "tf_panel", "Enter New Password", 
                                                                      {placeholder: "enter password", type:"password"});
let NewUserPasswDiv = tfnNewUserPassw.getForm(); // password box
SignUpContainer.addChild(NewUserPasswDiv);          // password box is inside  sign up div
// new user Confirm password text field
let tfnNewUserPasswConfirm = new textField("id_NewUserPasswConfirm", "id_tf_new_user_passw_confirm", "tf_panel", "Confirm New Password", 
                                                                      {placeholder: "confirm password", type:"password"});
let NewUserPasswConfDiv = tfnNewUserPasswConfirm.getForm(); // password box
SignUpContainer.addChild(NewUserPasswConfDiv);          // password box is inside  sign up div
// buttons
let btnEmptyDiv = document.createElement("div");
btnEmptyDiv.setAttribute("class","tf_panel");
SignUpContainer.addChild(btnEmptyDiv);  
let saveNewUserBtn = new Button(btnEmptyDiv, "button", signUpAttributes);     // "Login" button inside checkbox container (box)
//btnEmptyDiv.innerHTML = saveNewUserBtn;
let showLogiBtn = new Button(btnEmptyDiv, "button", showLoginAttributes);     // "Login" button inside checkbox container (box)
//
SignUpContainer.hidediv();
//

// Function to make Edit User Container ************************************************  Making Sign up Container 
async function makeUserEditForm(user_id, EditUserDiv_id, EditUserDivClass){
  let statuses = newUserOptionValues; // global var
  let res = await fetch("http://elastic/users/_doc/"+user_id);
  let json = await res.json();
  //alert("found by ID: "+json.hits.total);
 // console.info(json.hits.total)
  console.info(json)
  let foundrecord = json.found;
  if(foundrecord){
      let userstatus = json._source.userstatus;
      let username = json._source.username;
      let password = json._source.password;
      let login = json._source.login;
      let email = json._source.email;
      console.log(userstatus)
      // making form
      let EditUserContainer = new Container(EditUserDiv_id, EditUserDivClass, "Edit User Form", true);  
      // new user Status dropdown 
      //dropDown = function(ContainerID, ID, Class="", Label="Select field label", selectedValue = "0",  OptionValues=[]){
      let selUserStatusEd = new dropDown("id_userStatusEd", "id_sel_user_StatusEd", "tf_panel", "change Status", userstatus, statuses);
      let userStatusDiv = selUserStatusEd.getForm(); // new user Status box
      EditUserContainer.addChild(userStatusDiv);          // Status dropDown is inside sign up div
      // new user Name text field 
      let tfuserNameEd = new textField("id_userNameEd", "id_tf_user_NameEd", "tf_panel", "User Name", {value: username});
      let userNameDiv = tfuserNameEd.getForm(); // new user name box
      EditUserContainer.addChild(userNameDiv);          // name text field is inside sign up div
      // new user Login field
      let tfuserLoginEd = new textField("id_userLoginEd", "id_tf_user_LogInEd", "tf_panel", "User Login", {value: login});
      let EditUserLoginDiv = tfuserLoginEd.getForm(); // new user Login box
      EditUserContainer.addChild(EditUserLoginDiv);          // new user login text field is inside sign up div
      // new user email field
      let tfuserEmailEd = new textField("id_userEmailEd", "id_tf_user_emailEd", "tf_panel", "User Email", {value: email,
                                                                                                    type:"email"});
      let EditUserEmailDiv = tfuserEmailEd.getForm(); // new user Login box
      EditUserContainer.addChild(EditUserEmailDiv);          // new user email text field is inside sign up div
      // new user password text field
      let tfnEditUserPasswEd = new textField("id_EditUserPasswEd", "id_tf_new_user_passwEd", "tf_panel", "Enter New Password", 
                                                                            {placeholder: "enter changed password", 
                                                                            type:"password", 
                                                                            old_password: password
                                                                          });
      let EditUserPasswDiv = tfnEditUserPasswEd.getForm(); // password box
      EditUserContainer.addChild(EditUserPasswDiv);          // password box is inside  sign up div
      // new user Confirm password text field
      let tfnEditUserPasswConfirm = new textField("id_EditUserPasswConfirm", "id_tf_new_user_passw_confirmEd", "tf_panel", "Confirm New Password", 
                                                                            {placeholder: "confirm password", type:"password"});
      let EditUserPasswConfDiv = tfnEditUserPasswConfirm.getForm(); // password box
      EditUserContainer.addChild(EditUserPasswConfDiv);          // password box is inside  sign up div
      // buttons
      let btnEmptyDivEdit = document.createElement("div");
      btnEmptyDivEdit.setAttribute("class","tf_panel");
      EditUserContainer.addChild(btnEmptyDivEdit);  
      let saveEditUserBtn = new Button(btnEmptyDivEdit, "button", {title:"Edit User", action:"editUser"});     
      
      let showResetBtn = new Button(btnEmptyDivEdit, "button", {type:"reset", title:"Reset", action:"reset"});    
      //btnEmptyDivEdit.addChild(saveEditUserBtn);
      //btnEmptyDivEdit.addChild(showResetBtn); 
      //EditUserContainer.hidediv();
      return EditUserContainer;
  }
  else{
      alert("no Data Found to Edit");
      return false;
  }
  //
}
//
let EditUserFormClass = function(jsonData, EditUserDiv_id, EditUserDivClass){
  this.DivID = EditUserDiv_id;
  this.DivClass = EditUserDivClass;
  this.user_id = jsonData._id;
  this.userstatus = jsonData._source.userstatus;
  this.username = jsonData._source.username;
  this.login = jsonData._source.login;
  this.email = jsonData._source.email;
  this.oldpassword = json._source.password;
  this.statuses = newUserOptionValues; // ["user", "admin", "director"];
  this.newUser = {}
  //
  this.EditUserContainer = new Container(this.DivID, this.DivClass, "Edit User Form 1", true);  
      // new user Status dropdown 
      //dropDown = function(ContainerID, ID, Class="", Label="Select field label", selectedValue = "0",  OptionValues=[]){
  this.selUserStatusEd = new dropDown("id_userStatusEd", "id_sel_user_StatusEd", "tf_panel", "change Status", this.userstatus, this.statuses);
  this.userStatusDiv = this.selUserStatusEd.getForm(); // new user Status box
  this.EditUserContainer.addChild(this.userStatusDiv);          // Status dropDown is inside sign up div
      // new user Name text field 
  this.tfuserNameEd = new textField("id_userNameEd", "id_tf_user_NameEd", "tf_panel", "User Name", {value: this.username});
  this.userNameDiv = this.tfuserNameEd.getForm(); // new user name box
  this.EditUserContainer.addChild(this.userNameDiv);          // name text field is inside sign up div
      // new user Login field
  this.tfuserLoginEd = new textField("id_userLoginEd", "id_tf_user_LogInEd", "tf_panel", "User Login", {value: this.login});
  this.EditUserLoginDiv = this.tfuserLoginEd.getForm(); // new user Login box
  this.EditUserContainer.addChild(this.EditUserLoginDiv);          // new user login text field is inside sign up div
      // new user email field
  this.tfuserEmailEd = new textField("id_userEmailEd", "id_tf_user_emailEd", "tf_panel", "User Email", {value: this.email,
                                                                                                    type:"email"});
  this.EditUserEmailDiv = this.tfuserEmailEd.getForm(); // new user Login box
  this.EditUserContainer.addChild(this.EditUserEmailDiv);          // new user email text field is inside sign up div
      // new user password text field
  this.tfnEditUserPasswEd = new textField("id_EditUserPasswEd", "id_tf_new_user_passwEd", "tf_panel", "Enter New Password", 
                                                                            {placeholder: "enter changed password", 
                                                                            type:"password", 
                                                                            old_password: this.oldpassword
                                                                          });
  this.EditUserPasswDiv = this.tfnEditUserPasswEd.getForm(); // password box
  this.EditUserContainer.addChild(this.EditUserPasswDiv);          // password box is inside  sign up div
      // new user Confirm password text field
  this.tfnEditUserPasswConfirm = new textField("id_EditUserPasswConfirm", "id_tf_new_user_passw_confirmEd", "tf_panel", "Confirm New Password", 
                                                                            {placeholder: "confirm password", type:"password"});
  this.EditUserPasswConfDiv = this.tfnEditUserPasswConfirm.getForm(); // password box
  this.EditUserContainer.addChild(this.EditUserPasswConfDiv);          // password box is inside  sign up div
      // buttons
  this.btnEmptyDivEdit = document.createElement("div");
  this.btnEmptyDivEdit.setAttribute("class","tf_panel");
  this.EditUserContainer.addChild(this.btnEmptyDivEdit);  
  
  this.saveEditUserBtn = new Button(this.btnEmptyDivEdit, "button", {title:"Edit User", action:"SaveUserChanges"});     
  this.showResetBtn = new Button(this.btnEmptyDivEdit, "button", {type:"reset", title:"Reset", action:"reset"}); 
  //   functions
  this.collectData = this.collectData.bind(this);
  this.saveChanges = this.saveChanges.bind(this);
}
//
EditUserFormClass.prototype.saveChanges = async function(){
  await this.collectData();
  await saveChangedUser(this.user_id, this.newUser);
}
//
EditUserFormClass.prototype.collectData = async function(){
  this.newUser.status = await this.selUserStatusEd.getText();
  this.newUser.username = await this.tfuserNameEd.getText();
  this.newUser.login = await this.tfuserLoginEd.getText();
  this.newUser.email = await this.tfuserEmailEd.getText();
  this.newUser.password = await this.tfnEditUserPasswEd.getText();
}
// function for making array of objects from template object
let objTemplateMake = (tmplt)=>{
  let anum_kwd = [];  
  let anum_phr = [];  
  let anum_typ = [];  
  let anum_remember = [];
  let akeywords = [];
  let asearchedPhrases=[];
  let aphrasetype=[];
  let aphraseRemember=[];
  Object.keys(tmplt).forEach(e=>{
    if(e=="akw"){
      console.log("akewords");
      anum_kwd = Object.keys(tmplt[e]);
      console.log(anum_kwd);
      akeywords = Object.values(tmplt[e]);
      console.log(akeywords);
    }
    else if(e=="akwTitles"){
      console.log("akeword titles");
      anum_phr = Object.keys(tmplt[e]);
      console.log(anum_phr);
      asearchedPhrases = Object.values(tmplt[e]);
      console.log(asearchedPhrases);
    }
    else if(e=="akwtTypes"){
      console.log("akeword types");
      anum_typ = Object.keys(tmplt[e]);
      console.log(anum_typ);
      aphrasetype = Object.values(tmplt[e]);
      console.log(aphrasetype);
    }
    else if(e=="akwRemember"){
      console.log("akeword remembering");
      anum_remember = Object.keys(tmplt[e]);
      console.log(anum_remember);
      aphraseRemember = Object.values(tmplt[e]);
      console.log(aphraseRemember);
    }
    let dvTempl = document.createElement("div");
    console.log(`key=${e} keys == ${Object.keys(tmplt[e])} values == ${Object.values(tmplt[e])}`)
  });
  // checking array sizes
  if(anum_kwd.length == anum_phr.length && anum_kwd.length == anum_typ.length){
    let sz = anum_kwd.length;
    if(sz == akeywords.length && sz == asearchedPhrases.length && sz == aphrasetype.length && sz == aphraseRemember.length){
      console.log("lengths are equal");
      let aobj_template=[];
      for(let i=0; i<sz; i++){
        let phraseObj={};
        phraseObj.keyWord=akeywords[i];
        phraseObj.phrase=asearchedPhrases[i];
        phraseObj.phraseType=aphrasetype[i];
        phraseObj.phraseRemember=aphraseRemember[i];
        //console.log(phraseObj);
        aobj_template.push(phraseObj);
        delete(phraseObj)
        //console.log(akwobjects[i]);
      }
      //conmsole.log(obj);
      return aobj_template;
    }
    else{
      alert("different numbers and phrases length");
      return;
    }
  }
  else{
    alert("different array lengthes to make template object");
    return;
  }
}
//  description of object in  returned array of  objects: phraseObj(OBJECT) in aobj_template(ARRAY)
// 1. phraseObj.keyWord - the name of key | field name in database
// 2. phraseObj.phrase - the kay in word document (real key in own language of data: Armenian)
// 3. phraseObj.phraseType - the type of field (1.) in which will be saved data:, text, number, ....
// 4. phraseObj.phraseRemember - for putting "remember" chackbox in last column of input row
// one row of data input form-table according to THIS template consists of four columns listed above
// pageContent.loadContent function is to create template form, input form, import form,....


// ************************************************************************************************************** 
/*
var darchTemplate={
  sackful:"ՊԱՐԿ N",
  bag: "ԿԱՊ N",
  portfoilo: "Թղթապանակ",
  docNumber: "Փաստաթուղթ N",
  address_street: "հասցե, փողոց",
  district: "թաղամաս.",
  theme_event: "Փ.-իթեմանկամիրադարձությունը, թվ.-ըկարևորիմաստով",
  id: "Հերթական համար.",
  title: "Վերնագիր.",
  address: "Հասցե.",
  owner: "Սեփականատեր.",
  buyer: "Գնորդ.",
  seller: "Վաճառող.",
  type: "Տեսակ.",
  source: "Աղբյուր.",
  docScanned: "Էջը թվայնացված.",
  bigFile: "Մեծ ֆայլ. pdf, doc, mpeg.",
  searchWords: "Որոնման բառեր.",
  language: "Լեզու.",
  preliminary_analysis: "Նախնական վերլուծություն.",
  feedback: "Կարծիքներ համացանցից.",
  description: "Նկարագրություն."
}
*/

// Darch Template
let akeywords = [
  "park",
  "kap",
  "papka",
  "documentNum",
  "addressStreet",
  "kvartal",
  "temaEvent",
  "idNumber",
  "title",
  "address",
  "owner",
  "buyer",
  "seller",
  "type",
  "source",
  "pageScanned",
  "bigFile",
  "sw",
  "lang",
  "primaryAnalysis",
  "feedback",
  "description"
];
let aKwTitles = [
  "ՊԱՐԿ N",
  "ԿԱՊ N",
  "Թղթապանակ.",
  "Փաստաթուղթ. N",
  "հասցե, փողոց",
  "թաղամաս.",
  "Փ.-իթեմանկամիրադարձությունը, թվ.-ըկարևորիմաստով",
  "Հերթական համար.",
  "Վերնագիր.",
  "Հասցե.",
  "Սեփականատեր.",
  "Գնորդ.",
  "Վաճառող.",
  "Տեսակ.",
  "Աղբյուր.",
  "Էջը թվայնացված.",
  "Մեծ ֆայլ. pdf, doc, mpeg.",
  "Որոնման բառեր.",
  "Լեզու.",
  "Նախնական վերլուծություն.",
  "Կարծիքներ համացանցից.",
  "Նկարագրություն."
];
let akeywordTypes=[
  "number",    // "ՊԱՐԿ N",
  "number",    // "ԿԱՊ N",
  "text",    // "Թղթապանակ.",
  "number",    // "Փաստաթուղթ. N",
  "text_array",  // "հասցե, փողոց",
  "text",    // "թաղամաս.",
  "text",  // "Փ.-իթեմանկամիրադարձությունը, թվ.-ըկարևորիմաստով",
  "text_id_db",    // "Հերթական համար.",
  "text",    // "Վերնագիր.",
  "text",    // "Հասցե.",
  "text_array",  // "Սեփականատեր.",
  "text_array",  // "Գնորդ.",
  "text_array",  // "Վաճառող.",
  "text",    // "Տեսակ.",
  "text",    // "Աղբյուր.",
  "text_array",  // "Էջը թվայնացված.",
  "text_array",  // "Մեծ ֆայլ. pdf, doc, mpeg.",
  "text_array",  // "Որոնման բառեր.",
  "text_array",  // "Լեզու.",
  "text_big", // "Նախնական վերլուծություն.",
  "text_big_array", // "Կարծիքներ համացանցից.",
  "text_big"     // "Նկարագրություն."
];
let akeywordRemember=[
  true,      // "ՊԱՐԿ N",
  true,      // "ԿԱՊ N",
  true,     // "Թղթապանակ.",
  "autoincrement",    // "Փաստաթուղթ. N",
  true,     // "հասցե, փողոց",
  true,    // "թաղամաս.",
  false,     // "Փ.-իթեմանկամիրադարձությունը, թվ.-ըկարևորիմաստով",
  "db_id",    // "Հերթական համար.",
  false,    // "Վերնագիր.",
  false,    // "Հասցե.",
  false,  // "Սեփականատեր.",
  false,  // "Գնորդ.",
  false,  // "Վաճառող.",
  false,    // "Տեսակ.",
  false,    // "Աղբյուր.",
  false,  // "Էջը թվայնացված.",
  false,  // "Մեծ ֆայլ. pdf, doc, mpeg.",
  false,  // "Որոնման բառեր.",
  false,  // "Լեզու.",
  false, // "Նախնական վերլուծություն.",
  false, // "Կարծիքներ համացանցից.",
  false    // "Նկարագրություն."
];
let darchTemplate = {
  akw: {...akeywords},
  akwTitles: {...aKwTitles},
  akwtTypes: {...akeywordTypes},
  akwRemember: {...akeywordRemember}
} 
//
var templateAttributes={
  type:"template",
  template: darchTemplate
}
//
var inputAttributes={
  type:"inputs",
  template: darchTemplate,
  footerclass:"cuntent_footer"
}
// *************** inputRow class  ******************
let inputRow = function(keyWord, phrase, phrType, phrRemember, Attributes={cell_class:"div_cell", 
                                                                            row_class:"div_row",
                                                                            cell_phr_id: "tfCell",
                                                                            cell_rem_id: "chCell"}){
  this.kw = keyWord; 
  this.phrase = phrase; 
  this.phraseType = phrType; 
  this.isRememberable = phrRemember; 
  this.attributes = Attributes; 
  this.aInputFields = []; 
  this.inputObj = {}; 
  this.inputCount=2;
  //
  if(this.attributes.cell_class){
    this.cellClass=this.attributes.cell_class
  }
  else{
    this.cellClass="div_cell"
  }
  //
  if(this.attributes.cell_phr_id){
    this.cellPrID = this.attributes.cell_phr_id;
  }
  else{
    this.cellPrID="tfCell"
  }
  //
  if(this.attributes.row_class){
    this.rowClass = this.attributes.row_class
  }
  else{
    this.rowClass="div_row"
  }
  //
  if(this.attributes.cell_rem_id){
    this.cellRemID = this.attributes.cell_rem_id
  }
  else{
    this.cellRemID="chCell";
  }
  //making caption row
  this.rowCaption = document.createElement("div");
  this.rowCaption.setAttribute("class", this.rowClass);
  // making caption Cells
  this.aCellCap_kw = document.createElement("div");
  this.aCellCap_kw.setAttribute("class", this.cellClass);
  this.aCellCap_kw.innerHTML = "<b>kewWords</b>"
  this.aCellCap_phr = document.createElement("div");
  this.aCellCap_phr.setAttribute("class", this.cellClass);
  this.aCellCap_phr.setAttribute("id", this.cellPrID);
  this.aCellCap_phr.innerHTML = "<b>Inputs</b>"
  this.aCellCap_rem = document.createElement("div");
  this.aCellCap_rem.setAttribute("class", this.cellClass);
  this.aCellCap_rem.innerHTML = "<b>Remember</b>";
  // Adding caption titles into Head Row
  this.rowCaption.appendChild(this.aCellCap_kw);
  this.rowCaption.appendChild(this.aCellCap_phr);
  this.rowCaption.appendChild(this.aCellCap_rem);
  // making data row
  this.row = document.createElement("div");
  this.row.setAttribute("class", this.rowClass);
  // making cells
  this.aCell_kw=document.createElement("div");
  this.aCell_kw.setAttribute("class", this.cellClass);
  this.aCell_kw.innerHTML="<b style='color:yellow'>"+this.kw+"</b>";
  this.aCell_phr=document.createElement("div");
  this.aCell_phr.setAttribute("class", this.cellClass);
  this.aCell_rem=document.createElement("div");
  this.aCell_rem.setAttribute("class", this.cellClass);
  this.aCell_rem.setAttribute("id", this.cellRemID);
  // making input field
  if(this.phraseType == "number" || this.phraseType == "text"){
    this.aInputFields[0] = new textField(this.cellPrID, "tf", "", this.phrase, {type:"text", 
                                                                                tf_class:"inputs", 
                                                                                keyword:this.kw});
    let ff = this.aInputFields[0].getForm();
    this.aCell_phr.appendChild(ff);
    delete ff;    
  }
  else if(this.phraseType == "text_big"){
    // textArea = function(ContainerID, ID, Class="", Label="input field label",  Attributes={}){
    // this.attributes.rows, this.attributes.cols
    this.aInputFields[0] = new textArea(this.cellPrID, "ta", "", this.phrase, {rows:5, cols:55, keyword:this.kw});
    let ff = this.aInputFields[0].getForm();
    this.aCell_phr.appendChild(ff);
    delete ff;
  }
  else if(this.phraseType == "text_array"){
    // Button = function(container, btntype = "button", Attributes={}){
    let i=0;
    this.aInputFields[i] = new textField(this.cellPrID, "tf", "", this.phrase, {type:"text", 
                                                                                    tf_class:"inputs",  
                                                                                    keyword:this.kw,
                                                                                    index:i});
    let ff = this.aInputFields[i].getForm();
    this.aCell_phr.appendChild(ff);
    
    i++;
    let btnAdd = new Button(ff, "button", {action:"addField", title:"+", index:i});                                                                              

        //this.aInputFields[i] = new textField(this.cellPrID, "tf", "", "", {type:"text", 
        //                                                                   tf_class:"inputs", 
        //                                                                   keyword:this.kw,
        //                                                                   index:i});
    delete ff;  
    
  }
  //
  if(this.isRememberable==true){
      //this.aCell_check_id[i] = "chCell_"+i;
      this.chBox = new textField(this.cellRemID, "ch", "", "", {type:"checkbox",  keyword:this.kw});
      let ff = this.chBox.getForm();
      this.aCell_rem.appendChild(ff);
      delete ff; 
  }
  // Adding Cells into row
  this.row.appendChild(this.aCell_kw);
  this.row.appendChild(this.aCell_phr);
  this.row.appendChild(this.aCell_rem);
  //
  this.addCaptionRowToTable = this.addCaptionRowToTable.bind(this);
  this.addRowToTable = this.addRowToTable.bind(this);
  this.setInputValues = this.setInputValues.bind(this);
}
// must be called first
inputRow.prototype.addCaptionRowToTable = function(tblarg){
  tblarg.appendChild(this.rowCaption);
}
// must be multiple called after addCaptionRowToTable()
inputRow.prototype.addRowToTable = function(tblarg){
  tblarg.appendChild(this.row);
}
//
inputRow.prototype.setInputValues = function(){
  this.inputObj.kw=this.kw;
  this.inputObj.texts=[];
  this.inputObj.rememberValue=false;
  for(let i =0; i<this.aInputFields.length; i++){
    let tt = this.aInputFields[i].getText();
    if(tt.length>0){
      this.inputObj.texts.push(this.aInputFields[i].getText())
    }
  }
  if(this.chBox){
    if(this.chBox.getText()==true){
      this.inputObj.rememberValue=true;
    }
  }
  console.log("inputRow.setInputValues: "+this.kw)
  console.log(this.inputObj)
}
// pageContent CLASS ****************************** pageContent CLASS  ******
let pageContent = function(sub_title, div_class, sub_title_class, Attributes={footerclass:"cuntent_footer"}){
  this.subtitle = sub_title;
  this.attributes=Attributes;
  this.contentDiv = document.createElement("div");
  this.subTitleDiv = document.createElement("div"); 
  this.contentDiv.setAttribute("class", div_class);
  this.subTitleDiv.setAttribute("class", sub_title_class);
  this.subTitleDiv.innerHTML = this.subtitle;
  this.contentDiv.appendChild(this.subTitleDiv);
  // container for buttons
  if(this.attributes.footerclass){
    this.footerClass=this.attributes.footerclass;
  }
  else{
    this.footerClass=div_class;
  }
  this.contentFooter = document.createElement("div");
  this.contentFooter.setAttribute("class", this.footerClass);
  //
  this.conAttrib = Attributes;
  // if content of page is template
  //
  this.showContent = this.showContent.bind(this);
  this.hideContent = this.hideContent.bind(this);
  //
  this.loadContent = this.loadContent.bind(this);
  this.loadContentRows = this.loadContentRows.bind(this);
  this.getFooter = this.getFooter.bind(this);
  this.addFooter = this.addFooter.bind(this);
  //this.getContentRows = this.getContentRows.bind(this);
}
//
pageContent.prototype.addFooter = function(){
  this.contentDiv.appendChild(this.contentFooter);
}
pageContent.prototype.getFooter = function(){
  return this.contentFooter;
}
//
pageContent.prototype.loadContentRows = function(parentDiv){
  if(this.conAttrib.type == "inputs"){
    /*
    let inputRow = function(keyWord, phrase, phrType, phrRemember, Attributes={cell_class:"div_cell", 
                                                                            row_class:"div_row",
                                                                            cell_phr_id: "tfCell",
                                                                            cell_rem_id: "chCell"}){
    */

    this.templ = this.conAttrib.template;
    this.afieldsObj = objTemplateMake(this.templ);
    this.tbl = document.createElement("div");
    this.tbl.setAttribute("class", "div_table");
    parentDiv.appendChild(this.tbl);
    this.aRows=[];
    this.j=0; // valid rows count

    for(let i =0; i<this.afieldsObj.length; i++){
      let aKeys = Object.keys(this.afieldsObj[i]);
      let aValues = Object.values(this.afieldsObj[i]);
      //let aCell=[];
       // aCell[k]=document.createElement("div");
       // aCell[k].setAttribute("class", "div_cell");
      if(aValues[2]=="text" || aValues[2]=="number" || aValues[2]=="text_big" || aValues[2]=="text_array"){
        this.aRows[this.j] = new inputRow(aValues[0], aValues[1], aValues[2], aValues[3]);
        this.j++;


      }
    }
    this.aRows[0].addCaptionRowToTable(this.tbl);
    for(let k=0; k<this.aRows.length; k++){
      this.aRows[k].addRowToTable(this.tbl);
    }
  }
}
//





//
pageContent.prototype.loadContent = function(parentDiv){
  if(this.conAttrib.type == "template"){
    //console.log("template");
    this.templ = this.conAttrib.template;
    this.afieldsObj = objTemplateMake(this.templ);
    let tbl = document.createElement("div");
    tbl.setAttribute("class", "div_table");
    parentDiv.appendChild(tbl);
    for(let i =0; i<this.afieldsObj.length; i++){
      let row = document.createElement("div");
      row.setAttribute("class", "div_row");
      console.log(row);
      tbl.appendChild(row);
      let aKeys = Object.keys(this.afieldsObj[i]);
      let aValues = Object.values(this.afieldsObj[i]);
      let aCell=[];
      for(let k =0; k<aKeys.length; k++){
        aCell[k]=document.createElement("div");
        aCell[k].setAttribute("class", "div_cell");
        aCell[k].innerHTML=aKeys[k]+": <b>"+aValues[k]+"</b>";
        row.appendChild(aCell[k]);
      }
      delete aCell;
    }
  }
  else if(this.conAttrib.type == "inputs"){
    // let textField = function(ContainerID, ID, Class="", Label="input field label",  Attributes={}){
    // textArea = function(ContainerID, ID, Class="", Label="input field label",  Attributes={}){
    // this.attributes.rows, this.attributes.cols
    this.ainputs=[];  // array of inputs : textField objects
    this.acheck_remember=[];  // array of checkboxes : textField objects
    this.aCell_input_id=[]; // array of ids of Table cells caontaining inputs
    this.aCell_check_id=[]; // array of ids of Table cells caontaining checkbox for remembering values
    this.templ = this.conAttrib.template;
    this.afieldsObj = objTemplateMake(this.templ);
    let tbl = document.createElement("div");
    tbl.setAttribute("class", "div_table");
    parentDiv.appendChild(tbl);
    for(let i =0; i<this.afieldsObj.length; i++){
      let row = document.createElement("div");
      row.setAttribute("class", "div_row");
      console.log(row);
      tbl.appendChild(row);
      let aKeys = Object.keys(this.afieldsObj[i]);
      let aValues = Object.values(this.afieldsObj[i]);
      let aCell=[];
      for(let k =0; k<aKeys.length; k++){
        aCell[k]=document.createElement("div");
        aCell[k].setAttribute("class", "div_cell");
        if(aKeys[k]=="phraseType"){
          if(aValues[k]=="text" || aValues[k]=="number"){
            this.aCell_input_id[i]="tfCell_"+i;
            
            aCell[k].setAttribute("id", this.aCell_input_id[i]);
            this.ainputs[i]=new textField(this.aCell_input_id[i], "tf_TN_"+i, "", "", {type:"text"});
            let ff = this.ainputs[i].getForm();
            aCell[k].appendChild(ff);
            //aCell[k].innerHTML=this.ainputs[i];
            row.appendChild(aCell[k]);
            delete ff;
            //("id_userlogin", "id_tf_user_login", "tf_panel", "User Login", {placeholder: "enter login"}
          }
        }
        else if(aKeys[k]=="phraseRemember"){
          if(aValues[k]==true){
            this.aCell_check_id[i] = "chCell_"+i;
            aCell[k].setAttribute("id", this.aCell_check_id[i]);
            this.ainputs[i]=new textField(this.aCell_check_id[i], "ch"+i, "", "remember", {type:"checkbox"});
            let ff = this.ainputs[i].getForm();
            aCell[k].appendChild(ff);
            //aCell[k].innerHTML=this.ainputs[i];
            row.appendChild(aCell[k]);
          }
        }
        else {

          aCell[k].setAttribute("id", this.aCell_check_id[i]);
          aCell[k].innerHTML=aKeys[k]+": <b>"+aValues[k]+"</b>";
          
        }
       row.appendChild(aCell[k]);
      }
      delete aCell;
    }
  }
}
//
pageContent.prototype.showContent = function(){
  this.contentDiv.style.display = "block";
  if(!document.body.contains(this.contentDiv)){
    document.body.appendChild(this.contentDiv);
  }
}
//
pageContent.prototype.hideContent = function(){
  this.contentDiv.style.display = "none";
  if(document.body.contains(this.contentDiv)){
    document.body.removeChild(this.contentDiv);
  }
}
// pageContent objects:  ***********  *****************  ******************
let pageContentTemplates = new pageContent("Templates Title", "div_1", "subtitle", templateAttributes);
pageContentTemplates.loadContent(pageContentTemplates.contentDiv);
//pageContentTemplates.hideContent();
let pageContentInput = new pageContent("Input Title", "div_2", "subtitle", inputAttributes);
//pageContentInput.loadContent(pageContentInput.contentDiv);
pageContentInput.loadContentRows(pageContentInput.contentDiv);
pageContentInput.addFooter();
let btnSaveInput = new Button(pageContentInput.getFooter(), "button", saveInputAttributes); // 

//
//pageContentInput.hideContent();
let pageContentImport = new pageContent("Import Title", "div_3", "subtitle");
pageContentImport.hideContent();
let pageContentManagement  = new pageContent("Management Title", "div_4", "subtitle");
pageContentManagement.hideContent();
let aContent = [pageContentTemplates, pageContentInput, pageContentImport, pageContentManagement];
// argument for topMenu class  ***********************************************
var menuAttrib={
  parentContainer:"body", // or any html object
  mnuContainerClass:"topmenu",
  archiveType:"informational", // or "commercial"
  aMenuTitles:["TEMPLATES", "INPUTS", "IMPORTS", "MANAGEMENT"],
  menuStyle_passive:"mnu_passive",
  menuStyle_active:"mnu_active",
  loggedUserBlockStyle:"username",
  logoutBlockStyle:"logout",
  current_active_index:0,
  aContents:aContent  //array of  contents as Objects
}
// ************************************************ topMenu CLASS *************
async function setUserNameLogged(menuObject, userObject){
  const  menuObj = await menuObject.loggedUserBlock
  const uname = await userObject.username;
  menuObj.innerHTML = uname;
}
let topMenu = function(Attributes={}){
  this.activeIndex = 0;
  this.attrib = Attributes;
  this.elm = document.createElement("div");
  this.menuStyle = this.attrib.mnuContainerClass;
  this.elm.setAttribute("class", this.menuStyle );
  this.Parent = this.attrib.parentContainer;
  this.containerCSSclass = this.attrib.mnuContainerClass;
  this.aContents = this.attrib.aContents;
  this.Titles = this.attrib.aMenuTitles;
  console.log(this.Titles);
  // user information block
  this.loggedUserBlockStyle=this.attrib.loggedUserBlockStyle;
  this.logoutBlockStyle=this.attrib.logoutBlockStyle;
  this.loggedUserBlock = document.createElement("div");
  alert("994 -- "+ user.username)
  this.loggedUserBlock.innerHTML = user.username;
  this.logOutBlock = document.createElement("div");
  this.loggedUserBlock.setAttribute("class", this.loggedUserBlockStyle);
  this.logOutBlock.setAttribute("class", this.logoutBlockStyle);
  this.logOutBlock.innerHTML=" LOG OUT";
  this.logOutBlock.addEventListener("mouseover", this.fover = ()=>{this.logOutBlock.style.textDecoration="underline"}, false);
  this.logOutBlock.addEventListener("mouseout", this.fout = ()=>{this.logOutBlock.style.textDecoration="none"}, false);
  this.logOutBlock.addEventListener("click", this.fclick = ()=>{
      console.log("LoGout clicked");
      this.signOut();
      //this.updateMenu();
    }, false);
  this.elm.appendChild(this.logOutBlock);
  this.elm.appendChild(this.loggedUserBlock);

  //
  this.passiveStyle  = this.attrib.menuStyle_passive;
  this.activeStyle = this.attrib.menuStyle_active;
  this.menuItems=Array;
  if(this.Parent == "body"){
      document.body.appendChild(this.elm );
  }
  else{
    document.body.appendChild(this.Parent);
    this.Parent.appendChild(this.elm);
  }
  for(let  i = 0; i<this.Titles.length; i++){
    console.log(this.Titles[i]);
    console.log(this.aContents[i].subtitle);
    this.menuItems[i] = document.createElement("div");
     this.menuItems[i].setAttribute("class", "inline_panel");
    if(i===this.activeIndex){
      this.menuItems[i].classList.add(this.activeStyle);
      this.aContents[i].showContent();
    }
    else{
      this.menuItems[i].classList.add(this.passiveStyle);
      this.aContents[i].hideContent();
    }
    this.menuItems[i].innerHTML=this.Titles[i];
    this.menuItems[i].addEventListener("mouseover", this.fover = ()=>{this.menuItems[i].style.textDecoration="underline"}, false);
    this.menuItems[i].addEventListener("mouseout", this.fout = ()=>{this.menuItems[i].style.textDecoration="none"}, false);
    this.menuItems[i].addEventListener("click", this.fclick = ()=>{this.activeIndex = i;
      console.log(this.activeIndex);
      this.updateMenu();
    }, false);
    this.elm.appendChild(this.menuItems[i]);
  }

 this.updateMenu = this.updateMenu.bind(this);
 this.signOut = this.signOut.bind(this);
  //this.fout = this.fout.bind(this);
}
//
topMenu.prototype.signOut=function(){
  localStorage.removeItem("zappassw");
  localStorage.removeItem("tstamp_last");
  localStorage.removeItem("zaplogin");
// user object : canging values to default
  user.username="Enter Your Name";
  user.login="Enter Login";
  user.email="Enter e-mail";
  user.islogged=false;
  let asavedData = getSavedData();
  checkUserData(asavedData);
  // hiding containers of content
  // aContent - array of containers of cantent
  for (let i=0; i<aContent.length; i++){
    aContent[i].hideContent();
  }
  this.elm.style.display="none";
}
//
topMenu.prototype.updateMenu = function(){
  // this.loggedUserBlock.innerHTML = user.username;
  this.loggedUserBlock.innerHTML = user.username;
  //console.log("activestyle added");
  for (let j=0; j<this.Titles.length; j++){
    if(j===this.activeIndex){
      // console.log("activestyle removed"); // OK
      this.menuItems[j].classList.remove(this.passiveStyle);
      this.menuItems[j].classList.add(this.activeStyle);  
      this.aContents[j].showContent();
    }
    else{
      // console.log("activestyle added"); // OK
      this.menuItems[j].classList.remove(this.activeStyle);
      this.menuItems[j].classList.add(this.passiveStyle);      
      this.aContents[j].hideContent();
    }
  }
}

//
let makeMenu = new topMenu(menuAttrib);

