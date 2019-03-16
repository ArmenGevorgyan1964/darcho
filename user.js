var user = {
    username: "Enter Your Name",
    login:"Enter Login",
    password: "Enter password",
    email: "Enter e-mail"
}
//
const menuTitles = {
    titles:["mnu_title_1", "mnu_title_2", "mnu_title_3"],
    div_ids:["Div_1", "Div_2", "Div_3"],
    div_contents:["div_content_1", "div_content_2", "div_content_3"],
    mnu_active_class:"mnu_active",
    mnu_passive_class:"mnu_passive",
    top_menu_class:"topmenu",
    mnu_panel_class:"inline_panel",
    container_id: mnuBlock_id,
    active_title_id: 0
}
// global div id variables
var registeredUser = false;
var mnuBlock_id="mnuBlock"; // Top Menu container
var loginBlock_id="loginBlock";
var newUserBlock_id="newUserBlock";
var active_nemu_id=0;

// variant with array
var aContainer_div_id = ["Div_1", "Div_2", "Div_3"];
//
// Right Info Block
class UserInfo{
    constuctor(topMenuBlock, LogInFormBlock, userName){
        let _self=this;

        this.loginForm = LogInFormBlock;
        this.menuBlock = topMenuBlock;
        if(registeredUser == true){
            if(!userName){
                alert("The User is Registered but it has empty name");
            }
           this.info="Registered user: <b>"+ userName +"</b>";
        }
        
        this.userInfoBlock = document.createElement('div');
        this.userInfoBlock.setAttribute("class", "infoblock_right");
        this.logOutBtn = document.createElement('input');
        this.logOutBtn.addEventListener("click", logOut);
        this.logOutBtn.setAttribute('type','button');
        this.logOutBtn.value = "Log Out";
        this.menuBlock.appendChild(_self.userInfoBlock);

    }
    logOut(){
        registeredUser = false;
        _self.loginForm.style.display="block";
        _self.loginForm.style.display="none";
    }
}
//********************************************************************** 
var MakeMenu = (active_id, objTitles)=>{
    let divContainer = document.createElement('div');
    divContainer.setAttribute("id", objTitles.container_id);
    divContainer.setAttribute("class", objTitles.top_menu_class);

    while(divContainer.firstChild){
        divContainer.removeChild(divContainer.firstChild);
    }
    let atitleBlocks = Array;
    let atitles = Array;
    for (let i = 0; i < objTitles.titles.length; i++){
        atitleBlocks[i] = document.createElement('div');
        atitles[i] = createTextNode(objTitles.titles[i]);
        if(i==objTitles.active_title_id){
            atitleBlocks[i].setAttribute("class", objTitles.mnu_panel_class+" "+objTitles.mnu_active_class); 
        }
        else{
            atitleBlocks[i].setAttribute("class", objTitles.mnu_panel_class+" "+objTitles.mnu_passive_class);
            atitleBlocks[i].addEventListener("mouseover",  fover, false);
            atitleBlocks[i].addEventListener("mouseout", fout, false);
            atitleBlocks[i].addEventListener("click", fclick(active_id), false);
        }
        divContainer.appendChild(atitleBlocks[i]);
        atitleBlocks[i].appendChild(atitles[i]);
    }
}
//
var mnuItemClick = (id_div)=>{
    let nextActiveId = id_div;  // the next menu id to be created as active
    menuTitles.active_nemu_id = id_div;
    for (let i = 0; i < this.atitles.length; i++){
        this.atitleBlocks[i] = document.createElement('div');
        this.atitles[i] = createTextNode(this.atitles[i]);
        if(i==id_div){
            this.atitleBlocks[i].setAttribute("class", "inline_panel mnu_active"); 
        }
        else{
            this.atitleBlocks[i].setAttribute("class", "inline_panel mnu_passive") ; 
            this.atitleBlocks[i].addEventListener("mouseover",  fover, false);
            this.atitleBlocks[i].addEventListener("mouseout", fout, false);
            this.atitleBlocks[i].addEventListener("click", fclick(this.activeIndex), false);
        }
        this.divContainer.appendChild(this.atitleBlocks[i]);
        this.atitleBlocks[i].appendChild(this.atitles[i]);
    }
}
// Top Menu Block class

