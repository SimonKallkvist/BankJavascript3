import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import AddCard from "./Pages/AddCard";
import Settings from "./Pages/Settings";
import Card from "./Pages/Card";
import { ThemeProvider } from "./utils/ThemeContext.jsx";

export const App = () => {
  return (
    <>
      <ThemeProvider>
        <Router>
          {/* <Link to={"/"}>home</Link> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addcard" element={<AddCard />} />
            <Route path="/card/:id" element={<Card />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};
