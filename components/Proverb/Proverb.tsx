import Image from "next/image";
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
        <Image
          alt="Proverb Image"
          className="w-full h-64 object-cover rounded-md"
          height="200"
          src="/images/boy-in-striped-shirt.jpg"
          style={{
            aspectRatio: "200/200",
            objectFit: "cover",
            objectPosition: "top center",
          }}
          width="200"
        />
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
