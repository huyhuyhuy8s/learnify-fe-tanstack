import AccountMenu from '@/components/AccountMenu';
import IconButton from '@/components/IconButton';
import classNames from 'classnames';
import { useMemo, useState, useRef } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOutside';

const TopNavRight = () => {
  const [accountMenuVisible, setAccountMenuVisible] = useState(false);
  const accountMenuClassName = useMemo(() => {
    return classNames({ invisible: !accountMenuVisible });
  }, [accountMenuVisible]);

  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef, () => {
    if (accountMenuVisible) setAccountMenuVisible(false);
  });

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
        type="outlined"
        size="tiny"
        shape="circle"
        onClick={() => {}}
      />
      <IconButton
        icon="person_alert"
        type="outlined"
        size="tiny"
        shape="circle"
        onClick={() => setAccountMenuVisible(!accountMenuVisible)}
      />
      <AccountMenu
        username="huybua"
        uid="@huybua"
        subscription="starter"
        className={accountMenuClassName}
      />
    </div>
  );
};

export default TopNavRight;
