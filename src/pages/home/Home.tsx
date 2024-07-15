import { useState, useRef, useEffect } from 'react';
import { Button, Input, Select, Modal } from '../../components';
import {
  ViewList,
  inStudyCards,
  recuritStudyCards,
  recuritStudyModal,
  notifications,
} from '../../data';
import { useNavigate } from 'react-router-dom';
import { updateObjectState } from '../../utils';
import { useAuth } from '../../App';
import useApi from '../../apis/useApi';

const IN_STUDY_PAGE = 4;
const RECURIT_PER_PAGE = 12;

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

const recuritStudyInfo = {
  id: 0,
  title: '',
  recurit_st: '',
  recurit_at: '',
  studytype: '',
  studyIntroduce: '',
  maxParticipants: '',
};

const Home = () => {
  const navigate = useNavigate();
  const { get } = useApi();

  const [headerActiveIndex, setHeaderActiveIndex] = useState(0);
  const [recuritButtonActive, setRecuritButtonActive] =
    useState<boolean>(false);
  const [inStudyGroupIndex, setInStudyGroupIndex] = useState(0);
  const totalGroups = Math.ceil(inStudyCards.length / IN_STUDY_PAGE);
  const [recuritPage, setRecuritPage] = useState(1);
  const indexOfLastItem = recuritPage * RECURIT_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - RECURIT_PER_PAGE;
  const currentItems = recuritStudyCards.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const [select, setSelect] = useState('');
  const [studySearch, setStudySearch] = useState('');
  const [modals, setModals] = useState({
    isLogoutModalOpen: false,
    isCreateModalOpen: false,
    isStudyModalOpen: false,
    studyModalData: recuritStudyInfo,
  });
  const [createFormData, setCreateFormData] = useState(createStudyInfo);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // 오늘 날짜 가져오는 함수
  useEffect(() => {
    // 페이지가 활성화될 때 실행될 함수
    const loadData = async () => {
      try {
        const recruitingStudies = await fetchRecruitingStudies();
        console.log('Recruiting studies:', recruitingStudies);
        // 여기서 데이터를 사용하여 UI를 업데이트하거나 처리
      } catch (error) {
        // 오류 처리
        console.log(error);
      }
    };

    // 페이지가 활성화될 때 실행될 함수 호출
    loadData();

    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // []를 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  // 아코디언 창의 높이를 열고 닫는 효과를 적용하는 useEffect
  useEffect(() => {
    accordionRef.current !== null &&
      (accordionRef.current.style.height = isAccordionOpen
        ? `${accordionRef.current.scrollHeight}px`
        : '0');
  }, [isAccordionOpen]);

  const fetchRecruitingStudies = async () => {
    try {
      const response = await get({
        params: '/study/list/recruiting?page=0&size=10&sort=createdAt',
        headers: {
          Accept: '*/*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': 'http://localhost:5173',
        },
      });
      const data = await response.json();

      return data;
    } catch (error: any) {
      console.error('Error fetching recruiting studies:', error.message);
      throw error;
    }
  };

  // 모달 상태관리
  const openLogoutModal = () => {
    updateObjectState(setModals, { isLogoutModalOpen: true });
  };

  const openCreateModal = () => {
    updateObjectState(setModals, { isCreateModalOpen: true });
  };
  const openStudyModal = (id: number) => {
    const studyData = recuritStudyModal.find((item) => item.id === id);

    if (studyData) {
      updateObjectState(setModals, {
        isStudyModalOpen: true,
        studyModalData: studyData,
      });
    }
  };

  const closeLogoutModal = () => {
    updateObjectState(setModals, { isLogoutModalOpen: false });
  };

  const closeCreateModal = () => {
    updateObjectState(setModals, { isCreateModalOpen: false });
  };

  const closeStudyModal = () => {
    updateObjectState(setModals, {
      isStudyModalOpen: false,
      studyModalData: recuritStudyInfo,
    });
  };

  // 스터디 생성 모달 필드 관리 함수
  const handleFieldChange = (fieldName: string, value: string) => {
    updateObjectState(setCreateFormData, { [fieldName]: value });
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

  // 모집중인 스터디 페이지 변경 함수
  const paginate = (pageNumber: number) => setRecuritPage(pageNumber);

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

  const onSignOut = async () => {
    try {
      const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
      const response = await fetch(
        // 'https://kauth.kakao.com/oauth/logout' +
        //   'client_id=' +
        //   KAKAO_API_KEY +
        `https://kauth.kakao.com/oauth/logout?client_id=${KAKAO_API_KEY}&logout_redirect_uri=http://localhost:8080/logout`
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-10 pl-10 pr-[50px] lg:pl-20 lg:pr-[90px] flex flex-col gap-10">
        {/* logout Section */}
        <div className="flex absolute top-0 right-4 lg:right-14 pt-4 pr-5">
          <span className="text-[12px] text-gray-400">엄현호님ㅤ|ㅤ</span>
          <button className="text-[12px] text-gray-400" onClick={onSignOut}>
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
              className="absolute z-50 top-[85px] w-[250px] md:top-[100px] md:w-[400px] lg:top-[110px] lg:w-[500px] bg-white rounded-[10px] shadow-box_03 transition-all duration-300"
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
                inStudyGroupIndex * IN_STUDY_PAGE,
                (inStudyGroupIndex + 1) * IN_STUDY_PAGE
              )
              .map((element) => (
                <div
                  key={element.id}
                  className="p-5 h-[200px] lg:h-[200px] bg-white rounded-[20px] shadow-box_03 cursor-pointer transition duration-300 transform hover:scale-105"
                >
                  <div className="flex mb-3 justify-between font-semibold">
                    <span>{element.title}</span>
                    {+element.Day <= 5 ? (
                      <span className="text-red-500">D-{element.Day}</span>
                    ) : (
                      <span>D-{element.Day}</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 text-[14px] font-semibold">
                    <span className=" text-gray-500">공지사항</span>
                    <span className="block text-[13px]">
                      {element.Notice
                        ? element.Notice
                        : '공지된 글이 없습니다.'}
                    </span>
                  </div>
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
            {currentItems.map((element) => (
              <div
                key={element.id}
                className={`p-5 bg-white rounded-[20px] shadow-box_03 transition duration-300 transform hover:scale-105 ${
                  new Date(element.recurit_at) < currentDate
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onClick={() => openStudyModal(element.id)}
              >
                {/* Card Content */}
                <div className="flex items-center justify-between mb-1 font-semibold">
                  <span>{element.title}</span>
                  <span className="text-[14px]">{element.recurit_at}</span>
                </div>
                <div className="flex flex-col gap-7">
                  <span className="w-fit text-[12px] text-gray-500 font-semibold">
                    {element.studytype}
                  </span>
                  <span className="text-[14px] font-semibold">
                    {element.studyIntroduce.length > 50
                      ? `${element.studyIntroduce.slice(0, 50)}...`
                      : element.studyIntroduce}
                  </span>
                  <div className="flex items-center justify-between text-[14px] font-semibold">
                    <span>👑 {element.admin}</span>
                    <span>👥 {element.maxParticipants}명</span>
                  </div>
                </div>
              </div>
            ))}
            <Modal
              isOpen={modals.isStudyModalOpen}
              onClose={closeStudyModal}
              title={modals.studyModalData.title}
              width={500}
              height={600}
              closeOnBackdropClick={false}
              exitIcon={true}
              animation={true}
            >
              <div className="grid grid-cols-2 gap-5">
                <div className="flex items-center gap-5 text-[18px] font-medium">
                  <span className="text-main">스터디 종류</span>
                  <span className="font-semibold text-[15px]">
                    {modals.studyModalData.studytype}
                  </span>
                </div>
                <div className="flex items-center gap-5 text-[18px] font-medium">
                  <span className="text-main">스터디 인원</span>
                  <span className="font-semibold text-[15px]">
                    {modals.studyModalData.maxParticipants}
                  </span>
                </div>
                <div className="flex items-center gap-5 text-[18px] font-medium">
                  <span className="text-main">스터디 시작</span>
                  <span className="font-semibold text-[15px]">
                    {modals.studyModalData.recurit_st}
                  </span>
                </div>
                <div className="flex items-center gap-5 text-[18px] font-medium">
                  <span className="text-main ">스터디 종료</span>
                  <span className="font-semibold text-[15px]">
                    {modals.studyModalData.recurit_at}
                  </span>
                </div>
                <div className="flex flex-col gap-1 h-[340px] col-span-2 text-[18px] font-medium">
                  <span className="text-main">스터디 소개</span>
                  <span className="block font-semibold text-[15px]">
                    {modals.studyModalData.studyIntroduce}
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  text="닫기"
                  blueType="light"
                  onClick={closeStudyModal}
                  className="text-[14px] h-[47px] mr-2"
                />
                <Button
                  text="신청"
                  blueType="dark"
                  onClick={() => {
                    alert('준비중');
                    return;
                  }}
                  className="text-[14px] h-[47px] ml-2"
                />
              </div>
            </Modal>
          </div>
          {/* Pagination Button */}
          <div className="flex justify-center mt-4">
            <button
              className="mx-1 px-3 py-1"
              onClick={() => paginate(recuritPage - 1)}
              disabled={recuritPage === 1}
            >
              &lt;
            </button>
            {Array.from(
              {
                length: Math.ceil(recuritStudyCards.length / RECURIT_PER_PAGE),
              },
              (_, i) => (
                <button
                  key={i}
                  className={`mx-1 px-3 py-1 rounded-lg ${recuritPage === i + 1 ? 'bg-main text-white shadow-box_03' : 'bg-white shadow-box_01'}`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              )
            )}
            <button
              className="mx-1 px-3 py-1"
              onClick={() => paginate(recuritPage + 1)}
              disabled={
                recuritPage ===
                Math.ceil(recuritStudyCards.length / RECURIT_PER_PAGE)
              }
            >
              &gt;
            </button>
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
