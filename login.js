var user = {
  username: "Enter Your Name",
  login:"Enter Login",
  password: "Enter password",
  email: "Enter e-mail",
  islogged: false
}

var aVer = ["SEARCH", "ORGANIZATION", "COMPONENT", "USERS"];
var aDivId = ["div_1", "div_2", "div_3", "div_4"];
var aDivClass = ["div_1", "div_2", "div_3", "div_1"];
var aDivTitles = ["Search", "User Log In Form", "New User Registration Form", "Users form"];
var activeTitle="SEARCH";
var expireMinutes=30;
//
// date functions
function toTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
 }
// alert(toTimestamp(new Date));
 
 function timeConverter(UNIX_timestamp){
   var a = new Date(UNIX_timestamp * 1000);
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
}
//
/*
 localStorage.setItem("zappassw",user.password); // zappassw
      localStorage.setItem("zaplogin",user.login); // zaplogin
     // localStorage.setItem("tstamp_last",user.password);
      saveTimeStamp(expireMinutes); // tstamp_last
*/
document.body.onload = getSavedData();
function getSavedData(){
  let savedTimeStampp = localStorage.getItem('tstamp_last');
  let zap_password = localStorage.getItem('zappassw');
  let zap_login = localStorage.getItem('zaplogin');
  let savedData=[savedTimeStampp,zap_password,zap_login];
  console.info("Before checking: Array of onLoad data:  = " + savedData);
  let dnow = new Date ()
  

}
//checking if data belongs to the same record/document
async function checkUserData(){

}
// searching user by login/password
async function searchUser(userLogin, userPassw) {
  if(!userLogin || !userPassw){
      alert("searchUser(userLogin. userPassw) function parameter error");
      return;
  }
  const response = await fetch("http://elastic/zapchast/users/_search?q=login:"+userLogin, 
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
      user.password = json.hits.hits[0]._source.password;
      user.login = json.hits.hits[0]._source.login;
      user.email = json.hits.hits[0]._source.email;
      console.info(user);
      localStorage.setItem("zappassw",user.password); // zappassw
      localStorage.setItem("zaplogin",user.login); // zaplogin
     // localStorage.setItem("tstamp_last",user.password);
      saveTimeStamp(expireMinutes); // tstamp_last
      

      /*
    alert("user Login is: "+ tfLogin.getText() + ", and user Password is: "+  
        tfPassw.getText()+" Checkbox: getChecked() "+  chPassw.getChecked() + ", Checkbox: getText(): " + chPassw.getText());
      */
      return true;
  }
  else{
      return false;
  }
}
// user information object in upper right corner of  screen
var userInfo = function(userID){
  this.user_id = userID;
  // getting user information

}
//
let textField = function(ContainerID, ID, Class="", Label="input field label",  Attributes={}){
	this.id = ID;
  this.className = Class;
  this.isChecked=false;
  this.labelText = document.createTextNode(Label);
  this.parentid = ContainerID;
  this.attributes=Attributes;
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
  this.tf.setAttribute("id", this.id );
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
    alert(this.Value);
  }
  
  this.Container.appendChild(this.Label);
  this.Container.appendChild(this.tf);
  //document.body.appendChild(this.Container);
 this.getForm = this.getForm.bind(this);
 this.getChecked=this.getChecked.bind(this);
 this.getText = this.getText.bind(this);
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
textField.prototype.getChecked=function(){
  if(this.type=="checkbox"){
    alert("textField class function getChecked: "+this.tf.checked);
    return this.tf.checked;
  }
  else{
    alert("This function is actual only for checkBoxes");
    //return;
  }
}
// *************************************************
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
Container.prototype.showdiv=function(){
	this.visibility = true;
  this.elm.style.display = "block";
  console.log("container with id: "+this.id+" is Visible");
}
Container.prototype.hidediv=function(){
	this.visibility = false;
  this.elm.style.display = "none";
  console.log("container with id: "+this.id+" is hidden");
}
Container.prototype.addChild=function(obj){
	this.elm.appendChild(obj); 
}
//**********************************************************
// button class
let Button = function(container, btntype="button", Attributes={}){
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
      this.UserLoginFunction();
    }
  }
  else if(this.attributes.action=="SignUp"){
    this.elem.onclick=()=>{
      //alert("Sign Up clicked !");
      this.SignUpFunction();
      
    }
  }
  this.UserLoginFunction = this.UserLoginFunction.bind(this);
  this.SignUpFunction = this.SignUpFunction.bind(this);
}

