import AccountMenu from "@/components/AccountMenu";
import IconButton from "@/components/IconButton";
import Icon from "@/components/Icon";
import classNames from "classnames";
import { useMemo, useState, useRef, useCallback } from "react";
import { logoutFn } from "@/server/auth";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useAuthStore } from "@/store/authStore";
import TextButton from "@/components/TextButton";
import { COLORS } from "@/styles/colors";
import { useNavigate } from "@tanstack/react-router";
import { useShallow } from "zustand/react/shallow";
import "./style.scss";

const TopNavRight = () => {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { isAuthenticated, user, onLogout } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      onLogout: state.logout,
    }))
  );

  useOnClickOutside(containerRef, () => {
    if (accountMenuVisible) setAccountMenuVisible(false);
  });

  const handleLogout = useCallback(async () => {
    await logoutFn();
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
            onClick={() => navigate({ to: "/learner/sign-up" })}
          />
          <TextButton
            text="Log in"
            icon="login"
            type="secondary"
            backgroundColor={COLORS.modeGreen}
            size="small"
            color={COLORS.white}
            onClick={() => navigate({ to: "/learner/log-in" })}
          />
        </>
      );
    }

    return (
      <>
        <div className="crystal">
          <Icon name="diamond" />
          <p>{user.diamond || 0}</p>
        </div>
        <div className="streak">
          <Icon name="mode_heat" />
          <p>{user.currentSteak || 0}</p>
        </div>
        <IconButton
          icon="notifications_active"
          specialIcon="notifications"
          type="outlined"
          size="tiny"
          shape="circle"
          ariaLabel="Notifications"
          onClick={() => {}}
        />
        <IconButton
          icon="person"
          specialIcon="person"
          type="outlined"
          size="tiny"
          shape="circle"
          ariaLabel="Account menu"
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
    <div className="top-nav-right" ref={containerRef}>
      {renderContent()}
    </div>
  );
};

export default TopNavRight;
