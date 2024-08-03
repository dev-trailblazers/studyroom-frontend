import { LoaderCircle } from 'lucide-react';

interface RecruitStudyTypes {
  id: number;
  study_title: string;
  study_type: string;
  study_start_date: string;
  study_description: string;
  study_leader: string;
  study_personnel: number;
}

interface RecruitStudyCardProps {
  data: RecruitStudyTypes[];
  loading: boolean;
}

const RecruitStudyCard = ({ loading, data }: RecruitStudyCardProps) => {
  if (loading)
    return (
      <span className="absolute top-1/2 left-1/2">
        <LoaderCircle className="animate-spin" color="#587fa7" size={64} />
      </span>
    );

  return data.map((item) => (
    <li
      className="flex flex-col h-full p-5 bg-white rounded-2xl shadow-box_03"
      aria-labelledby="study-title"
      aria-describedby="study-type study-description study-leader study-members"
      key={item.id}
    >
      <header className="flex justify-between w-full font-semibold">
        <h2 id="study-title" className="text-sm truncate">
          {item.study_title}
        </h2>
        <p className="text-sm">{item.study_start_date}</p>
      </header>
      <section className="flex flex-col items-start justify-between h-full gap-3">
        <h3 id="study-type" className="text-xs font-semibold text-gray-500">
          {item.study_type}
        </h3>
        <p
          id="study-description"
          className="h-10 overflow-hidden text-sm font-semibold"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {item.study_description}
        </p>
        <div className="flex justify-between w-full text-sm font-semibold">
          <span id="study-leader" aria-label="스터디 모집하는 방장 이름">
            👑 {item.study_leader}
          </span>
          <span id="study-members" aria-label="스터디 모집하는 인원 수">
            👥 {item.study_personnel}
          </span>
        </div>
        <button
          type="button"
          className="block px-3 py-1 mx-auto text-sm font-medium border-[1px] rounded-lg text-main w-fit border-main transition duration-300 hover:scale-95"
        >
          스터디 신청
        </button>
      </section>
    </li>
  ));
};

export default RecruitStudyCard;
