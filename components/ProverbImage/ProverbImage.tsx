import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

// The per-proverb DALL-E image was retired (dall-e-3 is no longer offered).
// Every proverb shows the image the old code fell back to.
const DEFAULT_IMAGE_URL = "/images/boy-in-striped-shirt.jpg";

const ProverbImage = () => (
  <AspectRatio ratio={16 / 9} className="bg-muted">
    <Image
      alt="Proverb Image"
      className="w-full h-64 object-cover rounded-md"
      fill
      src={DEFAULT_IMAGE_URL}
      style={{
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  </AspectRatio>
);

export default ProverbImage;
