import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Proverb } from "@prisma/client";
import { COUNTRIES, REGIONS } from "@/constants";

type PoverbCardProps = {
  proverb: Proverb;
};

const ProverbCard = ({ proverb }: PoverbCardProps) => {
  const formatOrigin = () => {
    let origin = "";

    if (proverb.region) {
      origin = REGIONS[proverb.region].name;
    }

    if (proverb.country) {
      origin =
        origin !== ""
          ? `${origin} | ${COUNTRIES[proverb.country].name}`
          : proverb.country;
    }

    if (proverb.tribe) {
      origin = origin !== "" ? `${origin} | ${proverb.tribe}` : proverb.tribe;
    }

    return origin;
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">&quot;{proverb.text}.&quot;</h3>
        <p className="text-sm text-gray-500 mb-4">{formatOrigin()}</p>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium"
          href="#"
        >
          View
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProverbCard;
