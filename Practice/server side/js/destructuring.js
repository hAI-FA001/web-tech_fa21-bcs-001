const vehicles = ["mustang", "f-150", "expedition"];
const [car, truck, suv] = vehicles;
const [car2, truck2, suv2] = vehicles;
const [car3, ...others] = vehicles;
// cannot do this, ... must be placed last
// const [...others2, final] = vehicles;

console.log(car, truck, suv);
console.log(car2, truck2, suv2);
console.log(car3, others); // others is an array
console.log(...vehicles);

let person = {
  fname: "hello world",
  age: 123,
  city: "hello city",
};

const { fname, age, city } = person;
const { fname2, age2, city2 } = person;
console.log(fname, age, city);
console.log(fname2, age2, city2); // prints undefined
// console.log(...person);  // error
console.log(person);

let p2 = person; // shallow copy
let p3 = { ...person }; // deep copy

p2.fname = "new name 1";
console.log(person, p2, p3);

p3.fname = "new name 2";
console.log(person, p2, p3);

person.fname = "new name 3";
console.log(person, p2, p3);

// use this to deep copy nested objects
let p4 = JSON.parse(JSON.stringify(person));
