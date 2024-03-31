// issue: will take too much time/block thread
function expensivetask() {
  return "database data";
}
console.log("before - normal");
let d = expensivetask();
console.log("after - normal");

// setTimeout solves above problem (code will move on/not block)
// issue: can't access data inside setTimeout/can't return data from setTimeout
function expensivetask2() {
  setTimeout(() => "database data", 1500);
}
console.log("before - timeout");
d = expensivetask2();
console.log("after - timeout");

// solves above issue (can use/consume data)
// issue: callback hell
function expensivetask3(consumeLogic) {
  d = "database data - callback";
  consumeLogic(d);
}
console.log("before - callback");
expensivetask3((d) => console.log(d));
console.log("after - callback");

// solves above issue (use .then() chains)
// issue: long .then() chains
function expensivetask4(doReject) {
  return new Promise((resolve, reject) => {
    if (doReject) reject("Rejected - Promise");
    resolve("database data, reject = " + doReject + " - Promise");
  });
}
console.log("before - Promise");
expensivetask4(false)
  .then((d) => console.log(d))
  .catch((e) => console.log(e));
console.log("after - Promise");
console.log("before - Promise2");
expensivetask4(true)
  .then((d) => console.log(d))
  .catch((e) => console.log(e));
console.log("after - Promise2");

//   solves above issue (instead of .then() chain, use normal code)
// following is syntactic sugar, it is turned into Promise code
async function expensivetask5(throwError) {
  try {
    if (throwError) throw "throw error = true - async";
    // use await to explicitly tell JS that u want to wait (bad, not recommended?)
    let d = /*await*/ "database data - async";
    console.log(d);
  } catch (e) {
    console.log(e);
  }
}
console.log("before - async");
expensivetask5(false);
console.log("after - async");
console.log("before - async2");
expensivetask5(true);
console.log("after - async2");
