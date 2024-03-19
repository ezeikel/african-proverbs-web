import { Proverb } from "@prisma/client";
import { COUNTRIES, REGIONS } from "@/constants";

const formatOrigin = (proverb: Proverb) => {
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

export default formatOrigin;
