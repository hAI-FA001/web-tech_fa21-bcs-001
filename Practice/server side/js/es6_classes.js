class SuperCircle {
  constructor(name) {
    this.name = name;
  }
  superDraw() {
    console.log("Super draw() with name " + this.name);
  }
}

class Circle extends SuperCircle {
  constructor(radius, name) {
    // error if not call this ctor, error also if super() is not in 1st line (like in Java)
    super(name);
    this.rad = radius;
  }

  draw() {
    console.log("Drawing with radius " + this.rad);
    super.superDraw();
  }

  static drawStatic() {
    console.log("Static draw()");
  }
}

Circle.drawStatic();
// Circle.draw(); // error: Circle.draw() is not a function
let c = new Circle(123, "abc");
c.draw();
c = new Circle();
c.draw();
