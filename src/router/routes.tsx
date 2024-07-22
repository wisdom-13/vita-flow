import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '@/layout/Main';
import HomePage from '@/pages/Main/Home';
import ErrorPage from '@/pages/Shared/Error';
import { FullScreenSpinner } from '@/components/ui/spinner';


const CategoryPage = lazy(() => import('@/pages/Main/Category'));
const VitaminListPage = lazy(() => import('@/pages/Main/VitaminList'));
const VitaminDetailPage = lazy(() => import('@/pages/Main/VitaminDetail'));

const AuthLayout = lazy(() => import('@/layout/Auth'));
const UserLayout = lazy(() => import('@/layout/User'));
const AdminLayout = lazy(() => import('@/layout/Admin'));

const SignUpPage = lazy(() => import('@/pages/Auth/SignUp'));
const SignInPage = lazy(() => import('@/pages/Auth/SignIn'));

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
          <Suspense fallback={<FullScreenSpinner />}>
            <CategoryPage />
          </Suspense>
        ),
      },
      {
        path: 'category/:key',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <VitaminListPage />
          </Suspense>
        ),
      },
      {
        path: 'vitamins',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <VitaminListPage />
          </Suspense>
        ),
      },
      {
        path: 'vitamin/:id',
        element: (
          <Suspense fallback={<FullScreenSpinner />}>
            <VitaminDetailPage />
          </Suspense>
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
        <Suspense fallback={<FullScreenSpinner />}>
          <AuthLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
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
        <Suspense fallback={<FullScreenSpinner />}>
          <UserLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'payment',
        element: (
          <PaymentPage />
        ),
      },
      {
        path: 'success',
        element: (
          <PaymentSuccessPage />
        ),
      },
      {
        path: 'fail',
        element: (
          <PaymentFailPage />
        ),
      },
    ],
  },
  {
    path: 'mypage',
    element: (
      <ProtectedRoute requiredRole='user'>
        <Suspense fallback={<FullScreenSpinner />}>
          <UserLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <MypagePage />
        ),
      },
      {
        path: 'info',
        element: (
          <MyinfoPage />
        ),
      },
      {
        path: 'history',
        element: (
          <HistoryPage />
        ),
      },
    ],
  },
  {
    path: 'admin',
    element: (
      <ProtectedRoute requiredRole='admin'>
        <Suspense fallback={<FullScreenSpinner />}>
          <AdminLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'orders',
        element: (
          <AdminOrdersPage />
        ),
      },
      {
        path: 'products',
        element: (
          <AdminProductsPage />
        ),
      },
      {
        path: 'product/:id',
        element: (
          <AdminProductModifyPage />
        ),
      },
      {
        path: 'product/new',
        element: (
          <AdminProductNewPage />
        ),
      },
    ],
  },
]);

export default routes;
