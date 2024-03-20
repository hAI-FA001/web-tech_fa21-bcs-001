let obj = {
  numeric_prop: 1,
  str_prop: "abc",
  bool_prop: true,
  obj_prop: {
    x: 1,
    get_x: function () {
      return this.x;
    },
  },

  get_str: function () {
    return this.str_prop;
  },
  get_number: function () {
    return this.numeric_prop;
  },

  set_str: function (new_str) {
    this.str_prop = new_str;
  },
  set_number: function (new_num) {
    this.numeric_prop = new_num;
  },
};

console.log(
  obj.numeric_prop,
  obj.str_prop,
  obj.bool_prop,
  obj.obj_prop,
  obj.obj_prop.get_x()
);
console.log(obj.get_str(), obj.get_number());

obj.set_str("new str");
obj.set_number(9);
console.log(obj.get_str(), obj.get_number());

// var names need to match object's property names
const { numeric_prop, str_prop, bool_prop, obj_prop, get_str } = obj;
console.log(numeric_prop, str_prop, bool_prop, obj_prop, get_str);
