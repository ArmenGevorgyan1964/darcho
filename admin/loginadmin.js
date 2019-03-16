var user = {
  username: "Enter Your Name",
  login:"Enter Login",
  password: "Enter password",
  email: "Enter e-mail",
  islogged: false
}

var aVer = ["SEARCH", "ORGANIZATION", "USERS"];
var aDivId = ["div_1", "div_2", "div_3"];
var aDivClass = ["div_1", "div_2", "div_3"];
var aDivTitles = ["SEARCH", "ARCHIVE MANAGEMENT", "REGISTERED USERS"];
var activeTitle = "SEARCH";
var expireMinutes = 1;
//
// login / sign Up / Menu containers
var loginDiv_id = "loginDivID";
var signUpDiv_id= "signUpDivID";
var menuDiv_id = "menuDivID";

// login / sign Up / Menu CSS classes
var loginDivClass = "div_login";
var signUpDivClass = "div_signup";
var menuDivClass = "div_menu";
// date functions
function toTimestamp(strDate){
  var datum = Date.parse(strDate);
  return datum/1000;
}
// alert(toTimestamp(new Date));
//function to show (flag=true) or hide (flag = false)  container (objDiv)
const showHideDiv = (objDiv, flag=true)=>{
  if(flag){
    objDiv.style.display="block";
  }
  else{
    objDiv.style.display="none";
  }
}
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
  console.info("SaveTimeStamp into local storage: d2 = "+d2.getTime()+", d1 = "+d1.getTime());
  console.info(" added "+expireMinutes+ "min  with deltadate = "+d1.getMinutes() +" + "+ deltaminutes);
}
//

