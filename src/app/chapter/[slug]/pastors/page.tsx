"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function PastorsPage() {
  const router = useRouter();
  const params = useParams();
  const [pastors, setPastors] = useState<any[]>([]);
  const [chapterName, setChapterName] = useState("");

  const chapterPastorsData = {
    "iloilo-chapter": {
      name: "Iloilo Chapter",
      pastors: [
        {
          id: 1,
          name: "Arroz, Generoso Jr. C.",
          church: "Malublub Baptist Church",
          phone: "+63 912 345 6789",
          email: "mbc@gmail.com",
          image: "/images/pastors/gem-notionalist.png",
        },
        {
          id: 2,
          name: "Francia, Jireh John",
          church: "Baptist Center Church",
          phone: "+63 923 456 7890",
          email: "bbc@gmail.com",
          image: "/images/pastors/avatar.webp",
        },
        {
          id: 3,
          name: "Mije, Rosendo",
          church: "Baptist Center Church",
          phone: "+63 934 567 8901",
          email: "bcc@gmail.com",
          image: "",
        },
        {
          id: 4,
          name: "Sian, Cris Amorsolo",
          church: "CPU University Church",
          phone: "+63 945 678 9012",
          email: "cpuUC@gmail.com",
          image: "/images/pastors/IMG_20240106_152451.png",
        },
      ],
    },
  };

  useEffect(() => {
    if (params.slug && typeof params.slug === "string") {
      const chapterData =
        chapterPastorsData[params.slug as keyof typeof chapterPastorsData];
      if (chapterData) {
        setPastors(chapterData.pastors);
        setChapterName(chapterData.name);
      }
    }
  }, [params.slug]);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 text-black"
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="ml-2 text-lg font-semibold text-black">
          {chapterName} Pastors
        </h1>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 space-y-4">
        {pastors.length > 0 ? (
          pastors.map((pastor) => (
            <div
              key={pastor.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto sm:mx-0">
                  <Image
                    src={pastor.image || "/placeholder.svg"}
                    alt={pastor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h3 className="text-base font-semibold text-black">
                    {pastor.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{pastor.church}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-700">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="truncate">{pastor.phone}</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-700">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="truncate">{pastor.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No pastors found for this chapter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
