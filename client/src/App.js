import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Dog from "./components/Dog/dog";
import CreateDog from "./components/createDog/createDog";
import Success from "./components/success/success";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dog/:id" element ={<Dog />} />
      <Route path= "/success" element = {<Success />} />
      <Route path="/createdog" element = {<CreateDog />} />
    </Routes>
  );
}

export default App;
