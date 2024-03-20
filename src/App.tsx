import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, SignIn, SignUp } from './pages';
import { ThemeProvider } from '@material-tailwind/react';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<SignIn />} path="/sign-in" />
          <Route element={<SignUp />} path="/sign-up" />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
