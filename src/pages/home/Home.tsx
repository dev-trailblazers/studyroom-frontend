import { useState } from 'react';
import { Button, Input, Select, Modal } from '../../components';
import { ViewList } from '../../data/ViewList';
import { inStudyCards } from '../../data/inStudyCards';
import { recuritStudyCards } from '../../data/recuritStudyCards';
import { useNavigate } from 'react-router-dom';

const inStudyPage = 4;

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

const Home = () => {
  const navigate = useNavigate();
  const [headerActiveIndex, setHeaderActiveIndex] = useState(0);
  const [recuritButtonActive, setRecuritButtonActive] =
    useState<boolean>(false);
  const [inStudyGroupIndex, setInStudyGroupIndex] = useState(0);
  const totalGroups = Math.ceil(inStudyCards.length / inStudyPage);
  const [select, setSelect] = useState('');
  const [studySearch, setStudySearch] = useState('');
  const [modals, setModals] = useState({
    isLogoutModalOpen: false,
    isCreateModalOpen: false,
  });
  const [createFormData, setCreateFormData] = useState(createStudyInfo);

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
  };

  // 참여 중인 스터디 페이지 이전 클릭
  const handlePreviousClick = () => {
    setInStudyGroupIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // 참여 중인 스터디 페이지 다음 클릭
  const handleNextClick = () => {
    setInStudyGroupIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalGroups - 1)
    );
  };

  // (전체 / 모집중) 스터디 확인 버튼
  const onRecuritButton = () => {
    setRecuritButtonActive(!recuritButtonActive);
  };

  // 키 입력 이벤트 함수
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      alert(studySearch);
    }
  };

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
          <h1 className="text-[28px] md:text-[44px] lg:text-[54px] font-semibold text-blue_01">
            StudyRoom
          </h1>
          <div className="w-[250px] h-[45px] md:w-[400px] lg:w-[500px] md:h-[50px] lg:h-[60px] flex justify-between items-center bg-blue_02 border rounded-[10px]">
            {['홈', '공지사항', '알림', '내정보'].map((label, index) => (
              <div
                key={label}
                className={`flex-1 flex items-center justify-center cursor-pointer font-semibold transition duration-300 transform hover:scale-105 ${
                  headerActiveIndex === index
                    ? 'text-blue_01 text-[14px] md:text-[18px] lg:text-[20px] font-bold'
                    : 'text-white text-[12px] md:text-[16px] lg:text-[18px]'
                }`}
                onClick={() => handleHeaderClick(index)}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        {/* inStudy Section*/}
        <div className="pt-5 pr-5 pl-5 flex flex-col rounded-[15px] bg-main shadow-box_03">
          {/* inStudy Header Section*/}
          <div className="flex justify-between items-center">
            <h1 className="text-[18px] lg:text-[24px] text-white font-semibold">
              참여중인 스터디
            </h1>
            <div className="flex ml-auto lg:ml-0 text-center gap-5 items-center">
              <button
                onClick={handlePreviousClick}
                disabled={inStudyGroupIndex === 0}
                className={`w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] font-semibold bg-white text-blue_01 rounded-[50%] shadow-box_03 flex justify-center items-center transition duration-300 transform hover:scale-105 ${
                  inStudyGroupIndex === 0 ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                &lt;
              </button>
              <button
                onClick={handleNextClick}
                disabled={inStudyGroupIndex === totalGroups - 1}
                className={`w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] font-semibold bg-white text-blue_01 rounded-[50%] shadow-box_03 flex justify-center items-center transition duration-300 transform hover:scale-105 ${
                  inStudyGroupIndex === totalGroups - 1
                    ? 'opacity-70 cursor-not-allowed'
                    : ''
                }`}
              >
                &gt;
              </button>
            </div>
          </div>
          {/* inStudy Card Section */}
          <div className="pt-5 pb-5 grid gap-5 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
            {inStudyCards
              .slice(
                inStudyGroupIndex * inStudyPage,
                (inStudyGroupIndex + 1) * inStudyPage
              )
              .map((element) => (
                <div
                  key={element.id}
                  className="flex h-[200px] lg:h-[200px] bg-white rounded-[20px] shadow-box_03 justify-center items-center"
                >
                  {element.name}
                </div>
              ))}
          </div>
        </div>
        {/* recruitStudy Section*/}
        <div className="py-5 pl-5 pr-5 flex flex-col rounded-[15px] bg-blue_05 shadow-box_03">
          {/* recruitStudy Header Section*/}
          <div className="flex lg_max:flex-col justify-between items-center">
            <h1 className="text-[24px] lg_max:pb-3 text-main font-semibold">
              모집중인 스터디
            </h1>
            <div className="flex gap-5 items-center">
              <div>
                <Select
                  options={ViewList}
                  placeholder="조회 순"
                  value={select}
                  setValue={(value) => setSelect(value ?? '')}
                  className="sm_max:w-[100px] md:w-[200px]"
                />
              </div>
              <Button
                text={recuritButtonActive ? '모집중 스터디' : '전체 스터디'}
                className={`sm_max:w-[100px] md:w-[200px] h-[40px] border border-blue_02 border-solid rounded-[10px] text-[12px] font-semibold ${
                  recuritButtonActive
                    ? 'bg-main text-white'
                    : 'bg-white text-blue_02 '
                }`}
                onClick={onRecuritButton}
              />
              <div>
                <Input
                  label="스터디 검색"
                  value={studySearch}
                  onChange={(event) => {
                    setStudySearch(event.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                  className="sm_max:w-[120px] md:w-[200px]"
                />
              </div>
            </div>
          </div>
          {/* recruitStudy Card Section*/}
          <div className="pt-5 pb-5 grid gap-5 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
            {recuritStudyCards.map((element) => (
              <div
                key={element.id}
                className="h-[200px] bg-white rounded-[20px] flex justify-center items-center shadow-box_03"
              >
                {element.name}
              </div>
            ))}
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

export default Home;
