"use client";
import WorkExperience from "./work-experience/WorkExperienceData";
import MinistryExp from "./ministry-experience/MinistryExp";


export default function ExperienceData() {
  return (
    <div className="space-y-4 mx-5">
      <h1 className="text-2xl font-semibold text-[#6F4E37]">Education</h1>

      <WorkExperience />
       <MinistryExp />
       {/* <TalentsSkillsInterests />
       <Insurance /> * */}
    </div>
  );
}
