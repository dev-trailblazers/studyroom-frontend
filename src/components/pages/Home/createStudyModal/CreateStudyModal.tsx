import { Input, Modal } from '@/components';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';

const CreateStudyModal = () => {
  const { closeModal } = useModal('createStudy');
  const [studyTitle, setStudyTitle] = useState('');
  const [studyGoal, setStudyGoal] = useState('');
  const [studyPersonnel, setStudyPersonnel] = useState('');

  return (
    <Modal
      name="createStudy"
      width="w-[350px]"
      height="h-[550px]"
      closeOnOverlayClick={false}
    >
      <div className="relative flex flex-col h-full p-8 text-center">
        <h1 className="mb-4 text-2xl font-bold">스터디 생성</h1>
        <Input
          id="study-title"
          type="text"
          label="스터디 제목"
          value={studyTitle}
          onChange={(e) => setStudyTitle(e.target.value)}
          className="mb-4"
        />
        <Input
          id="study-Goal"
          type="text"
          label="스터디 목표"
          value={studyGoal}
          onChange={(e) => setStudyGoal(e.target.value)}
          className="mb-4"
        />
        <Input
          id="study-Personnel"
          type="text"
          label="스터디 최대인원"
          value={studyPersonnel}
          onChange={(e) => setStudyPersonnel(e.target.value)}
          className="mb-4"
        />
        <textarea
          className="h-[200px] border rounded border-gray_CC py-2 px-4 text-sm resize-none outline-none focus:border-gray_AA"
          name="study-description"
          id="study-description"
          placeholder="스터디 소개글"
        ></textarea>
        <div className="absolute flex gap-5 font-medium bottom-8 right-14">
          <button
            type="button"
            className="px-10 py-2 border rounded text-primary-700 border-primary-100 bg-primary-100"
            onClick={closeModal}
          >
            닫기
          </button>
          <button
            type="submit"
            className="px-10 py-2 text-white border rounded bg-primary-700 border-primary-700"
          >
            생성
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateStudyModal;
