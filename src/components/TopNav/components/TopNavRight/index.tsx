import AccountMenu from "@/components/AccountMenu";
import IconButton from "@/components/IconButton";
import classNames from "classnames";
import { useMemo, useState, useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useAuthStore } from "@/store";
import TextButton from "@/components/TextButton";
import { COLORS } from "@/styles/colors";
import { useNavigate } from "@tanstack/react-router";

const TopNavRight = () => {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const accountMenuClassName = useMemo(() => {
    return classNames({ invisible: !accountMenuVisible });
  }, [accountMenuVisible]);
  const navigate = useNavigate();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const onLogout = useAuthStore((state) => state.logout);
  useOnClickOutside(containerRef, () => {
    if (accountMenuVisible) setAccountMenuVisible(false);
  });

  if (!isAuthenticated || !user) {
    return (
      <div className="top-nav-right new" ref={containerRef}>
        <TextButton
          text="Sign up"
          icon="person_add"
          type="secondary"
          size="small"
          onClick={() => {
            navigate({ to: "/learner/sign-up" });
          }}
        />
        <TextButton
          text="Log in"
          icon="login"
          type="secondary"
          backgroundColor={COLORS.modeGreen}
          size="small"
          color={COLORS.white}
          onClick={() => {
            navigate({ to: "/learner/log-in" });
          }}
        />
      </div>
    );
  }

  return (
    <div className="top-nav-right" ref={containerRef}>
      <div className="crystal">
        <span className="material-symbols-rounded">diamond</span>
        <p>0</p>
      </div>
      <div className="streak">
        <span className="material-symbols-rounded">mode_heat</span>
        <p>0</p>
      </div>
      <IconButton
        icon="notifications_active"
        specialIcon="notifications"
        type="outlined"
        size="tiny"
        shape="circle"
        onClick={() => {}}
      />
      <IconButton
        icon="person"
        specialIcon="person"
        type="outlined"
        size="tiny"
        shape="circle"
        onClick={() => setAccountMenuVisible(!accountMenuVisible)}
      />
      <AccountMenu
        username={user.username || "User"}
        uid={user.email || ""}
        id={user.id || ""}
        subscription={"starter"}
        className={accountMenuClassName}
        onLogout={() => onLogout()}
      />
    </div>
  );
};

export default TopNavRight;
