import { OptimizeImage } from "@/components/Images";
import { teamMembers } from "@/mock/team-member";
import "./style.scss";

interface TeamMemberProps {
  name: string;
  jobTitle: string;
  image: {
    name: string;
    folder: string;
  };
}

const AIMembers = teamMembers.filter((member) =>
  member.jobTitle.includes("AI")
);

const fullstackMembers = teamMembers.filter((member) =>
  member.jobTitle.includes("Fullstack")
);

const frontendMembers = teamMembers.filter((member) =>
  member.jobTitle.includes("Frontend")
);

function TeamMember({ name, jobTitle, image }: TeamMemberProps) {
  return (
    <div className="team-member">
      <div className="team-member__image-container">
        <OptimizeImage
          src={image.name}
          alt={name}
          folder={image.folder}
          className="team-member__image"
        />
      </div>
      <div className="team-member__info">
        <h1 className="team-member__name">{name}</h1>
        <p className="team-member__title">{jobTitle}</p>
      </div>
    </div>
  );
}

export default function TeamImage() {
  return (
    <div className="team-image">
      {AIMembers.map((member, index) => (
        <TeamMember key={index} {...member} />
      ))}
      <div className="team-image__fullstack">
        {fullstackMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
      <div className="team-image__frontend">
        {frontendMembers.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </div>
  );
}
