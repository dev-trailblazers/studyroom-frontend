import Logo from '../../../assets/logo.png';
import Kakao from '../../../assets/kakao_logo.svg';

import { Button, Input } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkEmptyObject, updateObjectState } from '../../../utils';
import useApi from '../../../apis/useApi';
import { useAuth } from '../../../App';

interface UserInfo {
  username: string;
  password: string;
  [key: string]: string;
}

interface UserInfoError {
  username: boolean;
  password: boolean;
  [key: string]: boolean;
}

const initialUserInfo = { username: 'test123', password: 'Test123$' };
const initialUserInfoError = { username: false, password: false };

const SignIn = () => {
  const navigate = useNavigate();
  const { post } = useApi();
  const { setAccessToken } = useAuth();

  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [userInfoError, setUserInfoError] =
    useState<UserInfoError>(initialUserInfoError);

  useEffect(() => {
    // Input 유효성 에러 발생 -> onChange 시 사라짐
    const disappearError = (field: string) => {
      if (userInfo[field].length !== 0) {
        setUserInfoError((prev) => ({ ...prev, [field]: false }));
      }
    };
    disappearError('username');
    disappearError('password');
  }, [userInfo.username, userInfo.password]);

  // Input 유효성 검사
  const validateForm = () => {
    const { username, password } = userInfo;
    let isValid = true;

    if (checkEmptyObject(userInfo, setUserInfoError)) {
      return false;
    }

    if (username.length === 0) {
      setUserInfoError((prev) => ({ ...prev, username: true }));
      isValid = false;
    }

    if (password.length === 0) {
      setUserInfoError((prev) => ({ ...prev, password: true }));
      isValid = false;
    }

    return isValid;
  };

  // 로그인 요청
  const signInRequest = async () => {
    const { username, password } = userInfo;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return await post({
      params: '/login',
      body: formData,
    });
  };

  // 로그인 응답
  const signInResponse = async (response: Response) => {
    const accessToken = response.headers.get('Authorization')?.split(' ')[1];

    console.log(response);

    if (accessToken) {
      setAccessToken(accessToken);
      alert('로그인 되었습니다.');
      // navigate('/');
    } else {
      alert(
        '로그인에 실패하였습니다. 아이디 혹은 비밀번호를 다시 입력해 주세요.'
      );
      return;
    }
  };

  // 일반 로그인
  const onSignIn = async () => {
    try {
      if (validateForm()) {
        try {
          const response = await signInRequest();
          signInResponse(response);
        } catch (error) {
          console.log(error);
          alert('로그인 과정에서 오류가 발생했습니다..');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 카카오 로그인
  const onSignInKakao = async () => {
    window.location.href = `${import.meta.env.VITE_KAKAO_AUTH_API_URL}/oauth2/authorization/kakao`;
  };

  return (
    <div className="w-screen h-screen bg-blue_05 ">
      <div className="mx-auto max-w-[480px] h-full flex flex-col items-center gap-5 pt-[110px] pb-5">
        {/* Login Section */}
        <section className="w-full ">
          <a href="/">
            <div className="flex justify-center items-center gap-2.5 mb-[15px]">
              <h1
                className="text-[60px] font-semibold text-main"
                style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}
              >
                StudyRoom
              </h1>
              <img src={Logo} alt="임시 로고" />
            </div>
          </a>
          <div className="shadow-box_01 bg-white rounded-2xl flex flex-col items-center  py-[60px]">
            <span className="text-[32px] leading-10 font-extrabold mb-[65px]">
              걱정 없이 함께 하는 <br />
              스터디 서비스
            </span>
            <form
              action="submit"
              className="w-[264px] flex flex-col items-center gap-4"
            >
              <div className="w-full flex flex-col gap-1">
                <Input
                  label="아이디"
                  value={userInfo.username}
                  onChange={(event) =>
                    updateObjectState(setUserInfo, {
                      username: event.target.value,
                    })
                  }
                  isError={userInfoError.username}
                  error="아이디를 입력해 주세요."
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <Input
                  type="password"
                  label="비밀번호"
                  value={userInfo.password}
                  onChange={(event) =>
                    updateObjectState(setUserInfo, {
                      password: event.target.value,
                    })
                  }
                  isError={userInfoError.password}
                  error="비밀번호를 입력해 주세요."
                />
              </div>
            </form>
            <div className="w-[264px] flex flex-col items-center gap-3 mt-[47px]">
              <Button
                text="로그인"
                blueType="dark"
                onClick={onSignIn}
                className="text-[14px] h-[47px]"
              />
              <Button
                text="회원가입"
                onClick={() => navigate('/sign-up')}
                blueType="light"
                className="text-[14px] h-[47px]"
              />
              <button
                onClick={onSignInKakao}
                className="shadow-box_02 w-[264px] h-[47px] rounded-xl bg-[#FEE500] flex justify-center items-center gap-5"
              >
                <img src={Kakao} alt="카카오 로고" />
                <span className="text-[14px] font-semibold">
                  카카오계정으로 로그인
                </span>
              </button>
              <div className="flex items-center">
                <button className="text-[10px] text-[#bbb] p-2 pr-0">
                  아이디
                </button>
                <span className="text-[10px] text-[#bbb] px-1">|</span>
                <button className="text-[10px] text-[#bbb] p-2 pl-0">
                  비밀번호 찾기
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Ads Section */}
        <section className="w-[480px] h-[230px] bg-black rounded-2xl"></section>
      </div>
    </div>
  );
};

export default SignIn;
