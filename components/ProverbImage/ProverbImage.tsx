import Image from "next/image";
import { getProverb, getProverbImageUrl } from "@/app/actions";
import { AspectRatio } from "../ui/aspect-ratio";

type ProverbImageProps = {
  proverbId: string;
};

const ProverbImage = async ({ proverbId }: ProverbImageProps) => {
  const proverb = await getProverb(proverbId);
  const generatedImageUrl = await getProverbImageUrl(proverb);

  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        alt="Proverb Image"
        className="w-full h-64 object-cover rounded-md"
        fill
        src={generatedImageUrl}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </AspectRatio>
  );
};

export default ProverbImage;
