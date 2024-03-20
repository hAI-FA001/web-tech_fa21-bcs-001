function createCircle(radius, border, other_prop) {
  //   let is not accessible outside function, so this is used to make private vars
  let private_other_prop = other_prop;

  return {
    circ_radius: radius,
    circ_border: border,

    get_area: function () {
      return Math.PI * this.circ_radius * this.circ_radius;
    },

    // return the variable using a function
    get_other_prop: function () {
      return private_other_prop;
    },
  };
}

let c = createCircle(2, 1, "my private prop");
console.log(
  c.circ_radius,
  c.circ_border,
  c.get_area(),
  c.get_other_prop(),

  //   below doesn't exist
  c.other_prop,
  c.private_other_prop
);
