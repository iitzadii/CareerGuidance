import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Assessment from "../pages/Assessment.jsx";
import Recommendations from "../pages/Recommendations.jsx";
import Careers from "../pages/Careers.jsx";
import CareerDetails from "../pages/CareerDetails.jsx";
import CompareCareers from "../pages/CompareCareers.jsx";
import SavedCareers from "../pages/SavedCareers.jsx";
import CollegeDetails from "../pages/CollegeDetails.jsx";
import Profile from "../pages/Profile.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:id" element={<CareerDetails />} />
        <Route path="/college/:id" element={<CollegeDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/compare" element={<CompareCareers />} />
          <Route path="/saved" element={<SavedCareers />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
