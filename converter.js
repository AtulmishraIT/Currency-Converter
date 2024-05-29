const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

function getname(currCode) {
    for(currName in countryName){
        if(currName === countryList[currCode]){
            name = countryName[currName];
            name1 = name.split(",")
            return name1[0];
        }
    }
}


for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");                    
        newOption.innerText = currCode + "- " + getname(currCode);
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        let spec = evt.target;
        updateFlag(spec);
    })
}


const updateFlag = (element) => {
    let currCode1 = element.value.split("-");
    let currCode = currCode1[0];
    console.log(currCode);
    let countryCode = countryList[currCode];
    console.log(countryList[1]);
    let newSource = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSource;
}

btn.addEventListener("click",async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" && amtVal < 1){
        amtVal = 1;
        amount.value = 1;
    }
    
function checkcurrfrom(){
    let txt1 = "";
    for(let curr in currList){
        for(let x=0;x<=curr.length;x++){
            let fromCurr1 = fromCurr.value.split("-")
            if(fromCurr1[0] === curr){
                console.log(curr);
                txt1 = currList[curr];
            }   
        }
    }
    txt1 = amtVal/txt1;
    console.log(txt1);
    return txt1;
    }

function checkcurr(){
let txt = "";
for(let curr in currList){
    for(let x=0;x<=curr.length;x++){
        let toCurr1 = toCurr.value.split("-");
        if(toCurr1[0] === curr){
            console.log(curr);
            txt = currList[curr];
        }   
    }
}
console.log(txt);
return txt;
}

    let data = checkcurrfrom();
    let rate = checkcurr();
    let finalAmt = data * rate;
    console.log(finalAmt);
    let fromCurr1 = fromCurr.value.split("-");
    let toCurr1 = toCurr.value.split("-");
    msg.innerText = `${amtVal} ${fromCurr1[0]} = ${finalAmt} ${toCurr1[0]}`;
})
