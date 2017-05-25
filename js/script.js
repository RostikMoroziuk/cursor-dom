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

  document.querySelector("form").onsubmit = validateAll;//select first form
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
  }
  else {
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
  }
    else {
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
  if(!ageValidator.call(document.getElementById("age")) || 
  !usernameValidator.call(document.getElementById("username")) || 
  !dateValidator.call(document.getElementById("date"))) {
    return false;
  } else {
    alert("Succes submit. You will be redirect");
    return true;
  }
}

addEvent();