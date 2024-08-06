import { Select, Button, Input } from '@/components/index';
import { useState } from 'react';

const RecruitStudyHeader = () => {
  const [select, setSelect] = useState('');
  const [studySearch, setStudySearch] = useState('');
  const [recruitButtonActive, setRecruitButtonActive] = useState(false);

  const ViewList = [
    { label: '높은 순', value: 'High' },
    { label: '낮은 순', value: 'Low' },
  ];

  const handleRecruitButton = () => {
    setRecruitButtonActive(!recruitButtonActive);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      alert(studySearch);
    }
  };

  return (
    <header
      className="flex items-center justify-between w-full"
      id="recruit-study-header"
    >
      <h1 className="w-full text-3xl font-medium text-primary-600">
        모집중인 스터디
      </h1>
      <nav className="flex justify-end w-full gap-5">
        <Select
          options={ViewList}
          placeholder="조회 순"
          value={select}
          setValue={(value) => setSelect(value ?? '')}
          className="!w-[190px]"
        />
        <Button
          text={recruitButtonActive ? '모집중 스터디' : '전체 스터디'}
          className={`!w-[190px] h-10 border border-primary-600 border-solid rounded-md text-sm font-medium ${
            recruitButtonActive
              ? 'bg-primary-800 text-white border-primary-800'
              : 'bg-white text-primary-600'
          }`}
          onClick={handleRecruitButton}
        />
        <Input
          label="스터디 검색"
          value={studySearch}
          onChange={(event) => {
            setStudySearch(event.target.value);
          }}
          onKeyPress={handleKeyPress}
          className="!w-[190px]"
        />
      </nav>
    </header>
  );
};

export default RecruitStudyHeader;
