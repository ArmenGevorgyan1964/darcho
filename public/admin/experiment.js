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
// picture folders and document folder names parrallel arrays
let pFolders = ["arm_bazar_skan", 
                "muxranskaya_skan", 
                "pushkinskaya_skan", 
                "vankskaya_skan", 
                "policeyskaya_skan"];
let pPapka = ["(Արմյանսկի բազար)", 
              "(Մուխրանսկայա փ.)", 
              "(Պուշկինսկայա)", 
              "(Վանքսկայա փ.)", 
              "(Պոլիցեյսկայա փ.)"];
              
function getFolderNmae(papkaTitle){
  let indX = pPapka.indexOf(papkaTitle);
  if(indX>0 && indX<pFolders.length){
    return "../"+pFolders[indX]+"/";
  }
  else{
    alert("Cannot Find Folder name by Papka name!");
    return;
  }
}
// 
// *******************************************************************************************
// Beginning of expjson.js file
// 
var darchTemplateJSON={
  park: {
    title:"ՊԱՐԿ N",
    value:0,
    type:"number",
    isArray:false,
    canRemember:true
    },
  kap: {
    title:"ԿԱՊ N",
    value:0,
    type:"number",
    isArray:false,
    canRemember:true
    }, 
  papka: {
    title:"Թղթապանակ",
    value:"",
    type:"text",
    isArray:false,
    canRemember:true
    },
  documentNum: {
    title:"Փաստաթուղթ N",
    value:0,
    type:"number_manual_increment",
    isArray:false,
    canRemember:false
    }, 
  addressStreet: {
    title:"հասցե, փողոց",
    value:[],
    type:"text",
    isArray:true,
    canRemember:true,
    isMainKW:["այժմ՝", "ныне –"]
    },
  kvartal: {
    title:"թաղամաս.",
    value:"",
    type:"text",
    canRemember:true,
    isArray:false
    },
  temaEvent: {
    title:"Փ.-իթեմանկամիրադարձությունը, թվ.-ըկարևորիմաստով",
    value:"",
    type:"text",
    isArray:false
    },
  title: {
    title: "Վերնագիր.",
    value:"",
    type:"text",
    isArray:false
    },
  address: {
    title: "Հասցե.",
    value:"",
    type:"text",
    isArray:false
    },
  owner: {
    title: "Սեփականատեր.",
    value:[],
    type:"text",
    isArray:true
    },
  buyer: {
    title: "Գնորդ.",
    value:[],
    type:"text",
    isArray:true
    },
  seller:  {
    title: "Վաճառող.",
    value:[],
    type:"text",
    isArray:true
    },
  type:  {
    title: "Տեսակ.",
    value:"",
    type:"text",
    isArray:false
    }, 
  source: {
    title: "Աղբյուր.",
    value:"",
    type:"text",
    isArray:false
    }, 
  pageScanned: {
    title: "Էջը թվայնացված.",
    value:[],
    type:"keyword",
    isArray:true
    }, 
  bigFile: {
    title: "Մեծ ֆայլ. pdf, doc, mpeg.",
    value:[],
    type:"keyword",
    isArray:true
    }, 
  sw: {
    title: "Որոնման բառեր.",
    value:[],
    type:"text",
    isArray:true
    }, 
  lang: {
    title: "Լեզու.",
    value:[],
    type:"text",
    isArray:true
    },  
  primaryAnalysis: {
    title: "Նախնական վերլուծություն.",
    value:"",
    type:"text_big",
    isArray:false
    },  
  description: {
    title: "Նկարագրություն.",
    value:"",
    type:"text_big",
    isArray:false
    },
  feedback: {
      title: "Կարծիքներ համացանցից.",
      value:[],
      type:"text_big",
      isArray:true
      }
}
//
//console.log(darchTemplateJSON);
//
let visibleColumns={
  col_1:{
    title:"KeyWords",
    source:"keys",
    field:"key",
    display_as:"staticText"
    }, 
  col_2:{
      title:"Title",
      source:"values",
      field:"title",
      display_as:"staticText"
    },
  col_3:{
    title:"Inputs",
    source:"values",
    field:"value",
    display_as:"inputField"
  },
  col_4:{
    title:"Remember",
    source:"values",
    field:"rememberable",
    display_as:"checkboxField",
  }
}
//
function makeImage(parent, filename="", foldername="", height=75){
  //let img = document.createElement("IMG");
  let img = new Image();
  //img.setAttribute("class", "thumb");
  if(filename !== undefined && foldername !== undefined){
    img.src = "../"+foldername+"/"+filename;
    let h = img.height;
    let w = img.width;
    let proportion = h/w;
    let ww = height/proportion;
    img.height=height;
    img.width=ww;
    img.onerror=function(){
      console.log("image Error!!! : "+this.src);
      this.src="./pnotfound.png";
      this.width=100;
    }
  }
  else{
    img.src="./pnotfound.png";
    img.width=200;
  }
  parent.appendChild(img);  
}
// 
function highlight(strToFind, strBodyLarge, className="highlighted"){
  let st = strToFind.replace("-", " ");
  st=st.trim();
  let aa = st.split(" ");
  for(let i=0; i<aa.length; i++){
    let rgx = new RegExp(aa[i],"g");
    strBodyLarge = strBodyLarge.replace(rgx, "<span class = '"+className+"'>"+aa[i]+"</span>")
  }
 return strBodyLarge;
}
// searcing document by parameters:
async function getDoc(parkk, kapp, papk, docnum){
  const response = await fetch("http://127.0.0.1:9200/darch/_doc/_search", 
  {
  headers: {
    'Accept': 'application/json',
    'content-type': 'application/json'
    },  
  method: 'POST',
  body: JSON.stringify({
    query: { 
      constant_score:{
          filter:{
            bool: {
              must: [
                {
                  term:{
                    park:parkk
                  }
                },
                {
                  term:{
                    kap:kapp
                  }
                },
                {
                  term:{
                    papka:papk
                  }
                },
                {
                  term:{
                    documentNum:docnum
                  }
                }
              ]
            } 
          }
        }
      }
      }
      )
    }
  )
  const json = await response.json();
  if(json.hits.total>0){
    alert("Document found");
    return await json;
  }
}
// searcing document by parameters:
async function getDocQstring(querystring){
  const response = await fetch("http://127.0.0.1:9200/darch/_doc/_search", 
  {
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
      },  
    method: 'POST',
    body: JSON.stringify({
        "query":{
            "query_string":{
              "query": querystring
            }
          },
        "from":0,
        "size":100
        }
      )
    }
  )
  const json = await response.json();
  if(json.hits.total>0){
    querystring = null;
    console.log("Document found by simplesearch");
    console.log(json);
    return await json;
  }
}
// Saving ONE Document to Database
async function saveOneDoc(docObj) {
console.info(docObj);
if(typeof(docObj.park)==="undefined"){
  alert("Insert park");
  return;
}
if(typeof(docObj.kap)==="undefined"){
  alert("Insert kap");
  return;
}
if(typeof(docObj.papka)==="undefined"){
  alert("Insert papka");
  return;
}
if(typeof(docObj.documentNum)==="undefined"){
  alert("Insert documentNum");
  return;
}
if(typeof(docObj.title)==="undefined"){
  alert("Insert title");
  return;
}
let park = docObj.park;
let kap = docObj.kap;
let papka = docObj.papka;
let documentNum = docObj.documentNum;
let title = docObj.title;
if(park =="" ||   kap =="" ||   papka == "" ||   documentNum == "" || title ==""){
   alert("At least one of the Document fields (park, kap, papka, documentNum, title) is empty");
   return;
}
// getting last document Number with same park.kap, papka id
const response = await fetch("http://127.0.0.1:9200/darch/_doc/_search", 
{
  headers: {
    'Accept': 'application/json',
    'content-type': 'application/json'
    },  
  method: 'POST',
  body: JSON.stringify({
    query: {
      constant_score:{
          filter:{
            bool: {
              must: [
                {
                  term:{
                    park:park
                  }
                },
                {
                  term:{
                    kap:kap
                  }
                },
                {
                  term:{
                    papka:papka
                  }
                },
                {
                  term:{
                    documentNum:documentNum
                  }
                }
              ]
            } 
          }
        }
      }
    }
    )
  }
)
const json = await response.json();
let max_num = 0;
let id_max_num="";
console.log(json);
if(json.hits.total>0){
  id_max_num = json.hits.hits[0]._id;
  max_num = json.hits.hits[0].documentNum;
  console.log("max_num = "+max_num);
  console.log("id_max_num = "+id_max_num);
  alert("There is another document (id = "+id_max_num+") registered with the same number and park, kap, papka");
   return;
}
// inserting new document
// let doc_num = ++max_num;
console.log("inserting");
const response1 = await fetch("http://127.0.0.1:9200/darch/_doc/", 
  {
      body: JSON.stringify(docObj),
      // must match 'Content-Type' header
      cache: 'no-cache',
      mode: 'cors',
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      }
  })
