" use client";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
export default function PersonalData() {
  const personalData = {
    fullName: "Juan Dela Cruz",
    birthday: "1985-07-15",
    age: 39,
    address: "123 Main St, Quezon City, Metro Manila",
    zipCode: "1100",
    civilStatus: "Married",
    height: "170 cm",
    weight: "70 kg",
    cellphoneNumber: "09171234567",
    telephoneNumber: "89231234",
    email: "juan.delacruz@email.com",
  };

  return (
    <>
      <div className="flex flex-row justify-between gap-2">
        <h1 className="text-2xl px-4 font-semibold text-[#6F4E37]">
          Personal Data
        </h1>

        <button
          type="button"
          className="flex items-center gap-1 px-3 py-1 rounded text-[#2C1F16] hover:bg-[#f7f4f0] transition"
        >
          <Pencil size={18} strokeWidth={2} />
          <span className="font-semibold text-lg underline underline-offset-2">
            Edit
          </span>
        </button>
      </div>
      <div className="mt-4 px-2 sm:px-5 pb-10 overflow-x-auto">
        <h2 className="text-lg font-semibold px-4">Personal Information</h2>
        <div className="space-y-3 mt-4">
          {[
            { label: "Full Name", value: personalData.fullName },
            { label: "Birthday", value: personalData.birthday },
            { label: "Age", value: personalData.age },
            { label: "Address", value: personalData.address },
            { label: "Zip Code", value: personalData.zipCode },
            { label: "Civil Status", value: personalData.civilStatus },
            { label: "Height", value: personalData.height },
            { label: "Weight", value: personalData.weight },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-row items-start gap-2 sm:gap-4 px-8"
            >
              <Label className="text-[#2C1F16] min-w-[120px] sm:w-40 text-right pt-1 font-semibold">
                {item.label}:
              </Label>
              <span className="text-sm sm:text-base font-medium flex-1 break-words">
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <h2 className="text-lg font-semibold px-4">Contact Information</h2>
          <div className="space-y-3 mt-4">
            {[
              { label: "Cellphone No.", value: personalData.cellphoneNumber },
              { label: "Telephone No.", value: personalData.telephoneNumber },
              { label: "Email", value: personalData.email },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-row items-start gap-2 sm:gap-4 px-8"
              >
                <Label className="text-[#2C1F16] font-semibold min-w-[120px] sm:w-40 text-right pt-1 ">
                  {item.label}:
                </Label>
                <span className="text-sm sm:text-base font-medium flex-1 break-words">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
