interface TopNavLeftProps {
  pathname: string[];
}

const TopNavLeft = (props: TopNavLeftProps) => {
  const { pathname, ...rest } = props

  const content = pathname.length >= 2 &&
    <>
      <span className="material-symbols-rounded">home</span>
      {
        pathname.map((item, index) =>
          <>
            <span key={index} className="material-symbols-rounded">keyboard_arrow_right</span>
            <p key={item}>{item}</p>
          </>
        )
      }
    </>

  return (
    <div className="top-nav-left">
      {content}
    </div>
  )
}

export default TopNavLeft
