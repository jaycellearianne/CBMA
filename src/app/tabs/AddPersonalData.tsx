"use client";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Plus } from "lucide-react";
import { TextInput, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useSearchParams } from "next/navigation";

export default function AddPersonalData() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [birthday, setBirthday] = useState<string | null>(null);
  // const [error, setError] = useState({
  //   fullName: "This field is required",
  // });
  const pastorName = searchParams.get("name");

  return (
    <div className=" min-h-screen w-full">
      {!isOpen ? (
        <div className="flex flex-col items-center justify-center p-6 w-full">
          <Button
            className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex flex-row items-center rounded-lg mb-2"
            onClick={() => setIsOpen(true)}
          >
            <Plus size={24} color="white" /> Add Personal Data
          </Button>
        </div>
      ) : (
        <div className=" w-full inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-[98vw] sm:max-w-md max-h-[95vh] flex flex-col">
            <form className="flex flex-col w-full">
              <div className="overflow-y-auto no-scrollbar w-full max-h-[45vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[35vh] pb-24 sm:pb-16">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold mb-2 text-[#2C1F16]">
                    Personal Information
                  </h2>
                  <div className="flex flex-col justify-between gap-2">
                    <TextInput
                      label="Full Name"
                      value={pastorName ?? ""}
                      placeholder="Enter full name"
                      required
                      readOnly
                      withAsterisk
                      id="fullName"
                      autoComplete="name"
                      variant="filled"
                      classNames={{
                        input:
                          "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                        label: "text-sm font-medium text-[#6F4E37] mb-1",
                      }}
                    />
                    <div className="flex flex-row gap-2 ">
                      <TextInput
                        label="Address"
                        placeholder="Enter address"
                        required
                        withAsterisk
                        id="address"
                        variant="filled"
                        classNames={{
                          input:
                            "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                          label: "text-sm font-medium text-[#6F4E37] mb-1",
                        }}
                      />
                      <TextInput
                        label="Zip Code"
                        placeholder="Enter zip code"
                        required
                        withAsterisk
                        id="zipCode"
                        variant="filled"
                        classNames={{
                          input:
                            "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                          label: "text-sm font-medium text-[#6F4E37] mb-1",
                        }}
                      />
                    </div>
                    <DateInput
                      label="Birthday"
                      placeholder="Enter birthday"
                      value={birthday}
                      onChange={setBirthday}
                      valueFormat="MM/DD/YYYY"
                      classNames={{
                        input:
                          "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                        label: "text-sm font-medium text-[#6F4E37] mb-1",
                      }}
                    />
                    <TextInput
                      label="Age"
                      placeholder="Enter age"
                      required
                      withAsterisk
                      id="age"
                      variant="filled"
                      maxLength={2}
                      classNames={{
                        input:
                          "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                        label: "text-sm font-medium text-[#6F4E37] mb-1",
                      }}
                    />
                    <Select
                      label="Sex"
                      placeholder="Enter sex"
                      data={["Male", "Female"]}
                      required
                      withAsterisk
                      id="sex"
                      variant="filled"
                      classNames={{
                        input:
                          "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                        label: "text-sm font-medium text-[#6F4E37] mb-1",
                      }}
                    />
                    <Select
                      label="Civil Status"
                      placeholder="Enter Civil Status"
                      data={["Single", "Married", "Divorced", "Widowed"]}
                      required
                      withAsterisk
                      id="civilStatus"
                      variant="filled"
                      classNames={{
                        input:
                          "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                        label: "text-sm font-medium text-[#6F4E37] mb-1",
                      }}
                    />{" "}
                    <div className="flex flex-row gap-2">
                      <TextInput
                        variant="filled"
                        label="Weight (kg)"
                        placeholder="Enter weight"
                        required
                        withAsterisk
                        id="weight"
                        maxLength={2}
                        classNames={{
                          input:
                            "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                          label: "text-sm font-medium text-[#6F4E37] mb-1",
                        }}
                      />
                      <TextInput
                        id="personal-height"
                        label="Height (cm)"
                        placeholder="Enter height"
                        required
                        withAsterisk
                        variant="filled"
                        maxLength={2}
                        classNames={{
                          input:
                            "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                          label: "text-sm font-medium text-[#6F4E37] mb-1",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col mt-4">
                  <h2 className="text-lg font-semibold mb-2 text-[#2C1F16]">
                    Contact Information
                  </h2>
                  <div className="flex flex-col justify-between gap-2">
                    <TextInput
                      label="Telephone Number"
                      placeholder="Enter telephone number"
                      id="telephoneNumber"
                      variant="filled"
                      maxLength={2}
                      classNames={{
                        input:
                          "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                        label: "text-sm font-medium text-[#6F4E37] mb-1",
                      }}
                    />{" "}
                    <TextInput
                      label="Cellphone Number"
                      placeholder="Enter cellphone number"
                      id="cellphoneNumber"
                      variant="filled"
                      withAsterisk
                      required
                      maxLength={11}
                      classNames={{
                        input:
                          "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                        label: "text-sm font-medium text-[#6F4E37] mb-1",
                      }}
                    />
                    <TextInput
                      label="Email"
                      placeholder="Enter email"
                      id="email"
                      value={pastorEmail}
                      required
                      readOnly
                      withAsterisk
                      variant="filled"
                      classNames={{
                        input:
                          "!bg-[#F7F4F0] !focus:bg-[#EADBC8] !border-none !shadow-none !rounded-lg",
                        label: "text-sm font-medium text-[#6F4E37] mb-1",
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="sticky bottom-0 bg-white pt-2 pb-2 z-10 flex flex-row gap-2 justify-between w-full">
              <Button
                className="bg-[#A67B5B]/25 h-10 px-4 text-black hover:bg-[#A67B5B] flex flex-row items-center rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#6F4E37] h-10 px-4 text-white hover:bg-[#A67B5B] flex flex-row items-center rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
