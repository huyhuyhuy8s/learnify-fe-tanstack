import AccountMenu from "@/components/AccountMenu";
import IconButton from "@/components/IconButton";
import classNames from "classnames";
import { useMemo, useState, useRef, useCallback } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useAuthStore } from "@/store";
import TextButton from "@/components/TextButton";
import { COLORS } from "@/styles/colors";
import { useNavigate } from "@tanstack/react-router";
import { useShallow } from "zustand/react/shallow";
import "./style.scss";

const TopNavRight = () => {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { isAuthenticated, isHydrated, user, onLogout } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      isHydrated: state.isHydrated,
      user: state.user,
      onLogout: state.logout,
    }))
  );

  useOnClickOutside(containerRef, () => {
    if (accountMenuVisible) setAccountMenuVisible(false);
  });

  const handleLogout = useCallback(() => {
    onLogout();
    navigate({ to: "/learner/log-in" });
  }, [onLogout, navigate]);

  const accountMenuClassName = useMemo(() => {
    return classNames({ invisible: !accountMenuVisible });
  }, [accountMenuVisible]);

  const renderContent = () => {
    if (!isAuthenticated || !user) {
      return (
        <>
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
        </>
      );
    }

    return (
      <>
        <div className="crystal">
          <span className="material-symbols-rounded">diamond</span>
          <p>{user.diamond || 0}</p>
        </div>
        <div className="streak">
          <span className="material-symbols-rounded">mode_heat</span>
          <p>{user.currentSteak || 0}</p>
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
          onLogout={handleLogout}
        />
      </>
    );
  };

  return (
    <div
      className={classNames("top-nav-right", { loading: !isHydrated })}
      ref={containerRef}
    >
      {isHydrated && renderContent()}
    </div>
  );
};

export default TopNavRight;
