import { Region } from "@prisma/client";
import { getInsight, getProverbOfTheDay } from "@/app/actions";
import { cn } from "@/lib/utils";
import { REGIONS } from "@/constants";
import GetInsightButton from "../GetInsightButton/GetInsightButton";

type ProverbOfTheDayProps = {
  className?: string;
  style?: React.CSSProperties;
};

const ProverbOfTheDay = async ({ className, style }: ProverbOfTheDayProps) => {
  const proverb = await getProverbOfTheDay();
  let insight;

  if (!proverb) {
    return null;
  }

  return (
    <section
      className={cn("flex items-center justify-center bg-red-50", {
        [className as string]: !!className,
      })}
      style={style}
    >
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-center mb-6">
          Proverb of the Day
        </h1>
        <p className="mb-4 font-serif">
          &quot;{proverb.text}&quot; - {REGIONS[proverb.region as Region].name}
        </p>
        <GetInsightButton
          proverb={proverb.text}
          getInsight={getInsight}
          className="self-center"
        />
        {insight ? <div>{insight}</div> : null}
      </div>
    </section>
  );
};

export default ProverbOfTheDay;
