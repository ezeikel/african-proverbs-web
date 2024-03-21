import { Suspense } from "react";
import { getInsight, getProverb } from "@/app/actions";
import formatOrigin from "@/utils/formatOrigin";
import cn from "@/utils/cn";
import GetInsightButton from "../GetInsightButton/GetInsightButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import ProverbImage from "../ProverbImage/ProverbImage";
import ProverbImageLoader from "../Loader/Loader";
import { LoaderType } from "@/types";

type ProverbProps = {
  id: string;
  className?: string;
};

const Proverb = async ({ id, className }: ProverbProps) => {
  const proverb = await getProverb(id);

  if (!proverb) {
    return <div>Proverb not found</div>;
  }

  return (
    <Card
      className={cn("flex flex-col", {
        [className as string]: !!className,
      })}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{proverb.id}</CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          {formatOrigin(proverb)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Suspense
          fallback={
            <ProverbImageLoader
              className="my-8"
              type={LoaderType.PROVERB_IMAGE}
            />
          }
        >
          <ProverbImage proverbId={proverb.id} />
        </Suspense>
        <p className="font-serif text-gray-700 text-xl dark:text-gray-300">
          {proverb.text}
        </p>
        <GetInsightButton
          proverb={proverb.text}
          getInsight={getInsight}
          className="self-start"
          variant="outline"
        />
      </CardContent>
    </Card>
  );
};

export default Proverb;
