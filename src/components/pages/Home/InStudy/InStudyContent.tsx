interface InStudyContentProps {
  children: React.ReactNode;
}

const InStudyContent = ({ children }: InStudyContentProps) => {
  return (
    <ul className="relative grid grid-cols-4 gap-5 pt-5 h-[228px]">
      {children}
    </ul>
  );
};

export default InStudyContent;
