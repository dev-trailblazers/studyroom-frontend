import { CircleButton, Modal } from '@/components';
import { useModal } from '@/hooks/useModal';

const CreateStudyModal = () => {
  const { openModal, closeModal } = useModal('createStudy');
  const { openModal: openNestedModal, closeModal: closeNestedModal } =
    useModal('nestedModal');

  return (
    <>
      <CircleButton
        type="plus"
        color="blue"
        width="w-[48px]"
        height="h-[48px]"
        iconSize={28}
        ariaLabel="스터디 그룹 생성"
        onClick={openModal}
      />

      <Modal name="createStudy" width="w-[600px]" height="h-[400px]">
        <div className="p-6">
          <h1 className="mb-4 text-2xl font-bold">Create Study Group</h1>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={openNestedModal}
          >
            Open Nested Modal
          </button>
          <button
            className="px-4 py-2 ml-4 text-white bg-red-500 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>

      <Modal name="nestedModal" width="w-[400px]" height="h-[300px]">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-bold">Nested Modal</h2>
          <p>This is a nested modal inside the Create Study Group modal.</p>
          <button
            className="px-4 py-2 ml-4 text-white bg-red-500 rounded"
            onClick={closeNestedModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default CreateStudyModal;
