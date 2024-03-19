import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, SignIn, SignUp } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
