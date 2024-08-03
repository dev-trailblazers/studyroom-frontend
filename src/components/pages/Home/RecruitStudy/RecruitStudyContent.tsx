interface RecruitStudyContentProps {
  children: React.ReactNode;
}

const RecruitStudyContent = ({ children }: RecruitStudyContentProps) => {
  return (
    <ul className="relative grid grid-cols-4 gap-5 py-5 h-[1000px]">
      {children}
    </ul>
  );
};

export default RecruitStudyContent;
