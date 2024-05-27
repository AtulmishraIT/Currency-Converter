const BASE_URL = "https://cdn.jsdelivr.net/gh/ismartcoding/currency-api@main/latest/data.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }
        if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
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
            if(fromCurr.value === curr){
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
        if(toCurr.value === curr){
            console.log(curr);
            txt = currList[curr];
        }   
    }
}
console.log(txt);
return txt;
}

    const URL = BASE_URL;
    let response = await fetch(URL);
    let data = checkcurrfrom();
    let rate = checkcurr();
    let finalAmt = data * rate;
    console.log(finalAmt);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
})