import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import './styles/index.css';

import MainLayout from './layout/Main';
import AuthLayout from './layout/Auth';
import UserLayout from './layout/User';
import AdminLayout from './layout/Admin';

import HomePage from './pages/Main/Home';
import VitaminListPage from './pages/Main/VitaminList';
import VitaminDetailPage from './pages/Main/VitaminDetail';
import SignUpPage from './pages/Auth/SignUp';
import SignInPage from './pages/Auth/SignIn';
import CartPage from './pages/User/Cart';
import OrdersPage from './pages/User/Orders';
import PaymentPage from './pages/User/Payment';
import MypagePage from './pages/User/Mypage';
import MyinfoPage from './pages/User/Myinfo';
import AdminOrdersPage from './pages/Admin/AdminOrders';
import AdminProductsPage from './pages/Admin/AdminProducts';
import AdminProductsNewPage from './pages/Admin/AdminProductsNew';
import ErrorPage from './pages/Shared/Error';

import { LoadingProvider } from './context/LoadingContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/sonner';
import LodingModal from './components/modal/LodingModal';
import ProtectedRoute from './router/ProtectedRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'vitamins',
        element: <VitaminListPage />,
      },
      {
        path: 'vitamins/:id',
        element: <VitaminDetailPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: (
      <ProtectedRoute requiredRole='guest'>
        <AuthLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'login',
        element: <SignInPage />,
      },
    ],
  },
  {
    path: 'orders',
    element: (
      <ProtectedRoute requiredRole='user'>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'history',
        element: <OrdersPage />,
      },
      {
        path: 'payment',
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: 'mypage',
    element: (
      <ProtectedRoute requiredRole='user'>
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MypagePage />,
      },
      {
        path: 'info',
        element: <MyinfoPage />,
      },
    ],
  },
  {
    path: 'admin',
    element: (
      <ProtectedRoute requiredRole='admin'>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'orders',
        element: <AdminOrdersPage />,
      },
      {
        path: 'products',
        element: <AdminProductsPage />,
      },
      {
        path: 'product/new',
        element: <AdminProductsNewPage />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <RouterProvider router={router} />
        <Toaster position='top-center' />
        <LodingModal />
      </LoadingProvider>
    </AuthProvider>
  </React.StrictMode>
);