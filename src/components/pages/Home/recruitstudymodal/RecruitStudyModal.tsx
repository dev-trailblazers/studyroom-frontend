import { Modal } from '@/components';
import { useModal } from '@/hooks/useModal';

const RecruitStudyModal = () => {
  const { closeModal } = useModal('studyInfoModal');

  return (
    <Modal
      name="studyInfoModal"
      width="w-[600px]"
      height="h-[400px]"
      closeOnOverlayClick={false}
    >
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold">Create Study Group</h1>
        <button
          className="px-4 py-2 ml-4 text-white bg-red-500 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default RecruitStudyModal;
