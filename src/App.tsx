import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { MemberPage } from "./pages/MemberPage";
import { MessagesPage } from "./pages/MessagesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const profileName = localStorage.getItem("name") || "John Doe";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthPage
            mode="login"
            title="Sign in to PotPunch"
            subtitle="Manage collections, members, and messages"
            footerText="Don't have an account?"
            footerLink="Sign Up"
            footerHref="/signup"
          />
        }
      />
      <Route
        path="/signup"
        element={
          <AuthPage
            mode="signup"
            title="Create your PotPunch account"
            subtitle="Set up your workspace in minutes"
            footerText="Already have an account?"
            footerLink="Sign In"
            footerHref="/login"
          />
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboardPage onLogout={handleLogout} profileName={profileName} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <MessagesPage onLogout={handleLogout} profileName={profileName} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/member"
        element={
          <ProtectedRoute>
            <MemberPage onLogout={handleLogout} profileName={profileName} />
          </ProtectedRoute>
        }
      />

      <Route path="/404" element={<NotFoundPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default App;
