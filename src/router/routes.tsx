import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '@/layout/Main';
import AuthLayout from '@/layout/Auth';
import UserLayout from '@/layout/User';
import AdminLayout from '@/layout/Admin';
import HomePage from '@/pages/Main/Home';
import ErrorPage from '@/pages/Shared/Error';
import VitaminListPage from '@/pages/Main/VitaminList';
import VitaminDetailPage from '@/pages/Main/VitaminDetail';
import SignUpPage from '@/pages/Auth/SignUp';
import SignInPage from '@/pages/Auth/SignIn';
import { FullScreenSpinner } from '@/components/ui/spinner';
import CategoryPage from '@/pages/Main/Category';

const CartPage = lazy(() => import('@/pages/Main/Cart'));
const HistoryPage = lazy(() => import('@/pages/User/History'));
const PaymentPage = lazy(() => import('@/pages/Orders/Payment'));
const PaymentSuccessPage = lazy(() => import('@/pages/Orders/PaymentSuccess'));
const PaymentFailPage = lazy(() => import('@/pages/Orders/PaymentFail'));
const MypagePage = lazy(() => import('@/pages/User/Mypage'));
const MyinfoPage = lazy(() => import('@/pages/User/Myinfo'));
const AdminOrdersPage = lazy(() => import('@/pages/Admin/AdminOrders'));
const AdminProductsPage = lazy(() => import('@/pages/Admin/AdminProducts'));
const AdminProductNewPage = lazy(() => import('@/pages/Admin/AdminProductNew'));
const AdminProductModifyPage = lazy(() => import('@/pages/Admin/AdminProductModify'));

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <HomePage />
        ),
      },
      {
        path: 'category',
        element: (
          <CategoryPage />
        ),
      },
      {
        path: 'category/:key',
        element: (
          <VitaminListPage />
        ),
      },
      {
        path: 'vitamins',
        element: (
          <VitaminListPage />
        ),
      },
      {
        path: 'vitamin/:id',
        element: (
          <VitaminDetailPage />
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <CartPage />
          </Suspense>
        ),
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
        element: (
          <SignUpPage />
        ),
      },
      {
        path: 'login',
        element: (
          <SignInPage />
        ),
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
        path: 'payment',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <PaymentPage />
          </Suspense>
        ),
      },
      {
        path: 'success',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <PaymentSuccessPage />
          </Suspense>
        ),
      },
      {
        path: 'fail',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <PaymentFailPage />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <MypagePage />
          </Suspense>
        ),
      },
      {
        path: 'info',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <MyinfoPage />
          </Suspense>
        ),
      },
      {
        path: 'history',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <HistoryPage />
          </Suspense>
        ),
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
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <AdminOrdersPage />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <AdminProductsPage />
          </Suspense>
        ),
      },
      {
        path: 'product/:id',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <AdminProductModifyPage />
          </Suspense>
        ),
      },
      {
        path: 'product/new',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <AdminProductNewPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default routes;
