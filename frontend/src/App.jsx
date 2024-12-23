import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LodingSipnner";
import { useAuthStore } from "../store/authStore";
import EmailVerification from "./AuthPages/EmailVerification.jsx";
import ForgetPassword from "./AuthPages/ForgetPassword.jsx";
import LoginPage from "./AuthPages/LoginPage.jsx";
import ResetPassword from "./AuthPages/ResetPassword.jsx";
import SignUpPage from "./AuthPages/SignUpPage.jsx";
import BookingForm from "./HomePage/BookingForm";
import Home from "./HomePage/Home";
import OperationsDetails from "./HomePage/operations/operations";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          {/* Default redirect to /duties */}
          <Route path="/" element={<Navigate to="/duties" />} />
          <Route path="duties" element={<BookingForm />} />
          <Route path="operations" element={<OperationsDetails/>} />
          <Route path="payment-gateway" element={<div>Item Three</div>} />
        </Route>
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route
          path="/forget-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgetPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
