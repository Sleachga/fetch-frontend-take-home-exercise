import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";

import { gray, blue, red, green } from "@radix-ui/colors";
import { ThemeProvider } from "styled-components";

// Create your theme
const theme = {
  colors: {
    ...gray,
    ...blue,
    ...red,
    ...green,
  },
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
