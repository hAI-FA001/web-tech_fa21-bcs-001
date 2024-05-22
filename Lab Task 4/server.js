require("dotenv").config();

const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const expressFlash = require("express-flash");

const Product = require("./models/Product");

let server = express();

server.use(express.static("public"));
server.use(ejsLayouts);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    // note to self: give following 2 args, else will see deprecated warning on console
    resave: false,
    saveUninitialized: true,
  })
);
server.use(expressFlash());

server.set("view engine", "ejs");

// add user + cart for testing
// let User = require("./models/User");
// server.use(async (req, res, next) => {
//   req.session.user = await User.findOne({ email: "admin@admin.com" });
//   req.session.cart = await Product.find({
//     price: {
//       $gte: 100,
//     },
//   });

//   next();
// });

server.use(require("./middlewares/main-site"));

// reminder/important: put this after setting view engine, else it won't render page correctly
const contactUsRouter = require("./routes/contact-us");
server.use("/contact-us", contactUsRouter);

const authRouter = require("./routes/auth");
server.use(authRouter);

const productsRouter = require("./routes/products");
server.use("/products", productsRouter);

const aboutUsRouter = require("./routes/about-us");
server.use("/about-us", aboutUsRouter);

const userProfileRouter = require("./routes/user-profile");
server.use("/user-profile", userProfileRouter);

server.use("/api/products", require("./routes/api/products"));
server.use("/api/auth", require("./routes/api/auth"));

server.get("/:pageNumber?/:category?", async (req, res) => {
  let categories = ["Gaming", "Bedroom", "Kitchen", "Computer Devices", "Food"];
  let category = req.params.category ? req.params.category : "Gaming";

  let pageNumber = req.params.pageNumber ? req.params.pageNumber : 1;
  let pageSize = 2;
  let totalProducts = await Product.find({ category }).countDocuments();

  let totalPages = Math.ceil(totalProducts / pageSize);

  if (pageNumber > totalPages) {
    return res.redirect(`/${totalPages}/${category}`);
  }

  let recordsToSkip = (pageNumber - 1) * pageSize;

  let products = await Product.find({ category })
    .limit(pageSize)
    .skip(recordsToSkip);

  res.render("landing-page", {
    categories,
    category,
    products,
    pageNumber,
    pageSize,
    totalProducts,
    totalPages,
  });
});

server.listen(process.env.PORT_NUMBER);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STR)
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("DB Error - " + e));
