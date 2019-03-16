let pFolders = ["arm_bazar_skan", "muxranskaya_skan", "pushkinskaya_skan", "vankskaya_skan"];
let pPapka = ["(Արմյանսկի բազար)", " (Մուխրանսկայա փ.)", "(Պուշկինսկայա)", "(Վանքսկայա փ.)"];
function getFolderNmae(papkaTitle){
  let indX = pPapka.indexOf(papkaTitle);
  if(indX>0 && indX<pFolders.length){
    return pFolders[indX];
  }
  else{
    alert("Cannot Find Folder name by Papka name!");
    return;
  }
}

function highlight(strToFind, strBodyLarge, className="highlighted"){
  let st =   strToFind.replace("-", " ");
  st=  st.trim();
  let aa =  st.split(" ");
  for(let i=0; i<aa.length; i++){
    let rgx = new RegExp(aa[i],"g");
    strBodyLarge =  strBodyLarge.replace(rgx, "<span class = '"+className+"'>"+aa[i]+"</span>")
  }
 return  strBodyLarge;
}

let toFind = "Տեր-Ղուկասով աճյունի ամփոփումը";
let toreplace = "Գեներալ-լեյտենանտ Արզաս Տեր-Ղուկասովի աճյունի ամփոփումը Վանքի մայր տաճարի տարածքում Ղուկասովի Վանքի մայր տաճար արխիվային փաստաթուղթ է л. 64. Վանքսկայա փ. Գեներալ-լեյտենանտ ԱրզասՏեր-Ղուկասով.";
console.log(toreplace); 
let sstt = highlight(toFind, toreplace, "highlighted");
document.body.innerHTML=sstt;