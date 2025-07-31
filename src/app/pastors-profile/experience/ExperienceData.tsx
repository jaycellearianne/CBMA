"use client";
import WorkExperience from "./work-experience/WorkExperienceData";
import MinistryExp from "./ministry-experience/MinistryExp";
import TalentsSkillsInterests from "./talent-skills-interests/TalentsSkillsInterests";

export default function ExperienceData() {
  return (
    <div className="p-6 space-y-4">
      <h3 className="text-2xl font-bold text-black">Work Experience</h3>

      <WorkExperience />
      <MinistryExp />
      <TalentsSkillsInterests />
      {/* <Insurance /> * */}
    </div>
  );
}
``;