class TopMenu {
    constructor(containerID, active_index, ...titles){
        this.setActiveManuItem=this.setActiveManuItem.bind(this);
        this.fclick=this.fclick.bind.this;
        this.divContainer = document.createElement('div');
        this.divContainer.setAttribute("id", containerID);
        this.divContainer.setAttribute("class", "topmenu");
        this.atitles = titles;
        //var amnuItemBlocks = Array;
        this.atitleBlocks = Array;
        this.activeIndex = active_index;
        let _self=this;
        for (let i = 0; i < _self.atitles.length; i++){
            _self.atitleBlocks[i] = document.createElement('div');
            alert(this.atitles[i]);
            _self.atitles[i]=document.createTextNode(_self.atitles[i]) ;
            //alert(this.atitles[i]);
                if(i==_self.activeIndex){
                    _self.atitleBlocks[i].setAttribute("class", "inline_panel mnu_active"); 
                }
                else{
                    console.log(this.atitles[i]);
                    _self.atitleBlocks[i].setAttribute("class", "inline_panel mnu_passive") ; 
                    _self.atitleBlocks[i].addEventListener("mouseover", function fover(e){
                        _self.atitleBlocks[i].style.textDecoration="underline"
                    }, false);
                    _self.atitleBlocks[i].addEventListener("mouseout", function fout(){_self.atitleBlocks[i].style.textDecoration="none"}, false);
                    _self.atitleBlocks[i].addEventListener("click", function fclick(){
                        'use strict';
                        alert(i + " p- "+_self.atitleBlocks[i].innerText);
                        _self.atitleBlocks[i].classList.remove("mnu_passive");
                        _self.atitleBlocks[i].classList.add("mnu_active");
                        recreateNode(_self.atitleBlocks[i], true);
                        //e.currentTarget.removeEventListener(e.mouseover, fover);
                        //e.currentTarget.removeEventListener(e.mouseout, fout);
                        //e.currentTarget.removeEventListener(e.click, fclick);
                       // _self.atitleBlocks[i].removeEventListener("mouseover", fover, true);
                       // _self.atitleBlocks[i].removeEventListener("mouseout", fout, true);
                       // _self.atitleBlocks[i].removeEventListener("click", fclick, false);
                    }, false);
                    // _self.divContainer.appendChild(_self.atitleBlocks[i]);
                   // _self.atitleBlocks[i].appendChild(_self.atitles[i]);
                }
                _self.divContainer.appendChild(_self.atitleBlocks[i]);
                _self.atitleBlocks[i].appendChild(_self.atitles[i]);
        }
        document.body.appendChild(_self.divContainer );
    }
    /////
    fover(item){
        item.style.textDecoration="underline";
        
    }
    /////
    fclick(id_div){
        let dv = this.divContainer;
        this.activeIndex = id_div;
        while(dv.firstChild){
            dv.removeChild(dv.firstChild);
        }
        for (let i = 0; i < this.atitles.length; i++){
            this.atitleBlocks[i] = document.createElement('div');
            this.atitles[i] = document.createTextNode(this.atitles[i]);
            if(i==id_div){
                this.atitleBlocks[i].setAttribute("class", "inline_panel mnu_active"); 
            }
            else{
                this.atitleBlocks[i].setAttribute("class", "inline_panel mnu_passive") ; 
                this.atitleBlocks[i].addEventListener("mouseover",  fover, false);
                this.atitleBlocks[i].addEventListener("mouseout", fout, false);
                this.atitleBlocks[i].addEventListener("click", fclick(this.activeIndex), false);
            }
            this.divContainer.appendChild(this.atitleBlocks[i]);
            this.atitleBlocks[i].appendChild(this.atitles[i]);
        }
    }
    ///
    fout(item){
        item.style.textDecoration="none";
    }
    ////
    setActiveManuItem(i_active){
        let sDiv=Array;
        // initializing divs
        for(let i = 0; i < aContainer_div_id.length; i++){
            sDiv[i] = document.createElement('div');
            sDiv[i].setAttribute("id", i);
            sDiv[i].setAttribute("class", "main_panel");
            sDiv[i].innerText=i;
            sDiv[i].style.display="none";
            
        }
        //
        for (let i = 0; i < _self.atitles.length; i++){
            if(i==i_active){
                // showing appropriate block
                sDiv[i].style.display="block"; 
                
            }
            else{
                _self.atitleBlocks[i].setAttribute("class", "inline_panel mnu_passive") ; 
                _self.atitleBlocks[i].addEventListener("mouseover", function fover(){_self.atitleBlocks[i].style.textDecoration="underline"}, false);
                _self.atitleBlocks[i].addEventListener("mouseout", function fout(){_self.atitleBlocks[i].style.textDecoration="none"}, false);
            }
        }
    }

}

