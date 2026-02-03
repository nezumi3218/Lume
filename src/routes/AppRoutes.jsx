import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Profile from "../pages/Profile";
import PostDetails from "../pages/PostDetails";

import AppLayout from "../components/layout/AppLayout";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <div className="min-h-screen w-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h1 className="p-6">404 Not Found</h1>} />
      </Routes>
    </div>
  );
}
