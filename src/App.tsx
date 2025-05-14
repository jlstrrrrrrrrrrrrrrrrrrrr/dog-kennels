import React from "react";
import "./App.css";
import KennelBoard from "./components/KennelBoard";

function App() {
  return (
    <div className="App flex min-h-screen flex-col bg-gray-200">
      <h1 className="p-4 text-center text-2xl font-bold text-gray-800">
        Kennel Manager
      </h1>
      <KennelBoard />
    </div>
  );
}

export default App;
