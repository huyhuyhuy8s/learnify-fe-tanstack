import React from "react";
import "./style.scss";
import TextButton from "@/components/TextButton";
import { MOCK_PROGRESS } from "@/mock/dashboard";

const ProgressWidget = () => {
  return (
    <div className="progress-widget">
      <div className="progress-widget-header">
        <h3>Progress</h3>
      </div>
      <div className="progress-widget-grid">
        {MOCK_PROGRESS.map((progress, index) => (
          <div key={index} className="progress-widget-grid-pill">
            <TextButton
              onClick={() => {}}
              text="text"
              size="tiny"
              type="special"
              typeSpecial={progress.typeSpecial}
            />
            <span className="num">{progress.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressWidget;
