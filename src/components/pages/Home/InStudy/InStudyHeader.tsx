import { ChevronRight, ChevronLeft } from 'lucide-react';

const InStudyHeader = () => {
  return (
    <header className="flex items-center justify-between" id="in-study-header">
      <h1 className="text-3xl font-semibold text-blue_05">참여중인 스터디</h1>
      <div className="flex flex-row gap-5 flex-nowrap">
        <button
          className={`w-10 h-10 font-semibold bg-white rounded-full shadow-box_03 flex justify-center items-center transition duration-300 hover:scale-95`}
          aria-label="이전 페이지 이동"
        >
          <ChevronLeft color="#2E4563" />
        </button>
        <button
          className={`w-10 h-10 font-semibold bg-white rounded-full shadow-box_03 flex justify-center items-center transition duration-300 hover:scale-95`}
          aria-label="다음 페이지 이동"
        >
          <ChevronRight color="#2E4563" />
        </button>
      </div>
    </header>
  );
};

export default InStudyHeader;
