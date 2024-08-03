import { useEffect, useState } from 'react';
import RecruitStudyHeader from './RecruitStudyHeader';
import RecruitStudyContent from './RecruitStudyContent';
import RecruitStudyCard from './RecruitStudyCard';
import { RecruitStudyTypes } from 'src/types/RecruitStudy';

const RecruitStudy = () => {
  const [recruitStudies, setRecruitStudies] = useState<RecruitStudyTypes[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRecruitStudy();
  }, []);

  const getRecruitStudy = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch('/src/data/recruitStudyData.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRecruitStudies(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="flex flex-col w-full max-w-[1280px] m-auto p-5 mb-10 rounded-xl bg-primary-50 shadow-box_03"
      role="region"
      aria-labelledby="recruit-study-header"
    >
      <RecruitStudyHeader />
      <RecruitStudyContent>
        <RecruitStudyCard data={recruitStudies} loading={loading} />
      </RecruitStudyContent>
    </section>
  );
};

export default RecruitStudy;
