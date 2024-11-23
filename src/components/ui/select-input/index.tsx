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
  //   const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchedOptions, setSearchedOptions] = useState(options);
  const clickOutSideRef = useClickOutSide(handleInputBoxClickOutSide);

  const handleInputBoxClick = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  function handleInputBoxClickOutSide() {
    inputRef.current?.focus();
    setInput("");
    setIsFocused(false);
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
    setSearchedOptions(
      options.filter((opt) =>
        opt.label.toLocaleLowerCase().includes(input.toLocaleLowerCase().trim())
      )
    );
  }, [input, options]);

  return (
    <div className={styles.container} ref={clickOutSideRef}>
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
      {isFocused && (
        <div className={styles.modalBox}>
          {searchedOptions.map((option) => (
            <div
              className={styles.modalBoxOption}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SelectInput;
