import { useModal } from '@/hooks/useModal';
import { Crown, LoaderCircle, UsersRound } from 'lucide-react';
import { RecruitStudyTypes } from 'src/types/RecruitStudy';
interface RecruitStudyCardProps {
  data: RecruitStudyTypes[];
  loading: boolean;
}

const RecruitStudyCard = ({ loading, data }: RecruitStudyCardProps) => {
  const { openModal } = useModal('studyInfoModal');

  if (loading)
    return (
      <span className="absolute top-1/2 left-1/2">
        <LoaderCircle className="animate-spin" color="#587fa7" size={64} />
      </span>
    );

  const handleOpenStudyInfo = () => {
    openModal();
  };

  return data.map((item) => (
    <li
      className="flex flex-col h-full p-5 bg-white rounded-2xl shadow-box_03"
      aria-labelledby="study-title"
      aria-describedby="study-type study-description study-leader study-members"
      key={item.id}
    >
      <header className="flex items-center justify-between w-full font-semibold">
        <h2
          id="study-title"
          className="w-1/2 text-lg truncate"
          title={item.study_title}
        >
          {item.study_title}
        </h2>
        <p className="text-sm text-gray_77">{item.study_start_date}</p>
      </header>
      <section className="flex flex-col items-start justify-between h-full gap-3">
        <h3 id="study-type" className="text-sm font-medium text-gray_77">
          {item.study_type}
        </h3>
        <p
          id="study-description"
          className="overflow-hidden text-sm font-medium"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {item.study_description}
        </p>
        <div className="flex justify-between w-full text-sm font-semibold">
          <span
            className="flex flex-row gap-1 flex-nowrap"
            id="study-leader"
            aria-label={`스터디 방장이름: ${item.study_leader}`}
          >
            <Crown size={18} color="#FCC200" />
            {item.study_leader}
          </span>
          <span
            className="flex flex-row gap-1 mr-1 flex-nowrap"
            id="study-members"
            aria-label={`스터디 모집하는 인원 수: ${item.study_personnel}`}
          >
            <UsersRound size={18} color="#577FA7" />
            {item.study_personnel}
          </span>
        </div>
        <div className="flex flex-row items-center justify-center w-full gap-2 flex-nowrap">
          <button
            type="button"
            className="w-full py-2 text-sm font-medium text-center transition duration-300 rounded-lg text-primary-700 bg-primary-100 hover:scale-95"
            onClick={handleOpenStudyInfo}
          >
            스터디 정보
          </button>
          <button
            type="button"
            className="w-full py-2 text-sm font-medium text-center text-white transition duration-300 rounded-lg bg-primary-800 hover:scale-95"
          >
            스터디 신청
          </button>
        </div>
      </section>
    </li>
  ));
};

export default RecruitStudyCard;
