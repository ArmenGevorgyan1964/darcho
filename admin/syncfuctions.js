/*
var user = {
    userstatus: "user",
    username: "Enter Your Name",
    login:"Enter Login",
    password: "Enter password",
    email: "Enter e-mail"
  }
  
 let user = {
    userstatus: "user",
    username: "Armen Gevorgyan",
    login:"arm",
    password: "lilitik",
    email: "lilitik@gmail.com",
    registered: Date.now()
  }
*/
var user1 = {
    userstatus: "admin",
    username: "Sergey Mamyan",
    login:"sm",
    password: "lilitik0",
    email: "sm@gmail.com",
    registered: Date.now()
  }
var user2 = {
    userstatus: "director",
    username: "gugo dadyan",
    login:"gd",
    password: "lilitik",
    email: "gd@gmail.com",
    registered: Date.now()
  }
var user3 = {
    userstatus: "admin",
    username: "Shahen Papyan",
    login:"shp",
    password: "shsh123",
    email: "shp@gmail.com",
    registered: Date.now()
}
var user4 = {
  userstatus: "user",
  username: "Vahe Tonoyan",
  login:"vt",
  password: "vt123",
  email: "vt@gmail.com",
  registered: Date.now()
}
var user5 = {
  userstatus: "user",
  username: "Tatev Vahanyan",
  login:"vt",
  password: "vt123123",
  email: "tava@gmail.com",
  registered: Date.now()
}
var user_id =1;
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
//alert(timeConverter(Date.now()));
/*
let signUpAttributes = {
    title:"Sign Up",
    action:"SignUp",
    userTable:"users",
    has_table: ()=>{
       let myRequest = new Request("http://elastic/zapchast/_mapping/users");
          //console.log(myRequest.url);
        fetch(myRequest).then(function(response){
          console.log(response.status);
          response.json().then(function(json){
            console.log(json);
            fetch("http://elastic/users/_doc/_search", {
                headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                      },
                method: "GET"
            }
            ).then(function(resp){
               // let aa= json.hits.total;
               console.log(resp);
          });
        });
      });
    }
   }
   let bb = signUpAttributes.has_table();
   //console.log(bb);
*/
async function saveUser(user) {
    console.info(user);
    let login = user.login;
    let passw = user.password;
    let eml = user.email;
    let uname = user.username;

    if(uname == "Enter Your Name" || 
        login =="Enter Login" || 
        passw == "Enter password" || 
        eml == "Enter e-mail"){
            alert("all fields must be filled in");
            return;
    }
    if(uname =="" || 
        login =="" || 
        passw == "" || 
        eml == ""){
            alert("At least one of the user fields is empty");
            return;
    }
    // getting last user id
    const last_id_resp = await fetch("http://elastic/users/_doc/_search",
      {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        method: "POST",
        body: JSON.stringify({
          query: { 
              match_all: {}
            }
        })
      }
    );
    const json_id = await last_id_resp.json();
    const json_length = json_id.hits.hits.length;
    let id_arr=[];
    //alert(json_length);
    for (let i=0; i<json_length; i++){
      try{
        id_arr[i] = Number(json_id.hits.hits[i]._id);
      }
      catch(err){
        console.log("Error reading _id: "+err);
      }
    }
    let last_id = await 1+Math.max(...id_arr);
    if(last_id>1){
      user_id = last_id;
    }
    console.info(id_arr);
    console.log("The next user id will be: ");
    console.info(user_id);
    // checking if any user with the same login and password allready registered
    const resp_check = await fetch("http://elastic/users/_doc/_search", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        method: "POST",
        body: JSON.stringify({
        query: { 
          bool: {
            must: [{
              match:{
                login:login
              },
              match:{
                password:passw
              }
            }]
          } 
          }
        })
    });
    const json_check = await resp_check.json();
    const json_check_length = json_check.hits.total;
    alert(json_check_length);
    if(json_check_length === 0){
      // inserting new user
      console.log("inserting");
      console.log(user_id);
      const response = await fetch("http://elastic/users/_doc/"+user_id, 
      {
          body: JSON.stringify(user),
          // must match 'Content-Type' header
          cache: 'no-cache',
          mode: 'cors',
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          }
      })
      const json = await response.json();      
    }
    else{
      alert("The User with the same login and password alleready registered");
    }
    //
    //getAllUsers();
    //await setTimeout(getAllUsers(), 2000);
    //console.info(json);
  }
//
saveUser(user4);

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
    await saveUser(user2);
  }
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
      let td6 = document.createElement('td');
      let td7 = document.createElement('td');
      
      td.innerText=json.hits.hits[i]._source.username
      td1.innerText=json.hits.hits[i]._source.login
      td2.innerText=json.hits.hits[i]._source.email
      td3.innerText=json.hits.hits[i]._source.password
      let dd = json.hits.hits[i]._source.registered;
      td4.innerText=timeConverter(dd)
      td5.innerText=json.hits.hits[i]._id
      td6.innerText=" edit "
      td7.innerText=" delete "

      tr.appendChild(td); 
      tr.appendChild(td1); 
      tr.appendChild(td2); 
      tr.appendChild(td3); 
      tr.appendChild(td4); 
      tr.appendChild(td5); 
      tr.appendChild(td6); 
      tr.appendChild(td7); 
      tbdy.appendChild(tr);
  }
  tbl.appendChild(thead);
  tbl.appendChild(tbdy);
  body.appendChild(tbl);
  //
  console.info(tbl)
 // return tbl;
}
getAllUsers();
//saveUser(user);