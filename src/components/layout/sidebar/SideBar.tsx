import { CircleButton, CreateStudyModal } from '@/components';
import { useModal } from '@/hooks/useModal';

const SideBar = () => {
  const { openModal: createStudyModal } = useModal('createStudy');

  const handleOpenModal = () => {
    createStudyModal();
  };

  return (
    <div className="fixed flex flex-col gap-3 bottom-5 right-3">
      <CircleButton
        type="up"
        color="white"
        width="w-[48px]"
        height="h-[48px]"
        iconSize={28}
        ariaLabel="위로 이동"
      />
      <CircleButton
        type="plus"
        color="blue"
        width="w-[48px]"
        height="h-[48px]"
        iconSize={28}
        ariaLabel="스터디 그룹 생성"
        onClick={handleOpenModal}
      />
      <CreateStudyModal />
    </div>
  );
};

export default SideBar;
