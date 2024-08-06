import { Header, InStudy, RecruitStudy, SideBar } from '@/components/index';

const Home = () => {
  return (
    <div className="flex flex-col py-10">
      <Header />
      <InStudy />
      <RecruitStudy />
      <SideBar />
    </div>
  );
};

export default Home;
