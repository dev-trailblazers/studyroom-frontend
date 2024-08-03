import { Select, Button, Input } from '@components/index';
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
      className="flex items-center justify-between"
      id="recruit-study-header"
    >
      <h1 className="text-3xl font-semibold text-main">모집중인 스터디</h1>
      {/*       <div className="flex items-center gap-5">
        <div>
          <Select
            options={ViewList}
            placeholder="조회 순"
            value={select}
            setValue={(value) => setSelect(value ?? '')}
            className="sm_max:w-[100px] md:w-[200px]"
          />
        </div>
        <Button
          text={recruitButtonActive ? '모집중 스터디' : '전체 스터디'}
          className={`sm_max:w-[100px] md:w-[200px] h-[40px] border border-blue_02 border-solid rounded-[10px] text-[12px] font-semibold ${
            recruitButtonActive
              ? 'bg-main text-white'
              : 'bg-white text-blue_02 '
          }`}
          onClick={handleRecruitButton}
        />
        <div>
          <Input
            label="스터디 검색"
            value={studySearch}
            onChange={(event) => {
              setStudySearch(event.target.value);
            }}
            onKeyPress={handleKeyPress}
            className="sm_max:w-[120px] md:w-[200px]"
          />
        </div>
      </div> */}
    </header>
  );
};

export default RecruitStudyHeader;
