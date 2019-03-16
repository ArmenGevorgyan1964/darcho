// Cookie fnctions
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
//
function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

// saving new user fnction
async function saveUser(user) {
    console.info(user);
    const response = await fetch("http://elastic/users/doc/"+user.username, 
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
    console.info(json);
}
//
async function searchUser(userName, useMail, userUser) {
    if(!userName || !useMail || !userUser){
        alert("searchUser() function parameter error");
        return;
    }
    const response = await fetch("http://elastic/users/_search", 
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(
            {
            "query": { 
                "bool": {
                    "must": [
                        {"term": { "username": userName}},
                        {"match": { "email": useMail}},
                        {"term": { "name": userUser}}
                    ]
                }
            }
            }
        )
    })
    const json = await response.json();
    let totalhits = json.hits.total;
    console.info(json);
    console.info("found: "+totalhits);
}
//
async function checkUserMail(name, e_mail){
    let res = await fetch("http://elastic/users/_search?q=name:"+name);
    let json = await res.json();
    let totalhits = json.hits.total;
    let found = false;
    if(totalhits==1){
        if(json.hits.hits[0]._source.email == e_mail){
            found = true;
            alert("The name and e-mail pair is OK!");
        }
        else{
            alert("name found, but e-mail is wrong!");
        }
    }
    return found;
}
//
async function getUser(name, email){
    let res = await fetch("http://elastic/users/_search?q=name:"+name);
    let json = await res.json();
    let totalhits = json.hits.total;
    console.info(json);
    console.info("found: "+totalhits);
}
//
async function getAllUsers(){
    let res = await fetch("http://elastic/users/_search", {
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
        td.innerText=json.hits.hits[i]._source.email
        td1.innerText=json.hits.hits[i]._source.name
        td2.innerText=json.hits.hits[i]._source.username
        tr.appendChild(td); 
        tr.appendChild(td1); 
        tr.appendChild(td2); 
        tbdy.appendChild(tr);
    }
    tbl.appendChild(thead);
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
    //
    console.info(tbl)
   // return tbl;
}

// ankap fuction
const helo = (baba)=>{
    alert(`Hello ${baba}`);
};
helo("Armen");
/**/
getAllUsers();

const makebutton = (baba)=>{
    let input = document.createElement('input');
    input.setAttribute('type','button');
    input.value = "check User";
    input.onclick = ()=>{
        alert(`Hello ${baba}`);
    }
    //document.getElementById("root").appendChild(input);
    document.body.appendChild(input);
    var br = document.createElement('br');
    var p = document.createElement('p');
    document.body.appendChild(br);
    document.body.appendChild(p);
}

var user = {
    username: 'bob',
    name:"bob jan",
    email: 'bob@mamble.com'
}

document.body.innerHTML='';
function createButton(){
    var input = document.createElement('input');
    input.setAttribute('type','button');
    input.value = "Submit";
    input.onclick = ()=>{
        saveUser(user)
    }
    document.body.appendChild(input);
}

function createInput(prop){
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('placeholder',prop);
    input.value = user[prop];
    input.onchange = ()=>{
        user[prop] = input.value
    }
    document.body.appendChild(input);
}
document.body.onload = getAllUsers();
makebutton("zap");
checkUserMail("armenjan", "armen@mamble.com");
searchUser("armen", "armen@mamble.com", "armenjan");
createInput('username');
createInput('name');
createInput('email');
createButton();

