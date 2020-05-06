let elBtnProfile = document.querySelector("[class=btnProfile]");
let elProfile = document.querySelector("[class=profile]");
let elUName = document.querySelector("#uName");
let elName = document.querySelector("#name");
let elPhone = document.querySelector("#phone");
let elCity = document.querySelector("#city");
let elEmail = document.querySelector("#email");
let elMoney = document.querySelector("#money");
let erMultiplier = document.querySelector("#erMultiplier");
let elEnd = document.querySelector("#end");
let elStart = document.querySelector("#start");
let elBet = document.querySelector("#bet");
let elResult = document.querySelector("#result");
let elPerson = document.querySelector("#person");
let elVisit = document.querySelector("#visit");
let elCredential = document.querySelector("#credentials");
elBtnProfile.addEventListener("click", function () {
    if(elProfile.style.display === "") {
        elProfile.style.display = "block";
        elBtnProfile.style.marginLeft = "305px";
    }
    else{
        elProfile.style.display = "";
        elBtnProfile.style.marginLeft = "0";
    }
});
elUName.innerHTML=localStorage.username;
elName.innerHTML=`${localStorage.firstName} ${localStorage.lastName}`;
elPhone.innerHTML=localStorage.phoneNum;
elCity.innerHTML=localStorage.city;
elEmail.innerHTML=localStorage.email;
elMoney.innerHTML=`$${localStorage.bankRoll}`;
elPerson.textContent=`Not ${localStorage.firstName} ${localStorage.lastName}?`;
elVisit.textContent=localStorage.lastVisit;
let game;
let first = true;
elStart.addEventListener("click", function(){
    if(elMultiplier.value.match(/^\d+$|^\d+?\.\d+$/)) {
        if (first) {
            game = new Game();
            first = false;
        } else {
            game.start();
        }
        elBet.style.display = "none";
    }
    else{
        erMultiplier.style.display = "block";
    }
});
elCredential.addEventListener("click",function () {
    window.localStorage.removeItem("firstName");
    window.localStorage.removeItem("lastName");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("phoneNum");
    window.localStorage.removeItem("email");
    window.localStorage.removeItem("city");
    window.localStorage.removeItem("bankRoll");
    window.localStorage.removeItem("lastVisit");
location.href ="intro.html";
});
