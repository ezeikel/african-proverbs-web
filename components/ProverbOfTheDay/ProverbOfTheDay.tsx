import { getProverb, getProverbOfTheDay } from "@/app/actions";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { REGIONS } from "@/constants";
import { Region } from "@prisma/client";

type ProverbOfTheDayProps = {
  className?: string;
  style?: React.CSSProperties;
};

const ProverbOfTheDay = async ({ className, style }: ProverbOfTheDayProps) => {
  const proverb = await getProverbOfTheDay();

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
        <p className="mb-4">
          &quot;{proverb.text}&quot; - {REGIONS[proverb.region as Region].name}
        </p>
        <Button className="self-center">Gain Insight</Button>
      </div>
    </section>
  );
};

export default ProverbOfTheDay;
