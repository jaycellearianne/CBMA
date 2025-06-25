"use client";

import { Tabs } from "@mantine/core";
import PersonalData from "./personal-data";

export default function PastorProfileTab() {
  return (
    <Tabs
      color="#2C1F16"
      defaultValue="personalData"
      bg={"#F5F5F5"}
      className="text-[#2C1F16] w-full bg-white h-10"
    >
      <div className="fixed w-full overflow-x-auto scrollbar-hide bg-white z-10">
        <Tabs.List grow className="flex w-max min-w-full">
          <Tabs.Tab value="personalData">Personal Data</Tabs.Tab>
          <Tabs.Tab value="educationData">Education</Tabs.Tab>
          <Tabs.Tab value="trainingData">Trainings</Tabs.Tab>
          <Tabs.Tab value="expertiseData">Expertise</Tabs.Tab>
          <Tabs.Tab value="familyData">Family</Tabs.Tab>
          <Tabs.Tab value="feeData">Fee</Tabs.Tab>
        </Tabs.List>
      </div>

      <div className="w-full h-full">
        <Tabs.Panel
          value="personalData"
          className="bg-white rounded-b-2xl p-6 w-full h-full"
        >
          <div className=" flex flex-col w-full">
            <div className="flex mt-5">
              <h1 className="text-left font-semibold text-2xl">Personal Data</h1>
            </div>
            <PersonalData />
          </div>
        </Tabs.Panel>
      </div>
    </Tabs>
  );
}
