import { useState, useRef, useEffect } from 'react';
import { Button, Input, Select, Modal } from '../../components';
import { useNavigate } from 'react-router-dom';
import { notifications } from '../../data';

const createStudyInfo = {
  studyTitle: '',
  studyType: '',
  startDate: '',
  endDate: '',
  studyMethod: '',
  maxParticipants: '',
  recruitmentType: '',
  studyIntroduction: '',
};

const Mypage = () => {
  const navigate = useNavigate();
  const [headerActiveIndex, setHeaderActiveIndex] = useState(3);
  const [modals, setModals] = useState({
    isLogoutModalOpen: false,
    isCreateModalOpen: false,
    isStudyModalOpen: false,
  });
  const [createFormData, setCreateFormData] = useState(createStudyInfo);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  // 모달 상태관리
  const openLogoutModal = () => {
    setModals((prevModals) => ({
      ...prevModals,
      isLogoutModalOpen: true,
    }));
  };
  const openCreateModal = () => {
    setModals((prevModals) => ({
      ...prevModals,
      isCreateModalOpen: true,
    }));
  };

  const closeLogoutModal = () => {
    setModals((prevModals) => ({
      ...prevModals,
      isLogoutModalOpen: false,
    }));
  };
  const closeCreateModal = () => {
    setModals((prevModals) => ({
      ...prevModals,
      isCreateModalOpen: false,
    }));
  };
  // 스터디 생성 모달 필드 관리 함수
  const handleFieldChange = (fieldName: string, value: string) => {
    setCreateFormData((prevFields) => ({
      ...prevFields,
      [fieldName]: value,
    }));
  };

  // 스터디 생성 함수
  const handleCreateSubmit = () => {
    console.log('Form Data:', createFormData);
    closeCreateModal();
  };

  // 메인 페이지 헤더 메뉴 클릭 이벤트
  const handleHeaderClick = (index: number) => {
    setHeaderActiveIndex(index);
    setIsAccordionOpen(index === 2 ? !isAccordionOpen : false);
    switch (index) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/notice');
        break;
      case 3:
        navigate('/mypage');
        break;
    }
  };

  // 아코디언 창의 높이를 열고 닫는 효과를 적용하는 useEffect
  useEffect(() => {
    accordionRef.current !== null &&
      (accordionRef.current.style.height = isAccordionOpen
        ? `${accordionRef.current.scrollHeight}px`
        : '0');
  }, [isAccordionOpen]);

  // 상단으로 스크롤 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen pt-10 pl-10 pr-[50px] lg:pl-20 lg:pr-[90px] flex flex-col gap-10">
        {/* logout Section */}
        <div className="flex absolute top-0 right-4 lg:right-14 pt-4 pr-5">
          <span className="text-[12px] text-gray-400">엄현호님ㅤ|ㅤ</span>
          <button
            className="text-[12px] text-gray-400"
            onClick={openLogoutModal}
          >
            로그아웃
          </button>
          <Modal
            isOpen={modals.isLogoutModalOpen}
            onClose={closeLogoutModal}
            title="로그아웃"
            width={400}
            height={200}
            closeOnBackdropClick={false}
            exitIcon={false}
          >
            <div className="text-center">
              <p>로그아웃을 하시겠습니까?</p>
              <div className="flex pt-5 gap-5">
                <Button
                  text="아니오"
                  blueType="light"
                  onClick={() => {
                    closeLogoutModal();
                  }}
                  className="text-[14px] h-[47px]"
                />
                <Button
                  text="예"
                  blueType="dark"
                  onClick={() => navigate('/sign-in')}
                  className="text-[14px] h-[47px]"
                />
              </div>
            </div>
          </Modal>
        </div>
        {/* header Section */}
        <div className="flex items-center justify-between">
          <h1
            className="text-[28px] md:text-[44px] lg:text-[54px] cursor-pointer select-none font-semibold text-blue_01"
            onClick={() => navigate('/')}
          >
            StudyRoom
          </h1>
          <div className="w-[250px] h-[45px] md:w-[400px] lg:w-[500px] md:h-[50px] lg:h-[60px] flex justify-between items-center bg-blue_02 border rounded-[10px]">
            {['홈', '공지사항', '알림', '내정보'].map((label, index) => (
              <div
                key={label}
                className={`flex-1 flex items-center justify-center cursor-pointer select-none font-semibold transition duration-300 transform hover:scale-105 ${
                  headerActiveIndex === index
                    ? 'text-blue_01 text-[14px] md:text-[18px] lg:text-[20px] font-bold'
                    : 'text-white text-[12px] md:text-[16px] lg:text-[18px]'
                }`}
                onClick={() => handleHeaderClick(index)}
              >
                {label}
              </div>
            ))}
            {/* Accordion */}
            <div
              ref={accordionRef}
              className="absolute z-50 top-[110px] w-[500px] bg-white rounded-[10px] shadow-box_03 transition-all duration-300"
              style={{
                height: '0',
                overflow: 'hidden',
              }}
            >
              {/* Render notifications */}
              {notifications.map((notification, index) => (
                <div key={index} className="p-4 border-b cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-medium">
                      {notification.message}
                    </span>
                    <span className="text-[12px] text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* footer Section*/}
      <div className="mt-[40px] h-[180px] bg-gray-100">
        <h1>약관동의 등등</h1>
      </div>
      {/* fixed Button Section*/}
      <div className="flex flex-col fixed bottom-5 right-3 gap-3">
        <button
          className="bg-white text-blue_01 font-bold w-[40px] h-[40px] rounded-full shadow-box_03 transition duration-300 transform hover:scale-105"
          onClick={scrollToTop}
        >
          &uarr;
        </button>
        <button
          className="bg-blue_01 text-white font-bold w-[40px] h-[40px] rounded-full shadow-box_03 transition duration-300 transform hover:scale-105"
          onClick={openCreateModal}
        >
          +
        </button>
        <Modal
          isOpen={modals.isCreateModalOpen}
          onClose={closeCreateModal}
          title="스터디 생성"
          width={400}
          height={550}
          closeOnBackdropClick={false}
          exitIcon={false}
        >
          <div className="text-center">
            <div className="flex-col">
              <Input
                label="스터디 제목"
                value={createFormData.studyTitle}
                onChange={(event) =>
                  handleFieldChange('studyTitle', event.target.value)
                }
                className="mb-3"
              />
              <Input
                label="스터디 종류"
                value={createFormData.studyType}
                onChange={(event) =>
                  handleFieldChange('studyType', event.target.value)
                }
                className="mb-3"
              />
              <div className="flex">
                <Input
                  type="date"
                  label="시작 날짜"
                  value={createFormData.startDate}
                  onChange={(event) =>
                    handleFieldChange('startDate', event.target.value)
                  }
                  className="mr-3"
                />
                <Input
                  type="date"
                  label="종료 날짜"
                  value={createFormData.endDate}
                  onChange={(event) =>
                    handleFieldChange('endDate', event.target.value)
                  }
                  className="ml-3"
                />
              </div>
              <Select
                options={[
                  { label: '온라인', value: 'Online' },
                  { label: '오프라인', value: 'Offline' },
                  { label: '온+오프라인', value: 'Online+Offline' },
                ]}
                placeholder="스터디 진행 방식"
                value={createFormData.studyMethod}
                setValue={(value) =>
                  handleFieldChange('studyMethod', value || '')
                }
                className="mt-3 mb-3"
              />
              <div className="flex">
                <Input
                  label="최대인원"
                  value={createFormData.maxParticipants}
                  onChange={(event) =>
                    handleFieldChange('maxParticipants', event.target.value)
                  }
                  className="mr-3"
                />
                <Select
                  options={[
                    { label: '공개', value: 'On' },
                    { label: '비공개', value: 'Off' },
                  ]}
                  placeholder="모집등록"
                  value={createFormData.recruitmentType}
                  setValue={(value) =>
                    handleFieldChange('recruitmentType', value || '')
                  }
                  className="ml-3"
                />
              </div>
            </div>
            <Input
              label="스터디 소개말"
              value={createFormData.studyIntroduction}
              onChange={(event) =>
                handleFieldChange('studyIntroduction', event.target.value)
              }
              className="mt-3 h-[120px]"
            />
            <div className="flex pt-5 gap-5">
              <Button
                text="닫기"
                blueType="light"
                onClick={closeCreateModal}
                className="text-[14px] h-[47px]"
              />
              <Button
                text="스터디 생성"
                blueType="dark"
                onClick={handleCreateSubmit}
                className="text-[14px] h-[47px]"
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Mypage;
