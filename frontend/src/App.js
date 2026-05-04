import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Animaliak from "./pages/Animaliak";
import Ekitaldiak from "./pages/Ekitaldiak";
import Adopzioak from "./pages/Adopzioak";
import AdminDashboard from "./pages/AdminDashboard";
import NireProfila from "./pages/NireProfila";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* ===== EZ LAYOUT ===== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ===== LAYOUT ===== */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="animaliak" element={<Animaliak />} />

        {/* ProtectedRoute */}
        <Route path="ekitaldiak" element={<Ekitaldiak />} />
        <Route path="adopzioak" element={<Adopzioak />} />
        <Route path="profile" element={<NireProfila />} />
  <Route path="admin" element={<AdminDashboard />} />

      </Route>
    </Routes>
  );
}

export default App;