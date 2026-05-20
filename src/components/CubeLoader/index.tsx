import "./style.scss";

const CubeLoader = () => {
  return (
    <div className="cube-loader">
      <div className="cube-loader_box" />
      <style>{`
        @keyframes box-jump {
          15% {
            border-bottom-right-radius: 3px;
          }
          25% {
            transform: translateY(9px) rotate(22.5deg);
          }
          50% {
            transform: translateY(18px) scale(1, 0.9) rotate(45deg);
            border-bottom-right-radius: 40px;
          }
          75% {
            transform: translateY(9px) rotate(67.5deg);
          }
          100% {
            transform: translateY(0) rotate(90deg);
          }
        }

        .cube-loader_box {
          animation: box-jump 0.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CubeLoader;
