let printdate1 = new Date();

//print current date ---
let printDate = function(){
    console.log(new Date())
};

// print current month --
let printMonth = 
    printdate1.toLocaleString('default',{month: 'long'});
console.log(printMonth);

// print batch information --
let getBatchInfo = function(){
    console.log('Plutonium, W3 D5, the topic for today is NodeJs Module System.');
}; 

// module exports name --
module.exports.today = printDate;
module.exports.month = printMonth;
module.exports.aboutbatch = getBatchInfo;
module.exports.info = printdate1;

