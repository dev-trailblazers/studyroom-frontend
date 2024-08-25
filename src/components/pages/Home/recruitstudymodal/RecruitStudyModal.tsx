import { Modal } from '@/components';
import { useModal } from '@/hooks/useModal';

const RecruitStudyModal = () => {
  const { closeModal } = useModal('studyInfoModal');

  return (
    <Modal name="studyInfoModal" width="w-[600px]" height="h-[400px]">
      <div className="relative flex flex-col h-full p-10">
        <h1 className="text-2xl font-medium">리액트 파헤치기</h1>
        <p className="text-lg text-gray_77">
          리액트 완전 정복: API 활용 마스터, 훅 마스터 등등
        </p>
        <p
          className="mt-5 overflow-hidden text-base font-medium"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 7,
          }}
        >
          리액트 딥 다이브 책을 읽으며 발표식으로 스터디를 진행합니다.리액트 딥
          다이브 책을 읽으며 발표식으로 스터디를 진행합니다.리액트 딥 다이브
          책을 읽으며 발표식으로 스터디를 진행합니다.리액트 딥 다이브 책을
          읽으며 발표식으로 스터디를 진행합니다.리액트 딥 다이브 책을 읽으며
          발표식으로 스터디를 진행합니다.리액트 딥 다이브 책을 읽으며 발표식으로
          리액트 딥 다이브 책을 읽으며 발표식으로 스터디를 진행합니다.리액트 딥
          다이브 책을 읽으며 발표식으로 스터디를 진행합니다.리액트 딥 다이브
          책을 읽으며 발표식으로 스터디를 진행합니다.리액트 딥 다이브 책을
          읽으며 발표식으로 스터디를 진행합니다.리액트 딥 다이브 책을 읽으며
          발표식으로 스터디를 진행합니다.리액트 딥 다이브 책을 읽으며 발표식으로
        </p>
        <div className="absolute flex flex-row gap-5 px-4 py-1 flex-nowrap bottom-8 left-6">
          <span className="flex flex-col text-base flex-nowrap text-gray_77">
            방장이름
            <span className="text-black">엄현호</span>
          </span>
          <span className="flex flex-col text-base flex-nowrap text-gray_77">
            모집인원
            <span className="text-black">6</span>
          </span>
        </div>
        <button
          type="button"
          className="absolute px-5 py-2 text-white rounded bottom-10 right-10 bg-primary-700"
          onClick={closeModal}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default RecruitStudyModal;
