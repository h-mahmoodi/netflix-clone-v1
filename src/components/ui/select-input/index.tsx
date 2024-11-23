import { useRef, useState } from "react";
import styles from "./styles.module.css";
import useClickOutSide from "@src/hooks/useClickOutSide";

const mockOptions = [
  {
    value: "value 1",
    label: "label 1",
  },
  {
    value: "value 2",
    label: "label 2",
  },
  {
    value: "value 3",
    label: "label 3",
  },
  {
    value: "value 4",
    label: "label 4",
  },
  {
    value: "value 5",
    label: "label 5",
  },
];

type Option = {
  value: string;
  label: string;
};

type SelectInputProps = {
  placeholder?: string;
  defaultSelected?: Option[];
};

const SelectInput = ({
  placeholder = "SelectInput",
  defaultSelected,
}: SelectInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    defaultSelected || []
  );
  //   const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
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
    // const optionsSet = selectedOptions.filter(
    //   (opt) => opt.value !== option.value
    // );
    const isExist = selectedOptions.find((opt) => opt.value === option.value);
    if (isExist) return;
    setSelectedOptions((prev) => [option, ...prev]);
  };

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
          {mockOptions.map((option) => (
            <div
              className={styles.modalBoxOption}
              onClick={() => handleSelectOption(option)}
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SelectInput;
