"use client";
import WorkExperience from "./work-experience/WorkExperienceData";
import TalentsSkillsInterests from "./talent-skills-interests/TalentsSkillsInterests";

export default function ExperienceData() {
  return (
    <div className="space-y-4 mx-5">
      <h1 className="text-2xl font-semibold text-[#6F4E37]">Education</h1>

      <WorkExperience />
      
      <TalentsSkillsInterests />
    </div>
  );
}
