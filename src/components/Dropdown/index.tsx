"use client";

import { useEffect, useState } from "react";
import dropdownStyles from "./Dropdown.module.css";
import { IoIosArrowDown } from "react-icons/io";

type OptionData = {
  id: number;
  name: string;
};

type DropdownProps = {
  name: string;
  label?: string;
  initialValue?: OptionData;
  placehodler?: string;
  options: OptionData[];
  onChange?: (e: { id: number; name: string }) => void;
  disabled?: boolean;
};

export default function Dropdwon({
  label,
  name,
  initialValue,
  placehodler = "Select One",
  options,
  onChange,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<
    OptionData | undefined
  >();

  useEffect(() => {
    if (!initialValue) return;
    setSelectedOption(initialValue);
  }, [initialValue]);

  return (
    <div className={dropdownStyles.formControl}>
      {label && <label htmlFor={name}> {label} </label>}
      <div
        className={dropdownStyles.inputWrapper}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <input
          name={name}
          id="inputDropdown"
          type="text"
          value={selectedOption?.name}
          readOnly
          placeholder={placehodler}
        />
        {!disabled && (
          <ArrowComponent isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        )}
        <div className={dropdownStyles.dropdown} data-open={isOpen}>
          <div className={dropdownStyles.options}>
            {options.map((option, index) => {
              return (
                <div
                  key={`${option.id}-${index}`}
                  className={dropdownStyles.option}
                  onClick={() => {
                    onChange?.(option);
                    setSelectedOption(option);
                  }}
                >
                  <span>{option.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowComponent({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: VoidFunction;
}) {
  return (
    <div className={dropdownStyles.iconWrapper}>
      <IoIosArrowDown
        className={dropdownStyles.icon}
        data-toggle={isOpen}
        onClick={() => onClick()}
      />
    </div>
  );
}
