import { getProverb } from "@/app/actions";
import PageWrap from "@/components/forms/CreateProverbForm/PageWrap/PageWrap";

type ProverbProps = {
  params: {
    id: string;
  };
};

const Proverb = async ({ params: { id } }: ProverbProps) => {
  if (!id) {
    return <div>Proverb not found</div>;
  }

  const proverb = await getProverb(id);

  if (!proverb) {
    return <div>Proverb not found</div>;
  }

  return (
    <PageWrap>
      <h1>{proverb.text}</h1>
      <p>{proverb.region}</p>
      <p>{proverb.tribe}</p>
      <p>{proverb.category}</p>
    </PageWrap>
  );
};

export default Proverb;
