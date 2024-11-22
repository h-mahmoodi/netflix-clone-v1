import { useRef, useState } from "react";
import styles from "./styles.module.css";
import useClickOutSide from "@src/hooks/useClickOutSide";

const mockSelectedOptions = [
  {
    value: "value 1",
    label: "label 1",
  },
  {
    value: "value 2",
    label: "label 2",
  },
  {
    value: "value 2",
    label: "label 2",
  },
  {
    value: "value 2",
    label: "label 2",
  },
  {
    value: "value 2",
    label: "label 2",
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
  defaultSelected = mockSelectedOptions,
}: SelectInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    defaultSelected || []
  );
  //   const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputBoxClick = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const handleInputBoxClickOutSide = () => {
    inputRef.current?.focus();
    setInput("");
    setIsFocused(false);
  };
  const clickOutSideRef = useClickOutSide(handleInputBoxClickOutSide);

  const handleRemoveSelected = (option: Option) => {
    setSelectedOptions((prev) =>
      prev.filter((item) => item.value !== option.value)
    );
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.inputBox}
        onClick={handleInputBoxClick}
        ref={clickOutSideRef}
      >
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
    </div>
  );
};
export default SelectInput;
