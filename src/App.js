import logo from "./logo.svg";
import "./App.css";
import MainBoard from "./router/main";
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <MainBoard />
  </BrowserRouter>
);

export default App;