Button.prototype.UserLoginFunction = function(){
    alert("user Login is: "+ tfLogin.getText() + ", and user Password is: "+  
        tfPassw.getText()+" Checkbox: getChecked() "+  chPassw.getChecked() + ", Checkbox: getText(): " + chPassw.getText());
    let logged = searchUser(tfLogin.getText(), tfPassw.getText()) ;
    if(logged){

    }
    alert(logged);
 }
Button.prototype.SignUpFunction = function(){
  alert("Must show New User Registration Form");
  bDiv.hidediv();
  eDiv.showdiv();

}
let LoginAttributes = {
  title:"Log In",
  action:"LogIn"
}
let signUpAttributes = {
  title:"Sign Up",
  action:"SignUp"
}

// menu
let mnuButton = function (title, containerID, isactive=false) {
	this.isActive=isactive;
  this.el = document.createElement('button');
  this.vern=title;
	this.tt = document.createTextNode(this.vern);
  this.divID = containerID;
  this.el.appendChild(this.tt);
  document.body.appendChild(this.el);
  this.clickHandler = this.clickHandler.bind(this);
  //this.clickHandler2 = this.clickHandler2.bind(this);
  this.addEvents();
}

mnuButton.prototype.addEvents = function () {
  this.el.addEventListener('click', this.clickHandler);
}

mnuButton.prototype.removeEvents = function () {
  this.el.removeEventListener('click', this.clickHandler);
}

mnuButton.prototype.clickHandler = function () {
  alert("clicked to "+this.vern+" this div must be visible: "+this.divID);
  this.removeEvents();
  this.isActive=true;
  activeTitle=this.vern;
  visible_div_id=this.divID;
  for(let i=0; i<aVer.length; i++){
  	if(activeTitle != aBtn[i].vern){
    	aBtn[i].addEvents();
      aContainer[i].hidediv();
    }
    else{
    	aContainer[i].showdiv();
    }
  }
}

let b = new mnuButton(aVer[0], aDivId[0]);
let c = new mnuButton(aVer[1], aDivId[1]);
let d = new mnuButton(aVer[2], aDivId[2]);
let e = new mnuButton(aVer[3], aDivId[3]);
//
let aDiv = new Container(aDivId[0], aDivClass[0], aDivTitles[0], true);
let bDiv = new Container(aDivId[1], aDivClass[1], aDivTitles[1]);  // log in
let cDiv = new Container(aDivId[2], aDivClass[2], aDivTitles[3]);
let eDiv = new Container(aDivId[3], aDivClass[3], aDivTitles[3]);
//
let fDiv  = new Container(aDivId[3], aDivClass[1], aDivTitles[2], aDivClass[1]);  // Sign Up
//
let tfLogin = new textField("id_userlogin", "id_tf_user_login", "div_login", "User Login", 
                              {placeholder: "enter login"});
console.log(bDiv.id+", "+tfLogin.parentid);
let userLoginDiv = tfLogin.getForm();
bDiv.addChild(userLoginDiv);
let tfPassw = new textField("id_userPassw", "id_tf_user_passw", "div_login", "User Password", 
                              {placeholder: "enter password", type:"password"});
let userPasswDiv = tfPassw.getForm();
bDiv.addChild(userPasswDiv);
let chPassw = new textField("id_userSubmit", "id_tf_user_submit", "div_login", "Remember Password", 
                              {type:"checkbox", value: "2"});
let chPasswDiv = chPassw.getForm();
bDiv.addChild(chPasswDiv);

let loginBtn = new Button(chPasswDiv, "button", LoginAttributes);
let signUpBtn = new Button(chPasswDiv, "button", signUpAttributes);



let aBtn = [b, c, d, e];
let aContainer = [aDiv, bDiv, cDiv, eDiv];

//alert('koko');
