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
  console.log(darchTemplateJSON);
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


// searcing document by parameters:
async function getDoc(parkk, kapp, papk, docnum){
  
  const response = await fetch("http://elastic/darch/_doc/_search", 
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
    alert("Document successfully inserted");
    return json;
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
  //let insertedJson = await  getDoc(park, kap, papka, documentNum);
  //console.info(insertedJson);
}
//


//
async function getAllDocs(){
  let res = await fetch("http://elastic/darch/_doc/_search", {
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
    //setText(txt){
    //    this.tf.value=txt;
    //}
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
          infoDiv.innerHTML=this.getState();
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
  let div1 = document.createElement("DIV");
  document.body.appendChild(div1);
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
                acell[j].innerHTML=this.aInput_caption[i]
              }
              else if(this.acolsField[j]=="key"){
                acell[j].innerHTML=this.aName_kw[i];
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
    /*
    Object.keys(tmplt).forEach(e=>{
    if(e=="akw"){
      console.log("akewords");
      anum_kwd = Object.keys(tmplt[e]);
      console.log(anum_kwd);
      akeywords = Object.values(tmplt[e]);
      console.log(akeywords);
    }
    //
    Object.keys(jsonObj).forEach(e=>{
        
        console.log(e);
        aRows(push())
        console.log(jsonObj[e]);
        Object.entries(jsonObj[e]).forEach(([k, m])=>{
            console.log(k+":  "+m);
          }
        )
      }
    )*/
  
let mt = new maketable(div1, darchTemplateJSON);
mt.showInputForm();
//
//
//let btnEmptyDiv = document.createElement("div");
//let btnEmptyDivTa = document.createElement("div");
//let btnEmptyDivCh= document.createElement("div");
//let groupDiv= document.createElement("div");
//let groupDivTA= document.createElement("div");

let btnBtnDiv= document.createElement("div");
//const infoDiv= document.createElement("div");
//document.body.appendChild(btnEmptyDiv);
//document.body.appendChild(btnEmptyDivTa);
//document.body.appendChild(btnEmptyDivCh);
//document.body.appendChild(groupDiv);
//document.body.appendChild(groupDivTA);
document.body.appendChild(btnBtnDiv);
//document.body.appendChild(infoDiv);
//infoDiv.innerHTML="";

//btnEmptyDiv.setAttribute("class","tf_panel");
//btnEmptyDivTa.setAttribute("class","tf_panel");
//btnEmptyDivCh.setAttribute("class","tf_panel");
//groupDiv.setAttribute("class","tf_panel");
//groupDivTA.setAttribute("class","tf_panel");
btnBtnDiv.setAttribute("class","tf_panel");
//infoDiv.setAttribute("class","tf_panel");

//btnEmptyDiv.setAttribute("id","Container");
//let div = document.createElement("div");
//div.setAttribute("id","Container");

//let tf = new TextFieldClass(btnEmptyDiv, "ID", "", "", {tf_class:"inputs",value:"lalla", index:0, keyword:"kw"});

//let ta = new TextAreaClass(btnEmptyDivTa, "IDa", "", "", {rows:5, cols:55, value:"koko"});
//let ch = new CheckBoxClass(btnEmptyDivCh, "ID", "", "", {status:true});
//let btnGetTextArr = new ButtonClass(btnBtnDiv, "ID", "", "GetTextsArray", {action:"GetValues"});
//let btnGetTextAreaArr = new ButtonClass(btnBtnDiv, "ID", "", "GetTextAreaArray", {action:"GetTAvalues"});
let btnGetAllValues = new ButtonClass(btnBtnDiv, "ID", "", "Get All Values", {action:"GetAllvalues"});
//let textFieldGroup = new inputGroup(groupDiv,  "tfg", "textField", {tf_class:"inputs", index:0});
//let textAreaGroup = new inputGroup(groupDivTA,  "tfg", "textArea", {tf_class:"inputs", index:0});

//ta.setValue("vavavavavav kakakak"); 
//console.log(ta.getValue());
//tf.setValue("textfield text");
//console.log(tf.getValue());
//ch.setState(true);
//infoDiv.innerHTML=ch.getState();