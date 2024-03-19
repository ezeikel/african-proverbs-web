import PageWrap from "@/components/PageWrap/PageWrap";
import ProverbOfTheDay from "@/components/ProverbOfTheDay/ProverbOfTheDay";
import Subscribe from "@/components/Subscribe/Subscribe";

const Home = () => {
  return (
    <PageWrap className="p-0 bg-white">
      <ProverbOfTheDay className="w-full h-full p-4" />
      <Subscribe />
    </PageWrap>
  );
};

export default Home;
