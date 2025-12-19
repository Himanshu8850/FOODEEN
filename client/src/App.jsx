import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollSphereBackground from "./components/Background/ScrollSphereBackground";
import LoadingPage from "./components/LoadingPage/LoadingPage";

// Loading Context
import { useLoading } from "./context/LoadingContext";

// Dashboard
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));

// Authentication Pages
const SignUpPage = lazy(
  () => import("./pages/AuthenticationPages/SignUpPage/SignUpPage")
);
const SignInPage = lazy(
  () => import("./pages/AuthenticationPages/SignInPage/SignInPage")
);

// Restaurant Pages
const RestaurantListingsPage = lazy(
  () => import("./pages/RestaurantPages/RestaurantListingsPage")
);
const RestaurantTransactionsPage = lazy(
  () => import("./pages/RestaurantPages/RestaurantTransactionsPage")
);
const RestaurantProfilePage = lazy(
  () => import("./pages/RestaurantPages/RestaurantProfilePage")
);

// NGO Pages
const NGOListingsPage = lazy(() => import("./pages/NGOPages/NGOListingsPage"));
const NGOTransactionsPage = lazy(
  () => import("./pages/NGOPages/NGOTransactionsPage")
);
const NGOProfilePage = lazy(() => import("./pages/NGOPages/NGOProfilePage"));

// Chat-Interface
const ChatRoomPage = lazy(
  () => import("./pages/ChatInterfacePages/ChatRoomPage/ChatRoomPage")
);

// Other Pages
const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));

// Context
import { DarkModeProvider } from "./context/DarkModeContext";
import { useAuth } from "./context/AuthContext.jsx";

// Error Pages
import NotFoundPage from "./pages/ErrorPages/NotFoundPage/NotFoundPage";
import InternalServerErrorPage from "./pages/ErrorPages/InternalServerErrorPage/InternalServerErrorPage";

// Suspense fallback component
const SuspenseFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
    <div className="text-center">
      <div className="inline-flex items-center gap-2 mb-4">
        <div
          className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 rounded-full bg-blue-600 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  </div>
);

const Layout = () => {
  return (
    <div className="relative z-10">
      <ScrollSphereBackground />
      <Navbar transparent />
      <Suspense fallback={<SuspenseFallback />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const { isLoading } = useLoading();

  if (isLoading) {
    return <SuspenseFallback />;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <HomePage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/restaurant/listings",
        element: (
          <PrivateRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <RestaurantListingsPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/restaurant/transactions",
        element: (
          <PrivateRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <RestaurantTransactionsPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/restaurant/profile",
        element: (
          <PrivateRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <RestaurantProfilePage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/ngo/listings",
        element: (
          <PrivateRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <NGOListingsPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/ngo/transactions",
        element: (
          <PrivateRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <NGOTransactionsPage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/ngo/profile/",
        element: (
          <PrivateRoute>
            <Suspense fallback={<SuspenseFallback />}>
              <NGOProfilePage />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <AboutPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/sign-up",
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <SignInPage />
      </Suspense>
    ),
  },
  {
    path: "/chat/:orderId",
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <ChatRoomPage />
      </Suspense>
    ),
  },
  {
    path: "/error/notfound",
    element: <NotFoundPage />,
  },
  {
    path: "/error/internalserver",
    element: <InternalServerErrorPage />,
  },
]);

export default function App() {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <LoadingPage />}
      <DarkModeProvider>
        <RouterProvider router={router} />
      </DarkModeProvider>
    </>
  );
}
