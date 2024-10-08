import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home, Notice, Mypage, SignIn, SignUp } from './pages';
import { createContext, useContext, useEffect, useState } from 'react';
import { ModalProvider } from '@/contexts/ModalContext';
import useApi from './apis/useApi';

const AuthContext = createContext<{
  accessToken: string | null;
  refreshAccessToken: () => void;
  setAccessToken: (accessToken: string | null) => void;
}>({
  accessToken: null,
  refreshAccessToken: () => {},
  setAccessToken: () => {},
});

function App() {
  const { get } = useApi();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    fetchAccessToken();
  }, []);

  useEffect(() => {
    console.log(accessToken);
  }, [accessToken]);

  const fetchAccessToken = async () => {
    try {
      // 서버로부터 accessToken 발급
      // const response = await get({
      //   params: '',
      //   headers: {},
      // });
      // setAccessToken(response.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshAccessToken = async () => {
    return await fetchAccessToken();
  };

  const authContextValue = {
    accessToken,
    refreshAccessToken,
    setAccessToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Notice />} path="/notice" />
            <Route element={<Mypage />} path="/mypage" />
            <Route element={<SignIn />} path="/sign-in" />
            <Route element={<SignUp />} path="/sign-up" />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default App;
