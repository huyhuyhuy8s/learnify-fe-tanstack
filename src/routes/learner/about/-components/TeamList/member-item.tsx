import { IMemberProps } from "@/routes/learner/about/-types/about";
import { OptimizeImage } from "@/components/Images";

const MemberItem = (props: IMemberProps) => {
  const { name, jobTitle, image } = props;
  const imageSrc = image.name || "";
  const imageFolder = image.folder || "";

  return (
    <div className="member-item">
      <div className="avatar-wrapper">
        <OptimizeImage
          src={imageSrc}
          alt={name || "Team member"}
          folder={imageFolder}
          className="avatar-img"
        />
      </div>
      <div className="info">
        <h3 className="name">{name}</h3>
        <p className="job-title">{jobTitle}</p>
      </div>
    </div>
  );
};

export default MemberItem;
