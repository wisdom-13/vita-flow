import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  RouterProvider,
} from 'react-router-dom';
import './styles/index.css';

import routes from './router/routes';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { HelmetProvider } from 'react-helmet-async';
import { LoadingProvider } from './context/LoadingContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import { Toaster } from './components/ui/sonner';
import LoadingIndicator from './components/Shared/LoadingIndicator';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <LoadingProvider>
            <HelmetProvider>
              <RouterProvider router={routes} />
              <Toaster position='bottom-center' duration={1000} />
              <LoadingIndicator />
            </HelmetProvider>
          </LoadingProvider>
        </CartProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);