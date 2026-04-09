import IconButton from "@/components/IconButton";

const LeftNavBot = () => {
  return (
    <div className="left-nav-bot">
      <IconButton
        icon="language"
        specialIcon="globe_asia"
        shape="circle"
        type="outlined"
        size="small"
      />
      <IconButton
        icon="dark_mode"
        specialIcon="light_mode"
        shape="circle"
        type="outlined"
        size="small"
      />
    </div>
  );
};

export default LeftNavBot;
