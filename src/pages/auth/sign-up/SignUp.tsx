import Logo from '../../../assets/logo.png';
import Kakao from '../../../assets/kakao_logo.svg';

import { Button, Input, Select } from '../../../components';

const SignUp = () => {
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
                    placeholder="아이디"
                    value=""
                    onChange={(event) => {
                      return;
                    }}
                    id="id"
                  />
                </div>
                <div className="w-1/4">
                  <Button
                    text="중복 확인"
                    onClick={() => {
                      return;
                    }}
                    className="text-[10px]"
                  />
                </div>
              </div>
              <Input
                type="password"
                label="비밀번호"
                placeholder="비밀번호"
                value=""
                onChange={(event) => {
                  return;
                }}
                id="password"
              />
              <Input
                type="password"
                label="비밀번호 확인"
                placeholder="비밀번호 확인"
                value=""
                onChange={(event) => {
                  return;
                }}
                id="password-check"
              />
              <div className="w-full flex gap-2">
                <div className="w-3/4">
                  <Input
                    type="email"
                    label="이메일"
                    placeholder="이메일"
                    value=""
                    onChange={(event) => {
                      return;
                    }}
                    id="email"
                  />
                </div>
                <div className="w-1/4">
                  <Button
                    text="인증"
                    onClick={() => {
                      return;
                    }}
                    className="text-[10px] w-[57px]"
                  />
                </div>
              </div>
              <Input
                type="text"
                label="이름"
                placeholder="이름"
                value=""
                onChange={(event) => {
                  return;
                }}
                id="name"
              />
              <Input
                type="number"
                label="나이"
                placeholder="나이"
                value=""
                onChange={(event) => {
                  return;
                }}
                id="age"
              />
              <Select
                label="학력"
                options={[
                  { label: '어쩌고', value: '1' },
                  { label: '저쩌고', value: '2' },
                ]}
                placeholder="학력"
                value=""
                onChange={(event) => {
                  return;
                }}
              />
            </form>
            <div className="w-[264px] flex flex-col items-center gap-3 mt-[47px]">
              <Button
                text="회원가입"
                onClick={() => {
                  return;
                }}
                className="h-[47px]"
              />
              <Button
                text="돌아가기"
                onClick={() => {
                  return;
                }}
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
