import "./style.scss";

type TWelcomeHeaderProps = {
  name?: string;
};

const WelcomeHeader = ({ name = "Admin" }: TWelcomeHeaderProps) => {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="admin-welcome">
      <div className="admin-welcome__text">
        <h1 className="admin-welcome__title">
          {greeting}, {name} 👋
        </h1>
        <p className="admin-welcome__subtitle">
          Here's what's happening on your platform today · {dateStr}
        </p>
      </div>
    </div>
  );
};

export default WelcomeHeader;
