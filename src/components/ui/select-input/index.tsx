import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import useClickOutSide from "@src/hooks/useClickOutSide";

type Option = {
  value: string;
  label: string;
};

type SelectInputProps = {
  placeholder?: string;
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: Dispatch<SetStateAction<Option[]>>;
  // defaultSelected?: Option[];
};

const SelectInput = ({
  placeholder = "SelectInput",
  options = [],
  selectedOptions,
  setSelectedOptions,
}: SelectInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchedOptions, setSearchedOptions] = useState(options);
  const clickOutSideRef = useClickOutSide(handleInputBoxClickOutSide);

  const handleInputBoxClick = () => {
    inputRef.current?.focus();
    setIsFocused(true);
    setIsOpenDropDown(true);
  };

  function handleInputBoxClickOutSide() {
    inputRef.current?.focus();
    setInput("");
    setIsFocused(false);
    setIsOpenDropDown(false);
  }
  const handleRemoveSelected = (option: Option) => {
    setSelectedOptions((prev) =>
      prev.filter((item) => item.value !== option.value)
    );
  };

  const handleSelectOption = (option: Option) => {
    const isExist = selectedOptions.find((opt) => opt.value === option.value);
    if (isExist) return;
    setSelectedOptions((prev) => [option, ...prev]);
    setInput("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    const newOptions = options.filter((opt) =>
      opt.label.toLocaleLowerCase().includes(input.toLocaleLowerCase().trim())
    );
    setSearchedOptions(newOptions);
    if (newOptions.length === 0) {
      setIsOpenDropDown(false);
    } else {
      setIsOpenDropDown(true);
    }
  }, [input, options]);

  return (
    <div className={styles.container} ref={clickOutSideRef}>
      <span className="flex items-center px-3 text-xl ">
        <i className="flex fi fi-rr-filter "></i>
      </span>
      <div className={styles.inputBox} onClick={handleInputBoxClick}>
        <span
          className={`${styles.placeholder} ${
            selectedOptions.length > 0 || isFocused
              ? styles.placeholderDeactive
              : styles.placeholderActive
          }`}
        >
          {placeholder}
        </span>

        <div className={styles.selectedOptions}>
          {selectedOptions.map((option, index) => (
            <div key={index} className={styles.selectedOption}>
              <span className="px-2 py-1">{option.label}</span>
              <span
                className="flex items-center bg-zinc-800 px-1 hover:bg-red-700 cursor-pointer"
                onClick={() => handleRemoveSelected(option)}
              >
                <i className="flex fi fi-rr-cross-small "></i>
              </span>
            </div>
          ))}
          <input
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            style={{
              width: `${(input.length + 5) * 8}px`,
            }}
          />
        </div>
      </div>
      {isOpenDropDown && (
        <div className={styles.modalBox}>
          {searchedOptions.map((option) => (
            <div
              className={
                selectedOptions.find((opt) => opt.value === option.value)
                  ? styles.modalBoxOptionSelected
                  : styles.modalBoxOption
              }
              onClick={() => handleSelectOption(option)}
            >
              <span>{option.label}</span>
              {selectedOptions.find((opt) => opt.value === option.value) && (
                <span onClick={() => handleRemoveSelected(option)}>
                  <i className="flex fi fi-rr-cross-small cursor-pointer"></i>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SelectInput;
