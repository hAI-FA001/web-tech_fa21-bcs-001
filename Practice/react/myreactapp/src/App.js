import logo from "./logo.svg";
import "./App.css";

import { Link, Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Products from "./views/Products";
import Todos from "./components/Todos";

function App() {
  return (
    <Router>
      <ul id="menu">
        <li>
          {/* Link = a, does not do full reload like a */}
          <Link to="/todo">Todo Example</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
      {/* is like switch, all this is react impl */}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/todo" element={<Todos />}></Route>
      </Routes>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </Router>
  );
}

export default App;
