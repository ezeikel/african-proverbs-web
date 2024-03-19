import PageWrap from "@/components/PageWrap/PageWrap";
import ProverbOfTheDay from "@/components/ProverbOfTheDay/ProverbOfTheDay";

const Home = () => {
  return (
    <PageWrap className="p-0">
      <ProverbOfTheDay
        className="w-full h-1/2 bg-red-50 p-4"
        style={{
          height: "calc(75vh - 72px)",
        }}
      />
    </PageWrap>
  );
};

export default Home;
