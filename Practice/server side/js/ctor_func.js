function Circle(radius, border) {
  this.radius = radius;
  this.border = border;
  this.get_area = function () {
    return Math.PI * this.radius * this.radius;
  };
}

// c becomes undefined if "new" keyword not used
let c = new Circle(2, 1);
console.log(c);
console.log(c.radius, c.border, c.get_area());

console.log(c.constructor);
console.log({}.constructor);

for (let k in c) {
  console.log(k, c[k]);
}
