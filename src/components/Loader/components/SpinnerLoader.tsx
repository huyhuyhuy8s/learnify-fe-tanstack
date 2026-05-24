const SpinnerLoader = () => (
  <>
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        className="spinner-tracker"
        fill="none"
        strokeWidth="1"
        strokeDasharray="900"
        strokeDashoffset="900"
      />
    </svg>
    <small>loading...</small>
  </>
);

export default SpinnerLoader;