//
// let uu = new TopMenu(mnuBlock_id, 1,  "Vernagir1", "Vernagir_2", "Vernagir3" );  // ok
// User registration block class
class UserLoginForm{
    constructor(db_index, db_type, container_id, mnu_block_id ){
        this.registered = false;
        this.div_id = container_id;
        this.userlogin = user.login;  // type = text
        this.userpassw = user.password; // type = password
        // login text field
        this.inputLogin = document.createElement('input');
        this.inputLogin.setAttribute('type', 'text');
        this.inputLogin.setAttribute('placeholder', this.userlogin);
        this.inputLogin.onchange = () => {
            this.userlogin = this.inputLogin.value;
        }
        // password text field
        this.inputPassw = document.createElement('input');
        this.inputPassw.setAttribute('type', 'password');
        this.inputPassw.setAttribute('placeholder', this.userpassw);
        this.inputPassw.onchange = () => {
            this.userpassw = this.inputPassw.value;
        }
        this.registerContainer = document.createElement('div');
        this.registerContainer.setAttribute("id", container_id);
        this.registerContainer.setAttribute("class", "center_panel");
        
        document.clear();
        this.registerContainer.appendChild(this.inputLogin);
        this.registerContainer.appendChild(this.inputPassw);
        document.body.appendChild(this.registerContainer);

        this.db = db_index;   // database = zapchast
        this.dbtype = db_type; // table = users
        this.httpstring="http://elastic/"+this.db+"/"+this.dbtype+"/";
        // Login Button ****************************************************
        this.logibBtnBlock = document.createElement('div');
        this.logibBtnBlock.setAttribute("class", "inline_panel");
        this.btnLogin = document.createElement('input');
        this.btnLogin.setAttribute('type','button');
        this.btnLogin.value = "Log In";
        // menu block
        this.mnublock = document.createElement('div');
        this.mnublock.setAttribute("id", mnu_block_id);
        let mm=this.mnublock;
        this.btnLogin.onclick = ()=>{ 
            // checking if user exists
            if(this.userlogin != "Enter Login" || this.userpassw != "Enter password"){
                // checking not empty values
                if(this.userlogin =="" || this.userpassw == ""){
                    alert("Logging In.... Empty Values");
                }
                else{
                    alert ("Inputed: login = "+this.userlogin+", password = "+this.userpassw);
                    registeredUser=true;
                    this.registerContainer.style.display="none";
                    this.mnublock.setAttribute("class", "topmenu");
                    document.body.appendChild(this.mnublock);
                    const menuTitles = new TopMenu(loginBlock_id, 0, "Title_1", "Title_2", "Title_3");
                }
            }
            else{
                 alert("Logging In.... No Inputed Values");
            }
        }
        this.logibBtnBlock.appendChild(this.btnLogin);
        this.registerContainer.appendChild(this.logibBtnBlock);

        // ************************************************************************
        this.showForm = ()=>{
            this.registerContainer.style.display="block";
                //this.divcontainer.removeAttribute("style");
                //this.divcontainer.setAttribute("style", "padding: 5px; border: solid thin green;");
           this.isvisible=true;
           console.log("a. showForm: "+this.div_id);
            //console.log("b. showForm: "+this.isvisible);
        }
    //
        this.hideForm = ()=>{
            this.registerContainer.style.display="none";
            //console.log(this.divcontainer);
            this.isvisible=false;
            console.log("a. hideForm: "+this.div_id);
           // console.log("b. hideForm: "+this.isvisible);
        }       
    }

