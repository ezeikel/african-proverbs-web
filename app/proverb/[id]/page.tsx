import PageWrap from "@/components/PageWrap/PageWrap";
import Proverb from "@/components/Proverb/Proverb";

type ProverbProps = {
  params: {
    id: string;
  };
};

const ProverbPage = async ({ params: { id } }: ProverbProps) => {
  if (!id) {
    return <div>Proverb not found</div>;
  }

  return (
    <PageWrap>
      <Proverb id={id} />
    </PageWrap>
  );
};

export default ProverbPage;
