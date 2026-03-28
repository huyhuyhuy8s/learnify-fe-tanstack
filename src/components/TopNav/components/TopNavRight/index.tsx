import IconButton from '@/components/IconButton';

const TopNavRight = () => {
  return (
    <div className="top-nav-right">
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
      />
      <IconButton
        icon="person_alert"
        type="outlined"
        size="tiny"
        shape="circle" />
    </div>
  )
}

export default TopNavRight
