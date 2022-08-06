
// trim function ---
const printWord = "              My String            "
let greeting = function func_trim() {

    console.log(printWord.trim());
}

// uppercase to lower case function--
const question1 = "MY NAME IS JYOTI KUMARI FORM PLUTONIUM BATCH."
let printLower = function func_lower() {

    console.log(question1.toLowerCase());
}

// lowercase to uppercase function--
const question2 = "my name is jyoti kumari form plutonium batch"
let printUpper = function func_upper() {

    console.log(question1.toUpperCase());
}

// Moduler exporters name
module.exports.trim = greeting; 
module.exports.lower = printLower;
module.exports.upper = printUpper;   