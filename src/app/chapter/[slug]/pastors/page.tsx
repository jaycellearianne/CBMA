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

  // Chapter-specific pastors data
  const chapterPastorsData = {
    "iloilo-chapter": {
      name: "Iloilo Chapter",
      pastors: [
        {
          id: 1,
          name: "Pastor John Smith",
          church: "Grace Community Church Iloilo",
          phone: "+63 912 345 6789",
          email: "john.smith@grace-iloilo.com",
          image: "/images/pastors/IMG_20240106_152451.png",
        },
        {
          id: 2,
          name: "Pastor Maria Santos",
          church: "Faith Baptist Church Iloilo",
          phone: "+63 923 456 7890",
          email: "maria.santos@faith-iloilo.com",
          image: "/images/pastors/IMG_20240106_152451.png",
        },
        {
          id: 3,
          name: "Pastor David Cruz",
          church: "Hope Methodist Church Iloilo",
          phone: "+63 934 567 8901",
          email: "david.cruz@hope-iloilo.com",
          image: "/images/pastors/IMG_20240106_152451.png",
        },
        {
          id: 4,
          name: "Pastor Anna Reyes",
          church: "New Life Church Iloilo",
          phone: "+63 945 678 9012",
          email: "anna.reyes@newlife-iloilo.com",
          image: "/images/pastors/IMG_20240106_152451.png",
        },
      ],
    },
    // "negros-chapter": {
    //   name: "Negros Chapter",
    //   pastors: [
    //     {
    //       id: 5,
    //       name: "Pastor Miguel Torres",
    //       church: "Calvary Chapel Negros",
    //       phone: "+63 956 789 0123",
    //       email: "miguel.torres@calvary-negros.com",
    //       image: "/images/pastors/IMG_20240106_152451.png",
    //     },
    //     {
    //       id: 6,
    //       name: "Pastor Elena Rodriguez",
    //       church: "Victory Church Negros",
    //       phone: "+63 967 890 1234",
    //       email: "elena.rodriguez@victory-negros.com",
    //       image: "/images/pastors/IMG_20240106_152451.png",
    //     },
    //     {
    //       id: 7,
    //       name: "Pastor Carlos Mendoza",
    //       church: "Bethel Assembly Negros",
    //       phone: "+63 978 901 2345",
    //       email: "carlos.mendoza@bethel-negros.com",
    //       image: "/images/pastors/IMG_20240106_152451.png",
    //     },
    //   ],
    // },
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
      <div className="text-black px-4 py-3 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="p-1 text-black mr-15"
          onClick={handleBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-medium">{chapterName} Pastors</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4">
        {pastors.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {pastors.map((pastors) => (
              <div
                key={pastors.id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={pastors.image || "/placeholder.svg"}
                      alt={pastors.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium text-black mb-0">
                      {pastors.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {pastors.church}
                    </p>

                    <div className="space-y-1.5 w-full">
                      <div className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">
                          {pastors.phone}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate">
                          {pastors.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No pastors found for this chapter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
