const formEl = document.querySelector(".feedback-form");
const textEl = document.querySelector("textarea");
const emailEl = document.querySelector("input");
const buttonEl = document.querySelector("button");


const localStorageObj = {};

const handleInput = (e) => {
    
    if (e.target.name === "email") { 
        localStorageObj.email = e.target.value.trim();
    }
    else if (e.target.name === "message") {
        localStorageObj.message = e.target.value.trim();
    }

    localStorage.setItem("feedback-form-state", JSON.stringify(localStorageObj));
}


const handleClick = (e) => {
    e.preventDefault();
    console.log(localStorageObj);
    localStorage.removeItem("feedback-form-state");
    formEl.reset();
}

const localStorageText = JSON.parse(localStorage.getItem("feedback-form-state"));

if (localStorage.length !== 0) {
textEl.value = localStorageText.message;
emailEl.value = localStorageText.email;
}


formEl.addEventListener("input", handleInput);
formEl.addEventListener("submit", handleClick)
