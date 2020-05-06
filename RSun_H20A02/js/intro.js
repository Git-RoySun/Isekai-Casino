let elForm = document.querySelector("#signup");
let elUName = document.querySelector("#uName");
let elFName = document.querySelector("#fName");
let elLName = document.querySelector("#lName");
let elPhone = document.querySelector("#phone");
let elCity = document.querySelector("#city");
let elEmail = document.querySelector("#email");
let elMoney = document.querySelector("#money");
let myDate = new Date();
myDate.setFullYear(myDate.getFullYear());
myDate =  myDate.toUTCString();
let erUName = document.querySelector("#eUName");
let erFName = document.querySelector("#eFName");
let erLName = document.querySelector("#eLName");
let erPhone = document.querySelector("#ePhone");
let erCity = document.querySelector("#eCity");
let erEmail = document.querySelector("#eEmail");
let erMoney = document.querySelector("#eMoney");

function checkFName(){
    return elFName.value.match(/^[a-zA-Z][a-zA-z'-]{0,19}$/);
}
function checkLName(){
    return elLName.value.match(/^[a-zA-Z][a-zA-z'-]{0,29}$/);
}
function checkUName(){
    return elUName.value.match(/^[A-Z][a-z]{3}[0-5]$/);
}
function checkPhone(){
    return elPhone.value.match(/^(\(\d{3}\)\s\d{3}-\d{4})$|^(\d{3}\.){2}\d{4}$/);
}
function checkCity(){
    return elCity.value.match(/^[a-zA-Z]+$/);
}
function checkEmail(){
    return elEmail.value.match(/^[a-zA-Z0-9_.-]+@[a-zA-z0-9]+\.(com|ca|org)$/);
}
function checkMoney(){
    return elMoney.value.match(/^[1-4]\d{1,3}$|^5000$|^5\d{1,2}$|^[5-9]$/);
}

function save(){
    window.localStorage.firstName = elFName.value;
    window.localStorage.lastName = elLName.value;
    window.localStorage.username = elUName.value;
    window.localStorage.phoneNum = elPhone.value;
    window.localStorage.email = elEmail.value;
    window.localStorage.city = elCity.value;
    window.localStorage.bankRoll = elMoney.value;
    window.localStorage.lastVisit = myDate;
}
function checkForm(){
    elFName.style.border="";
    erFName.style.display = "none";
    elLName.style.border="";
    erLName.style.display = "none";
    elUName.style.border="";
    erUName.style.display = "none";
    elEmail.style.border="";
    erEmail.style.display = "none";
    elPhone.style.border="";
    erPhone.style.display = "none";
    elCity.style.border="";
    erCity.style.display = "none";
    elMoney.style.border="";
    erMoney.style.display = "none";
    let valid = false;
    if(!checkFName()){
        elFName.style.border="solid 2px red";
        erFName.style.display = "block";
    }
    else {
        elFName.style.border="";
        erFName.style.display = "none";
        if(!checkLName()) {
            elLName.style.border="solid 2px red";
            erLName.style.display = "block";
        }
        else {
            elLName.style.border="";
            erLName.style.display = "none";
            if(!checkUName()) {
                elUName.style.border="solid 2px red";
                erUName.style.display = "block";
            }
            else {
                elUName.style.border="";
                erUName.style.display = "none";
                if(!checkEmail()) {
                    elEmail.style.border="solid 2px red";
                    erEmail.style.display = "block";
                }
                else {
                    elEmail.style.border="";
                    erEmail.style.display = "none";
                    if(!checkPhone()) {
                        elPhone.style.border="solid 2px red";
                        erPhone.style.display = "block";
                    }
                    else {
                        elPhone.style.border="";
                        erPhone.style.display = "none";
                        if(!checkCity()) {
                            elCity.style.border="solid 2px red";
                            erCity.style.display = "block";
                        }
                        else {
                            elCity.style.border="";
                            erCity.style.display = "none";
                            if(!checkMoney()) {
                                elMoney.style.border="solid 2px red";
                                erMoney.style.display = "block";
                            }
                        else{
                                elMoney.style.border="";
                                erMoney.style.display = "none";
                                valid = true;
                            }
                        }
                    }
                }
            }
        }
    }
    if(valid)
        save();
    return valid;
}
elForm.onsubmit = checkForm;
if(window.localStorage.lastName!=null&&window.localStorage.firstName!=null&&window.localStorage.username!=null&&window.localStorage.phoneNum!=null&&window.localStorage.city!=null&&window.localStorage.email!=null&&window.localStorage.bankRoll!=null){
    window.localStorage.lastVisit = myDate;
    location.href=`game.html`;
}
