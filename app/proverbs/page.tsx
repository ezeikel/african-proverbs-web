import Link from "next/link";
import PageWrap from "@/components/PageWrap/PageWrap";
import ProverbCard from "@/components/ProverbCard/ProverbCard";
import { getProverbs } from "../actions";

const Proverbs = async () => {
  const proverbs = await getProverbs();

  return (
    <PageWrap>
      <div className="flex gap-4">
        {proverbs.map((proverb) => (
          <Link href={`/proverb/${proverb.id}`} key={proverb.id}>
            <ProverbCard proverb={proverb} />
          </Link>
        ))}
      </div>
    </PageWrap>
  );
};

export default Proverbs;
