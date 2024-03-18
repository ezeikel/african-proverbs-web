import Link from "next/link";
import PageWrap from "@/components/PageWrap/PageWrap";
import { getProverbs } from "../actions";

const Proverbs = async () => {
  const proverbs = await getProverbs();

  return (
    <PageWrap>
      <div className="flex gap-4">
        {proverbs.map((proverb) => (
          <Link
            href={`/proverb/${proverb.id}`}
            className="p-4 border-2 rounded bg-slate-300 text-black"
            key={proverb.id}
          >
            {proverb.text} - {proverb.region} - {proverb.tribe} -{" "}
            {proverb.category}
          </Link>
        ))}
      </div>
    </PageWrap>
  );
};

export default Proverbs;
