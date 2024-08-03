import { useState, useRef, useEffect } from 'react';
import { Button, Input, Select, Modal } from '../../components';
import { ViewList } from '../../data/ViewList';
import { notifications } from '../../data/Notifications';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const inStudyPage = 4;
const recuritPerPage = 12;

const createStudyInfo = {
  name: '',
  type: '',
  startDate: '',
  endDate: '',
  headcount: '',
  introduction: '',
  isRecruit: '',
};

interface inStudy {
  endDate: string;
  id: number;
  name: string;
  noticeArticle: string;
  noticeId: number;
  type: string;
}

interface recruitStudy {
  totalCount: number;
  startDate: string;
  headcount: number;
  introduction: string;
  id: number;
  name: string;
  type: string;
  leaderName: string;
}

interface recruitStudyModal {
  id: number;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  headcount: number;
  introduction: string;
  isRecruit: boolean;
}

interface modal {
  isLogoutModalOpen: boolean;
  isCreateModalOpen: boolean;
  isStudyModalOpen: boolean;
  studyModalData: recruitStudyModal | null;
}

const modalInfo = {
  isLogoutModalOpen: false,
  isCreateModalOpen: false,
  isStudyModalOpen: false,
  studyModalData: null,
};

const Main = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [headerActiveIndex, setHeaderActiveIndex] = useState(0);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const accordionRef = useRef<HTMLDivElement>(null);

  const [inStudies, setInStudies] = useState<inStudy[]>([]);
  const [inStudyGroupIndex, setInStudyGroupIndex] = useState(0);
  const totalGroups = Math.ceil(inStudies.length / inStudyPage);

  const [recuritButtonActive, setRecuritButtonActive] =
    useState<boolean>(false);
  const [recruitingStudies, setRecruitingStudies] = useState<recruitStudy[]>(
    []
  );
  const [recuritPage, setRecuritPage] = useState(1);
  const indexOfLastItem = recuritPage * recuritPerPage;
  const indexOfFirstItem = indexOfLastItem - recuritPerPage;
  const currentItems = recruitingStudies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const [select, setSelect] = useState('');
  const [studySearch, setStudySearch] = useState('');
  const [modals, setModals] = useState<modal>(modalInfo);
  const [createFormData, setCreateFormData] = useState(createStudyInfo);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [cookies, setCookie, removeCookie] = useCookies(['accesstoken']);

  // 토큰 가져와서 디코드 하는 함수
  useEffect(() => {
    const checkAuthentication = () => {
      const token = cookies.accesstoken;
      if (token) {
        try {
          const payload = token.split('.')[1]; // payload 부분만 추출
          const decodingInfo = JSON.parse(
            decodeURIComponent(escape(atob(payload)))
          ); // URL 디코딩 후 JSON 형식으로 파싱 이렇게 해야지 한글이 안 깨짐
          setUserName(decodingInfo.name);
        } catch (error: any) {
          console.error('Error decoding token:', error.message);
        }
      } else {
        console.log('No access token found in cookies');
      }
    };

    checkAuthentication();
  }, [cookies.accesstoken]);

  // 오늘 날짜 가져오기
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  // 참여중 스터디 데이터 요청 및 상태 업데이트
  useEffect(() => {
    const inStudies = async () => {
      try {
        const response = await fetch('/api/study/list/participation?size=5', {
          method: 'GET',
          headers: {
            // Authorization: `Bearer ${cookies.accesstoken}`, 이제 없어도 됨.
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recruiting studies');
        }
        const data = await response.json();
        setInStudies(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error fetching recruiting studies:', error.message);
      }
    };

    inStudies();
  }, []);

  // 모집중 스터디 데이터 요청 및 상태 업데이트
  useEffect(() => {
    const recruitingStudies = async () => {
      try {
        const response = await fetch(
          '/api/study/list/recruiting?size=21&sort=startDate,desc'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch recruiting studies');
        }
        const data = await response.json();
        setRecruitingStudies(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error fetching recruiting studies:', error.message);
      }
    };

    recruitingStudies();
  }, []);

  // 아코디언 창의 높이를 열고 닫는 효과를 적용하는 useEffect
  useEffect(() => {
    accordionRef.current !== null &&
      (accordionRef.current.style.height = isAccordionOpen
        ? `${accordionRef.current.scrollHeight}px`
        : '0');
  }, [isAccordionOpen]);

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
  const openStudyModal = async (studyid: number) => {
    try {
      const response = await fetch(`/api/study/detail/${studyid}`);
      if (!response.ok) {
        throw new Error('Failed to fetch recruiting studies modal data');
      }
      const studyData: recruitStudyModal = await response.json();

      setModals((prevModals) => ({
        ...prevModals,
        isStudyModalOpen: true,
        studyModalData: studyData,
      }));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        'Error fetching recruiting studies modal data:',
        error.message
      );
    }
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
  const closeStudyModal = () => {
    setModals((prevModals) => ({
      ...prevModals,
      isStudyModalOpen: false,
      studyModalData: null,
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
  const handleCreateSubmit = async () => {
    const headcountNumber = parseInt(createFormData.headcount);
    const isRecruitBoolean = createFormData.isRecruit === 'On';

    const formData = {
      ...createFormData,
      headcount: headcountNumber,
      isRecruit: isRecruitBoolean,
    };

    try {
      const response = await fetch('/api/study/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response:', await response.json());

      closeCreateModal();
    } catch (error) {
      console.error('Error creating study:', error);
    }
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

  return (
    <>
      <div className="min-h-screen pt-10 pl-10 pr-[50px] lg:pl-20 lg:pr-[90px] flex flex-col gap-10">
        {/* logout Section */}
        <div className="absolute top-0 flex pt-4 pr-5 right-4 lg:right-14">
          <span className="text-[12px] text-gray-400">{userName}님ㅤ|ㅤ</span>
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
              <div className="flex gap-5 pt-5">
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
          <div className="flex items-center justify-between">
            <h1 className="text-[18px] lg:text-[24px] text-white font-semibold">
              참여중인 스터디
            </h1>
            <div className="flex items-center gap-5 ml-auto text-center lg:ml-0">
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
          <div className="grid gap-5 pt-5 pb-5 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
            {inStudies.length === 0 ? (
              <div className="flex items-center justify-center w-full col-span-4">
                <span className="text-[28px] text-center text-white">
                  현재 참여 중인 스터디가 없습니다. <br />
                  다양한 스터디에 참가 해보세요 !
                </span>
              </div>
            ) : (
              inStudies
                .slice(
                  inStudyGroupIndex * inStudyPage,
                  (inStudyGroupIndex + 1) * inStudyPage
                )
                .map((element) => (
                  <div
                    key={element.id}
                    className="p-5 h-[200px] lg:h-[200px] bg-white rounded-[20px] shadow-box_03 cursor-pointer transition duration-300 transform hover:scale-105"
                  >
                    <div className="flex justify-between mb-3 font-semibold">
                      <span>{element.name}</span>
                      {+element.endDate <= 5 ? (
                        <span className="text-red-500">
                          D-
                          {Math.ceil(
                            (+new Date(element.endDate) - +currentDate) /
                              (1000 * 60 * 60 * 24)
                          )}
                        </span>
                      ) : (
                        <span>
                          D-
                          {Math.ceil(
                            (+new Date(element.endDate) - +currentDate) /
                              (1000 * 60 * 60 * 24)
                          )}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-1 text-[14px] font-semibold">
                      <span className="text-gray-500 ">공지사항</span>
                      <span className="block text-[13px]">
                        {element.noticeArticle
                          ? element.noticeArticle
                          : '공지된 글이 없습니다.'}
                      </span>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
        {/* recruitStudy Section*/}
        <div className="py-5 pl-5 pr-5 flex flex-col rounded-[15px] bg-blue_05 shadow-box_03">
          {/* recruitStudy Header Section*/}
          <div className="flex items-center justify-between lg_max:flex-col">
            <h1 className="text-[24px] lg_max:pb-3 text-main font-semibold">
              모집중인 스터디
            </h1>
            <div className="flex items-center gap-5">
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
          <div className="grid gap-5 pt-5 pb-5 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4">
            {currentItems.map((element) => (
              <div
                key={element.id}
                className={`p-5 bg-white rounded-[20px] shadow-box_03 transition duration-300 transform hover:scale-105 ${
                  new Date(element.startDate) < currentDate
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                onClick={() => openStudyModal(element.id)}
              >
                {/* Card Content */}
                <div className="flex items-center justify-between mb-1 font-semibold">
                  <span className="text-sm truncate">{element.name}</span>
                  <span className="text-[14px]">{element.startDate}</span>
                </div>
                <div className="flex flex-col gap-7">
                  <span className="w-fit text-[12px] text-gray-500 font-semibold">
                    {element.type}
                  </span>
                  <span className="text-[14px] min-h-[42px] font-semibold">
                    {element.introduction.length > 40
                      ? `${element.introduction.slice(0, 40)}...`
                      : element.introduction}
                  </span>
                  <div className="flex items-center justify-between text-[14px] font-semibold">
                    <span>👑 {element.leaderName}</span>
                    <span>👥 {element.headcount}명</span>
                  </div>
                </div>
              </div>
            ))}
            {modals.studyModalData ? (
              <Modal
                isOpen={modals.isStudyModalOpen}
                onClose={closeStudyModal}
                title={modals.studyModalData.name}
                width={500}
                height={520}
                closeOnBackdropClick={false}
                exitIcon={true}
                animation={true}
              >
                <div className="grid grid-cols-2 gap-5">
                  <div className="flex items-center gap-5 text-[18px] font-medium">
                    <span className="text-main">스터디 종류</span>
                    <span className="turncate text-sm font-semibold text-[15px]">
                      {modals.studyModalData.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-5 text-[18px] font-medium">
                    <span className="text-main">스터디 인원</span>
                    <span className="font-semibold text-[15px]">
                      {modals.studyModalData.headcount}
                    </span>
                  </div>
                  <div className="flex items-center gap-5 text-[18px] font-medium">
                    <span className="text-main">스터디 시작</span>
                    <span className="font-semibold text-[15px]">
                      {modals.studyModalData.startDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-5 text-[18px] font-medium">
                    <span className="text-main ">스터디 종료</span>
                    <span className="font-semibold text-[15px]">
                      {modals.studyModalData.endDate}
                    </span>
                  </div>
                  <div className="flex flex-col min-h-[256px] gap-1 col-span-2 text-[18px] font-medium">
                    <span className="text-main">스터디 소개</span>
                    <span className="block font-semibold text-[15px] whitespace-pre-wrap">
                      {modals.studyModalData.introduction}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
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
            ) : null}
          </div>
          {/* Pagination Button */}
          <div className="flex justify-center mt-4">
            <button
              className="px-3 py-1 mx-1"
              onClick={() => paginate(recuritPage - 1)}
              disabled={recuritPage === 1}
            >
              &lt;
            </button>
            {Array.from(
              { length: Math.ceil(recruitingStudies.length / recuritPerPage) },
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
              className="px-3 py-1 mx-1"
              onClick={() => paginate(recuritPage + 1)}
              disabled={
                recuritPage ===
                Math.ceil(recruitingStudies.length / recuritPerPage)
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
      <div className="fixed flex flex-col gap-3 bottom-5 right-3">
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
                value={createFormData.name}
                onChange={(event) =>
                  handleFieldChange('name', event.target.value)
                }
                className="mb-3"
              />
              <Input
                label="스터디 종류"
                value={createFormData.type}
                onChange={(event) =>
                  handleFieldChange('type', event.target.value)
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
              <div className="flex mt-3 mb-3">
                <Input
                  label="최대인원"
                  value={createFormData.headcount}
                  onChange={(event) =>
                    handleFieldChange('headcount', event.target.value)
                  }
                  className="mr-3"
                />
                <Select
                  options={[
                    { label: '공개', value: 'On' },
                    { label: '비공개', value: 'Off' },
                  ]}
                  placeholder="모집등록"
                  value={createFormData.isRecruit}
                  setValue={(value) =>
                    handleFieldChange('isRecruit', value || '')
                  }
                  className="ml-3"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-left text-[12px] text-gray-400">
                스터디 소개글
              </span>
              <textarea
                value={createFormData.introduction}
                onChange={(event) =>
                  handleFieldChange('introduction', event.target.value)
                }
                maxLength={300}
                className="p-2 h-[120px] w-full text-[13px] resize-none outline-none rounded-[10px] border-[0.5px] border-gray-400"
                placeholder="스터디에 대한 소개를 작성해주세요."
              />
              <div className="flex justify-end">
                <span className="text-[12px] text-gray-400">
                  {createFormData.introduction.length}/300
                </span>
              </div>
            </div>
            {/* <Input
              label="스터디 소개말"
              value={createFormData.introduction}
              onChange={(event) =>
                handleFieldChange('introduction', event.target.value)
              }
              className="mt-3 h-[120px] resize-none"
            /> 
            Input 멀티라인이 지원이 안돼서 textarea 태그로 변경*/}
            <div className="flex gap-5 pt-5">
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

export default Main;
