import axios from 'axios';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '../components/layout/Layout';
import '../styles/global.css';
import { getSingleMeal } from './meals/[id]';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1 * 60 * 60 * 1000,
      staleTime: 1 * 60 * 60 * 1000,
    },
  },
});

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1/';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.getItem('savedMeals')) {
      const savedMeals = JSON.parse(localStorage.getItem('savedMeals'));
      savedMeals.forEach((mealId) => {
        queryClient.prefetchQuery(['singleMeal', mealId], getSingleMeal);
      });
    } else {
      localStorage.setItem('savedMeals', JSON.stringify([]));
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
