//Add events
function addEvent() {
  var i; //counter
  var inputs = document.querySelectorAll(".validate-input");
  for (i = 0; i < inputs.length; i++) {
    switch (inputs[i].name) {
      case "age":
        inputs[i].addEventListener("input", ageValidator);
        break;
      case "username":
        inputs[i].addEventListener("change", usernameValidator);
        break;
      case "date":
        inputs[i].addEventListener("change", dateValidator);
        break;
    }
  }

  //select language after loading page
  addEventListener("load", selectLanguage);
  //Change language on change radio button
  var languages = document.querySelectorAll("input[name='lang']");
  for (i = 0; i < languages.length; i++) {
    languages[i].addEventListener("change", changeLanguage);
  }

  document.querySelector("form").onsubmit = validateAll; //select first form
  document.getElementById("save").addEventListener("click", saveLang);
}

//Validate age on input
function ageValidator() {
  //create patterns
  var findNonDigitPattern = /(\D|\s)/g;
  if (this.value) { //if has value
    var str = this.value.match(findNonDigitPattern); //find non-digit symbol and spacing
    if (str) {
      //delete wrong symbols and put only correct symbol (has effect if u paste string in input area)
      alert("You put invalid age data");
      this.value = this.value.replace(findNonDigitPattern, "");
    }
  } else {
    alert("Age field is empty");
  }
  return true;
}

//Validate username on change
function usernameValidator() {
  //create patterns
  var findStarsPattern = /[*]/g;
  var findStartPattern = /^user_/;
  if (this.value) {
    var str = this.value.replace(findStarsPattern, ""); //create template string without stars
    if (!str.match(findStartPattern)) { //if string do not start with user_
      alert("You put invalid username");
      this.value = "user_" + this.value; //add user_ at begin of username
      return false;
    }
  } else {
    alert("Username field is empty");
  }
  return true;
}

//Validate date on change
function dateValidator() {
  var dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
  var now = new Date(Date.now()); //get currents date
  if (!dateFormat.test(this.value)) {
    alert("You put invalid date format");
    return false;
  }
  //check date
  if (this.value.substring(0, 2) != now.getDate()) {
    alert("You put not current day.");
    return false;
  }
  //check month
  else if (this.value.substring(3, 5) != now.getMonth() + 1) {
    alert("You put not current month.");
    return false;
  }
  //check year
  else if (this.value.substring(6, 10) != now.getFullYear()) {
    alert("You put not current year.");
    return false;
  }
  return true;
}

//Validate all inputs
function validateAll() {
  if (!ageValidator.call(document.getElementById("age")) ||
    !usernameValidator.call(document.getElementById("username")) ||
    !dateValidator.call(document.getElementById("date"))) {
    return false;
  } else {
    alert("Succes submit. You will be redirect");
    return true;
  }
}

var applyLanguage = function (lang) {
  var i;
  alert('now language is: ' + lang);
  showGreeting(lang);
  //select all tabs and change language
  var navigationList = document.querySelectorAll("#task-list > li > a")
  switch (lang) {
    case "en":
      navigationList[0].innerText = 'Task "validation"';
      navigationList[1].innerText = 'Task "parallax"';
      navigationList[2].innerText = 'Task "os message"';
      navigationList[3].innerText = 'Task "localization"';
      navigationList[4].innerText = 'Task "stop & prevent events"';
      navigationList[5].innerText = 'Task "player navigation"';
      navigationList[6].innerText = 'Task "list of users"';
      break;
    case "ru":
      navigationList[0].innerText = 'Задание "validation"';
      navigationList[1].innerText = 'Задание "parallax"';
      navigationList[2].innerText = 'Задание "os message"';
      navigationList[3].innerText = 'Задание "localization"';
      navigationList[4].innerText = 'Задание "stop & prevent events"';
      navigationList[5].innerText = 'Задание "player navigation"';
      navigationList[6].innerText = 'Задание "list of users"';
      break;
    case "ua":
      navigationList[0].innerText = 'Завдання "validation"';
      navigationList[1].innerText = 'Завдання "parallax"';
      navigationList[2].innerText = 'Завдання "os message"';
      navigationList[3].innerText = 'Завдання "localization"';
      navigationList[4].innerText = 'Завдання "stop & prevent events"';
      navigationList[5].innerText = 'Завдання "player navigation"';
      navigationList[6].innerText = 'Завдання "list of users"';
      break;
  }
}

//Show greeting msg execute only one number!!!!
function showGreeting(currentLang) {
  var i; //counter
  var langEls = document.getElementsByClassName('lang-' + currentLang);
  //Hide all msg on old language
  var visibleEls = document.querySelectorAll(".visible");
  for (i = 0; i < visibleEls.length; i++) {
    visibleEls[i].classList.remove("visible");
  }
  //Show new msg
  for (i = 0; i < langEls.length; i++) {
    var langEl = langEls[i];
    langEl.classList.add('visible');
    langEl.innerText += " " + document.getElementById("username").value + ".";
  }
}

function selectLanguage() {
  //show current language
  var currentLang;

  var getCurrentLanguage = function () {
    //get current language and transform to common form
    var curLanguage = navigator.language.toLowerCase();
    //identify current language
    if (curLanguage.indexOf("en") >= 0) {
      curLanguage = "en";
      applyLanguage(curLanguage);
    } else if (curLanguage.indexOf("ua") >= 0) {
      curLanguage = "ua";
      applyLanguage(curLanguage);
    } else if (curLanguage.indexOf("ru") >= 0) {
      curLanguage = "ru";
      applyLanguage(curLanguage);
    } else {
      curLanguage = "en";
      applyLanguage("Language is undefine. Seted default language (en)");
    }
    return curLanguage;
  }

  function restoreLanguage() {
    //Try get language from cookie
    var storeLanguage = getCookie("language");
    if(!storeLanguage.length) { //if cookie did not found try get from local storage
      storeLanguage = localStorage.getItem("language");
    }
    return storeLanguage;
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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

  //If user did not store language data, then get current data of system else data will return in variable
  currentLang = restoreLanguage(); //return stored language or empty string if data would not be saved
  console.log("current language " + currentLang);
  if (!currentLang) {
    currentLang = getCurrentLanguage();
  } else {
    alert("Language restore since last session");
    applyLanguage(currentLang);
  }
  //check radio with current language
  document.getElementById(currentLang).setAttribute("data-check", "true");
  document.getElementById(currentLang).setAttribute("checked", "checked");
}

//Execute all time when user change language
function changeLanguage() {
  var curLanguage = this.id;
  applyLanguage(curLanguage);
  //delete check from previous language
  document.querySelector(".check-language[data-check=true]").setAttribute("data-check", "false");
  document.getElementById(curLanguage).setAttribute("data-check", "true");
}

//Save current language in cookie or localStorage for restoring in future
function saveLang() {
  var select = document.querySelector(".select-wrapper .active span") ||
    document.querySelector(".select-wrapper li span");
  switch (select.innerText) {
    case "cookie":
      if (navigator.cookieEnabled) {
        //Delete old language cookie
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        //Set new cookie
        document.cookie = "language=" + document.querySelector(".check-language[data-check=true]").id;
        alert("Data saved");
      } else {
        alert("You can not save in cookie. Enable cookie please");
      }
      break;
    case "localStorage":
      //Delete old data
      localStorage.clear();
      localStorage.setItem("language", document.querySelector(".check-language[data-check=true]").id);
      alert("Data saved");
  }
}

addEvent();
//for select field
$(document).ready(function () {
  $('select').material_select();
});