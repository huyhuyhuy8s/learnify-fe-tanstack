interface TopNavLeftProps {
  pathname: string[];
}

const TopNavLeft = (props: TopNavLeftProps) => {
  const { pathname, ...rest } = props

  const content = pathname.length >= 1 &&
    <>
      <span className="material-symbols-rounded">home</span>
      {
        pathname.map((item, index) =>
          <>
            <span key={index} className="material-symbols-rounded">keyboard_arrow_right</span>
            <p>{item}</p>
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
