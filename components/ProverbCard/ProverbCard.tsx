import Link from "next/link";
import { Proverb } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import formatOrigin from "@/utils/formatOrigin";

type PoverbCardProps = {
  proverb: Proverb;
};

const ProverbCard = ({ proverb }: PoverbCardProps) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <h3 className="font-serif text-xl font-extrabold mb-2">
        &quot;{proverb.text}.&quot;
      </h3>
      <p className="text-sm text-gray-500 mb-4">{formatOrigin(proverb)}</p>
    </CardContent>
  </Card>
);

export default ProverbCard;
