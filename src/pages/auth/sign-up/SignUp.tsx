import { useEffect, useState } from 'react';
import Logo from '../../../assets/logo.png';

import { Button, Input, Select } from '../../../components';
import { Education } from '../../../data/Education';
import { useNavigate } from 'react-router-dom';
import { Gender } from '../../../data/Gender';
import { useMutation, useQuery } from '@tanstack/react-query';

interface UserInfo {
  username: string;
  password: string;
  passwordCheck: string;
  email: string;
  name: string;
  birth: string;
  gender: string;
  [key: string]: string;
}

interface PasswordError {
  isNotValidPassword: boolean;
  isDifferPassword: boolean;
}

const initialUserInfo = {
  username: '',
  password: '',
  passwordCheck: '',
  email: '',
  name: '',
  gender: '',
  birth: '',
  // education: '',
};

// 학력은 출시 전에 추가, 현재는 이름, 나이를 text로 받으나 나중에는 변경할 수도 있음
const SignUp = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [isDuplicated, setIsDuplicated] = useState<boolean | null>(null);
  const [passwordError, setPasswordError] = useState<PasswordError>({
    isNotValidPassword: false,
    isDifferPassword: false,
  });
  const [isCertifing, setIsCertifing] = useState(false);

  useEffect(() => {
    // 패스워드와 패스워드 확인 값이 일치 여부 검사
    setPasswordError((prev) => ({
      ...prev,
      isDifferPassword:
        userInfo.password !== userInfo.passwordCheck ? true : false,
    }));
  }, [userInfo.passwordCheck]);

  // Input들의 onChange 함수 (value: 입력한 값, field: 객체 키)
  const onChangeInput = (value: string, field: string) => {
    if (field === 'username') {
      setIsDuplicated(null);
    }

    // 패스워드 유효성 검사
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,16}$/;
    setPasswordError((prev) => ({
      ...prev,
      isNotValidPassword: !passwordRegex.test(userInfo.password) ? true : false,
    }));

    const updatedObject = { ...userInfo };
    updatedObject[field] = value;
    setUserInfo(updatedObject);
  };

  // 아이디 중복 확인(아이디는 3~16자 소문자+숫자로만 이루어짐)
  // 비밀번호 8 ~ 16자 대문자+소문자+숫자+특수문자(키패드 1번 ~ 7번까지만 '+', '=')로만 이루어짐
  // 비밀번호 유효성 검사는 backend에서 적용한 정규식 참고하면 됨
  const onCheckDuplicatedId = async () => {
    try {
      const response = await fetch(`/api/member/username`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: userInfo.username,
      });
      const duplicatedResult = await response.json();

      if (!duplicatedResult) {
        alert('사용 가능한 아이디입니다.');
      }

      setIsDuplicated(duplicatedResult);
    } catch (error: any) {
      if (error.name === 'SyntaxError') {
        alert('아이디는 영소문자와 숫자를 하나씩 포함한 3~16자리입니다.');
      }
      console.log(error.name);
    }
  };

  // 이메일 인증
  const onCertifyEmail = async () => {
    try {
      setIsCertifing(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/new/email`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: userInfo.email,
        }
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-blue_05 ">
      <div className="mx-auto max-w-[480px] h-full flex flex-col items-center gap-5 pt-[110px] pb-5">
        {/* Sign Up Section */}
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
              회원가입
            </span>
            <form
              action="submit"
              className="w-[264px] flex flex-col items-center gap-4"
            >
              <div className="w-full flex gap-2">
                <div className="w-3/4">
                  <Input
                    label="아이디"
                    value={userInfo.username}
                    onChange={(event) =>
                      onChangeInput(event.target.value, 'username')
                    }
                  />
                </div>
                <div className="w-1/4">
                  <Button
                    blueType="dark"
                    text="중복 확인"
                    onClick={onCheckDuplicatedId}
                    className="text-[10px]"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <Input
                  type="password"
                  label="비밀번호"
                  value={userInfo.password}
                  onChange={(event) =>
                    onChangeInput(event.target.value, 'password')
                  }
                />
                {passwordError.isNotValidPassword && (
                  <span className="text-[11px] text-red-400 px-2">
                    비밀번호는 영문 대소문자와 숫자, 특수문자를 하나씩 포함한
                    8~16자리입니다.
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col gap-1">
                <Input
                  type="password"
                  label="비밀번호 확인"
                  value={userInfo.passwordCheck}
                  onChange={(event) =>
                    onChangeInput(event.target.value, 'passwordCheck')
                  }
                />
                {passwordError.isDifferPassword && (
                  <span className="text-[11px] text-red-400 px-2">
                    비밀번호가 일치하지 않습니다.
                  </span>
                )}
              </div>
              <div className="w-full flex gap-2">
                <div className="w-3/4">
                  <Input
                    disabled={isCertifing}
                    type="email"
                    label="이메일"
                    value={userInfo.email}
                    onChange={(event) =>
                      onChangeInput(event.target.value, 'email')
                    }
                  />
                  <Input
                    label="인증번호"
                    value={userInfo.username}
                    onChange={(event) =>
                      onChangeInput(event.target.value, 'username')
                    }
                  />
                </div>
                <div className="w-1/4">
                  <Button
                    blueType="dark"
                    text="인증"
                    onClick={onCertifyEmail}
                    className="text-[10px] w-[57px]"
                  />
                </div>
              </div>
              <Input
                type="text"
                label="이름"
                value={userInfo.name}
                onChange={(event) => onChangeInput(event.target.value, 'name')}
              />
              <Input
                type="number"
                label="나이"
                value={userInfo.birth}
                onChange={(event) => onChangeInput(event.target.value, 'birth')}
              />
              <Select
                options={Education}
                placeholder="학력"
                value={userInfo.education}
                setValue={(value) => onChangeInput(value ?? '', 'education')}
              />
              <Select
                options={Gender}
                placeholder="성별"
                value={userInfo.gender}
                setValue={(value) => onChangeInput(value ?? '', 'gender')}
              />
            </form>
            <div className="w-[264px] flex flex-col items-center gap-3 mt-[47px]">
              <Button
                type="submit"
                blueType="dark"
                text="회원가입"
                onClick={() => {
                  return;
                }}
                className="h-[47px]"
              />
              <Button
                text="돌아가기"
                onClick={() => navigate(-1)}
                blueType="light"
                className="h-[47px]"
              />
            </div>
          </div>
        </section>
        {/* Ads Section */}
        <section className="w-[480px] h-[230px] bg-black rounded-2xl"></section>
      </div>
    </div>
  );
};

export default SignUp;
