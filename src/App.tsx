import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Main, Notice, Mypage, SignIn, SignUp } from './pages';
import { ThemeProvider } from '@material-tailwind/react';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Main />} path="/" />
            <Route element={<Notice />} path="/notice" />
            <Route element={<Mypage />} path="/mypage" />
            <Route element={<SignIn />} path="/sign-in" />
            <Route element={<SignUp />} path="/sign-up" />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  );
}

export default App;
