import Image from "next/image";
import { useState } from "react";

type ChapterCardProps = {
  title: string;
  image?: string;
};

export default function ChapterCard({ title, image }: ChapterCardProps) {
  const [img, setImg] = useState(image ?? "/public/Logo-CBMA.png");
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 min-w-[167px] min-h-[194px]">
      <div className="relative w-full h-32">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover"
          onError={() => setImg("/Logo-CBMA.png")}
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#6F4E37] truncate">
          {title}
        </h2>
      </div>
    </div>
  );
}
