import Logo from '../../../assets/logo.png';
import Kakao from '../../../assets/kakao_logo.svg';

import { Button, Input } from '../../../components';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-blue_05 ">
      <div className="mx-auto max-w-[480px] h-full flex flex-col items-center gap-5 pt-[110px]">
        {/* Login Section */}
        <section className="w-full ">
          <div className="flex justify-center items-center gap-2.5 mb-[15px]">
            <h1
              className="text-[60px] font-semibold text-main"
              style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.1)' }}
            >
              StudyRoom
            </h1>
            <img src={Logo} alt="임시 로고" />
          </div>
          <div className="shadow-box_01 bg-white rounded-2xl flex flex-col items-center  py-[60px]">
            <span className="text-[32px] leading-10 font-extrabold mb-[65px]">
              걱정 없이 함께 하는 <br />
              스터디 서비스
            </span>
            <form
              action="submit"
              className="w-[264px] flex flex-col items-center gap-4"
            >
              <Input
                label="아이디"
                placeholder="아이디를 입력해 주세요"
                value=""
                onChange={(event) => {
                  return;
                }}
                id="id"
              />
              <Input
                type="password"
                label="비밀번호"
                placeholder="비밀번호를 입력해 주세요"
                value=""
                onChange={(event) => {
                  return;
                }}
                id="password"
              />
            </form>
            <div className="w-[264px] flex flex-col items-center gap-3 mt-[47px]">
              <Button
                text="로그인"
                onClick={() => {
                  return;
                }}
                className="text-[14px] h-[47px]"
              />
              <Button
                text="회원가입"
                onClick={() => navigate('/sign-up')}
                blueType="light"
                className="text-[14px] h-[47px]"
              />
              <button className="shadow-box_02 w-[264px] h-[47px] rounded-xl bg-[#FEE500] flex justify-center items-center gap-5">
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