    getContainer(){
        //console.log(this.divcontainer);
        return this.registerContainer;
    }
}

// 
function clearElementsById(...ids){
    let aIds = ids;
    for (let i=0; i < sizeof(...ids); i++){
        document.getElementById(ids[i]).style.display="none";
    }

}
// Making user block class
class NewUserForm{
    constructor(db_index, db_type, container_id ){
        this.div_id = container_id;
        this.aprops=[user.email, user.password, user.username, user.login];
        this.atypes=["email", "password", "text", "text"];
        this.ainputs =  []; 
        this.divcontainer = document.createElement('div');
        this.divcontainer.setAttribute("id",container_id);
        this.divcontainer.setAttribute("style", "padding: 5px; border: solid thin green;");
        this.divcontainer.style.display="none";
        this.isvisible=false;
        document.body.appendChild(this.divcontainer);
        this.newUserID=this.aprops[0];
        this.db=db_index;   // database = zapchast
        this.dbtype=db_type; // table = users
        this.httpstring="http://elastic/"+this.db+"/"+this.dbtype+"/"+this.newUserID;
        for(let i = 0; i<this.aprops.length; i++){
            this.ainputs[i]=document.createElement('input');
            this.ainputs[i].setAttribute('type', this.atypes[i]);
            this.ainputs[i].setAttribute('placeholder',this.aprops[i]);
            this.ainputs[i].onchange = ()=>{
                this.aprops[i] = this.ainputs[i].value;
            }
            this.divcontainer.appendChild(this.ainputs[i]);
        }
   //
        this.showForm = ()=>{
            this.divcontainer.style.display="block";
                //this.divcontainer.removeAttribute("style");
                //this.divcontainer.setAttribute("style", "padding: 5px; border: solid thin green;");
           this.isvisible=true;
           console.log("a. showForm: "+this.div_id);
            //console.log("b. showForm: "+this.isvisible);
        }
    //
        this.hideForm = ()=>{
            this.divcontainer.style.display="none";
            //console.log(this.divcontainer);
            this.isvisible=false;
            console.log("a. hideForm: "+this.div_id);
           // console.log("b. hideForm: "+this.isvisible);
        }       
    }

