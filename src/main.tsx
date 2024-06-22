import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './styles/index.css';
import HomePage from './pages/Main/Home';
import VitaminListPage from './pages/Main/VitaminList';
import VitaminDetailPage from './pages/Main/VitaminDetail';
import CartPage from './pages/User/Cart';
import OrdersPage from './pages/User/Orders';
import PaymentPage from './pages/User/Payment';
import MypagePage from './pages/User/Mypage';
import MyinfoPage from './pages/User/Myinfo';
import AdminOrdersPage from './pages/Admin/AdminOrders';
import AdminProductsPage from './pages/Admin/AdminProducts';
import AdminProductsNewPage from './pages/Admin/AdminProductsNew';
import ErrorPage from './pages/Shared/Error';
import MainLayout from './layout/Main';
import OrderLayout from './layout/Order';
import AdminLayout from './layout/Admin';
import SignUpPage from './pages/Auth/SignUp';
import SignInPage from './pages/Auth/SignIn';

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
    path: '/signup',
    element: <SignUpPage />
  },
  {
    path: '/login',
    element: <SignInPage />
  },
  {
    path: 'orders',
    element: <OrderLayout />,
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
    element: <MypagePage />,
    children: [
      {
        path: 'info',
        element: <MyinfoPage />,
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
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
    <RouterProvider router={router} />
  </React.StrictMode>
);