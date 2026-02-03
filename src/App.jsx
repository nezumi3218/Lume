import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen w-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <AppRoutes />
    </div>
  );
}

export default App;
