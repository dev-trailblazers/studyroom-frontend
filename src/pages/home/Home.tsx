import { Header, InStudy, RecruitStudy } from '@/components/index';

const Home = () => {
  return (
    <div className="flex flex-col py-10">
      <Header />
      <InStudy />
      <RecruitStudy />
    </div>
  );
};

export default Home;
