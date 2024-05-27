let app = "light";
let button = document.querySelector(".button");
const div = document.querySelector("div");
const body = document.querySelector("body");
button.addEventListener("click",() => {
    if(app === "light"){
        app = "dark";
        button.innerHTML = '<i class="fa-solid fa-sun"></i>';
        body.style.backgroundColor = "black";
        body.style.color = "White";
        div.style.backgroundColor = "grey";
    } else {
        app = "light";
        button.innerHTML = '<i class="fa-solid fa-moon"></i>';
        body.style.backgroundColor = "#f4e4ba";
        body.style.color = "black";
        div.style.backgroundColor = "white";
    }
})