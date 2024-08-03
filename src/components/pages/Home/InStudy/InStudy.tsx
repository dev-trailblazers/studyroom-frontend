import { useEffect, useState } from 'react';
import InStudyCard from './InStudyCard';
import InStudyContent from './InStudyContent';
import InStudyHeader from './InStudyHeader';

interface InStudyTypes {
  id: number;
  StudyTitle: string;
  StudyEndDate: string;
  StudyNotice: string;
}

const InStudy = () => {
  const [inStudies, setInStudies] = useState<InStudyTypes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInStudy();
  }, []);

  const getInStudy = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch('/src/data/inStudyData.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setInStudies(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="flex flex-col w-full max-w-[1280px] p-5 m-auto my-10 rounded-xl bg-main shadow-box_03"
      role="region"
      aria-labelledby="in-study-header"
    >
      <InStudyHeader />
      <InStudyContent>
        <InStudyCard data={inStudies} loading={loading} />
      </InStudyContent>
    </section>
  );
};

export default InStudy;