const jsonn = await response1.json();    
//setTimeout(getAllUsers(), 2000);
const last_id = jsonn._id;
console.info(jsonn);
console.info(last_id);  // OK
if(last_id){
  alert("Document inserted: _id == "+ last_id);
}
//let insertedJson = await  getDoc(park, kap, papka, documentNum);
//console.info(insertedJson);
}
//
//
async function getAllDocs(){
let res = await fetch("http://127.0.0.1:9200/darch/_doc/_search", {
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
//alert("total hits: "+json.hits.total);
//console.info(json.hits.total)
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

// inputfield PARENT class
class InputField {
  constructor(Container, ID, Class="", Label="",  Attributes={}) {
      this.id = ID;
      this.className = "";
      this.Label = Label;

      this.parentid = Container;    // used id
      this.attributes = Attributes;
      
      this.Container = Container;
      
      //this.Container.setAttribute("id", this.id+"_"+this.attributes.keyword+"_"+this.attributes.index);
      if(Class!=""){
        this.className=Class;
        this.Container.setAttribute("class", this.className);
      }
      //this.Label = document.createElement("label");
      //this.Label.setAttribute("for", this.id);
      //this.Label.appendChild(this.labelText);
      //this.Container.appendChild(this.Label);
      this.aa=[];
      this.aa.push(this.Container);
      this.aa.push(this.id);
      this.aa.push(this.className);
      this.aa.push(this.Label);
      this.aa.push(this.attributes);
  }
  getForm(){
      return this.Container;
  }
  getConstructorParams(){
    return this.aa;
  }
}
// DropDown class
class DropDownClass extends InputField{
  constructor(Container, ID, Class, Label,  Attributes) {
    super(Container, ID, Class, Label,  Attributes);
    this.sel = document.createElement("SELECT");
    this.options = [];
    this.values = [];
    this.optTexts = [];
    if(this.Label){
      this.Label = document.createElement("label");
      this.labelText = document.createTextNode(Label);
      this.Label.setAttribute("for", this.id);
      this.Label.appendChild(this.labelText);
      if(this.attributes.labelClass){
        this.Label.setAttribute("class", this.attributes.labelClass);
      }
      this.Container.appendChild(this.Label);
    }
    this.Container.appendChild(this.sel);
    //console.log(this.Container);
    this.sel.setAttribute("id", this.id);
    if(this.attributes.optionValues){
      this.Option_Values=this.attributes.optionValues;
      for(let i=0; i<this.Option_Values.length; i++){
        this.options[i]=document.createElement("option");
        this.options[i].value=this.Option_Values[i];
        if(this.Option_Values[i] == selectedValue && this.Option_Values[i] != "0"){
          this.options[i].selected=true;
        }
        this.options[i].text=this.Option_Values[i];
        this.sel.add(this.options[i]);
      }
    }
    if(this.attributes.selectedValue){
      this.selectedValue=this.attributes.selectedValue;
    }
    //
    this.sel.onchange=()=>{
      this.Value = this.sel.value;
      console.log(this.Value);
      //allinputIDs.push(this.id) ;
    }
  }  // end of constructor
// function to get all users : id, name
  async  getAllUserIDsNames(){
    let res = await fetch("http://127.0.0.1:9200/users/_doc/_search", {
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
    alert("633 -- total Users hits: "+json.hits.total);
    console.info(json.hits.total);
    console.info(json);
    let totalhits = json.hits.total;
    if(totalhits===0){
      console.log("No Users Registered");
      return;
    }
    //
    for (let i = 0; i < totalhits; i++) {
      this.options[i] = document.createElement("option");
      this.options[i].value = json.hits.hits[i]._id;
      if(this.options[i].value == this.selectedValue && this.options[i].value != "0"){
          this.options[i].selected=true;
      }
      this.options[i].text = json.hits.hits[i]._source.username + " ("+json.hits.hits[i]._source.userstatus+")";
      this.sel.add(this.options[i]);
    }
  }
} // END of   class DropDownClass extends InputField{...

// End of DropDown Class
// Text field daughter class
class TextFieldClass extends InputField {
  constructor(Container, ID, Class, Label,  Attributes) {
      super(Container, ID, Class, Label,  Attributes);
      this.tf = document.createElement("INPUT");
      this.tf.setAttribute("type", "text");
      if(this.Label){
        this.Label = document.createElement("label");
        this.labelText = document.createTextNode(Label);
        this.Label.setAttribute("for", this.id);
        this.Label.appendChild(this.labelText);
        if(this.attributes.labelClass){
          this.Label.setAttribute("class", this.attributes.labelClass);
        }
        this.Container.appendChild(this.Label);
      }
      
      this.Container.appendChild(this.tf);

      //console.log(this.Container);
      this.tf.setAttribute("id", this.id);
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
          this.id = this.id + "_" + this.kw;
        } 
      // 
     if(this.attributes.index && this.attributes.index > 0){
          this.index = this.attributes.index ;
          this.id = this.id + "_" + this.kw+ "_" + this.index;
        }
      else {
          this.index = 0;
          this.id = this.id + "_" + this.kw+ "_0";
      }
      this.tf.onchange=()=>{
        this.Value = this.tf.value;
        console.log(this.Value);
        //allinputIDs.push(this.id) ;
      }
  }
  getValue(){
      return this.tf.value;
  }
  getConstructorParams(){
    return super.getConstructorParams();
  }
  setValue(val){
    if(val!=undefined && val.length>0){
      this.tf.value=val;
    }
    else{
      this.tf.value='';
    }
  }
}
//
// Text Area daughter class
class TextAreaClass extends InputField {
  constructor(Container, ID, Class, Label,  Attributes) {
      super(Container, ID, Class, Label,  Attributes);
      this.tf = document.createElement("TEXTAREA");
      if(this.Label){
        this.Label = document.createElement("label");
        this.labelText = document.createTextNode(Label);
        this.Label.setAttribute("for", this.id);
        this.Label.appendChild(this.labelText);
        if(this.attributes.labelClass){
          this.Label.setAttribute("class", this.attributes.labelClass);
        }
        this.Container.appendChild(this.Label);
      }
      this.Container.appendChild(this.tf);
      //this.isChecked = this.tf.isChecked;
      //console.log(this.Container);
      if(this.attributes.placeholder){
        this.tf.setAttribute("placeholder", this.attributes.placeholder);
      }
      if(this.attributes.required){
        this.tf.required = true;
      }
      if(this.attributes.value){
          this.tf.value=this.attributes.value;
      }
      if(this.attributes.tf_class){
        this.tf.setAttribute("class", this.attributes.tf_class);
        //this.tf.value = this.attributes.value;
      }
    if (this.attributes.keyword){
        this.kw=this.attributes.keyword;
        this.id = this.id + "_" + this.kw;
      } 
    // 
    if(this.attributes.index && this.attributes.index > 0){
        this.index = this.attributes.index ;
        this.id = this.id + "_" + this.kw+ "_" + this.index;
    }
    else {
        this.index = 0;
        this.id = this.id + "_" + this.kw+ "_0";
    }
    this.tf.onchange=()=>{
      this.Value = this.tf.value;
      console.log(this.Value);
      //allinputIDs.push(this.id) ;
      //this.getValue();
    }
    if (this.attributes.rows){
          this.rows=this.attributes.rows;
          this.tf.setAttribute("rows", this.rows );
    }
    if (this.attributes.cols){
          this.cols=this.attributes.cols;
          this.tf.setAttribute("cols", this.cols );
    }
  }
  //
  getValue(){
      return this.tf.value;
  }
  getConstructorParams(){
    return super.getConstructorParams();
  }
  setValue(val){
    if(val!=undefined && val.length>0){
      this.tf.value=val;
    }
    else{
      this.tf.value='';
    }
  }

}
// Checkbox daughter class
class CheckBoxClass extends InputField {
  constructor(Container, ID, Class, Label,  Attributes) {
      super(Container, ID, Class, Label,  Attributes);
      this.tf = document.createElement("INPUT");
      this.tf.setAttribute("type", "checkbox");
      this.Container.appendChild(this.tf);
      //console.log(this.Container);
      this.isChecked = false;
      if(this.attributes.placeholder){
          this.tf.setAttribute("placeholder", this.attributes.placeholder);
        }
      if(this.attributes.status){
        if(this.attributes.status=="checked" || this.attributes.status==true){
          this.tf.checked = true;
          this.isChecked = true;
        }
        else{
          this.tf.checked = false;
          this.isChecked = false;
        }
      }
      if (this.attributes.keyword){
          this.kw=this.attributes.keyword;
          this.id = this.id + "_" + this.kw;
      } 
      // 
      if(this.attributes.index && this.attributes.index > 0){
          this.index = this.attributes.index ;
          this.id = this.id + "_" + this.kw+ "_" + this.index;
      }
      else {
          this.index = 0;
          this.id = this.id + "_" + this.kw+ "_0";
      }
      this.tf.onchange=()=>{
        if(this.tf.checked){
          this.isChecked = true;
        }
        else{
          this.isChecked = false;
        }
        console.log(this.isChecked);
        //allinputIDs.push(this.id) ;
      //infoDiv.innerHTML=this.getState();
      }
  }
  getState(){
    return this.isChecked;
  }
  setState(ch=false){
    if(ch==true){
      this.tf.checked = true;
    }
    else{
      this.tf.checked = false;
    }
      
  }
}
// Button daughter class
class ButtonClass extends InputField {
  constructor(Container, ID, Class, Label,  Attributes) {
    super(Container, ID, Class, Label,  Attributes);
    this.btn = document.createElement("INPUT");
    if(this.attributes.Type){
      switch(this.attributes.Type){
        case "submt":
        this.btn.type = "submit";
        this.def_title="SUBMIT";
        break;
        case "button":
        this.btn.type = "button";
        this.def_title="UNNAMED BUTTON";
        break;
        case "reset":
        this.btn.type = "reset";
        this.def_title="RESET";
        break;
        default:
        this.btn.type = "button";
        this.def_title="DEFAULT BUTTON";
      }
    }
    else{
      this.btn.type = "button";
      this.def_title="DEFAULT BUTTON";
    }
    // title
  if(this.Label != ""){
    this.btn.value = this.Label;
    //this.btn.title  = this.Label;
  }
  else{
    this.btn.value  = this.def_title;
  }
  this.Container.appendChild(this.btn);
  // clone
  //if(this.attributes.cloneParams){
  //  this.tfClonneParams=this.attributes.cloneParams;
  //}
  if(this.attributes.parentBox){
    this.parentBox = this.attributes.parentBox;
  }
  if(this.attributes.groupObj){
    this.groupobj=this.attributes.groupObj;
  }
  if(this.attributes.row){
    this.groupobjDiv=this.attributes.row;
  }
  if(this.attributes.rowbox){
    this.rowbox=this.attributes.rowbox;
  }
  if(this.attributes.textFieldRem){
    this.tfRemove = this.attributes.textFieldRem;
  }
  // click
  if(this.attributes.action=="AddTF" && this.groupobj){
    this.btn.onclick=()=>{
      //alert("login clicked !");
      this.AddTF(this.groupobj);
    }
  }
  if(this.attributes.action=="RemoveTF" && this.rowbox && this.tfRemove){
    this.btn.onclick=()=>{
      //alert(this.groupobjDiv); // OK == row: 1, 2, 3, ...
      //alert(this.tfRemove.getValue()) //ok
      this.RemoveTF(this.rowbox, this.tfRemove);
    }
  }
  if(this.attributes.action=="GetValues"){
    this.btn.onclick=()=>{
      //alert("get Values Clicked")
      this.getValuesText(textFieldGroup);
    }
  }
  if(this.attributes.action=="GetTAvalues"){
    this.btn.onclick=()=>{
      //alert("get Values Clicked")
      this.getValuesText(textAreaGroup);
    }
  }
  if(this.attributes.action=="GetAllvalues"){
    this.btn.onclick=()=>{
      alert("get All Values Clicked")
      this.getAllValues(mt);
    }
  }    
  this.btn.setAttribute("type", this.btn.type);
  this.Container.appendChild(this.btn);

  if(this.attributes.btn_class){
        this.btn.setAttribute("class", this.attributes.btn_class);
        //this.tf.value = this.attributes.value;
  }
  if (this.attributes.keyword){
        this.kw=this.attributes.keyword;
        this.id = this.id + "_" + this.kw;
  } 
    // 
  if(this.attributes.index && this.attributes.index > 0){
        this.index = this.attributes.index ;
        this.id = this.id + "_" + this.kw+ "_" + this.index;
  }
  else {
        this.index = 0;
        this.id = this.id + "_" + this.kw+ "_0";
  }
}
//
AddTF(aa){
  //alert("addTF function CXalled")
   //console.log(clonable_tf_Params);
   //console.log(parent_box);
   aa.addInput();
}
RemoveTF(nd, dd){
  this.groupobj.removeRow(nd, dd);
}
getValuesText(obj){
  let atxt = obj.getValue();
  return atxt;
  //console.log(atxt);
}
getAllValues(makeTableObj){
  //if(makeTableObj instanceof maketable){
  //  alert("makeTableObj instanceof maketable");
  //}
  console.log(makeTableObj);
  let inputtedObj = makeTableObj.aInputTextObj;
  let ceckboxObj= makeTableObj.aInputCheckBoxObj;
  let aCaption = makeTableObj.aInput_caption
  let aKW = makeTableObj.aName_kw;
  let val=[];
  let cecked=[];
  let obj={};
  let j=0;
  for(let i = 0; i<inputtedObj.length; i++){
    val[i] = inputtedObj[i].getValue();
    if(ceckboxObj[i] == null){
      cecked[i] = false;
    }
    else{
      cecked[i] = ceckboxObj[i].getState();
    }
  }
  console.log("inputtedObj");
  console.log(inputtedObj);
  console.log("KeyWords");
  console.log(aKW);
  console.log("val");
  console.log(val);
  console.log("cecked");
  console.log(cecked);
  if(aKW.length==0){
    alert ("no values where inserted");
    return;
  }
  for(let i=0; i<aKW.length; i++){
    darchTemplateJSON[aKW[i]]["value"]=val[i];
    if(val[i].length>0 || (Array.isArray(val[i]) && val[i].length>0)){
    console.log(Array.isArray(val[i]));
      obj[aKW[i]]=val[i];
      //obj[aCaption[i]]=val[i];
      
      //j++;
    }
  }
  console.log("obj  ");
  console.log(obj);

  saveOneDoc(obj);
  
}
}
// class text field group
// inputGroup(groupDiv,  "tfg", "textField", {tf_class:"inputs", index:0, keyword:"kw"})
class inputGroup{
constructor(Container,  Keyword, Type="textField", Attributes={tf_class:"inputs", index:0}){
  this.i=0  // counter for ainputs[] and ainputContainers[]
  this.container = Container;
  this.kw = Keyword;
  this.type = Type;
  this.index = 0;
  this.attributes = Attributes;
  if(this.attributes.label){
    this.label=this.attributes.label;
  }
  else{
    this.label="label";
  }
  //this.ainputContainers=[];
  this.ainputs=[];
  this.aDivs=[];
  //this.cloneTfParams=[];
  if(this.type == "textField"){
                              // constructor(Container, ID, Class, Label,  Attributes)
    this.aDivs[0]=document.createElement("DIV");
    this.container.appendChild(this.aDivs[0]);
   // class TextFieldClass (Container, ID, Class, Label,  Attributes) 
    this.ainputs[0] = new TextFieldClass(this.aDivs[0], "id", "", "", {tf_class:"inputs",
                                                                        index:this.index,
                                                                        keyword:this.kw});
    //this.cloneTfParams[0] = this.ainputs[0].getConstructorParams();
    //console.log(this.cloneTfParams[0] );
    // ButtonClass(Container, ID, Class, Label,  Attributes)
    this.addBtn = new ButtonClass(this.aDivs[0], "ID", "", "+", {action:"AddTF", 
                                                              //cloneParams:this.cloneTfParams[0],
                                                              parentBox:this.container,
                                                              groupObj:this});
    this.i++;
    //this.addBtn.onclick= this.addInput;
  }
  else if(this.type == "textArea"){
    this.aDivs[0]=document.createElement("DIV");
    this.container.appendChild(this.aDivs[0]);
    this.ainputs[0] = new TextAreaClass(this.aDivs[0], "ID", "", "", {tf_class:"inputs",
                                                                        rows:5, cols:55, 
                                                                        index:this.i,
                                                                        keyword:this.kw});
    this.addBtn = new ButtonClass(this.aDivs[0], "ID", "", "+", {action:"AddTF",
                                                                        parentBox:this.container,
                                                                        groupObj:this});
    this.i++;
  }
  
  this.className="";
  if(this.attributes){
    if(this.attributes.tf_class){
      this.className = this.attributes.tf_class;
    }
    if(this.attributes.index){
      this.index = this.attributes.index;
    }
  }
}
addInput(){
  this.aDivs[this.i]=document.createElement("DIV");
  this.container.appendChild(this.aDivs[this.i]);
   // class TextFieldClass (Container, ID, Class, Label,  Attributes) 
  if(this.type == "textField"){
    this.ainputs[this.i] = new TextFieldClass(this.aDivs[this.i], "id", "", "", {
                                                                        tf_class:"inputs",
                                                                        index:this.i,
                                                                        keyword:this.kw});
  }
  else if(this.type == "textArea"){
    this.ainputs[this.i] = new TextAreaClass(this.aDivs[this.i], "ID", "", "", {
                                                                        tf_class:"inputs",
                                                                        rows:5, cols:55, 
                                                                        index:this.i,
                                                                        keyword:this.kw});
  }
   //this.cloneTfParams[this.i] = this.ainputs[this.i].getConstructorParams();
   //console.log(this.cloneTfParams[this.i] );
   // ButtonClass(Container, ID, Class, Label,  Attributes)
   this.removeBtn = new ButtonClass(this.aDivs[this.i], "ID", "", "--", {action:"RemoveTF", 
                                                                         row:this.i,
                                                                         groupObj:this,
                                                                         rowbox:this.aDivs[this.i],
                                                                         textFieldRem:this.ainputs[this.i]});
   console.log(this.i);
   this.i++;
}
removeRow(divRemove, tfRemove){
  //alert(tfRemove instanceof TextFieldClass); // true
  let vv = tfRemove.getValue();
  if(vv != undefined){
    tfRemove.setValue();
  }
  divRemove.remove();

}
//
getValue(){
  console.log(this.ainputs);
  let a = [];
  let i=0;
  let j=0;
  for(i=0; i< this.ainputs.length; i++){
    let aa=this.ainputs[i].getValue();
    if(aa.length>0){
      a[j]=aa;
      j++;
    }     
    //delete aa; 
  }
  console.log(a);
  return a;
}
}
//
//
//
class maketable {
  constructor(parentBox, jsonObj, Attributes={cell_class:"div_cell", 
                                              row_class:"div_row",
                                              table_class:"div_table",
                                              columns:visibleColumns, 
                                              display: "read_only",
                                              rememberable:["park", "kap", "papka", "addressStreet", "kvartal"]})
  {  
  this.parent = parentBox;
  this.jsonObj = jsonObj;
  this.attributes = Attributes;
  this.table = document.createElement("DIV");
  
  
  this.aName_kw=[]; // keyword names (1st column)
  this.aInput_types=[]; // second column input types
  this.aInput_titles=[]; // second column input types
  this.aInput_isArray=[]; // third column input types
  this.aInput_isRememberable=[]; // 4th column checkboxes
  this.aInput_caption=[]; // caption of input box
  this.name_val=[];
  //
  this.notEmptyTFvalues=[];
  this.notEmptyTFids=[];
  this.canRememberFields=[];
  //
  this.aInputTextObj=[];  // array of input text and number objects created in table cells
  this.aInputCheckBoxObj=[]; // Array of checkboxes in lats column of table
  //this.row = document.createElement("DIV");
  this.aCols=[];
  this.aColsTitle = [];
  this.aColsSource = [];
  this.acolsField=[];
  this.aColsInptType = [];
  //this.aRows=[];  // table rows
  this.captionRow = document.createElement("DIV"); //first row of table: Titles
  this.table.appendChild(this.captionRow);
  if(this.attributes.columns){
    this.Cols = this.attributes.columns;
  }
  else{
    this.Cols = visibleColumns;
  }
  if(this.attributes.table_class){
    this.tableClass=this.attributes.table_class;
  }
  else{
    this.tableClass="div_table";
  }
  if(this.attributes.row_class){
    this.rowClass=this.attributes.row_class;
  }
  else{
    this.rowClass="div_row";
  }
  if(this.attributes.cell_class){
    this.cellClass=this.attributes.cell_class;
  }
  else{
    this.cellClass="div_cell";
  }
  if(this.attributes.display){
    this.displaMode=this.attributes.display
  }
  else{
    this.displaMode="editable";
  }
  if(this.attributes.rememberable){
    this.canRememberFields=this.attributes.rememberable;
  }
  this.table.setAttribute("class", this.tableClass);
  this.captionRow.setAttribute("class", this.rowClass);

  //
  Object.keys(this.Cols).forEach(e=>{
    console.log(e);
      Object.entries(this.Cols[e]).forEach(([k,m])=>{
        if(k=="title"){
          this.aColsTitle.push(m);
        }
        else if(k=="source"){
          this.aColsSource.push(m);
        }
        else if(k=="field"){
          this.acolsField.push(m);
        }
        else if(k=="display_as")
        this.aColsInptType.push(m);
        //console.log(k+":  "+m);
      })
    }
  )
  console.log("aColsTitle");
    console.log(this.aColsTitle);
  console.log("aColsSource");
    console.log(this.aColsSource);
  console.log("acolsField");
    console.log(this.acolsField);
  console.log("aColsInptType");
    console.log(this.aColsInptType);
  //
  Object.keys(this.jsonObj).forEach(e=>{
      //console.log(e);
      this.aName_kw.push(e);
      if(this.canRememberFields.includes(e)){
        this.aInput_isRememberable.push(true);
      }
      else{
        this.aInput_isRememberable.push(false);
      }
      Object.entries(this.jsonObj[e]).forEach(([k,m])=>{
          if(k=="title"){
            this.aInput_caption.push(m);
          }
          else if(k=="type"){
            this.aInput_types.push(m);
          }
          else if(k=="isArray")
          this.aInput_isArray.push(m);
          //console.log(e+"- "+k+":  "+m);
        })
      }
    )
    console.log("aName_kw");
    console.log(this.aName_kw);
    console.log("aInput_isRememberable");
    console.log(this.aInput_isRememberable);
    console.log("aInput_caption");
    console.log(this.aInput_caption);
    console.log("aInput_types");
    console.log(this.aInput_types);
    console.log("aInput_isArray");
    console.log(this.aInput_isArray);
 
  } // end of constructor(...)
  // making template table to show
  showInputForm(){
   //making table Caption Rows
   this.aCellCaption=[];
   this.aCellValCaption=[];
    for(let i =0; i< this.aColsTitle.length; i++){
      this.aCellCaption[i]=document.createElement("div");
      this.aCellCaption[i].setAttribute("class", this.cellClass);
      this.aCellCaption[i].setAttribute("style", "font-weight:bold")
      this.aCellValCaption[i]=this.aColsTitle[i];
      this.aCellCaption[i].innerHTML=this.aCellValCaption[i];
      this.captionRow.appendChild(this.aCellCaption[i]);
    }
    this.table.appendChild(this.captionRow);
    // making table body rows
    for(let i=0; i<this.aName_kw.length; i++){
                /*
  this.aInputTextObj=[];  // array of input text and number objects created in table cells
  this.aInputCheckBoxObj=[]; // Array of checkboxes in lats column of table
          */
      this.acellRow = [];
      this.acellRow[i]=document.createElement("DIV");
      this.table.appendChild(this.acellRow[i]);
      this.acellRow[i].setAttribute("class", this.rowClass);
      let acell=[];
      for(let j=0; j<this.aColsTitle.length; j++){
        acell[j]=document.createElement("div");
        acell[j].setAttribute("class", this.cellClass);
        if(this.aColsInptType[j]=="staticText"){
            if(this.acolsField[j]=="title"){
              acell[j].innerHTML="<span style='color:white'>"+this.aInput_caption[i]+"</span>";
            }
            else if(this.acolsField[j]=="key"){
              acell[j].innerHTML="<b><span style='color:yellow'>"+this.aName_kw[i]+"</span></b>";
            }
          
         // acell[j].innerHTML=this.aName_kw[i];
        }
        else if(this.aColsInptType[j]=="inputField"){
          let captiopn = this.aInput_caption[i];
          let id =(this.aInput_isArray[i]?"m":"s")+"_";
          if(this.aInput_types[i] == "text" || this.aInput_types[i] == "keyword"){
            id += "idTxt_"+this.aName_kw[i]+"_text_"+i;
            if(this.aInput_isArray[i]){
              let obj = new inputGroup(acell[j],  id, "textField", {tf_class:"inputs", 
                                                                    index:0,
                                                                    placeholder:captiopn})
              this.aInputTextObj[i]=obj; 
            }
            else{
              let obj = new TextFieldClass(acell[j], id, "", "", {tf_class:"inputs", 
                                                                      index:0,
                                                                      keyword:"kw",
                                                                      labelClass:"black",
                                                                      placeholder:captiopn
                                                                    });
              this.aInputTextObj[i]=obj;                                                      
            }
           }
          else if(this.aInput_types[i] == "number" || this.aInput_types[i] == "number_manual_increment"){
            id += "idNum_"+this.aName_kw[i]+"_text_"+i;
            if(this.aInput_isArray[i]){
              let obj = new inputGroup(acell[j],  id, "textField", {tf_class:"inputs", 
                                                                      index:0,
                                                                    label:captiopn,
                                                                    placeholder:captiopn})
              this.aInputTextObj[i]=obj; 
            }
            else{
              let obj = new TextFieldClass(acell[j], id, "", "", {tf_class:"inputs", 
                                                                      index:0,
                                                                      keyword:"kw",
                                                                      labelClass:"black",
                                                                      placeholder:captiopn
                                                                    });
                this.aInputTextObj[i]=obj; 
              }
          }
          else if(this.aInput_types[i] == "text_big"){
            id += "idTarea_"+this.aName_kw[i]+"_textArea_"+i;
            if(this.aInput_isArray[i]){
              let obj = new inputGroup(acell[j],  id, "textArea", {tf_class:"inputs", 
                                                                      index:0,
                                                                    label:captiopn,
                                                                    placeholder:captiopn})
              this.aInputTextObj[i]=obj;              }
            else{
              let obj = new TextAreaClass(acell[j], id, "", "", {rows:5, cols:55,
                                                                      labelClass:"black",
                                                                      placeholder:captiopn
                                                                    });
              this.aInputTextObj[i]=obj;
            } 
          }
        }
        else if(this.aColsInptType[j]=="checkboxField"){
          let prefix="ch_"+this.aName_kw[i]+"_"+i;
          if(this.aInput_isRememberable[i]){
            let ch = new CheckBoxClass(acell[j], prefix, "", "", {status:false});
            this.aInputCheckBoxObj[i] = ch;
            //acell[j].innerHTML=prefix;
          }
          else{
            this.aInputCheckBoxObj[i] = null;
          }
        }
        this.acellRow[i].appendChild(acell[j]);
      }
    }
    this.parent.appendChild(this.table);
  }
}
// End of expjson.js file *****************************************************************************
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
document.body.onload = async ()=>{
  let asavedData = await getSavedData();
  //console.log(asavedData);
  await checkUserData(asavedData);
  await getAllUsers();
  await alert (user.id);
} 
// getting saved data from local storage and checking validity function:
async function getSavedData(){
  let savedTimeStampp = await localStorage.getItem('tstamp_last');
  let zap_password = await localStorage.getItem('zappassw');
  let zap_login = await localStorage.getItem('zaplogin');
  let savedData = [savedTimeStampp,zap_password,zap_login]; // array af saved data
  console.info("saved Data from local storage:");
  console.info(await savedData);
  return await savedData;
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
  console.info("1360. user id == : "+id);
  // checking if any user with the same login and password allready registered
  const resp_check = await fetch("http://127.0.0.1:9200/users/_doc/_search", {
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
    //let user_id = ++max_id;
    console.log("updating");
    const response1 = await fetch("http://127.0.0.1:9200/users/_doc/"+id, 
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
    // EditUserContainer.hidediv(); 
    if(json.result=="updated"){
      alert("updated successfully");
      
    }
  }
  else{
    alert("Cannot Update the The User with the same login and password alleready registered");
  }
  //
  
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
          alert("At least one of the user fields is empty -saveUser");
          return;
  }
  // getting last user id
  const response = await fetch("http://127.0.0.1:9200/users/_doc/_search",
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
  const resp_check = await fetch("http://127.0.0.1:9200/users/_doc/_search", {
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
    const response1 = await fetch("http://127.0.0.1:9200/users/_doc/"+user_id, 
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
async function getAllUsers(){
  let res = await fetch("http://127.0.0.1:9200/users/_doc/_search", {
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
  //alert("total hits: "+json.hits.total);
  console.info("getAllUsers(): 1637:")
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
  const response = await fetch("http://127.0.0.1:9200/users/_doc/_search?q=login:"+lgn, 
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
        console.info("user id == "+user.id);
        LoginContainer.hidediv();
        makeMenu.updateMenu();  // to set te dafault active menu title and logged in user name
      //  aDiv.showdiv();
        //showHideDiv(LoginContainer, false);
        //await location.reload();
        return await true;
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
  const response = await fetch("http://127.0.0.1:9200/users/_doc/_search?q=login:"+userLogin, 
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
      user.username = await json.hits.hits[0]._source.username;
      user.password = await json.hits.hits[0]._source.password;
      user.login = await json.hits.hits[0]._source.login;
      user.email = await json.hits.hits[0]._source.email;
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
  const response = await fetch("http://127.0.0.1:9200/users/_doc/_search", 
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
    this.Value = this.attributes.value;
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
  else if(this.attributes.action=="saveLargeText"){
    this.elem.onclick=()=>{
        this.manageLaregeText();
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
  //this.saveChangedUser = this.saveChangedUser.bind(this);
  this.saveInputFunc = this.saveInputFunc.bind(this);
  this.loadContent=this.loadContent.bind(this);
  this.addField = this.addField.bind(this);
  // functions bindings
  this.manageLaregeText = this.manageLaregeText.bind(this);
  this.saveOneDoc=this.saveOneDoc.bind(this);
  this.saveManyDocs=this.saveManyDocs.bind(this);
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
  console.log(notEmptyTFids);
  console.log(notEmptyTFvalues);
  console.log(allinputIDs);
  console.log(objdoc);
  //console.log(this.inputConent);
  console.log("Button.prototype.saveInputFunc");
  //console.log(inputDocument);
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
    const response = await fetch("http://127.0.0.1:9200/users/_doc/"+this.deletableUserID);
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
   // let EditUserContainerByClass =  new EditUserFormClass(jsonedit, EditUserDiv_id, EditUserDivClass);
    //console.log(EditUserContainerByClass);
    let frmUserEdit = await makeUserEditForm(this.deletableUserID, EditUserDiv_id, EditUserDivClass);
    console.log(makeUserEditForm);
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
  const response = await fetch("http://127.0.0.1:9200/users/_doc/_delete_by_query", 
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
// Docs
Button.prototype.saveManyDocs = async function(arr){
  //this.aObjToInsert
  await arr.map(item=>{this.saveOneDoc(item)});
}
//
Button.prototype.saveOneDoc = async function(docObj){
    console.info(docObj);
    if(typeof(docObj.park)==="undefined"){
      alert("Insert park");
      return;
    }
    if(typeof(docObj.kap)==="undefined"){
      alert("Insert kap");
      return;
    }
    if(typeof(docObj.papka)==="undefined"){
      alert("Insert papka");
      return;
    }
    if(typeof(docObj.documentNum)==="undefined"){
      alert("Insert documentNum");
      return;
    }
    if(typeof(docObj.title)==="undefined"){
      alert("Insert title");
      return;
    }
    let park = docObj.park;
    let kap = docObj.kap;
    let papka = docObj.papka;
    let documentNum = docObj.documentNum;
    let title = docObj.title;
    if(park =="" ||   kap =="" ||   papka == "" ||   documentNum == "" || title ==""){
       alert("At least one of the Document fields (park, kap, papka, documentNum, title) is empty");
       return;
    }
    // getting last document Number with same park.kap, papka id
    const response = await fetch("http://127.0.0.1:9200/darch/_doc/_search", 
    {
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
        },  
      method: 'POST',
      body: JSON.stringify({
        query: { /**
          "match_all": {}
   */
          constant_score:{
              filter:{
                bool: {
                  must: [
                    {
                      term:{
                        park:park
                      }
                    },
                    {
                      term:{
                        kap:kap
                      }
                    },
                    {
                      term:{
                        papka:papka
                      }
                    },
                    {
                      term:{
                        documentNum:documentNum
                      }
                    }
                  ]
                } 
              }
            }
          
          }
          }
          )
        }
    )
    const json = await response.json();
    let max_num = 0;
    let id_max_num="";
    console.log(json);
    if(json.hits.total>0){
      id_max_num = json.hits.hits[0]._id;
      max_num = json.hits.hits[0].documentNum;
      console.log("max_num = "+max_num);
      console.log("id_max_num = "+id_max_num);
       alert("There is another document (id = "+id_max_num+") registered with the same number and park, kap, papka");
       return;
    }
    // inserting new document
    // let doc_num = ++max_num;
    console.log("inserting");
    const response1 = await fetch("http://127.0.0.1:9200/darch/_doc/", 
      {
          body: JSON.stringify(docObj),
          // must match 'Content-Type' header
          cache: 'no-cache',
          mode: 'cors',
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          }
      })
    const jsonn = await response1.json();    
    //setTimeout(getAllUsers(), 2000);
    const last_id = jsonn._id;
    console.info(jsonn);
    console.info(last_id);  // OK
    if(last_id){
      alert("Document inserted: _id == "+ last_id);
    }
    return new Promise(resolve=>{last_id}) ;
    //let insertedJson = await  getDoc(park, kap, papka, documentNum);
    //console.info(insertedJson);
}
// Managing large text according to selected template
Button.prototype.manageLaregeText = async function(){
  this.akeywordTypes=[
    "number",    // "ՊԱՐԿ N",
    "number",    // "ԿԱՊ N",
    "text",    // "Թղթապանակ.",
    "number",    // "Փաստաթուղթ. N",
    "text_array",  // "հասցե, փողոց",
    "text",    // "թաղամաս.",
    "text_array",  // "Փ.-իթեմանկամիրադարձությունը, թվ.-ըկարևորիմաստով",
    "text_id_db",    // "Հերթական համար.",
    "text",    // "Վերնագիր.",
    "text",    // "Հասցե.",
    "text_array",  // "Սեփականատեր.",
    "text_array",  // "Գնորդ.",
    "text_array",  // "Վաճառող.",
    "text",    // "Տեսակ.",
    "text",    // "Աղբյուր.",
    "text_array_nosp",  // "Էջը թվայնացված.",
    "text_array_nosp",  // "Մեծ ֆայլ. pdf, doc, mpeg.",
    "text_array",  // "Որոնման բառեր.",
    "text_array",  // "Լեզու.",
    "text_big", // "Նախնական վերլուծություն.",
    "text_big_array", // "Կարծիքներ համացանցից.",
    "text_big"     // "Նկարագրություն."
  ];
  this.akeywords = [
    "park",
    "kap",
    "papka",
    "documentNum",
    "addressStreet",
    "kvartal",
    "temaEvent",
    "id_number",
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
  this.docobj={}
  let dv = document.createElement("div");
  let dv1 = document.createElement("div");
  document.body.appendChild(dv);
  document.body.appendChild(dv1);
  if(this.attributes.text_source_obj){
    this.bigtext=this.attributes.text_source_obj.getText();
    if(this.attributes.text_source_obj.getText()==undefined){
      alert("Text box is empty")
      return;
    }
    if(this.attributes.pict_folder_tf.getValue()==undefined){
      alert("Picture Folder box is empty");
      return;
    }
    this.pictureFolder=this.attributes.pict_folder_tf.getValue();
    //this.bigtext = this.bigtext.trim();
    //alert(this.bigtext); ok
    let sss = this.bigtext;
    console.log("Beginning of big text == :");
    console.log(sss); // ok the same as inputted text in textarea
    console.log("END OF big text.");
    console.log("\n");

   //console.log(sss);
    
    let regstr='ՊԱՐԿ N';
    //let regstr2='ԿԱՊ N';
    //let regstr3='Թղթապանակ';
    let rgx = new RegExp(regstr,"g");
    //let rgx2 = new RegExp(regstr2,"g");
    //let rgx3 = new RegExp(regstr3,"g");
    //let str_1 = this.bigtext.replace(/ՊԱՐԿ N/g," **** ՊԱՐԿ N"); // ok
    let str_0 = sss.replace(rgx," **** "+regstr);
    //str_1 = str_1.replace(rgx2," **** "+regstr2);
    //str_1 = str_1.replace(rgx3," **** "+regstr3);
    /**/
    console.log(str_0);
    // splitting the large text into array of documents
    let arr_0 = str_0.split("****");
    if(arr_0[0] == "" || arr_0[0].trim() == ""){
      arr_0.shift();
    }
    //console.log(arr_1);
    // making regular expressions for all lines
    let regstr_0="ՊԱՐԿ N";
    let regstr_1="ԿԱՊ N";
    let regstr_2="Թղթապանակ.";
    let regstr_3="Փաստաթուղթ N";
    let regstr_4="հասցե, փողոց";
    let regstr_5="թաղամաս.";
    let regstr_6="Փ.-ի թեման կամ իրադարձությունը, թվ.-ը կարևոր իմաստով";
    let regstr_7="Հերթական համար.";
    let regstr_8="Վերնագիր.";
    let regstr_9="Հասցե.";
    let regstr_10="Սեփականատեր.";
    let regstr_11="Գնորդ.";
    let regstr_12="Վաճառող.";
    let regstr_13="Տեսակ.";
    let regstr_14="Աղբյուր.";
    let regstr_15="Էջը թվայնացված.";
    let regstr_16="Մեծ ֆայլ. pdf, doc, mpeg.";
    let regstr_17="Որոնման բառեր.";
    let regstr_18="Լեզու.";
    let regstr_19="Նախնական վերլուծություն.";
    let regstr_20="Կարծիքներ համացանցից.";
    let regstr_21="Նկարագրություն.";
    let aregstr = [regstr_0, regstr_1, regstr_2, regstr_3, regstr_4, regstr_5, 
                    regstr_6, regstr_7, regstr_8, regstr_9, regstr_10, regstr_11, 
                    regstr_12, regstr_13, regstr_14, regstr_15, regstr_16, regstr_17, 
                    regstr_18, regstr_19, regstr_20, regstr_21];
    this.aTitles = aregstr;
                    //
    let rgx0 = new RegExp(regstr_0,"g");
    let rgx1 = new RegExp(regstr_1,"g");
    let rgx2 = new RegExp(regstr_2,"g");
    let rgx3 = new RegExp(regstr_3,"g");
    let rgx4 = new RegExp(regstr_4,"g");
    let rgx5 = new RegExp(regstr_5,"g");
    let rgx6 = new RegExp(regstr_6,"g");
    let rgx7 = new RegExp(regstr_7,"g");
    let rgx8 = new RegExp(regstr_8,"g");
    let rgx9 = new RegExp(regstr_9,"g");
    let rgx10 = new RegExp(regstr_10,"g");
    let rgx11 = new RegExp(regstr_11,"g");
    let rgx12 = new RegExp(regstr_12,"g");
    let rgx13 = new RegExp(regstr_13,"g");
    let rgx14 = new RegExp(regstr_14,"g");
    let rgx15 = new RegExp(regstr_15,"g");
    let rgx16 = new RegExp(regstr_16,"g");
    let rgx17 = new RegExp(regstr_17,"g");
    let rgx18 = new RegExp(regstr_18,"g");
    let rgx19 = new RegExp(regstr_19,"g");
    let rgx20 = new RegExp(regstr_20,"g");
    let rgx21 = new RegExp(regstr_21,"g");

    let argxp = [rgx0, rgx1, rgx2, rgx3, rgx4, rgx5, rgx6, rgx7, rgx8, rgx9, rgx10, 
                  rgx11, rgx12, rgx13, rgx14, rgx15, rgx16, rgx17, rgx18, rgx19, rgx20, rgx21];
    console.log("Beginning of arr_1: ")
    let astghanish = new RegExp(/(\*\*)/,"g");
    for(let i=0; i<arr_0.length; i++){
      console.log(i);
      console.log(arr_0[i]);  // ok
      for(let j=0; j<argxp.length; j++){
        // replacing each title with regexp
        if(j==0){
          arr_0[i]= arr_0[i].replace(argxp[j], aregstr[j]+" *bbb* ");
        }
        else{
          arr_0[i]= arr_0[i].replace(argxp[j]," *aaa* "+aregstr[j]+" *bbb* ");
        }
      }
      console.log("After replacing");
      console.log(i);
      console.log(arr_0[i]);
// removing spaces    .replace(/\s/g, "")
    }
    console.log("end of arr_1");
    //console.log(arr_0); // ok
    //making object from arr_0 to insert into db
    this.aObjToInsert=[];
    for(let k=0; k<arr_0.length; k++){
      let obj={
        pictFolder:this.pictureFolder
      };
      let arrLine=arr_0[k].split("*aaa*");
      for(let m=0; m < arrLine.length; m++){
        let st=arrLine[m].split("*bbb*");
        //console.log(st);
        st[0]=st[0].trim();
        st[1]=st[1].trim();
        st[1]=st[1].replace(/,(\s+)?$/, '');
        if(st[1].length>0){
          let kwInd= this.aTitles.indexOf(st[0]);
          let ky = this.akeywords[kwInd];
          let isArr = this.akeywordTypes[kwInd];
          if(isArr == "text_array_nosp" || isArr == "text_array"){
            st[1]=st[1].replace(astghanish, ",");
            let aa = st[1].split(",");
            let bb = aa.map(item=>item.trim());
            let cc =[];
            for(let x=0; x<bb.length; x++){
              if(bb[x] != "undefined" && bb[x] != null && bb[x] !=""){
                if(isArr == "text_array_nosp"){
                  bb[x]=bb[x].replace(/\s/g, "");
                }
                cc.push(bb[x]);
              }
            }
            st[1]=cc;
          }
          obj[ky] =st[1];
        }
      }
      this.aObjToInsert.push(obj);
      delete obj;
    }
    console.log(this.aObjToInsert);
    // saveOneDoc(docObj)
    //await this.saveManyDocs(this.aObjToInsert);
    for(let kk=0; kk<(this.aObjToInsert).length; kk++){
         //await  this.saveOneDoc(this.aObjToInsert[kk]);
        let docObj = this.aObjToInsert[kk];
         console.info(this.aObjToInsert[kk]);
         // checking uniqueness
            // getting last document Number with same park.kap, papka id
            const response = await fetch("http://127.0.0.1:9200/darch/_doc/_search", 
            {
              headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
                },  
              method: 'POST',
              body: JSON.stringify({
                query: { 
                  constant_score:{
                      filter:{
                        bool: {
                          must: [
                            {
                              term:{
                                park:docObj.park
                              }
                            },
                            {
                              term:{
                                kap:docObj.kap
                              }
                            },
                            {
                              term:{
                                papka:docObj.papka
                              }
                            },
                            {
                              term:{
                                documentNum:docObj.documentNum
                              }
                            }
                          ]
                        } 
                      }
                    }
                  }
                  }
                  )
                }
            )
            const json = await response.json();
            let max_num = 0;
            let id_max_num="";
            console.log(json);
            if(json.hits.total>0){
              id_max_num = json.hits.hits[0]._id;
              max_num = json.hits.hits[0].documentNum;
              console.log("max_num = "+max_num);
              console.log("id_max_num = "+id_max_num);
              console.log("ERROR!!! There is another document (id = "+id_max_num+") registered with the same number and park, kap, papka");
              //return;
            }//end of checking uniqueness
            else{
              // inserting new document
              // let doc_num = ++max_num;
              console.log("inserting");
              const response1 = await fetch("http://127.0.0.1:9200/darch/_doc/", 
                {
                    body: JSON.stringify(this.aObjToInsert[kk]),
                    // must match 'Content-Type' header
                    cache: 'no-cache',
                    mode: 'cors',
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
              const jsonn = await response1.json();    
              //setTimeout(getAllUsers(), 2000);
              const last_id = jsonn._id;
              console.info(jsonn);
              
              if(last_id){
                console.info(last_id);  // OK
                //alert("Document inserted: _id == "+ last_id);
              }
            } // end of else .... checking uniqueness
    }
  }
}
//
function combinetext(txt1, txt2){
  return " <p> "+txt1 + " </p> <p> " + txt2+" </p> ";
}
//
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
  let res = await fetch("http://127.0.0.1:9200/users/_doc/"+user_id);
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
      let saveEditUserBtn = new Button(btnEmptyDivEdit, "button", {title:"Save Edited User", 
                                                                  action:"SaveEditedUser"});     
      saveEditUserBtn.elem.onclick = async function(){
        let userChanged={
          userstatus:selUserStatusEd.getText(),
          username:tfuserNameEd.getText(),
          login:tfuserLoginEd.getText(),
          email:tfuserEmailEd.getText(),
          password:tfnEditUserPasswEd.getText(),
          confirmPassw:tfnEditUserPasswConfirm.getText()
        }  
        console.info(userChanged);
        if(userChanged.password !=="undefined" && userChanged.password !== ""){
          if(userChanged.confirmPassw !=="undefined" && userChanged.confirmPassw !== ""){
            if(userChanged.password === userChanged.confirmPassw){
              delete userChanged.confirmPassw
              // updating user data
              await saveChangedUser(user_id, userChanged);
              await EditUserContainer.hidediv();
            }
          }
        }
        
      }
      let showResetBtn = new Button(btnEmptyDivEdit, "button", {type:"reset", title:"Go to Log In", action:"showLogin"});    
      showResetBtn.elem.onclick=function(){
        EditUserContainer.hidediv();
        LoginContainer.showdiv();
      }
      //btnEmptyDivEdit.addChild(saveEditUserBtn);
      //btnEmptyDivEdit.addChild(showResetBtn); 
      //EditUserContainer.hidediv();
      //return await EditUserContainer;
  }
  else{
      alert("no Data Found to Edit");
      return false;
  }
  //
}
async function collectUserData(obj){
    newObj={};
    newObj.status = await obj.selUserStatusEd.getText();
    newObj.username = await obj.tfuserNameEd.getText();
    newObj.login = await obj.tfuserLoginEd.getText();
    newObj.email = await obj.tfuserEmailEd.getText();
    newObj.password = await obj.tfnEditUserPasswEd.getText();
    return await newObj;
}
//
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
  "Փաստաթուղթ N",
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
// inside Managemant menu  ****                             *************************
// ****************************  making SEARC block Classes *************************
//
// keys from darchTemplateJSON[{},...]
/*
park: {
    title:"ՊԱՐԿ N",
    value:0,
    type:"number",
    isArray:false,
    canRemember:true
    },
*/
let aSearchableKeys=["papka", 
                    "addressStreet", 
                    "kvartal", 
                    "title", 
                    "owner", 
                    "buyer",
                    "seller",
                    "type", 
                    "primaryAnalysis", 
                    "description"
                  ];
// Simple search Table class 
class simpleSearchTable{
  constructor(parentBox, Attributes={
                                      cell_class:"div_cell", 
                                      row_class:"div_row",
                                      table_class:"div_table",
                                      tableTitle:"One Field Search Form",
                                      tblTitleClass:"tbl_title"
    }){
      this.parent = parentBox;
      this.attributes = Attributes;
      this.table = document.createElement("DIV");
      if(this.attributes.table_class){
        this.tableClass=this.attributes.table_class;
      }
      else{
        this.tableClass="div_table";
      }
      if(this.attributes.row_class){
        this.rowClass=this.attributes.row_class;
      }
      else{
        this.rowClass="div_row";
      }
      if(this.attributes.cell_class){
        this.cellClass=this.attributes.cell_class;
      }
      else{
        this.cellClass="div_cell";
      }
      if(this.attributes.tableTitle){
        if(this.attributes.tblTitleClass){
          this.tblTitleClass = this.attributes.tblTitleClass
        }
        else{
          this.tblTitleClass = "tbl_title";
        }
        this.tableTitle = this.attributes.tableTitle;
        this.div = document.createElement("DIV");
        this.div.setAttribute("class", this.tblTitleClass);
        this.div.innerHTML="<span style='color:white'>"+this.tableTitle+"</span>";
        this.parent.appendChild(this.div);
      }
      this.table.setAttribute("class", this.tableClass);
//
    this.row = document.createElement("DIV");
    this.row.setAttribute("class", this.rowClass);
    let cell_1 = document.createElement("DIV");
    cell_1.setAttribute("class", this.cellClass);
    let cell_2 = document.createElement("DIV");
    cell_2.setAttribute("class", this.cellClass);
    let cell_3 = document.createElement("DIV");
    cell_3.setAttribute("class", this.cellClass);
    cell_1.innerHTML="<span style='color:white'>Search Phrases</span>";

    this.tfSimpleSearch = new TextFieldClass(cell_2, "tf_sfhr", "", "", {tf_class:"inputs", 
                                                                          index:0,
                                                                          keyword:"kw",
                                                                          labelClass:"black",
                                                                          placeholder:"search words"
                                                                        });
    this.btnSimpleSearch= new ButtonClass(cell_3, "idBSS", "", "SEARCH", {action:"simpleSearch"});
    //
    this.row.appendChild(cell_1);
    this.row.appendChild(cell_2);
    this.row.appendChild(cell_3);
    //
    this.table.appendChild(this.row);
    this.parent.appendChild(this.table);
    this.btnSimpleSearch.btn.onclick=async ()=>{
      this.qustr=this.tfSimpleSearch.getValue();
      console.log(this.tfSimpleSearch.getValue());  // ok
      this.resultJson = await getDocQstring(this.qustr);
      console.log("this.resultJson");
      console.log(this.resultJson);
      await this.showRwsult();
      //qustr = "nothing";
    }
  } // End of constructor
  showRwsult = async ()=>{
    await this.clearcontent();  /// ????
    if(this.resultJson){
      this.div.remove();
      this.resultDivInfo = document.createElement("div");
      this.resultDivInfo.setAttribute("class", "searchresultinfo");
      this.resultDiv = document.createElement("div");
      this.resultDiv.setAttribute("class", "searchresult");
      this.parent.appendChild(this.resultDivInfo);
      this.parent.appendChild(this.resultDiv);
      let num = this.resultJson.hits.total;
      let numInPage = this.resultJson.hits.hits.length;
      this.resultDivInfo.innerHTML="searched <b>"+this.qustr+"</b>, found <b>"+num+"</b> results";
      //this.resultDiv.innerHTML=num;// info test
      this.aOL=[];
      this.aDoc=[];
      let kkkk=1;
      for(let i=0; i<numInPage; i++){
        let count = document.createElement("div");
        count.setAttribute("class", "searchresultinfo");
        this.resultDiv.appendChild(count);
        count.innerHTML=kkkk;
        this.aOL[i]=document.createElement("OL");
        //this.aOL[i].value=i;
        this.aDoc[i]=this.resultJson.hits.hits[i]._source;
          //this.aLi=[];
          Object.entries(this.aDoc[i]).forEach(([k,m])=>{
                let liItem = document.createElement("LI");
                
               // liItem.value=k;
               if(k=="pageScanned"){
                 let pictFolder = this.aDoc[i]["pictFolder"];
                 console.log("pictFolder: "+pictFolder)
                 //let pictFolder = getFolderNmae(this.aDoc[i]["papka"]);
                 //let pictFolder = "../"+m+"/";
                //makeImage(parent, filename, foldername="../vankskaya_skan/", height="75px")
                if(Array.isArray(m)){
                  for(let b=0; b<m.length; b++){
                    makeImage(liItem, m[b], pictFolder);
                  }
                }
                else{
                  makeImage(liItem, m, pictFolder)
                }                
                //liItem.appendChild(im);
               }
               else{
                //let mmm= highlight(this.qustr, m);
                 liItem.innerHTML="<b>"+k+"</b>:"   +m;
                 //highlight(this.qustr, m)
               }

                // liItem.innerHTML="<b>"+k+"</b>:"   +m;
                //this.aLi.push(liItem);
                this.aOL[i].appendChild(liItem);
            }
          )
          
        this.resultDiv.appendChild(this.aOL[i]);
        kkkk++;
      }
    }
  }
  hide(){
    this.div.style.display="none";
    this.table.style.display="none";
  }
  show(){
    this.div.style.display="block";
    this.table.style.display="block";
  }
  //
  clearcontent = async()=>{
    while(this.div.firstChild){
      this.div.removeChild(this.div.firstChild);
    }
  }
}
// end of Simple search Table class
console.info("3759: user.id == ");
console.info(user);
// Class advSearchTable
class advSearchTable {
  constructor(parentBox, jsonObj=darchTemplateJSON, aKeys=aSearchableKeys, Attributes={
                                                                    cell_class:"div_cell", 
                                                                    row_class:"div_row",
                                                                    table_class:"div_table",
                                                                    tableTitle:"Advanced Search Form",
                                                                    tblTitleClass:"tbl_title"
                                                                    })
    {  
    this.parent = parentBox;
    this.jsonObj = jsonObj;
    this.attributes = Attributes;
    this.keys = aKeys;
    this.aTitles=[];
    this.userName="";
    this.registered = "";
    for(let i=0; i<this.keys.length; i++){
      Object.entries(this.jsonObj [this.keys[i]]).forEach(([k,m])=>{
          if(k=="title"){
            this.aTitles.push(m);
          }
        }
      )
    }
    this.dateFormat="yyy-mm-dd";
    this.table = document.createElement("DIV");
    this.name_val=[];
    //
    this.notEmptyTFvalues=[];
    this.notEmptyTFids=[];
    this.notEmptyKeys=[];
    //
    this.aInputTextObj=[];  // array of input text and number objects created in table cells
    //this.row = document.createElement("DIV");
    this.aRows=[];
    this.displaMode="editable"; // ??

    if(this.attributes.table_class){
      this.tableClass=this.attributes.table_class;
    }
    else{
      this.tableClass="div_table";
    }
    if(this.attributes.row_class){
      this.rowClass=this.attributes.row_class;
    }
    else{
      this.rowClass="div_row";
    }
    if(this.attributes.cell_class){
      this.cellClass=this.attributes.cell_class;
    }
    else{
      this.cellClass="div_cell";
    }
    if(this.attributes.allUsers){
      this.users=this.attributes.allUsers;
    }
    if(this.attributes.tableTitle){
      if(this.attributes.tblTitleClass){
        this.tblTitleClass = this.attributes.tblTitleClass
      }
      else{
        this.tblTitleClass = "tbl_title";
      }
      this.tableTitle = this.attributes.tableTitle;
      this.div = document.createElement("DIV");
      this.div.setAttribute("class", this.tblTitleClass);
      this.div.innerHTML="<span style='color:white'>"+this.tableTitle+"</span>";
      this.parent.appendChild(this.div);
    }
    this.table.setAttribute("class", this.tableClass);
    for(let j=0; j<this.keys.length; j++){
      this.aRows[j]=document.createElement("DIV");
      this.aRows[j].setAttribute("class", this.rowClass);
      let cell_1 = document.createElement("DIV");
      cell_1.setAttribute("class", this.cellClass);
      let cell_2 = document.createElement("DIV");
      cell_2.setAttribute("class", this.cellClass);
      cell_1.innerHTML="<span style='color:white'>"+this.aTitles[j]+"</span>";
      //class TextFieldClass extends InputField {
      // constructor(Container, ID, Class, Label,  Attributes) {
      //
      this.aInputTextObj[j]= new TextFieldClass(cell_2, "stf_"+j, "", "", {tf_class:"inputs", 
                                                                        index:0,
                                                                        keyword:"kw",
                                                                        labelClass:"black"
                                                                      });
      this.aRows[j].appendChild(cell_1);
      this.aRows[j].appendChild(cell_2);
      this.table.appendChild(this.aRows[j]);
    }
    this.userRow = document.createElement("DIV");
    this.userRow.setAttribute("class", this.rowClass);
    this.dateRow = document.createElement("DIV");
    this.dateRow.setAttribute("class", this.rowClass);
    let cell_u1 = document.createElement("DIV");
    cell_u1.setAttribute("class", this.cellClass);
    let cell_u2 = document.createElement("DIV");
    cell_u2.setAttribute("class", this.cellClass);
    console.log("3859")
    console.log(this.users)
    this.selUser= new DropDownClass(cell_u2, "selUserID", "", "",  {optionObjectTextKey:"username",
                                                                    optionObjectKey:"id",
                                                                    selectedValue:user.id});
    console.info("3952: user.id == "+user.id)
    this.selUser.getAllUserIDsNames();
    let cell_d1 = document.createElement("DIV");
    cell_d1.setAttribute("class", this.cellClass);
    let cell_d2 = document.createElement("DIV");
    cell_d2.setAttribute("class", this.cellClass);
    cell_u1.innerHTML="<span style='color:white'>Select User</span>";
    cell_d1.innerHTML="<span style='color:white'>Select Date Interval</span>";
    this.inputDateFrom = new TextFieldClass(cell_d2, "stfd_from", "", "", {tf_class:"inputdate", 
                                                                          index:0,
                                                                          keyword:"kw",
                                                                          labelClass:"black",
                                                                          placeholder:"yyyy-mm-dd"
                                                                        });
    this.inputDateTo = new TextFieldClass(cell_d2, "stfd_to", "", " --", {tf_class:"inputdate", 
                                                                        index:0,
                                                                        keyword:"kw",
                                                                        labelClass:"black",
                                                                        placeholder:"yyyy-mm-dd"
                                                                      });
    //
    this.userRow.appendChild(cell_u1);
    this.userRow.appendChild(cell_u2);
    this.dateRow.appendChild(cell_d1);
    this.dateRow.appendChild(cell_d2);
    //
    this.table.appendChild(this.userRow);
    this.table.appendChild(this.dateRow);
   
    // class ButtonClass extends InputField {
    //constructor(Container, ID, Class, Label,  Attributes) 
    this.btnSearch= new ButtonClass(this.table, "idBAS", "", "Adv. SEARCH", {action:"advSearch"});
    this.parent.appendChild(this.table);
  }
  hide=()=>{
    this.div.style.display="none";
    this.table.style.display="none";
  }
  show=()=>{
    this.div.style.display="block";
    this.table.style.display="block";
  }
  
}
// END of Class advSearchTable

// function to toggle between simple and advanced search formss
let toggleSearch = (parentDiv, obj1, obj2, buttonclass)=>{
  // parentDiv = pageContent.subTitleDiv
  let tf = document.createElement("INPUT");
  parentDiv.appendChild(tf);
  tf.setAttribute("type", "button");
  // let title1 = document.createTextNode("Change to Advanced Search");
  // let title2 = document.createTextNode("Change to One Field Search");
  let title1 = "Change to Advanced Search";
  let title2 = "Change to One Field Search";
  // tf.appendChild(title1);
  //tf.innerText = "Change to Advanced Search";
  tf.setAttribute("class", buttonclass);
  tf.setAttribute("value", "Change to Advanced Search");
  let isChecked = false;
  tf.onclick=()=>{
    if(isChecked==false){
      tf.setAttribute("value", "Change to One Field Search");
      obj1.show();
      obj2.hide();
      isChecked = true;
      //alert("truee");
    }
    else{
      tf.setAttribute("value", "Change to Advanced Search");
      obj2.show();
      obj1.hide();
      isChecked = false;
      //alert("falsee");
    }
   // alert(isChecked);
  }
}

// END of inside Management Menu *****************************************************
//
// pageContent CLASS ****************************** pageContent CLASS  ******
let pageContent = function(sub_title, div_class, sub_title_class, Attributes={footerclass:"cuntent_footer", user:user}){
  this.subtitle = sub_title;
  this.attributes=Attributes;
  this.contentDiv = document.createElement("div");
  this.subTitleDiv = document.createElement("div"); 
  this.contentDiv.setAttribute("class", div_class);
  this.subTitleDiv.setAttribute("class", sub_title_class);
  this.subTitleDiv.innerHTML = this.subtitle;
  this.contentDiv.appendChild(this.subTitleDiv);
  this.loggedUser=this.attributes.user;
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
  this.appendToBody=this.appendToBody.bind(this);
  //this.getContentRows = this.getContentRows.bind(this);
}
//
pageContent.prototype.appendToBody = function(){
  document.body.appendChild(this.contentDiv);
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
//
let div1 = pageContentInput.contentDiv;
let mt = new maketable(div1, darchTemplateJSON);
mt.showInputForm();
let btnBtnDiv= document.createElement("div");
div1.appendChild(btnBtnDiv);
btnBtnDiv.setAttribute("class","tf_panel");

let btnGetAllValues = new ButtonClass(btnBtnDiv, "ID", "", "Get All Values", {action:"GetAllvalues"});
//pageContentInput.loadContentRows(pageContentInput.contentDiv);
//pageContentInput.addFooter();
//let btnSaveInput = new Button(pageContentInput.getFooter(), "button", saveInputAttributes); // 
//
//pageContentInput.hideContent();
let pageContentImport = new pageContent("Import Large Text Form", "div_3", "subtitle");
pageContentImport.appendToBody();
let div2 = pageContentImport.contentDiv;

//var inputContainer = new Container("input_id", "div_signup", "Large Text Input Form", true);  // Large text
let tfLarge = new textArea("id_taLarge", "id_ta_large_text", "tf_panel", "Large Text", {rows: 30, cols:146});
/*
class TextFieldClass extends InputField {
  constructor(Container, ID, Class, Label,  Attributes) {
*/
let tfFolderDiv = document.createElement("div");
//tfFolderDiv.setAttribute("class","tf_panelSave");
let tfPictFolder = new TextFieldClass(tfFolderDiv,"idFolderContainer","", "Picture Folder");
//let LargeTextDiv = tfLarge.getForm(); // Import box
//inputContainer.addChild(LargeTextDiv);          // Large text field is inside log in div
let SaveLaregeTextAttrib = {
  title:"Save Large Text",
  action:"saveLargeText",
  text_source_obj:tfLarge,
  template:darchTemplate,
  pict_folder_tf:tfPictFolder
}
let btnSaveDiv = document.createElement("div");
btnSaveDiv.setAttribute("class","tf_panelSave");
//inputContainer.addChild(btnSaveDiv);
let saveBtn = new Button(btnSaveDiv, "button", SaveLaregeTextAttrib); 
div2.appendChild(tfLarge.getForm());
tfLarge.getForm().appendChild(tfFolderDiv);
div2.appendChild(btnSaveDiv);

//pageContentImport.hideContent();
let pageContentManagement  = new pageContent("Search and edit documents", "div_4", "subtitle");

let mst = new advSearchTable(pageContentManagement.contentDiv);
let sst = new simpleSearchTable(pageContentManagement.contentDiv);
mst.hide();
sst.hide();
sst.show();
//let sbox=new searchBox(pageContentManagement.contentDiv);

toggleSearch(pageContentManagement.subTitleDiv, mst, sst, "dummed");
//sbox.changeState(mst, sst);
//pageContentManagement.hideContent();

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
      console.log(user);
      this.updateMenu();
    }, false);
    this.elm.appendChild(this.menuItems[i]);
  }

 this.updateMenu = this.updateMenu.bind(this);
 this.signOut = this.signOut.bind(this);
  //this.fout = this.fout.bind(this);
}
//
topMenu.prototype.signOut= async function(){
  localStorage.removeItem("zappassw");
  localStorage.removeItem("tstamp_last");
  localStorage.removeItem("zaplogin");
// user object : canging values to default
  user.username="Enter Your Name";
  user.login="Enter Login";
  user.email="Enter e-mail";
  user.islogged=false;
  let asavedData = await getSavedData();
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