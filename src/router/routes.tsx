import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layout/Main';
import AuthLayout from '../layout/Auth';
import UserLayout from '../layout/User';
import AdminLayout from '../layout/Admin';
import ErrorPage from '../pages/Shared/Error';
import HomePage from '../pages/Main/Home';
import VitaminListPage from '../pages/Main/VitaminList';
import VitaminDetailPage from '../pages/Main/VitaminDetail';
import SignUpPage from '../pages/Auth/SignUp';
import SignInPage from '../pages/Auth/SignIn';
import CartPage from '../pages/User/Cart';
import OrdersPage from '../pages/User/Orders';
import PaymentPage from '../pages/User/Payment';
import MypagePage from '../pages/User/Mypage';
import MyinfoPage from '../pages/User/Myinfo';
import AdminOrdersPage from '../pages/Admin/AdminOrders';
import AdminProductsPage from '../pages/Admin/AdminProducts';
import AdminProductsNewPage from '../pages/Admin/AdminProductsNew';

const routes = createBrowserRouter([
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

export default routes;