document.body.onload = ()=>{
  let asavedData = getSavedData();
  checkUserData(asavedData);
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
  const response = await fetch("http://elastic/users/_search?q=login:"+lgn, 
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
  console.info("json from from async function checkUserData");
  console.info(json);
  console.info("in checkUserData() found: "+totalhits); // ok
  if(totalhits == 1 && json.hits.hits[0]._source.password == psw){
      const uname = json.hits.hits[0]._source.username;         // user.username
      const umail = json.hits.hits[0]._source.email;            // user.email
      // checking timestamp validity
      if(tmStmp - Number(dnow.getTime()) > 0){
        const d_tmp = new Date(Number(tmStmp));
        console.info("when loading - timeStamp: " + tmStmp + ", and NEW DATE == "+ dnow.getTime()+"  is valid.");
        console.info("when loading - Saved Date time is: " + d_tmp + ", and NEW DATE == "+ dnow+"  is valid.");
        // here must be code to display main manu with logged user name in upper right fo the screen
        alert("valid user: show main menu");
        LoginContainer.hidediv();
        aDiv.showdiv();
        //showHideDiv(LoginContainer, false);
        return true;
      }
      else{
        // go to user registration (login) page
        alert("User registration time expired! Go to user registration (login) page");
        LoginContainer.showdiv();
        //showHideDiv(LoginContainer, true)
        return false;
      }
  }
  else{
    LoginContainer.showdiv();
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
  const response = await fetch("http://elastic/users/_search?q=login:"+userLogin, 
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
      console.info("the user object is: ");
      console.info(user);
      localStorage.setItem("zappassw",user.password);   // zappassw
      localStorage.setItem("zaplogin",user.login);      // zaplogin
      // localStorage.setItem("tstamp_last",user.password);
      saveTimeStamp(expireMinutes);                     // tstamp_last
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
// textfield class
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
    console.log(this.Value);
  }
  this.Container.appendChild(this.Label);
  this.Container.appendChild(this.tf);
  //document.body.appendChild(this.Container);
  this.getForm = this.getForm.bind(this);
  this.getChecked = this.getChecked.bind(this);
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
    this.elem.onclick=()=>{
      //alert("Sign Up clicked !");
      this.SignUpFunction();
    }
  }
  else if(this.attributes.action=="getSavedData"){
    this.elem.onclick=()=>{
      //alert("Sign Up clicked !");
      this.readSavedData();
    }
  }
  else if(this.attributes.action=="getNowDate"){
    this.elem.onclick=()=>{
      //alert("Sign Up clicked !");
      this.getNowDate();
    }
  }
  else if(this.attributes.action=="SignOut"){
    this.elem.onclick=()=>{
      //alert("Sign Up clicked !");
      this.signOut();
    }
  }
  this.UserLoginFunction = this.UserLoginFunction.bind(this);
  this.SignUpFunction = this.SignUpFunction.bind(this);
  this.createMenu=this.createMenu.bind(this);
  this.readSavedData=this.readSavedData.bind(this);
  this.getNowDate=this.getNowDate.bind(this);
  this.signOut=this.signOut.bind(this);
  this.getContainer=this.getContainer.bind(this);
}
//
Button.prototype.getContainer = function(){
  return this.Container;
}
//
Button.prototype.signOut=function(){
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
  
}
//
Button.prototype.UserLoginFunction = function(){
    console.info("user Login is: "+ tfLogin.getText() + ", and user Password is: "+  
        tfPassw.getText()+" Checkbox: getChecked() "+  chPassw.getChecked() + ", Checkbox: getText(): " + chPassw.getText());
    let logged = searchUser(tfLogin.getText(), tfPassw.getText()) ;
    if(logged){
      //this.getContainer();
      LoginContainer.hidediv();
      aDiv.showdiv();
    }
    alert(logged);
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
  alert("Must show New User Registration Form");
  bDiv.hidediv();
  fDiv.showdiv();
}


// Attributes fo Button object
let LoginAttributes = {
  title:"Log In",
  action:"LogIn"
}
let signUpAttributes = {
  title:"Sign Up",
  action:"SignUp"
}
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
// menu ******  mnuButton class ***********************************
let mnuButton = function (title, isactive=false) {
	this.isActive=isactive;
  this.el = document.createElement('button');
  this.vern=title;
	this.tt = document.createTextNode(this.vern);

  this.el.appendChild(this.tt);
  //document.body.appendChild(this.el);
  this.clickHandler = this.clickHandler.bind(this);
  //this.clickHandler2 = this.clickHandler2.bind(this);
  this.addEvents();
  this.getElement = this.getElement.bind(this);
}

mnuButton.prototype.getElement = function(){
	return this.el;
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
//

let b = new mnuButton(aVer[0]);
let c = new mnuButton(aVer[1]);
let d = new mnuButton(aVer[2]);
//let e = new mnuButton(aVer[3], aDivId[3]);
const aBtn = [b, c, d];
/*
let makeMenu = (abuttons, secondDiv)=>{
  let topElm = document.createElement("div");
  topElm.setAttribute("class", "div_menu");
  document.body.appendChild(topElm);
  document.body.insertBefore(topElm, secondDiv);

  topElm.appendChild(abuttons[0].getElement());
  topElm.appendChild(abuttons[1].getElement());
  topElm.appendChild(abuttons[2].getElement());
  //topElm.setAttribute("display", "none");
} 
createMenu(aBtn, aDiv);
*/
Button.prototype.createMenu = (abuttons, secondDiv)=>{
  let topElm = document.createElement("div");
  topElm.setAttribute("class", "div_menu");
  document.body.appendChild(topElm);
  document.body.insertBefore(topElm, secondDiv);

  topElm.appendChild(abuttons[0].getElement());
  topElm.appendChild(abuttons[1].getElement());
  topElm.appendChild(abuttons[2].getElement());
  topElm.setAttribute("display", "none");
} 

//let divMenu = new Container("div_menu", "div_menu", "this is menu", false);  // hidden
// Container = function(ID, Class, SubTitle="SubTitle", Visible=false)
let aDiv = new Container(aDivId[0], aDivClass[0], aDivTitles[0], false);  // hidden
//aDiv.showdiv();
let bDiv = new Container(aDivId[1], aDivClass[1], aDivTitles[1], false);  // Archive
//let cDiv = new Container(aDivId[2], aDivClass[2], aDivTitles[2], false);
let fDiv = new Container(aDivId[2], aDivClass[2], aDivTitles[2], false);  // Sign Up // hodden
/*
var loginDiv_id = "loginDivID";
var signUpDiv_id= "signUpDivID";
var menuDiv_id = "menuDivID";

// login / sign Up / Menu CSS classes
var loginDivClass = "div_login";
var signUpDivClass = "div_signup";
var menuDivClass = "div_menu";
*/
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
let signUpBtn = new Button(chPasswDiv, "button", signUpAttributes);   // "Sign Up" button inside checkbox container (box)


let aContainer = [aDiv, bDiv, fDiv];
// checking vaved date
let chbtndiv = document.createElement("div");
let checkBtn = new Button(chbtndiv, "button", checkAttrubutes);     // 
aDiv.addChild(chbtndiv);
// displaying current date
let getBtnDateNowDiv = document.createElement("div");
let getBtnDateNow = new Button(getBtnDateNowDiv, "button", nowDateAttrubutes);     //
aDiv.addChild(getBtnDateNowDiv);
// signing Out
let getBtnSignOutDiv = document.createElement("div");
let getBtnSignOut = new Button(getBtnSignOutDiv, "button", signOutAttributes);     //
aDiv.addChild(getBtnSignOutDiv);
//alert('koko');
