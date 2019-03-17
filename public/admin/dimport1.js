var user_id = 0;
var user_login="sm";
var user_passw="lilitik0";
var expireMinutes = 1;
var user = {
    userstatus: "user",
    username: "Enter Your Name",
    login:"Enter Login",
    password: "Enter password",
    email: "Enter e-mail"
  }
let akeywords = [
    "park",
    "kap",
    "papka",
    "document_num",
    "address_street",
    "kvartal",
    "tema_event",
    "id_number",
    "title",
    "address",
    "owner",
    "buyer",
    "seller",
    "type",
    "source",
    "page_scanned",
    "big_file",
    "sw",
    "lang",
    "primary_analysis",
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
    "text_array",  // "Փ.-իթեմանկամիրադարձությունը, թվ.-ըկարևորիմաստով",
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
  true,    // "ՊԱՐԿ N",
  true,    // "ԿԱՊ N",
  true,    // "Թղթապանակ.",
  "autoincrement",    // "Փաստաթուղթ. N",
  true,  // "հասցե, փողոց",
  true,    // "թաղամաս.",
  false,  // "Փ.-իթեմանկամիրադարձությունը, թվ.-ըկարևորիմաստով",
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
let templ_1={
    akw: {...akeywords},
    akwTitles: {...aKwTitles},
    akwtTypes: {...akeywordTypes},
    akwRemember: {...akeywordRemember}
} 
function showtemplate(tmpl){
  Object.keys(tmpl).forEach(e=>console.log(`key=${e} keys == ${Object.keys(tmpl[e])} values == ${Object.values(tmpl[e])}`));
  //Object.keys(tmpl).forEach(e=>console.log(`key=${e} values == ${Object.values(tmpl[e])}`));
}



//

//
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
showtemplate(templ_1);
let aobj = objTemplateMake(templ_1);
console.log(aobj);
//console.log(phraseObjArr);  // ok
let obj={};   
//console.log(akeywords.length);
//console.log(akeywordTypes.length);
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
//
function saveTimeStamp(deltaminutes){
    let d1 = new Date (), d2 = new Date ( d1 );
     d2.setMinutes ( d1.getMinutes() + deltaminutes);
     //alert("onUnload  = "+d2.getTime());
     localStorage.setItem("tstamp_last",d2.getTime());
     console.info("SaveTimeStamp into local storage: d2 = "+d2.getTime()+", d1 = "+d1.getTime());
     console.info(" added "+expireMinutes+ "min  with deltadate = "+d1.getMinutes() +" + "+ deltaminutes);
   }
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
// making OneDocument  class
let oneDocument = function(doc_text, ...aphrases){
  this.lineSeparator="*aaa*";
  this.propertySeparator="*bbb*";
  this.doc = doc_text;
    //this.newDoc=this.doc;
    this.aphrases = aphrases; // array of phrases
    this.makeDoc = this.makeDoc.bind(this);
  }
//
oneDocument.prototype.makeDoc=function(){
    for(let i=0; i<this.aphrases.length; i++){
      console.log(this.aphrases[i]);
      this.doc = this.doc.replace(this.aphrases[i], "****");
    }
    console.log(this.doc)
  }
//let tt="ՊԱՐԿ N 7,	ԿԱՊ N 1, Թղթապանակ (Վանքսկայափ.), Փաստաթուղթ N 14 հասցե, փողոց Վանքի փողոց, այժմ՝ Աթոնելի փ., Վանքի մեծ փողոց, Վանքի փոքր փողոց, այժմ՝ Սուլխանիշվիլի փ. Ванкская ул., ныне – Атонели, Малая Ванкская, ныне –Сулханишвили, Большая Ванкская թաղամաս. Սոլոլակ Փ.-իթեմանկամիրադարձությունը, թվ.-ըկարևորիմաստով Հերթականհամար. Վերնագիր. Շուկայի լուսանկար Հասցե. Վանքսկայա փ. Սեփականատեր. Գնորդ. Վաճառող. Տեսակ. լուսանկար Աղբյուր. Էջըթվայնացված. 7-1-14.Jpg Մեծֆայլ. pdf, doc, mpeg. Որոնմանբառեր. Վանքսկայափ., շուկա. Լեզու. Նախնականվերլուծություն. Կարծիքներհամացանցից. Նկարագրություն. Հավանաբար՝ Րուսսկի բազարն է, որը կոչվել է նաև Սոլդատսկի բազար:";
//let aa =  new oneDocument(tt, aKwTitles);
//aa.makeDoc();

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
  
  this.tarea.setAttribute("id", this.id );
  // atributes object

  this.tarea.onchange=()=>{
    this.Value = this.tarea.value;
   // console.log(this.Value);
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
//
function findKeyword(title, ...arr){
  
}
//**********************************************************
// Button class
let Button = function(container, btntype = "button", Attributes={}){
  this.Container = container;
  this.Type = btntype;  // submit, button, reset
  this.attributes = Attributes;
  this.aKw = [
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
    this.maximumId = this.attributes.last_user_id();
    this.last_user_id =  user.user_id;
    this.elem.onclick=()=>{
      //alert("Sign Up clicked !");
      console.log("user.user_id == "+this.last_user_id)
      console.log("table == "+this.user_table);
      console.log("last id == "+this.maximumId);
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
  else if(this.attributes.action=="saveLargeText"){
    this.elem.onclick=()=>{
        //alert("Sign Up clicked !");
        this.manageLaregeText();
     }
  }
  if(this.attributes.template){
    console.log("has attribute template");
    this.docKewords=Object.values(this.attributes.template.akw);
    console.log(this.docKewords.length);
    console.log(this.docKewords);
    this.docKewordTitles=Object.values(this.attributes.template.akwTitles);
    console.log(this.docKewordTitles.length);
    console.log(this.docKewordTitles);
    this.docKewordTypes=Object.values(this.attributes.template.akwtTypes);
    console.log(this.docKewordTypes.length);
    console.log(this.docKewordTypes);
  }
  // functions bindings
  this.UserLoginFunction = this.UserLoginFunction.bind(this);
  this.SignUpFunction = this.SignUpFunction.bind(this);
  // this.createMenu=this.createMenu.bind(this);
  this.readSavedData=this.readSavedData.bind(this);
  this.getNowDate=this.getNowDate.bind(this);
  //this.signOut=this.signOut.bind(this);
  this.getContainer=this.getContainer.bind(this);
  //this.getMaxId = this.getMaxId.bind(this);
  this.manageLaregeText = this.manageLaregeText.bind(this);
  this.saveOneDoc=this.saveOneDoc.bind(this);
  this.saveManyDocs=this.saveManyDocs.bind(this);
}
//
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
    const response = await fetch("http://elastic/darch/_doc/_search", 
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
    const response1 = await fetch("http://elastic/darch/_doc/", 
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
//
Button.prototype.getContainer = function(){
  return this.Container;
}
//
Button.prototype.SignUpFunction = function(){
    alert("Must show New User Registration Form");
    //bDiv.hidediv();
   //fDiv.showdiv();
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
      let obj={};
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

    //return new Promise(resolve=>this.aObjToInsert);
    // saveOneDoc(docObj)
    //await this.saveManyDocs(this.aObjToInsert);
    for(let kk=0; kk<(this.aObjToInsert).length; kk++){
         //await  this.saveOneDoc(this.aObjToInsert[kk]);
        let docObj = this.aObjToInsert[kk];
         console.info(this.aObjToInsert[kk]);
         
         // inserting new document
         // let doc_num = ++max_num;
         console.log("inserting");
         const response1 = await fetch("http://elastic/darch/_doc/", 
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
    
    }
    
  }
}
//
function combinetext(txt1, txt2){
  return " <p> "+txt1 + " </p> <p> " + txt2+" </p> ";
}

//
Button.prototype.UserLoginFunction = function(){
    console.info("user Login is: "+ tfLogin.getText() + ", and user Password is: "+  
        tfPassw.getText()+" Checkbox: getChecked() "+  chPassw.getChecked() + ", Checkbox: getText(): " + chPassw.getText());
    let logged = searchUser(tfLogin.getText(), tfPassw.getText()) ;
    if(logged){
      //this.getContainer();
      LoginContainer.hidediv();
        // aContent - array of containers of cantent
    aContent[active_menu].showContent();
    makeMenu.elm.style.display="block"; // 

     // aDiv.showdiv();
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

// 
var inputContainer = new Container("input_id", "div_signup", "Large Text Input Form", true);  // Large text
let tfLarge = new textArea("id_taLarge", "id_ta_large_text", "tf_panel", "Large Text", {rows: 30, cols:46});
let LargeTextDiv = tfLarge.getForm(); // login box
inputContainer.addChild(LargeTextDiv);          // login text field is inside log in div

// Attributes for Button object
let SaveLaregeTextAttrib = {
  title:"Save Large Text",
  action:"saveLargeText",
  text_source_obj:tfLarge,
  template:templ_1
}
let LoginAttributes = {
    title:"Log In",
    action:"LogIn"
  }


let btnSaveDiv = document.createElement("div");
btnSaveDiv.setAttribute("class","tf_panelSave");
inputContainer.addChild(btnSaveDiv);
let saveBtn = new Button(btnSaveDiv, "button", SaveLaregeTextAttrib); 

//
let validUser=searchUser(user_login, user_passw);
  //

if(validUser){
    console.log("returned validuser");

} // end of if(validUser){
  
