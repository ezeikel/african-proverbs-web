import { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { CustomIndicatorsContainer, customStyles } from "@/lib/react-select";

type SelectProps = {
  placeholder?: string;
  selectOptions: { label: string; value: string }[];
  defaultValue?: { label: string; value: string };
  handleChange: (option?: { label: string; value: string }) => void;
  name: string; // TODO: bring all react select props also
};

const Select = ({
  placeholder,
  selectOptions,
  defaultValue,
  handleChange,
  name,
}: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  return (
    <ReactSelect
      value={selectedOption}
      styles={customStyles}
      placeholder={placeholder}
      onChange={(option: { label: string; value: string }) => {
        setSelectedOption(option);

        // prop from parent if passed
        handleChange(option);
      }}
      components={{
        IndicatorsContainer: CustomIndicatorsContainer,
      }}
      options={selectOptions}
      isSearchable={false}
      name={name}
    />
  );
};

export default Select;
