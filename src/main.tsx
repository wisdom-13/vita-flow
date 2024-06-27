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

import { LoadingProvider } from './context/LoadingContext';
import { AuthProvider } from './context/AuthContext';

import { Toaster } from './components/ui/sonner';
import LoadingModal from './components/modal/LoadingModal';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoadingProvider>
          <RouterProvider router={routes} />
          <Toaster position='top-center' />
          <LoadingModal />
        </LoadingProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);