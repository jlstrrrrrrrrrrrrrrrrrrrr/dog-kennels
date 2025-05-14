import React from "react";
import "./App.css";
import KennelBoard from "./components/KennelBoard";

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-gray-800 text-center p-4">
        Kennel Manager
      </h1>
      <KennelBoard />
    </div>
  );
}

export default App;
