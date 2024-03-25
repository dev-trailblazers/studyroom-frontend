import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, SignIn, SignUp } from './pages';
import { ThemeProvider } from '@material-tailwind/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<SignIn />} path="/sign-in" />
          <Route element={<SignUp />} path="/sign-up" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    //<ReactQueryDevtools initialIsOpen={false} />
    //</QueryClientProvider>
  );
}

export default App;
