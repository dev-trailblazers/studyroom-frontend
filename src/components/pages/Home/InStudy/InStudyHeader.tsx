import { CircleButton } from '@/components/index';

const InStudyHeader = () => {
  return (
    <header className="flex items-center justify-between" id="in-study-header">
      <h1 className="text-3xl font-medium text-blue_05">참여중인 스터디</h1>
      <div className="flex flex-row gap-5 flex-nowrap">
        <CircleButton
          type="left"
          width="w-[40px]"
          height="h-[40px]"
          color="white"
          ariaLabel="이전 페이지 이동"
        />
        <CircleButton
          type="right"
          width="w-[40px]"
          height="h-[40px]"
          color="white"
          ariaLabel="다음 페이지 이동"
        />
      </div>
    </header>
  );
};

export default InStudyHeader;
