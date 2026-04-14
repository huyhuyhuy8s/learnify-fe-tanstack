import { teamMembers } from "@/mock/team-member";
import "./style.scss";
import MemberItem from "./member-item";

const TeamList = () => {
  return (
    <div className="team-container">
      <div className="team-grid-unified">
        {teamMembers.map((member, index) => (
          <MemberItem key={`team-${index}`} {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamList;
