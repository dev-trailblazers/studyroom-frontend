import { LoaderCircle } from 'lucide-react';

interface InStudyTypes {
  id: number;
  StudyTitle: string;
  StudyEndDate: string;
  StudyNotice: string;
}

interface InStudyCardProps {
  loading: boolean;
  data: InStudyTypes[];
}

const InStudyCard = ({ loading, data }: InStudyCardProps) => {
  if (loading)
    return (
      <span className="absolute top-1/3 left-1/2">
        <LoaderCircle className="animate-spin" color="#fff" size={64} />
      </span>
    );

  return data.map((item) => (
    <li
      className="flex flex-col h-full gap-4 p-5 bg-white rounded-2xl shadow-box_03"
      key={item.id}
    >
      <header className="flex justify-between text-sm font-semibold">
        <h2>{item.StudyTitle}</h2>
        <time dateTime="2024-08-05">{item.StudyEndDate}</time>
      </header>
      <a
        href="#"
        className="flex flex-col gap-1 text-sm font-medium"
        aria-label={item.StudyTitle + ' 공지사항으로 이동'}
      >
        <h3 className="font-semibold">공지사항</h3>
        <p
          className="h-10 overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
          }}
        >
          {item.StudyNotice}
        </p>
      </a>
      <a
        href="#"
        className="block px-3 py-1 mx-auto text-sm font-medium border-[1px] rounded-lg text-main w-fit border-main transition duration-300 hover:scale-95"
        aria-label={item.StudyTitle + '룸으로 이동'}
        role="button"
      >
        스터디 입장
      </a>
    </li>
  ));
};

export default InStudyCard;
