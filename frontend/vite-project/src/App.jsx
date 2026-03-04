import React, { useEffect } from "react";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import ErrorPage from "./error-page";
import Dashboard from "./dashboard/dashboardLogin.jsx";
import DashboardEmployee from "./dashboard/dashboardEmployee.jsx";
import ForbidenPage from "./forbiden-page.jsx";
import Navbar from "./components/navbar.jsx";
import Register from "./pages/register.jsx";
import Footer from "./components/footer.jsx";
import Profile from "./pages/profile.jsx";
import Contact from "./pages/contact.jsx";
import About from "./pages/about.jsx";
import Privacy from "./pages/privacy.jsx";
import Plans from "./pages/plans.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import { Toaster } from "react-hot-toast";
import { useAuthStore, useAdminStore, useManageStore } from "./store/authStore.js";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import Cart from "./cart/cart.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentComplete from "./cart/paymentComplete.jsx";
import ClientArea from "./clientArea/clientArea.jsx";
import ServiceDashboard from "./clientArea/serviceDashboard.jsx";
import ServiceInformation from "./clientArea/serviceInformation.jsx";

// protect routes that require authentication

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// Redirect authenticated user to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const ProtectedRouteEmployee = ({ children }) => {
  const { isAuthenticatedEmployee, employee } = useAdminStore();

  if (!isAuthenticatedEmployee) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const RedirectAuthenticatedEmployee = ({ children }) => {
  const { isAuthenticatedEmployee, employee } = useAdminStore();

  if (isAuthenticatedEmployee) {
    return <Navigate to="/dashboard-employee" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const { isCheckingAuthEmployee, checkAuthEmployee } = useAdminStore();
  const { manageSubscription } = useManageStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    checkAuthEmployee();
  }, [checkAuthEmployee]);

  useEffect(() => {
    manageSubscription();
  }, [manageSubscription]);

  if (isCheckingAuthEmployee) {
    return <LoadingSpinner />;
  }

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  const options = {
    "client-id":
      "ATzYPfw2mRRRSLI69BmDRPZRVL1NEwF_vCIP-HCcpTE_dURMDpo-sma_st9pafz7ed6hCc8fDOekg6MN",
    "enable-funding": "paylater",
    currency: "USD",
    vault: "true",
    intent: "capture",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  return (
    <PayPalScriptProvider options={options}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectAuthenticatedUser>
                <Register />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/dashboard"
            element={
              <RedirectAuthenticatedEmployee>
                <Dashboard />
              </RedirectAuthenticatedEmployee>
            }
          />
          <Route
            path="/dashboard-employee"
            element={
              <ProtectedRouteEmployee>
                <DashboardEmployee />
              </ProtectedRouteEmployee>
            }
          />
          <Route path="/forbiden" element={<ForbidenPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />

          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/plans" element={<Plans />} />
          <Route
            path="/verify-email"
            element={
              <RedirectAuthenticatedUser>
                <EmailVerificationPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/payment-complete"
            element={
              <ProtectedRoute>
                <PaymentComplete />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clientArea"
            element={
              <ProtectedRoute>
                <ClientArea />
              </ProtectedRoute>
            }
          />

          <Route
            path="/service-dashboard"
            element={
              <ProtectedRoute>
                <ServiceDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/service-information"
            element={
              <ProtectedRoute>
                <ServiceInformation />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Toaster />
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