    getContainer(){
        //console.log(this.divcontainer);
        return this.divcontainer;
    }
}
//
/*
var dv = new NewUserForm("zapchast", "users", "newUsrdiv");
const newUserDiv = dv.getContainer();
dv.showForm();
var isvisible = true;
alert("initial is visible = "+isvisible);
*/
// function to create btton for showing and hidin g argment container object
function createShowHideBtn(containerObj){
    let dvv = document.createElement('div');
    dvv.setAttribute("class", "center_panel");
    let input = document.createElement('input');
    input.setAttribute('type','button');
    input.value = "Hide";
    input.onclick = ()=>{ 
        if(isvisible == false){
            alert("if false: is visible = "+isvisible);
            input.value = "Hide";
            containerObj.showForm();
            isvisible=true;
        }
        else{
            alert("if true: is visible = "+isvisible);
            containerObj.hideForm();
            input.value = "Show";
            isvisible=false;
        }    
    }
    dvv.appendChild(input);
    document.body.appendChild(dvv);
    //newUserDiv.appendChild(input);
}
//
// createShowHideBtn(dv);
// class for user registration
class RegisterUserForm {
    constructor(db_index, db_type, container_id ){
        if(localStorage.email){
            this.user_email=localStorage.email;
        }
        else{
            this.user_email="";
        }
        if(localStorage.password){
            this.userPassw=localStorage.password;
        }
        else{
            this.userPassw="";
        }       
        this.emailContainer=document.createElement('div');
        this.emailContainer.setAttribute("id","emcontainer_id");
        this.divcontainer = document.createElement('div');
        this.divcontainer.setAttribute("id",container_id);
        this.divcontainer.setAttribute("style", "padding: 5px; border: solid thin red;");
        document.body.appendChild(this.divcontainer);

        this.db=db_index;   // database = zapchast
        this.dbtype=db_type; // table = users
        this.httpstring="http://elastic/"+this.db+"/"+this.dbtype+"/_search";
    }
}
// saving new user function
async function saveUser(user) {
    console.info(user);
    if(user.username=="Enter Your Name" || 
        user.login=="Enter Login" || 
        user.password == "Enter password" || 
        user.email== "Enter e-mail"){
            alert("all fields must be filled in");
            return;
    }
    if(user.username=="" || 
        user.login=="" || 
        user.password == "" || 
        user.email== ""){
            alert("At least one of the user fields is empty");
            return;
    }
    const response = await fetch("http://elastic/zapchast/users/"+user.email, 
    {
        body: JSON.stringify(user),
        // must match 'Content-Type' header
        cache: 'no-cache',
        mode: 'cors',
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        }
    })
    const json = await response.json();
    getAllUsers();
    await setTimeout(getAllUsers(), 2000);
    console.info(json);
}
// searching user function
async function searchUser(userName, userMail, userLogin, userPassw) {
    if(!userName || !userMail || !userLogin || !userPassw){
        alert("searchUser() function parameter error");
        return;
    }
    const response = await fetch("http://elastic/zapchast/users/_search?q=email:"+userMail, 
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
    if(json.hits.hits.username==userName && 
        json.hits.hits.password==userPassw && 
        json.hits.hits.login==userLogin){
            console.info("Uswer Found");
            return true;
    }
    else{
        return false;
    }
}
// Searching All Users
async function getAllUsers(){
    let res = await fetch("http://elastic/zapchast/users/_search", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
            query: { match_all: {} },
            from: 0,
            size: 20
            })
    });
    let json = await res.json()
    alert("total hits: "+json.hits.total);
    console.info(json.hits.total)
    console.info(json)
    let totalhits=json.hits.total;
    //
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    var thead = document.createElement('thead');
    thead.innerText = "All Users";
    for (let i = 0; i < totalhits; i++) {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');
        let td5 = document.createElement('td');
        
        td.innerText=json.hits.hits[i]._source.username
        td1.innerText=json.hits.hits[i]._source.login
        td2.innerText=json.hits.hits[i]._source.email
        td3.innerText=json.hits.hits[i]._source.password
        td4.innerText=" edit "
        td5.innerText=" delete "

        tr.appendChild(td); 
        tr.appendChild(td1); 
        tr.appendChild(td2); 
        tr.appendChild(td3); 
        tr.appendChild(td4); 
        tr.appendChild(td5); 
        tbdy.appendChild(tr);
    }
    tbl.appendChild(thead);
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
    //
    console.info(tbl)
   // return tbl;
}
// main locks initialization function
function createBlock(id, init_visible="none"){
    let block = document.createElement('div');
    block.setAttribute('class', "main_panel");
    block.style.display = init_visible;    
    //input.value = user[prop];
    document.body.appendChild(block);
}
// text field function
function createInput(prop, input_type='text'){
    var input = document.createElement('input');
    input.setAttribute('type', input_type);
    input.setAttribute('placeholder',user[prop]);
    //input.value = user[prop];
    input.onchange = ()=>{
        user[prop] = input.value
    }
    document.body.appendChild(input);
}
// e-mail validation function
function ValidateEmail(inputText){
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.value.match(mailformat))
    {
        document.form1.text1.focus();
        return true;
    }
    else
    {
        alert("You have entered an invalid email address!");
        //document.form1.text1.focus();
        return false;
    }
}
// creating Submit button function
function createButton(){
    var input = document.createElement('input');
    input.setAttribute('type','button');
    input.value = "Submit";
    input.onclick = ()=>{
        saveUser(user)
    }
    document.body.appendChild(input);
}
// making text field
/*
createInput('username');
createInput('email', 'email');
createInput('login');
createInput('password', 'password');
createButton();
*/
//getAllUsers();

const regform = new UserLoginForm("zapchast", "users", loginBlock_id, mnuBlock_id);
//const menuTitles = new TopMenu(container, 0, ["Title_1", "Title_2", "Title_3"]);