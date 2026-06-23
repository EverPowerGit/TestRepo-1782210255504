import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@/index.css';
import App from './routes/routes';
import { store } from './app/store';
import { ThemeProvider } from './components/Shared/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
