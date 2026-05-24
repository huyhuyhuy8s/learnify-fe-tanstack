import ReactSelect from "react-select";
import "./style.scss";
import { useState } from "react";
import classNames from "classnames";

export type TSelectOption = {
  value: string;
  label: string;
};

export type TSelectProps = {
  className?: string;
  options: TSelectOption[];
  defaultValue?: TSelectOption;
};

const Select = (props: TSelectProps) => {
  const { className, options, defaultValue } = props;
  const [selectedOption, setSelectedOption] = useState(defaultValue ?? null);

  return (
    <ReactSelect
      className={classNames("select", className)}
      onChange={setSelectedOption}
      value={selectedOption}
      options={options}
    />
  );
};

export default Select;
