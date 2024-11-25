import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import useClickOutSide from "@src/hooks/useClickOutSide";

type Option = {
  value: string;
  label: string;
};

type SelectInputProps = {
  placeholder?: string;
  options: Option[];
  value: Option[];
  onChange: Dispatch<SetStateAction<Option[]>>;
  icon?: string;
  loading?: boolean;
  // defaultSelected?: Option[];
};

const SelectInput = ({
  placeholder = "SelectInput",
  options = [],
  value,
  onChange,
  icon = "fi-rr-filter",
  loading = false,
}: SelectInputProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(value || []);
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
  const handleRemoveSelected = (e: MouseEvent, option: Option) => {
    e.stopPropagation();
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
    console.log("newOptions", newOptions);
    setSearchedOptions(newOptions);
    if (newOptions.length === 0) {
      setIsOpenDropDown(false);
      return;
    }
  }, [input, options]);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  useEffect(() => {
    setSelectedOptions(value);
  }, [value]);

  return (
    <div className={styles.container} ref={clickOutSideRef}>
      {loading ? (
        <span className="flex items-center px-3 text-xl animate-spin ">
          <i className={`flex fi fi-rr-spinner`}></i>
        </span>
      ) : (
        <span className="flex items-center px-3 text-xl ">
          <i className={`flex fi ${icon}`}></i>
        </span>
      )}

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
                onClick={(e) => handleRemoveSelected(e, option)}
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
              key={option.value}
              className={
                selectedOptions.find((opt) => opt.value === option.value)
                  ? styles.modalBoxOptionSelected
                  : styles.modalBoxOption
              }
              onClick={() => handleSelectOption(option)}
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SelectInput;
