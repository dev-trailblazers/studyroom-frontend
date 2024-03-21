import { useState } from 'react';
import { Input, Select } from '../../components';
import { ViewList } from '../../data/ViewList';

const inStudyPage = 4;
const inStudyCards = [
  { id: 1, name: 'Element 1' },
  { id: 2, name: 'Element 2' },
  { id: 3, name: 'Element 3' },
  { id: 4, name: 'Element 4' },
  { id: 5, name: 'Element 5' },
  { id: 6, name: 'Element 6' },
  { id: 7, name: 'Element 7' },
  { id: 8, name: 'Element 8' },
  { id: 9, name: 'Element 9' },
  { id: 10, name: 'Element 10' },
];

const recuritCards = [
  { id: 1, name: 'Element 1' },
  { id: 2, name: 'Element 2' },
  { id: 3, name: 'Element 3' },
  { id: 4, name: 'Element 4' },
  { id: 5, name: 'Element 5' },
  { id: 6, name: 'Element 6' },
  { id: 7, name: 'Element 7' },
  { id: 8, name: 'Element 8' },
  { id: 9, name: 'Element 9' },
  { id: 10, name: 'Element 10' },
  { id: 11, name: 'Element 11' },
  { id: 12, name: 'Element 12' },
  { id: 13, name: 'Element 13' },
  { id: 14, name: 'Element 14' },
  { id: 15, name: 'Element 15' },
  { id: 16, name: 'Element 16' },
];

const Home = () => {
  const [headerActiveIndex, setHeaderActiveIndex] = useState(0);
  const [recuritButtonActive, setRecuritButtonActive] =
    useState<boolean>(false);
  const [inStudyGroupIndex, setInStudyGroupIndex] = useState(0);
  const totalGroups = Math.ceil(inStudyCards.length / inStudyPage);
  const [select, setSelect] = useState('');
  const [studySearch, setStudySearch] = useState('');

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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      alert(studySearch);
      console.log('Enter');
    }
  };

  // 상단으로 스크롤 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="min-h-screen pt-10 pl-20 pr-20 flex flex-col gap-10">
        {/* logout Section */}
        <div className="flex absolute top-0 right-12 pt-4 pr-5">
          <span className="text-[12px] text-gray-400">엄현호님ㅤ|ㅤ</span>
          <button className="text-[12px] text-gray-400">로그아웃</button>
        </div>
        {/* header Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-[54px] font-semibold text-blue_01">StudyRoom</h1>
          <div className="w-[500px] h-[60px] flex justify-between items-center bg-blue_02 border rounded-[10px] ml-auto">
            {['홈', '스터디', '공지사항', '내정보'].map((label, index) => (
              <div
                key={label}
                className={`flex-1 flex items-center justify-center cursor-pointer font-semibold transition duration-300 transform hover:scale-105 ${
                  headerActiveIndex === index
                    ? 'text-blue_01 text-[18px] font-bold'
                    : 'text-white'
                }`}
                onClick={() => handleHeaderClick(index)}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        {/* inStudy Section*/}
        <div className="pt-5 pl-5 pr-5 flex flex-col h-[300px] rounded-[15px] bg-main shadow-box_03">
          {/* inStudy Header Section*/}
          <div className="flex justify-between items-center">
            <h1 className="text-[24px] text-white font-semibold">
              참여중인 스터디
            </h1>
            <div className="flex ml-auto text-center gap-5 items-center">
              <button
                onClick={handlePreviousClick}
                disabled={inStudyGroupIndex === 0}
                className={`w-[40px] h-[40px] font-semibold bg-white text-blue_01 rounded-[50px] shadow-box_03 flex justify-center items-center transition duration-300 transform hover:scale-105 ${
                  inStudyGroupIndex === 0 ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                &lt;
              </button>
              <button
                onClick={handleNextClick}
                disabled={inStudyGroupIndex === totalGroups - 1}
                className={`w-[40px] h-[40px] font-semibold bg-white text-blue_01 rounded-[50px] shadow-box_03 flex justify-center items-center transition duration-300 transform hover:scale-105 ${
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
          <div className="pt-5 flex gap-10">
            {inStudyCards
              .slice(
                inStudyGroupIndex * inStudyPage,
                (inStudyGroupIndex + 1) * inStudyPage
              )
              .map((element) => (
                <div
                  key={element.id}
                  className="w-[280px] h-[200px] bg-white rounded-[20px] shadow-box_03 flex justify-center items-center"
                >
                  {element.name}
                </div>
              ))}
          </div>
        </div>
        {/* recruitStudy Section*/}
        <div className=" pt-5 pl-5 pr-5 flex flex-col h-[1100px] rounded-[15px] bg-blue_05 shadow-box_03">
          {/* recruitStudy Header Section*/}
          <div className="flex justify-between items-center">
            <h1 className="text-[24px] text-main font-semibold">
              모집중인 스터디
            </h1>
            <div className="flex flex-grow gap-5 items-center">
              <div className="ml-auto">
                <Select
                  options={ViewList}
                  placeholder="조회 순"
                  value={select}
                  setValue={(value) => setSelect(value ?? '')}
                />
              </div>
              <button
                className={`w-[200px] h-[40px] border border-blue_02 border-solid rounded-[10px] text-[12px] font-semibold ${
                  recuritButtonActive
                    ? 'bg-main text-white'
                    : 'bg-white text-blue_02 '
                }`}
                onClick={onRecuritButton}
              >
                {recuritButtonActive ? '모집중 스터디' : '전체 스터디'}
              </button>
              <div className="w-1/4">
                <Input
                  label="스터디 검색"
                  value={studySearch}
                  onChange={(event) => {
                    setStudySearch(event.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
          </div>
          {/* recruitStudy Card Section*/}
          <div className="pt-5 flex flex-wrap gap-10">
            {recuritCards.map((element) => (
              <div
                key={element.id}
                className="w-[280px] h-[200px] bg-white rounded-[20px] flex justify-center items-center shadow-box_03"
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
      {/* fixed Butto Section*/}
      <div className="flex flex-col fixed bottom-5 right-3 gap-3 ">
        <button
          className="bg-white text-blue_01 font-bold w-[40px] h-[40px] rounded-full shadow-box_03 transition duration-300 transform hover:scale-105"
          onClick={scrollToTop}
        >
          &uarr;
        </button>
        <button className="bg-blue_01 text-white font-bold w-[40px] h-[40px] rounded-full shadow-box_03 transition duration-300 transform hover:scale-105">
          +
        </button>
      </div>
    </>
  );
};

export default Home;
