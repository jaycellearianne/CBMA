"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import AddPersonalData from "./tabs/AddPersonalData";
import PersonalData from "./PersonalData";
export default function PastorsProfileTabs() {
  const tabs = [
    {
      name: "Personal",
      value: "Personal",
    },
    {
      name: "Education",
      value: "Education",
    },
    {
      name: "Trainings",
      value: "Trainings",
    },
    {
      name: "Experience",
      value: "Experience",
    },
    {
      name: "Family",
      value: "Family",
    },
    {
      name: "Fees",
      value: "Fees",
    },
  ];
  return (
    <div className="w-full overflow-x-auto justify-start">
      <Tabs defaultValue={tabs[0].value} className="w-full ">
        <div className="w-full overflow-x-auto no-scrollbar mx-auto px-4">
          <TabsList className="flex min-w-max w-full p-0 justify-start gap-2 bg-white rounded-none">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent
          value="Personal"
          className="items-center justify-center w-full"
        >
          <div className="justify-center ">
            {/* <AddPersonalData /> */}
            <PersonalData />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
