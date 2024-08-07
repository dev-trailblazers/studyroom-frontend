import { CircleButton, CreateStudyModal } from '@/components';

const SideBar = () => {
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
      <CreateStudyModal />
    </div>
  );
};

export default SideBar;
