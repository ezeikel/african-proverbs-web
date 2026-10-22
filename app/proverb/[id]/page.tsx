import PageWrap from "@/components/PageWrap/PageWrap";
import Proverb from "@/components/Proverb/Proverb";

type ProverbProps = {
  params: Promise<{
    id: string;
  }>;
};

const ProverbPage = async ({ params }: ProverbProps) => {
  const { id } = await params;

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
