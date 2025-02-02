import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Theme } from "@radix-ui/themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import Match from "./pages/Match.tsx";
import MatchFound from "./pages/MatchFound.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/match" element={<Match />} />
            <Route path="/match-found" element={<MatchFound />} />
          </Routes>
          <App />
        </AuthProvider>
        8
      </BrowserRouter>
    </Theme>
  </StrictMode>
);
