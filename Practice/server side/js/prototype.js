let obj = {};
// null prototype
console.log(Object.getPrototypeOf(obj));
console.log(obj.__proto__);
console.log(); // for new line

let circle = { radius: 1 };
// also null prototype
console.log(Object.getPrototypeOf(circle));
console.log(circle.__proto__);
console.log();

function Circle() {}
let ctor_circle = new Circle();
// gives {}
console.log(Object.getPrototypeOf(ctor_circle));
console.log(ctor_circle.__proto__);
console.log();

function SmallCircle() {}
// prototype becomes new Circle object
SmallCircle.prototype = Object.create(Circle.prototype);

let ctor_small_circle = new SmallCircle();

// prototype becomes Circle function
// ctor_small_circle.__proto__ = Circle;
// prototype becomes this Circle object
// ctor_small_circle.__proto__ = ctor_circle;

console.log(Object.getPrototypeOf(ctor_small_circle));
console.log(ctor_small_circle.__proto__);
console.log();
