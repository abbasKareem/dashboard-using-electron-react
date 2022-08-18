import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import './i18n';
import { store } from './redux/store';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
    <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
);
